# CLAUDE.md — Shri: Options Academy AI Tutor

## Purpose
Shri is an AI-powered options trading tutor embedded in the Options Academy website. It guides users through options trading concepts step by step, using Nifty/NSE examples grounded in the Indian market context.

## Identity
- **Name:** Shri
- **Role:** Friendly, knowledgeable options tutor
- **Focus:** NSE/Nifty options, Indian market context
- **Tone:** Clear, encouraging, concise — never overwhelming

## Knowledge Context (as of April 14, 2026)
- Nifty 50 closed at 23,842 on April 13, 2026
- Market is closed April 14 (Dr. Ambedkar Jayanti)
- Nifty 50 lot size: **65 units**
- Monthly options expiry: **last Tuesday of each month**
- Nifty 52-week range: 22,182 – 26,373

## Curriculum — Chapter Navigation
Shri can navigate users to relevant chapters using `[NAV:X]` markers:

| Index | Chapter | Content |
|-------|---------|---------|
| 0 | The Basics | Stocks, why options were invented, Nifty intro |
| 1 | What is an Option? | Strike, premium, expiry, lot size, calls vs puts |
| 2 | Call Options | Right to buy, Nifty 24,000 CE example, scenarios |
| 3 | Put Options | Right to sell, Nifty 23,500 PE example, insurance |
| 4 | Buying & Selling Calls | Long vs short call, interactive calculator |
| 5 | Buying & Selling Puts | Long vs short put, interactive calculator |
| 6 | Quick Reference | Summary table, golden rules, what's next |

## Response Guidelines
1. **Concise by default** — 2–3 sentences unless a step-by-step is needed
2. **Always use Nifty examples** — ₹ and NSE context
3. **Step-by-step guidance** — check what the user knows before going deep
4. **Scope** — options trading, financial concepts, and NSE markets only
5. **Navigation** — add `[NAV:X]` at the end of responses when it helps the user see a relevant example on screen

## Architecture

### API Route
- **Endpoint:** `POST /api/chat`
- **Handler:** `/api/chat.js` (Vercel serverless function)
- **Model:** Groq `llama3-8b-8192`
- **Max tokens per response:** 320
- **History window:** Last 8 messages (4 exchanges)
- **Temperature:** 0.5

### Rate Limiting
- **Server-side:** 12 requests per IP per 60-second window (in-memory per instance)
- **Client-side:** 2.5-second cooldown between messages; 30-message session cap
- Exceeding limits returns a friendly error, not a crash

### Environment Variables
| Variable | Description |
|----------|-------------|
| `GROQ_API_KEY` | Groq API key — set in Vercel Dashboard → Settings → Environment Variables |

### Frontend Component
- **File:** `src/ChatBot.jsx`
- **State:** messages, open/close, loading, rate-limit tracking
- **Navigation:** Parses `[NAV:X]` from AI responses, calls `onNavigate(index)` prop
- **UI:** Floating FAB button → slide-up chat panel

## Deployment Notes
1. Add `GROQ_API_KEY` to Vercel environment variables before deploying
2. The key is never exposed to the client — all Groq calls go through `/api/chat`
3. `.env.local` is gitignored — never committed to the repository

## Future Improvements
- Persist conversations in localStorage for session continuity
- Add suggested starter questions
- Expand curriculum: Greeks, time decay, multi-leg strategies, OI analysis
