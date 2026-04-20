const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.1-8b-instant'
const MAX_TOKENS = 380
const MAX_MESSAGES_IN_HISTORY = 8

const rateLimitMap = new Map()

function checkRateLimit(ip) {
  const now = Date.now()
  const window = 60 * 1000
  const limit = 12
  if (!rateLimitMap.has(ip)) { rateLimitMap.set(ip, { count: 1, start: now }); return true }
  const r = rateLimitMap.get(ip)
  if (now - r.start > window) { rateLimitMap.set(ip, { count: 1, start: now }); return true }
  if (r.count >= limit) return false
  r.count++
  return true
}

async function fetchNiftyData() {
  try {
    const res = await fetch(
      'https://query1.finance.yahoo.com/v8/finance/chart/%5ENSEI?interval=1d&range=10d',
      { headers: { 'User-Agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(4000) }
    )
    if (!res.ok) return null
    const data = await res.json()
    const result = data?.chart?.result?.[0]
    const meta = result?.meta
    if (!meta) return null

    const price    = meta.regularMarketPrice
    const open     = meta.regularMarketOpen
    const high     = meta.regularMarketDayHigh
    const low      = meta.regularMarketDayLow
    const isOpen   = meta.marketState === 'REGULAR'

    // Derive previous trading day from the actual time-series timestamps
    // so it correctly skips weekends and holidays (e.g. Friday close after a long weekend)
    const timestamps = result.timestamp || []
    const closes     = result.indicators?.quote?.[0]?.close || []
    const todayUTC   = new Date().toDateString()

    let prev = null
    let prevDate = null

    // Walk backwards through the series to find the last completed session
    for (let i = timestamps.length - 1; i >= 0; i--) {
      const ts = new Date(timestamps[i] * 1000)
      if (ts.toDateString() === todayUTC) continue  // skip today's bar
      if (closes[i] != null && closes[i] > 0) {
        prev = closes[i]
        prevDate = ts.toLocaleDateString('en-IN', {
          timeZone: 'Asia/Kolkata',
          weekday: 'long', day: 'numeric', month: 'short', year: 'numeric'
        })
        break
      }
    }

    // Fallback to meta if series walk fails
    if (!prev) prev = meta.chartPreviousClose || meta.previousClose

    const change    = prev ? (price - prev) : null
    const changePct = prev ? ((price - prev) / prev * 100) : null

    return { price, prev, prevDate, change, changePct, open, high, low, isOpen }
  } catch {
    return null
  }
}

function getIndiaDateTime() {
  const now = new Date()
  const istOptions = { timeZone: 'Asia/Kolkata', hour12: false }
  const date = now.toLocaleDateString('en-IN', { ...istOptions, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  const time = now.toLocaleTimeString('en-IN', { ...istOptions, hour: '2-digit', minute: '2-digit' })
  const hour = parseInt(now.toLocaleTimeString('en-US', { ...istOptions, hour: '2-digit', hour12: false }))
  const minute = parseInt(now.toLocaleTimeString('en-US', { ...istOptions, minute: '2-digit', hour12: false }))
  const dayOfWeek = now.toLocaleDateString('en-US', { ...istOptions, weekday: 'long' })
  const isWeekday = !['Saturday', 'Sunday'].includes(dayOfWeek)
  const marketOpen = isWeekday && (hour > 9 || (hour === 9 && minute >= 15)) && (hour < 15 || (hour === 15 && minute <= 30))
  return { date, time, marketOpen, dayOfWeek }
}

function buildSystemPrompt(dt, nifty) {
  const timeBlock = `Current date and time (IST): ${dt.date}, ${dt.time}.`

  let marketBlock
  if (nifty) {
    const sign = nifty.change >= 0 ? '+' : ''
    const status = nifty.isOpen ? 'MARKET IS LIVE RIGHT NOW' : (dt.marketOpen ? 'Market open' : 'Market closed')
    marketBlock = `
Live Nifty 50 data (fetched now from NSE):
- Current price: ${nifty.price?.toFixed(2)}
- Change: ${sign}${nifty.change?.toFixed(2)} (${sign}${nifty.changePct?.toFixed(2)}%)
- Today's open: ${nifty.open?.toFixed(2)}
- Day high: ${nifty.high?.toFixed(2)} | Day low: ${nifty.low?.toFixed(2)}
- Previous close: ${nifty.prev?.toFixed(2)}
- Status: ${status}
When users ask about Nifty price, give them this exact data. Do not say you cannot access live data — you have it right here.`
  } else {
    marketBlock = `Live Nifty data: unavailable at this moment (data feed issue). Last known reference: ~23,800. Tell users this honestly if they ask for the current price.`
  }

  return `You are Shri, a friendly options trading tutor for Options Academy (options-academy.vercel.app).

${timeBlock}
${marketBlock}

Your identity and rules:
1. You always know the current date and time — it is injected above. Never say you do not know the date or time.
2. You have live Nifty data above. Use it when users ask about current market prices.
3. You are an options trading tutor. Only answer questions about options, Nifty markets, and related financial concepts. Politely redirect off-topic questions.
4. Write in plain text only. No asterisks, no bold (**), no bullet points, no markdown, no symbols like #, |, >, or -. Use short sentences and paragraphs.
5. Be concise — 2 to 3 sentences for simple questions, step-by-step only when truly needed.
6. Use Nifty/NSE context and INR in all examples. Lot size: 65 units. Monthly expiry: last Tuesday of each month.
7. Guide users step by step. Check what they know before going deep.
8. When your answer clearly maps to a chapter on the site, add [NAV:X] at the very end of your response (nothing after it):
   0 = The Basics, 1 = What is an Option?, 2 = Call Options, 3 = Put Options,
   4 = Buying and Selling Calls, 5 = Buying and Selling Puts, 6 = Quick Reference, 7 = ITM ATM OTM`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown'
  if (!checkRateLimit(ip)) return res.status(429).json({ error: 'Too many requests. Please wait a moment.' })

  const { messages } = req.body
  if (!messages || !Array.isArray(messages)) return res.status(400).json({ error: 'Invalid request' })

  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) return res.status(500).json({ error: 'API not configured. Add GROQ_API_KEY in Vercel.' })

  const [dt, nifty] = await Promise.all([
    Promise.resolve(getIndiaDateTime()),
    fetchNiftyData(),
  ])

  const systemPrompt = buildSystemPrompt(dt, nifty)
  const trimmedMessages = messages.slice(-MAX_MESSAGES_IN_HISTORY)

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        temperature: 0.45,
        messages: [{ role: 'system', content: systemPrompt }, ...trimmedMessages],
      }),
    })

    if (!response.ok) {
      const err = await response.json().catch(() => ({}))
      if (response.status === 429) return res.status(429).json({ error: 'Rate limit reached. Please wait a moment.' })
      return res.status(response.status).json({ error: err.error?.message || 'Groq API error' })
    }

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content || ''
    return res.status(200).json({ reply, meta: { niftyPrice: nifty?.price, time: dt.time } })
  } catch (err) {
    console.error('Chat error:', err)
    return res.status(500).json({ error: 'Failed to reach AI service. Please try again.' })
  }
}
