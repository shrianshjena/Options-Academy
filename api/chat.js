const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama3-8b-8192'
const MAX_TOKENS = 320
const MAX_MESSAGES_IN_HISTORY = 8

const SYSTEM_PROMPT = `You are Shri, a friendly options trading tutor for Options Academy — an educational website about NSE/Nifty options. Today is April 14, 2026. Nifty 50 closed at 23,842 on April 13, 2026 (market is closed today for Dr. Ambedkar Jayanti).

Key Nifty facts (2026):
- Lot size: 65 units per lot
- Monthly expiry: last Tuesday of each month
- Current level: ~23,800

Your rules:
1. Be concise — max 3 sentences per reply unless a step-by-step explanation is needed.
2. Always use ₹ and Nifty/NSE examples.
3. Only answer questions about options trading, financial markets, and related concepts. Politely redirect unrelated questions.
4. When your answer is clearly about one of these topics, add [NAV:X] at the very end of your response (nothing after it):
   0 = The Basics (stocks, what options are for)
   1 = What is an Option? (strike, premium, expiry, lot size)
   2 = Call Options (right to buy, bullish)
   3 = Put Options (right to sell, bearish)
   4 = Buying & Selling Calls
   5 = Buying & Selling Puts
   6 = Quick Reference (summary table)
   Only add [NAV:X] when it genuinely helps the user see a relevant example. Do not add it for general greetings or clarifying questions.
5. Guide users step by step — ask what they already know before diving deep.`

const rateLimitMap = new Map()

function checkRateLimit(ip) {
  const now = Date.now()
  const window = 60 * 1000
  const limit = 12

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, start: now })
    return true
  }

  const record = rateLimitMap.get(ip)
  if (now - record.start > window) {
    rateLimitMap.set(ip, { count: 1, start: now })
    return true
  }

  if (record.count >= limit) return false
  record.count++
  return true
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown'
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please wait a moment before asking again.' })
  }

  const { messages } = req.body
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request' })
  }

  const trimmedMessages = messages.slice(-MAX_MESSAGES_IN_HISTORY)

  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'API not configured. Please set GROQ_API_KEY in Vercel environment variables.' })
  }

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        temperature: 0.5,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...trimmedMessages,
        ],
      }),
    })

    if (!response.ok) {
      const err = await response.json().catch(() => ({}))
      if (response.status === 429) {
        return res.status(429).json({ error: 'Rate limit reached. Please wait a moment.' })
      }
      return res.status(response.status).json({ error: err.error?.message || 'Groq API error' })
    }

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content || ''
    return res.status(200).json({ reply })
  } catch (err) {
    console.error('Groq fetch error:', err)
    return res.status(500).json({ error: 'Failed to reach AI service. Please try again.' })
  }
}
