# CLAUDE.md — Options Academy: Full Project Reference

This file serves two purposes:
1. **AI tutor context** — everything Shri (the chatbot) needs to guide users accurately
2. **Project memory** — a running record of what has been built, decided, and deployed

---

## The Website

**Name:** Options Academy  
**URL:** https://options-academy.vercel.app  
**GitHub:** https://github.com/shrianshjena/Options-Academy  
**Stack:** React 18 + Vite → deployed on Vercel (static + serverless)  
**Built by:** Shriansh Jena  

### Purpose
A structured, beginner-friendly guide to options trading focused on the Indian market (NSE/Nifty). Zero prior knowledge assumed. Concepts taught step by step using plain language, real Nifty examples, and interactive calculators.

### Acknowledgements
A heartfelt thank you to **Deepak Singh**, **Sanjay Kumar**, and the entire **Deepsea Finvest** team for their time, patience, and dedication in teaching and guiding this learning experience.

---

## Curriculum — 7 Chapters

| # | Chapter | What it covers |
|---|---------|----------------|
| 0 | The Basics | What stocks are, price movements, why options were invented (Nifty scenario) |
| 1 | What is an Option? | Strike price, premium, expiry, lot size, call vs put |
| 2 | Call Options | Right to buy, Nifty 24,000 CE example, breakeven, 3 scenarios, key asymmetry |
| 3 | Put Options | Right to sell, Nifty 23,500 PE example, breakeven, portfolio insurance |
| 4 | Buying & Selling Calls | Long call vs short call, risk profiles, interactive payoff calculator |
| 5 | Buying & Selling Puts | Long put vs short put, risk profiles, interactive payoff calculator |
| 6 | Quick Reference | Strategy table, Nifty specifics, golden rules, what's next |

### What's Taught Next (upcoming chapters)
- ITM / ATM / OTM (moneyness)
- Option Greeks — Delta, Theta, Vega, Gamma
- Time decay and why it hurts buyers
- Multi-leg strategies — straddles, spreads, strangles

---

## Market Context — April 14, 2026

| Fact | Value |
|------|-------|
| Nifty 50 last close | 23,842 (April 13, 2026) |
| Reference level used in examples | ~23,800 |
| Market status today | Closed — Dr. Ambedkar Jayanti |
| Nifty lot size | **65 units per lot** |
| Monthly expiry | **Last Tuesday of each month** |
| 52-week range | 22,182 – 26,373 |
| Key support | ~23,400–23,600 |
| Key resistance | ~24,300–24,400 |

### Examples Used in the Site
- **Chapter 2 (Calls):** Nifty at 23,800 · 24,000 CE · Premium ₹120 · Breakeven 24,120 · Lot cost ₹7,800
- **Chapter 3 (Puts):** Nifty at 23,800 · 23,500 PE · Premium ₹100 · Breakeven 23,400 · Lot cost ₹6,500
- **Chapter 1 (Why options):** Holding Nifty at 23,800 with fear of drop to 22,500 and hope of rally to 25,000 · Protective put premium ₹150/unit

---

## Shri — AI Tutor

**Name:** Shri  
**Personality:** Friendly, concise, encouraging — never condescending  
**Scope:** Options trading, NSE/Nifty markets, financial concepts only  

### Behaviour Rules
1. **Concise by default** — 2–3 sentences unless a step-by-step walkthrough is needed
2. **Always use Nifty examples** — ₹ and NSE context; never generic stock examples
3. **Step-by-step pedagogy** — check what the user knows before going deep
4. **Scope guard** — politely redirect questions unrelated to options/markets
5. **Chapter navigation** — add `[NAV:X]` at the very end of a response to navigate the user to the relevant chapter tab on screen (see index above)

### NAV Tag Examples
- User asks "what is a call option?" → answer + `[NAV:2]` → app opens Chapter 3 (Call Options)
- User asks "how does buying vs selling differ?" → answer + `[NAV:4]` → opens Chapter 5
- User asks "what is premium?" → answer + `[NAV:1]` → opens Chapter 2 (What is an Option?)
- General greeting → no NAV tag needed

---

## Technical Architecture

### Frontend — `src/`
| File | Purpose |
|------|---------|
| `App.jsx` | Main app — all 7 chapter pages, header, footer, chapter navigation |
| `App.css` | All styling — light mode, glassmorphism, responsive, chatbot |
| `ChatBot.jsx` | Shri chatbot component — FAB button, chat panel, nav parsing |
| `main.jsx` | React entry point |

### Backend — `api/`
| File | Purpose |
|------|---------|
| `api/chat.js` | Vercel serverless function — Groq proxy with rate limiting |

### Key Design Decisions
- **Fonts:** Barlow Semi Condensed (hero h1, uppercase) + Playfair Display (serif accents, footer thanks) + Apple system font (body)
- **Colour scheme:** Blue (`#1a56db`) as primary accent; light mode with frosted glass glassmorphism; Option D gradient background (icy blue-white → warm white)
- **Background:** `linear-gradient` + 3 layered `radial-gradient` fixed to viewport — creates depth as content scrolls
- **No dark mode** — deliberate light-mode-only choice for legibility

### API & Rate Limiting
| Setting | Value |
|---------|-------|
| Model | `llama-3.1-8b-instant` (Groq free tier) |
| Max tokens/response | 320 |
| History window | Last 8 messages (4 exchanges) |
| Temperature | 0.5 |
| Server rate limit | 12 req/min per IP (in-memory) |
| Client cooldown | 2.5 seconds between messages |
| Session cap | 30 messages |

### Environment Variables (Vercel)
| Variable | Description |
|----------|-------------|
| `GROQ_API_KEY` | Groq API key — set in Vercel Dashboard → Settings → Environment Variables |

> The API key is never exposed to the browser. All Groq calls go through `/api/chat` server-side.

---

## Design History & Decisions

| Change | Decision |
|--------|---------|
| Initial font | Playfair Display (all headings) |
| Hero font replaced | → Barlow Semi Condensed — looks intentionally designed, not AI-default |
| Original dark theme | Replaced with light mode + glassmorphism per user request |
| Background | Went through grey → Option D gradient (blue-white to warm base with glow) |
| Colour accent | Gold/amber → Blue (`#1a56db`) |
| Expiry day | Thursday → Tuesday (2026 SEBI change) |
| Lot size | 75 → 65 (2024/2025 revision) |
| Examples | Generic stock → Nifty 50 index options throughout |
| Navbar | Removed "NSE · Indian Markets" — only "by Shriansh Jena" remains |
| Footer | Unified: serif brand + divider + italic thank-you + metadata line |

---

## Git Commit History (summary)

1. `initial` — 7-chapter interactive guide
2. `redesign` — Apple glassmorphism, system font, byline, Tuesday expiry, lot 65
3. `light mode` — Playfair headlines, Apple body font, favicon
4. `blue theme` — replace gold with blue, both nav buttons highlighted
5. `background Option D` — frosted layered gradient
6. `overhaul` — Barlow hero font, Nifty examples, why-options section, thank-you footer
7. `feat: Shri AI tutor` — Groq chatbot, navbar cleanup, unified footer, CLAUDE.md
8. `fix: blank screen` — ChatBot was injected into every page component; fixed to App only
