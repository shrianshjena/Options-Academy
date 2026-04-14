import { useState, useRef, useEffect } from 'react'

const CHAPTER_NAMES = [
  'The Basics',
  'What is an Option?',
  'Call Options',
  'Put Options',
  'Buying & Selling Calls',
  'Buying & Selling Puts',
  'Quick Reference',
]

const COOLDOWN_MS = 2500
const SESSION_LIMIT = 30

const WELCOME = {
  role: 'assistant',
  content: "Hi! I'm Shri, your options trading tutor. Ask me anything about options — calls, puts, premiums, strike prices, or how Nifty options work. Where would you like to start?",
}

function stripMarkdown(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/#{1,6}\s+/g, '')
    .replace(/^[-*+]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/`(.+?)`/g, '$1')
    .replace(/\|/g, '')
    .trim()
}

function parseNav(text) {
  const match = text.match(/\[NAV:(\d)\]/)
  if (match) {
    return { nav: parseInt(match[1]), clean: text.replace(/\s*\[NAV:\d\]/, '').trim() }
  }
  return { nav: null, clean: text }
}

export default function ChatBot({ onNavigate, open, onToggle }) {
  const [messages, setMessages] = useState([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [msgCount, setMsgCount] = useState(0)
  const [lastSent, setLastSent] = useState(0)
  const [navChip, setNavChip] = useState(null)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 80)
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function send() {
    const text = input.trim()
    if (!text || loading) return
    const now = Date.now()
    if (now - lastSent < COOLDOWN_MS) return
    if (msgCount >= SESSION_LIMIT) return

    const userMsg = { role: 'user', content: text }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)
    setLastSent(now)
    setMsgCount(c => c + 1)
    setNavChip(null)

    const history = newMessages
      .filter(m => m.role !== 'system')
      .map(m => ({ role: m.role, content: m.content }))

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error')

      const stripped = stripMarkdown(data.reply)
      const { nav, clean } = parseNav(stripped)
      setMessages(prev => [...prev, { role: 'assistant', content: clean }])

      if (nav !== null && CHAPTER_NAMES[nav]) {
        setNavChip({ index: nav, name: CHAPTER_NAMES[nav] })
        onNavigate(nav)
      }
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: err.message || 'Something went wrong. Please try again.',
        error: true,
      }])
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  const limitReached = msgCount >= SESSION_LIMIT

  return (
    <>
      <div className={`chat-panel ${open ? 'chat-panel-open' : ''}`}>
        <div className="chat-header">
          <div className="chat-header-left">
            <div className="chat-avatar">S</div>
            <div>
              <div className="chat-name">Shri</div>
              <div className="chat-status">Options tutor</div>
            </div>
          </div>
          <button className="chat-close" onClick={onToggle} title="Close">✕</button>
        </div>

        <div className="chat-messages">
          {messages.map((m, i) => (
            <div key={i} className={`chat-msg chat-msg-${m.role} ${m.error ? 'chat-msg-error' : ''}`}>
              {m.role === 'assistant' && <div className="chat-msg-avatar">S</div>}
              <div className="chat-bubble">{m.content}</div>
            </div>
          ))}
          {loading && (
            <div className="chat-msg chat-msg-assistant">
              <div className="chat-msg-avatar">S</div>
              <div className="chat-bubble chat-typing"><span /><span /><span /></div>
            </div>
          )}
          {navChip && (
            <div className="chat-nav-chip">
              Navigated to <strong>{navChip.name}</strong>
            </div>
          )}
          {limitReached && (
            <div className="chat-limit">Session limit reached. Refresh to start a new session.</div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="chat-input-wrap">
          <textarea
            ref={inputRef}
            className="chat-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask about options trading…"
            rows={1}
            disabled={loading || limitReached}
          />
          <button
            className="chat-send"
            onClick={send}
            disabled={loading || !input.trim() || limitReached}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M14 8L2 2l2 6-2 6 12-6z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        className={`chat-fab ${open ? 'chat-fab-active' : ''}`}
        onClick={onToggle}
        title="Ask Shri"
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="chat-fab-label">Ask Shri</span>
          </>
        )}
      </button>
    </>
  )
}
