import React, { useState } from 'react'
import ChatBot from './ChatBot.jsx'

const CHAPTERS = [
  { num: '01', label: 'The Basics' },
  { num: '02', label: 'What is an Option?' },
  { num: '03', label: 'Call Options' },
  { num: '04', label: 'Put Options' },
  { num: '05', label: 'Buying & Selling Calls' },
  { num: '06', label: 'Buying & Selling Puts' },
  { num: '07', label: 'Quick Reference' },
  { num: '08', label: 'ITM, ATM & OTM' },
  { num: '09', label: 'Option Greeks' },
]

function Tag({ type, children }) { return <span className={`tag ${type}`}>{children}</span> }
function Divider() { return <hr className="divider" /> }
function Metric({ label, val, color }) {
  return (
    <div className="metric">
      <div className="mlabel">{label}</div>
      <div className={`mval ${color || ''}`}>{val}</div>
    </div>
  )
}
function Analogy({ children }) {
  return (
    <div className="analogy">
      <div className="alabel">Real-life analogy</div>
      <p>{children}</p>
    </div>
  )
}
function Scenario({ type, label, children }) {
  return (
    <div className={`scenario ${type}`}>
      <div className="slabel">{label}</div>
      <p>{children}</p>
    </div>
  )
}

function Page01() {
  return (
    <>
      <div className="page-title">The foundation: what is a stock?</div>
      <div className="page-sub">Before options, you need to understand the asset underlying them.</div>
      <div className="card">
        <div className="card-title">Stocks — owning a piece of a company</div>
        <p>When a company like Reliance Industries or HDFC Bank lists on the NSE, it divides itself into millions of small pieces called <strong style={{color:'var(--text)',fontWeight:600}}>shares</strong>. Buying a share means you own a tiny fraction of that company. If the company grows, your share is worth more. If it struggles, worth less.</p>
      </div>
      <div className="grid2">
        <div className="card">
          <Tag type="neutral">Price movement</Tag>
          <div className="card-title">Nifty 50 today: ~23,800</div>
          <div className="metric-row">
            <Metric label="If it rises to" val="24,200" color="green" />
            <Metric label="Your gain" val="+400 pts" color="green" />
          </div>
          <div className="metric-row">
            <Metric label="If it falls to" val="23,400" color="red" />
            <Metric label="Your loss" val="-400 pts" color="red" />
          </div>
        </div>
        <div className="card">
          <Tag type="neutral">Key idea</Tag>
          <div className="card-title">Direct exposure</div>
          <p>When you own an index or stock, every point move directly affects your investment. You have unlimited upside but can lose everything if prices collapse.</p>
        </div>
      </div>

      <Divider />

      <div className="why-section">
        <div className="why-header">
          <div className="why-icon">?</div>
          <div>
            <div className="why-title">Why were options invented?</div>
            <div className="why-tagline">The problem that changed markets forever</div>
          </div>
        </div>

        <div className="why-story">
          <p>It is April 2026. You hold Nifty in your portfolio at 23,800. The market has been volatile — geopolitical tensions, FII outflows, crude oil rising. You're nervous it could drop to 22,500. But you also don't want to sell, because if things calm down, Nifty could easily run to 25,000.</p>
          <p style={{marginTop:'10px'}}>You are stuck between two bad choices:</p>
        </div>

        <div className="grid2" style={{marginTop:'1rem'}}>
          <div className="why-choice bad">
            <div className="why-choice-label">Choice A — sell now</div>
            <p>You exit your position. Safe from the fall — but if Nifty rallies to 25,000, you miss every point of that ₹1,200 gain per unit.</p>
          </div>
          <div className="why-choice bad">
            <div className="why-choice-label">Choice B — hold and hope</div>
            <p>You stay invested. If Nifty does crash to 22,500, you absorb the full ₹1,300 loss per unit with no protection.</p>
          </div>
        </div>

        <div className="why-solution">
          <div className="why-solution-label">Options were invented to give you a third choice</div>
          <p>Pay a small, known premium — say ₹150 per unit — to <strong style={{color:'var(--text)',fontWeight:600}}>lock in the right to sell Nifty at 23,800</strong> anytime in the next 30 days. If it crashes, your losses are protected. If it rallies to 25,000, you simply don't use the right — and you keep the full gain. You only lose the ₹150 premium.</p>
          <div className="pill-row" style={{marginTop:'14px'}}>
            <span className="pill">Protect against a crash</span>
            <span className="pill">Keep the upside open</span>
            <span className="pill">Know your max loss upfront</span>
            <span className="pill">Speculate with less capital</span>
          </div>
        </div>
      </div>
    </>
  )
}

function Page02() {
  return (
    <>
      <div className="page-title">What exactly is an option?</div>
      <div className="page-sub">An option is a contract — not a stock itself, but the right to buy or sell one.</div>
      <div className="card">
        <div className="card-title">The core definition</div>
        <p>An option is a <strong style={{color:'var(--text)',fontWeight:600}}>contract</strong> between two parties that gives the buyer the <strong style={{color:'var(--text)',fontWeight:600}}>right (but not the obligation)</strong> to buy or sell an underlying asset at a <strong style={{color:'var(--text)',fontWeight:600}}>predetermined price</strong>, before or on a <strong style={{color:'var(--text)',fontWeight:600}}>specified date</strong>.</p>
      </div>
      <Analogy>
        You visit a car showroom and love a car priced at ₹10 lakh. You say: <em>"I'll pay ₹10,000 today to <strong>reserve the right</strong> to buy this car at ₹10 lakh anytime in the next 30 days."</em> The dealer agrees. If the car's price jumps to ₹12 lakh — you still buy at ₹10 lakh (profit!). If it drops to ₹8 lakh, you simply walk away, losing only your ₹10,000 deposit. This deposit is called the <strong>premium</strong>.
      </Analogy>
      <Divider />
      <h3>The 4 key terms you must know cold</h3>
      <div className="glossary-grid">
        <div className="gitem"><div className="gt">Strike Price</div><div className="gd">The fixed price at which you can buy or sell. For example, the Nifty 24,000 CE means the right to buy Nifty at 24,000.</div></div>
        <div className="gitem"><div className="gt">Premium</div><div className="gd">The price you pay to buy the option contract. As a buyer, this is your maximum possible loss — nothing more.</div></div>
        <div className="gitem"><div className="gt">Expiry Date</div><div className="gd">The deadline. In India (2026), Nifty monthly options expire on the last Tuesday of each month. After this, the contract ceases to exist.</div></div>
        <div className="gitem"><div className="gt">Lot Size</div><div className="gd">Nifty options trade in fixed lots of 65 units per lot. You cannot buy a fraction of a lot.</div></div>
      </div>
      <Divider />
      <h3>Two types of options</h3>
      <div className="grid2">
        <div className="card call">
          <Tag type="call">Call</Tag>
          <div className="card-title">CALL Option</div>
          <p>Right to <strong style={{color:'var(--text)',fontWeight:600}}>buy</strong> at the strike price. You profit when Nifty goes <strong style={{color:'var(--teal)',fontWeight:600}}>up</strong>.</p>
        </div>
        <div className="card put">
          <Tag type="put">Put</Tag>
          <div className="card-title">PUT Option</div>
          <p>Right to <strong style={{color:'var(--text)',fontWeight:600}}>sell</strong> at the strike price. You profit when Nifty goes <strong style={{color:'var(--red)',fontWeight:600}}>down</strong>.</p>
        </div>
      </div>
    </>
  )
}

function Page03() {
  return (
    <>
      <div className="page-title">Call options — betting on a rise</div>
      <div className="page-sub">A call option gives you the right to BUY Nifty at a fixed level.</div>
      <div className="card call">
        <Tag type="call">Call Option — Nifty Example</Tag>
        <div className="card-title">The simple setup</div>
        <p>Nifty is at 23,800 on April 14, 2026. You believe it will rise above 24,000 before the last Tuesday of April expiry. You buy the <strong style={{color:'var(--teal)',fontWeight:600}}>24,000 CE (Call)</strong>, paying a premium of ₹120 per unit. Since 1 lot = 65 units, your total cost is ₹7,800.</p>
      </div>
      <div className="metric-row">
        <Metric label="Nifty spot" val="23,800" />
        <Metric label="Strike (CE)" val="24,000" color="blue" />
        <Metric label="Premium paid" val="₹120/unit" color="red" />
        <Metric label="Breakeven" val="24,120" color="gold" />
      </div>
      <Analogy>
        You paid ₹120 for the right to buy at 24,000. So Nifty must rise above 24,000 + 120 = <strong>24,120</strong> for you to profit. Below 24,120, your premium erodes. Above 24,120, every extra point is your gain.
      </Analogy>
      <Divider />
      <h3>What happens on expiry day?</h3>
      <Scenario type="win" label="Scenario 1 — Nifty rallies to 24,500">
        You exercise your right. Gain = 24,500 − 24,000 − 120 = <strong className="g">+380 points × 65 units = +₹24,700 profit</strong>
      </Scenario>
      <Scenario type="flat" label="Scenario 2 — Nifty stays at 23,950">
        No point buying at 24,000 when market is 23,950. Option expires worthless. Loss = premium paid: <strong className="r">−₹120 × 65 = −₹7,800</strong>
      </Scenario>
      <Scenario type="lose" label="Scenario 3 — Nifty falls to 23,200">
        Option expires worthless. You walk away. Loss is always capped at premium: <strong className="r">−₹7,800 maximum</strong>
      </Scenario>
      <Divider />
      <h3>The key asymmetry</h3>
      <div className="card">
        <div className="pill-row">
          <span className="pill">Max loss = ₹7,800 per lot (known, fixed)</span>
          <span className="pill">Max profit = unlimited</span>
          <span className="pill">Profit above Nifty 24,120</span>
        </div>
        <p style={{marginTop:'10px'}}>This asymmetry is options' core power — you risk a small, known amount (₹7,800) to gain potentially unlimited upside if Nifty surges.</p>
      </div>
    </>
  )
}

function Page04() {
  return (
    <>
      <div className="page-title">Put options — betting on a fall</div>
      <div className="page-sub">A put option gives you the right to SELL Nifty at a fixed level.</div>
      <div className="card put">
        <Tag type="put">Put Option — Nifty Example</Tag>
        <div className="card-title">The simple setup</div>
        <p>Nifty is at 23,800. You're worried about a correction and buy the <strong style={{color:'var(--red)',fontWeight:600}}>23,500 PE (Put)</strong>, paying a premium of ₹100 per unit. Total cost for 1 lot: ₹6,500.</p>
      </div>
      <div className="metric-row">
        <Metric label="Nifty spot" val="23,800" />
        <Metric label="Strike (PE)" val="23,500" color="blue" />
        <Metric label="Premium paid" val="₹100/unit" color="red" />
        <Metric label="Breakeven" val="23,400" color="gold" />
      </div>
      <Analogy>
        You paid ₹100 for the right to sell at 23,500. Nifty must fall below 23,500 − 100 = <strong>23,400</strong> for you to profit. Every point below 23,400 is your gain.
      </Analogy>
      <Divider />
      <h3>What happens on expiry day?</h3>
      <Scenario type="win" label="Scenario 1 — Nifty falls to 22,800">
        Gain = 23,500 − 22,800 − 100 = <strong className="g">+600 points × 65 units = +₹39,000 profit</strong>
      </Scenario>
      <Scenario type="flat" label="Scenario 2 — Nifty stays at 23,600">
        No point selling at 23,500 when market is 23,600. Option expires worthless: <strong className="r">−₹100 × 65 = −₹6,500</strong>
      </Scenario>
      <Scenario type="lose" label="Scenario 3 — Nifty rises to 24,500">
        Option expires worthless. Loss capped at premium: <strong className="r">−₹6,500 maximum</strong>
      </Scenario>
      <Divider />
      <h3>The added use case — portfolio insurance</h3>
      <div className="card">
        <div className="pill-row">
          <span className="pill">Max loss = ₹6,500 per lot (known, fixed)</span>
          <span className="pill">Max profit grows as Nifty falls</span>
          <span className="pill">Profit below Nifty 23,400</span>
        </div>
        <p style={{marginTop:'10px'}}>Puts are also used as <strong style={{color:'var(--text)',fontWeight:600}}>portfolio insurance</strong>. If you hold Nifty ETFs or stocks, a put protects you from a market crash — exactly like the scenario described in Chapter 1.</p>
      </div>
    </>
  )
}

function CallCalc() {
  const [strike, setStrike] = useState(24000)
  const [prem, setPrem] = useState(120)
  const [expiry, setExpiry] = useState(24350)
  const buyPnl = expiry > strike ? (expiry - strike - prem) : -prem
  const sellPnl = -buyPnl
  return (
    <div className="calc-box">
      <h3>Interactive: call payoff at expiry (per unit)</h3>
      <div className="slider-row">
        <label>Strike — CE (pts)</label>
        <input type="range" min="22000" max="26000" step="50" value={strike} onChange={e => setStrike(+e.target.value)} />
        <span className="sval">{strike}</span>
      </div>
      <div className="slider-row">
        <label>Premium (₹/unit)</label>
        <input type="range" min="10" max="500" step="5" value={prem} onChange={e => setPrem(+e.target.value)} />
        <span className="sval">₹{prem}</span>
      </div>
      <div className="slider-row">
        <label>Nifty at expiry</label>
        <input type="range" min="20000" max="27000" step="50" value={expiry} onChange={e => setExpiry(+e.target.value)} />
        <span className="sval">{expiry}</span>
      </div>
      <div className="result-row">
        <div className="result-box">
          <div className="rl">Buy Call P&L</div>
          <div className={`rv ${buyPnl >= 0 ? 'green' : 'red'}`}>{buyPnl >= 0 ? '+' : ''}{buyPnl} pts</div>
        </div>
        <div className="result-box">
          <div className="rl">Sell Call P&L</div>
          <div className={`rv ${sellPnl >= 0 ? 'green' : 'red'}`}>{sellPnl >= 0 ? '+' : ''}{sellPnl} pts</div>
        </div>
        <div className="result-box">
          <div className="rl">Breakeven</div>
          <div className="rv">{strike + prem}</div>
        </div>
      </div>
    </div>
  )
}

function Page05() {
  return (
    <>
      <div className="page-title">Buying vs selling a call</div>
      <div className="page-sub">Every option trade has two sides. For every buyer, there's a seller.</div>
      <div className="card call">
        <Tag type="buy">Buy Call — Long Call</Tag>
        <div className="card-title">You pay premium → you hold the right</div>
        <p>You believe Nifty will rise sharply before expiry. Your risk is limited to the premium. Your reward is theoretically unlimited. You are in control — you decide whether to exercise or not.</p>
        <div className="metric-row" style={{marginTop:'12px'}}>
          <Metric label="Outlook" val="Bullish ↑" color="green" />
          <Metric label="Max loss" val="Premium" color="red" />
          <Metric label="Max gain" val="Unlimited" color="green" />
        </div>
      </div>
      <div className="card sell">
        <Tag type="sell">Sell Call — Short Call</Tag>
        <div className="card-title">You collect premium → you carry the obligation</div>
        <p>You sell someone else a call option and <strong style={{color:'var(--text)',fontWeight:600}}>collect</strong> the premium upfront. But now you are <em>obligated</em> to settle at the strike price if the buyer exercises. If Nifty surges well above your strike, your loss can be very large.</p>
        <div className="metric-row" style={{marginTop:'12px'}}>
          <Metric label="Outlook" val="Bearish / Flat ↓→" color="red" />
          <Metric label="Max gain" val="Premium" color="green" />
          <Metric label="Max loss" val="Very large" color="red" />
        </div>
      </div>
      <Divider />
      <CallCalc />
    </>
  )
}

function PutCalc() {
  const [strike, setStrike] = useState(23500)
  const [prem, setPrem] = useState(100)
  const [expiry, setExpiry] = useState(23100)
  const buyPnl = expiry < strike ? (strike - expiry - prem) : -prem
  const sellPnl = -buyPnl
  return (
    <div className="calc-box">
      <h3>Interactive: put payoff at expiry (per unit)</h3>
      <div className="slider-row">
        <label>Strike — PE (pts)</label>
        <input type="range" min="20000" max="26000" step="50" value={strike} onChange={e => setStrike(+e.target.value)} />
        <span className="sval">{strike}</span>
      </div>
      <div className="slider-row">
        <label>Premium (₹/unit)</label>
        <input type="range" min="10" max="500" step="5" value={prem} onChange={e => setPrem(+e.target.value)} />
        <span className="sval">₹{prem}</span>
      </div>
      <div className="slider-row">
        <label>Nifty at expiry</label>
        <input type="range" min="20000" max="27000" step="50" value={expiry} onChange={e => setExpiry(+e.target.value)} />
        <span className="sval">{expiry}</span>
      </div>
      <div className="result-row">
        <div className="result-box">
          <div className="rl">Buy Put P&L</div>
          <div className={`rv ${buyPnl >= 0 ? 'green' : 'red'}`}>{buyPnl >= 0 ? '+' : ''}{buyPnl} pts</div>
        </div>
        <div className="result-box">
          <div className="rl">Sell Put P&L</div>
          <div className={`rv ${sellPnl >= 0 ? 'green' : 'red'}`}>{sellPnl >= 0 ? '+' : ''}{sellPnl} pts</div>
        </div>
        <div className="result-box">
          <div className="rl">Breakeven</div>
          <div className="rv">{strike - prem}</div>
        </div>
      </div>
    </div>
  )
}

function Page06() {
  return (
    <>
      <div className="page-title">Buying vs selling a put</div>
      <div className="page-sub">Puts have two sides too — with opposite risk profiles.</div>
      <div className="card put">
        <Tag type="buy">Buy Put — Long Put</Tag>
        <div className="card-title">You pay premium → you hold the right to sell</div>
        <p>You believe Nifty will fall. If it crashes, you profit significantly. If it rises or stays flat, you lose only the premium — a capped, known loss. Buying puts on Nifty is also the most common way to hedge an equity portfolio.</p>
        <div className="metric-row" style={{marginTop:'12px'}}>
          <Metric label="Outlook" val="Bearish ↓" color="red" />
          <Metric label="Max loss" val="Premium" color="red" />
          <Metric label="Max gain" val="Strike × Fall" color="green" />
        </div>
      </div>
      <div className="card sell">
        <Tag type="sell">Sell Put — Short Put</Tag>
        <div className="card-title">You collect premium → you carry the obligation to buy</div>
        <p>You sell a put option and collect the premium now. But you are <em>obligated</em> to settle at the strike if the buyer exercises. If Nifty crashes hard, the loss can be very large — you're effectively agreeing to absorb the fall.</p>
        <div className="metric-row" style={{marginTop:'12px'}}>
          <Metric label="Outlook" val="Bullish / Flat ↑→" color="green" />
          <Metric label="Max gain" val="Premium" color="green" />
          <Metric label="Max loss" val="Strike × Fall" color="red" />
        </div>
      </div>
      <Divider />
      <PutCalc />
    </>
  )
}

function Page07() {
  return (
    <>
      <div className="page-title">Quick reference</div>
      <div className="page-sub">All four strategies, risk profiles, and breakeven formulas — Nifty context.</div>
      <div className="card" style={{padding:'0', overflow:'hidden'}}>
        <table className="summary-table">
          <thead>
            <tr>
              <th>Strategy</th><th>Outlook</th><th>Max gain</th><th>Max loss</th><th>Breakeven</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="badge b">Buy Call</span></td>
              <td>Bullish ↑</td>
              <td className="green">Unlimited</td>
              <td className="red">Premium</td>
              <td>Strike + Premium</td>
            </tr>
            <tr>
              <td><span className="badge a">Sell Call</span></td>
              <td>Bearish / Flat ↓→</td>
              <td className="green">Premium</td>
              <td className="red">Very large</td>
              <td>Strike + Premium</td>
            </tr>
            <tr>
              <td><span className="badge b">Buy Put</span></td>
              <td>Bearish ↓</td>
              <td className="green">Strike − Premium</td>
              <td className="red">Premium</td>
              <td>Strike − Premium</td>
            </tr>
            <tr>
              <td><span className="badge a">Sell Put</span></td>
              <td>Bullish / Flat ↑→</td>
              <td className="green">Premium</td>
              <td className="red">Strike − Premium</td>
              <td>Strike − Premium</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="card" style={{marginTop:'1rem', background:'rgba(26,86,219,0.04)', borderColor:'rgba(26,86,219,0.15)'}}>
        <div className="card-title" style={{fontSize:'12px', textTransform:'uppercase', letterSpacing:'0.06em', color:'var(--blue)'}}>Nifty specifics — April 2026</div>
        <div className="metric-row">
          <Metric label="Nifty spot" val="~23,800" />
          <Metric label="Lot size" val="65 units" color="blue" />
          <Metric label="Monthly expiry" val="Last Tuesday" color="blue" />
        </div>
      </div>
      <Divider />
      <h3>The golden rules</h3>
      <div className="card">
        <div className="pill-row" style={{flexDirection:'column', alignItems:'flex-start', gap:'6px'}}>
          <span className="pill">Buyers pay premium. Sellers collect premium.</span>
          <span className="pill">Buyers hold rights. Sellers hold obligations.</span>
          <span className="pill">Call buyers profit when Nifty rises. Put buyers profit when it falls.</span>
          <span className="pill">Buyers have limited, known risk. Sellers can face very large losses.</span>
          <span className="pill">Most traders exit the option before expiry — you rarely need to wait.</span>
        </div>
      </div>
      <Divider />
      <h3>What's next in your learning journey</h3>
      <div className="next-grid">
        <button className="next-item next-item-link" onClick={() => window._oa_nav && window._oa_nav(7)}>ITM / ATM / OTM — moneyness explained <span className="arrow">→</span></button>
        <div className="next-item">Option Greeks — Delta, Theta, Vega, Gamma <span className="arrow">→</span></div>
        <div className="next-item">Time decay and why it hurts buyers <span className="arrow">→</span></div>
        <div className="next-item">Multi-leg strategies — straddles, spreads, strangles <span className="arrow">→</span></div>
      </div>
    </>
  )
}

function Page08() {
  return (
    <>
      <div className="page-title">ITM, ATM &amp; OTM — moneyness</div>
      <div className="page-sub">Where your strike sits relative to the market price determines everything.</div>

      <div className="card">
        <div className="card-title">The core idea — moneyness</div>
        <p>Every option sits in one of three zones based on where the current Nifty price is relative to your strike price. This relationship is called <strong style={{color:'var(--text)',fontWeight:600}}>moneyness</strong>. It tells you whether your option has real, exercisable value right now, or whether it is still waiting for the market to move in your favour.</p>
      </div>

      <div className="grid2" style={{marginBottom:'1rem'}}>
        <div className="card" style={{borderColor:'rgba(26,127,75,0.2)',background:'rgba(26,127,75,0.04)'}}>
          <Tag type="call">ITM — In the Money</Tag>
          <div className="card-title">Real value exists right now</div>
          <p>If you exercised the option this instant, you would profit. The market has already moved your way. ITM options carry <strong style={{color:'var(--text)',fontWeight:600}}>intrinsic value</strong> — the difference between the market price and the strike.</p>
          <div className="metric-row" style={{marginTop:'10px'}}>
            <Metric label="Call ITM when" val="Market > Strike" color="green" />
            <Metric label="Put ITM when" val="Market < Strike" color="green" />
          </div>
        </div>
        <div className="card" style={{borderColor:'rgba(180,83,9,0.2)',background:'rgba(180,83,9,0.04)'}}>
          <Tag type="sell">ATM — At the Money</Tag>
          <div className="card-title">Market is right at the strike</div>
          <p>No intrinsic value, but <strong style={{color:'var(--text)',fontWeight:600}}>maximum sensitivity</strong> to price movement. A 100-point Nifty move affects an ATM option more, proportionally, than any other strike. This is why most Nifty traders focus here.</p>
          <div className="metric-row" style={{marginTop:'10px'}}>
            <Metric label="Market price" val="≈ Strike" color="gold" />
            <Metric label="Intrinsic value" val="₹0" />
          </div>
        </div>
      </div>

      <div className="card" style={{borderColor:'rgba(192,57,43,0.2)',background:'rgba(192,57,43,0.04)',marginBottom:'1.5rem'}}>
        <Tag type="put">OTM — Out of the Money</Tag>
        <div className="card-title">No real value yet — only time value remains</div>
        <p>The market has not moved your way. The option has no intrinsic value — only <strong style={{color:'var(--text)',fontWeight:600}}>time value</strong>, which is the market's price for the possibility that things change before expiry. OTM options are the cheapest to buy, but the majority expire worthless.</p>
        <div className="metric-row" style={{marginTop:'10px'}}>
          <Metric label="Call OTM when" val="Market < Strike" color="red" />
          <Metric label="Put OTM when" val="Market > Strike" color="red" />
          <Metric label="Intrinsic value" val="₹0" color="red" />
        </div>
      </div>

      <Analogy>
        Imagine you hold a train ticket priced at ₹500, but today the walk-up fare is ₹650. Your ticket is <strong>ITM</strong> — it saves you money right now. If the fare is exactly ₹500, you're <strong>ATM</strong> — breakeven, no advantage yet. If the fare has dropped to ₹380, your ticket is <strong>OTM</strong> — it's actually cheaper to just buy at the counter.
      </Analogy>

      <Divider />
      <h3>Three Nifty examples — April 2026</h3>
      <p style={{fontSize:'14px',color:'var(--text2)',marginBottom:'1rem'}}>Nifty is trading at approximately <strong style={{color:'var(--text)',fontWeight:600}}>24,400</strong>. Same market price, three different strikes — three different zones.</p>

      <Scenario type="win" label="Scenario 1 — 24,000 CE · Call option · ITM">
        Market (24,400) is above strike (24,000). The call is <strong className="g">ITM</strong>. Intrinsic value = 24,400 − 24,000 = <strong className="g">400 points (₹26,000 per lot)</strong>. You are already in profit territory.
      </Scenario>
      <Scenario type="flat" label="Scenario 2 — 24,400 CE · Call option · ATM">
        Market (24,400) equals strike (24,400). The call is <strong>ATM</strong>. Intrinsic value = ₹0, but this strike is the most reactive to any Nifty move from here. It is where the highest volume and open interest cluster on the option chain.
      </Scenario>
      <Scenario type="lose" label="Scenario 3 — 24,800 CE · Call option · OTM">
        Market (24,400) is below strike (24,800). The call is <strong className="r">OTM</strong>. Nifty must climb 400 more points just to reach intrinsic value. Cheap premium, but lower probability of finishing profitable.
      </Scenario>

      <div className="card" style={{marginTop:'1rem'}}>
        <div className="card-title">The same logic — flipped — for puts</div>
        <p style={{marginBottom:'10px'}}>With Nifty at 24,400: the 24,800 PE is ITM (market below strike), the 24,400 PE is ATM, and the 24,000 PE is OTM. The direction simply reverses because puts profit from falls, not rises.</p>
        <div className="metric-row">
          <Metric label="24,800 PE" val="ITM" color="green" />
          <Metric label="24,400 PE" val="ATM" color="gold" />
          <Metric label="24,000 PE" val="OTM" color="red" />
        </div>
      </div>

      <Divider />
      <h3>The live explorer</h3>
      <p style={{fontSize:'14px',color:'var(--text2)',marginBottom:'1rem'}}>Drag both sliders to see moneyness update live for calls and puts simultaneously.</p>
      <div className="calc-box">
        <MoneynessTool />
      </div>

      <Divider />
      <h3>Why moneyness matters when choosing a strike</h3>
      <div className="card">
        <div className="card-title">ITM — safer but expensive</div>
        <p>You are paying for intrinsic value that already exists. The option behaves more like the underlying itself. Lower risk of total loss, but requires more capital upfront.</p>
      </div>
      <div className="card">
        <div className="card-title">ATM — the most actively traded</div>
        <p>No intrinsic value, but the highest sensitivity to price movement. On any Nifty option chain, the ATM strike almost always has the highest open interest and trading volume. Most professional traders focus their activity here.</p>
      </div>
      <div className="card">
        <div className="card-title">OTM — cheap but high risk</div>
        <p>Low premium makes these attractive to beginners. But the market must move significantly in your direction just to reach breakeven. Statistically, most OTM options expire at zero. They suit directional bets where you expect a large, fast move.</p>
      </div>

      <div className="card" style={{marginTop:'0.5rem',background:'rgba(26,86,219,0.04)',borderColor:'rgba(26,86,219,0.15)'}}>
        <div className="card-title" style={{fontSize:'12px',textTransform:'uppercase',letterSpacing:'0.06em',color:'var(--blue)'}}>What to look for on a real Nifty option chain</div>
        <p>Open the Nifty option chain on NSE or any broker platform. The strike with the highest open interest (OI) on both the call and put side is almost always the ATM strike. Strikes above it on the call side and below it on the put side are OTM — they cost less. The opposite strikes are ITM and cost more. This is the map you will read every trading day.</p>
      </div>
    </>
  )
}

function MoneynessTool() {
  const [mkt, setMkt] = React.useState(24400)
  const [str, setStr] = React.useState(24400)
  const diff = mkt - str
  const tol = 50
  const callZone = diff > tol ? 'ITM' : diff < -tol ? 'OTM' : 'ATM'
  const putZone  = diff > tol ? 'OTM' : diff < -tol ? 'ITM' : 'ATM'
  const zoneColor = (z) => z === 'ITM' ? 'var(--teal)' : z === 'OTM' ? 'var(--red)' : 'var(--amber)'
  const callIV = Math.max(0, mkt - str)
  const putIV  = Math.max(0, str - mkt)
  return (
    <>
      <div className="slider-row">
        <label>Nifty market price</label>
        <input type="range" min="22000" max="26000" step="50" value={mkt} onChange={e => setMkt(+e.target.value)} />
        <span className="sval">{mkt.toLocaleString('en-IN')}</span>
      </div>
      <div className="slider-row">
        <label>Strike price</label>
        <input type="range" min="22000" max="26000" step="50" value={str} onChange={e => setStr(+e.target.value)} />
        <span className="sval">{str.toLocaleString('en-IN')}</span>
      </div>
      <div className="result-row">
        <div className="result-box">
          <div className="rl">Difference</div>
          <div className="rv" style={{color: diff > 0 ? 'var(--teal)' : diff < 0 ? 'var(--red)' : 'var(--text)'}}>
            {diff >= 0 ? '+' : ''}{diff.toLocaleString('en-IN')}
          </div>
        </div>
        <div className="result-box">
          <div className="rl">Call status</div>
          <div className="rv" style={{color: zoneColor(callZone)}}>{callZone}</div>
        </div>
        <div className="result-box">
          <div className="rl">Put status</div>
          <div className="rv" style={{color: zoneColor(putZone)}}>{putZone}</div>
        </div>
        <div className="result-box">
          <div className="rl">Call intr. value</div>
          <div className="rv" style={{color: callIV > 0 ? 'var(--teal)' : 'var(--text)'}}>
            {callIV > 0 ? '+' : ''}₹{callIV}
          </div>
        </div>
        <div className="result-box">
          <div className="rl">Put intr. value</div>
          <div className="rv" style={{color: putIV > 0 ? 'var(--teal)' : 'var(--text)'}}>
            {putIV > 0 ? '+' : ''}₹{putIV}
          </div>
        </div>
      </div>
    </>
  )
}

function Page09() {
  const [greek, setGreek] = React.useState('overview')

  const greekTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'delta',    label: 'Delta' },
    { id: 'theta',    label: 'Theta' },
    { id: 'vega',     label: 'Vega' },
    { id: 'gamma',    label: 'Gamma' },
  ]

  return (
    <>
      <div className="page-title">Option Greeks</div>
      <div className="page-sub">The four forces that govern every option's price every second.</div>

      <div className="greek-tabs">
        {greekTabs.map(t => (
          <button
            key={t.id}
            className={`greek-tab ${greek === t.id ? 'active' : ''}`}
            onClick={() => setGreek(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {greek === 'overview' && <GreekOverview />}
      {greek === 'delta'    && <GreekDelta />}
      {greek === 'theta'    && <GreekTheta />}
      {greek === 'vega'     && <GreekVega />}
      {greek === 'gamma'    && <GreekGamma />}
    </>
  )
}

function GreekOverview() {
  return (
    <>
      <div className="card">
        <div className="card-title">What are the Greeks?</div>
        <p>When you buy or sell an option, its price doesn't just depend on where Nifty is right now. It changes every second based on four hidden forces — each measured by a Greek letter. Understanding them is the difference between trading options and truly understanding options.</p>
      </div>

      <div className="greek-overview-grid">
        <div className="greek-card greek-delta">
          <div className="greek-symbol">Δ</div>
          <div className="greek-name">Delta</div>
          <div className="greek-one-line">How much the option moves per 1-point Nifty move</div>
          <div className="greek-range">Calls: 0 to +1 · Puts: −1 to 0</div>
        </div>
        <div className="greek-card greek-theta">
          <div className="greek-symbol">Θ</div>
          <div className="greek-name">Theta</div>
          <div className="greek-one-line">How much value the option loses per day, just from time passing</div>
          <div className="greek-range">Always negative for buyers</div>
        </div>
        <div className="greek-card greek-vega">
          <div className="greek-symbol">V</div>
          <div className="greek-name">Vega</div>
          <div className="greek-one-line">How much the option changes per 1% change in implied volatility</div>
          <div className="greek-range">Always positive for buyers</div>
        </div>
        <div className="greek-card greek-gamma">
          <div className="greek-symbol">Γ</div>
          <div className="greek-name">Gamma</div>
          <div className="greek-one-line">How fast Delta itself is changing as Nifty moves</div>
          <div className="greek-range">Highest at ATM, dangerous near expiry</div>
        </div>
      </div>

      <Analogy>
        Think of an option like a car journey. <strong>Delta</strong> is your speed — how fast your P&L moves with Nifty. <strong>Gamma</strong> is your acceleration — how quickly your speed is changing. <strong>Theta</strong> is the fuel burning out of your tank every day whether you move or not. <strong>Vega</strong> is the effect of road conditions — when volatility spikes, your option inflates in value even if Nifty hasn't moved.
      </Analogy>

      <Divider />
      <h3>Who benefits from each Greek?</h3>
      <div className="grid2">
        <div className="card">
          <div className="card-title">Option buyers want</div>
          <div className="pill-row" style={{flexDirection:'column',gap:'6px',marginTop:'6px'}}>
            <span className="pill">High Delta — so price moves translate quickly to profit</span>
            <span className="pill">High Gamma — so Delta keeps growing as Nifty moves their way</span>
            <span className="pill">High Vega — a volatility spike inflates their premium</span>
            <span className="pill">Low Theta — slow time decay, more time to be right</span>
          </div>
        </div>
        <div className="card">
          <div className="card-title">Option sellers want</div>
          <div className="pill-row" style={{flexDirection:'column',gap:'6px',marginTop:'6px'}}>
            <span className="pill">Low Delta — small Nifty moves don't hurt them much</span>
            <span className="pill">Low Gamma — Delta stays stable, no nasty surprises</span>
            <span className="pill">Low Vega — a volatility collapse shrinks the premium they sold</span>
            <span className="pill">High Theta — time decay works in their favour every day</span>
          </div>
        </div>
      </div>
    </>
  )
}

function DeltaCalc() {
  const [delta, setDelta] = React.useState(0.5)
  const [niftyMove, setNiftyMove] = React.useState(100)
  const optionMove = Math.round(delta * niftyMove)
  const lotPnl = optionMove * 65
  return (
    <>
      <div className="slider-row">
        <label>Delta value</label>
        <input type="range" min="0.05" max="0.95" step="0.05" value={delta}
          onChange={e => setDelta(parseFloat(e.target.value))} />
        <span className="sval">{delta.toFixed(2)}</span>
      </div>
      <div className="slider-row">
        <label>Nifty move (pts)</label>
        <input type="range" min="-300" max="300" step="25" value={niftyMove}
          onChange={e => setNiftyMove(+e.target.value)} />
        <span className="sval">{niftyMove > 0 ? `+\${niftyMove}` : niftyMove}</span>
      </div>
      <div className="result-row">
        <div className="result-box">
          <div className="rl">Nifty move</div>
          <div className="rv" style={{color: niftyMove >= 0 ? 'var(--teal)' : 'var(--red)'}}>
            {niftyMove >= 0 ? `+\${niftyMove}` : niftyMove} pts
          </div>
        </div>
        <div className="result-box">
          <div className="rl">Option moves</div>
          <div className="rv" style={{color: optionMove >= 0 ? 'var(--teal)' : 'var(--red)'}}>
            {optionMove >= 0 ? `+\${optionMove}` : optionMove} pts
          </div>
        </div>
        <div className="result-box">
          <div className="rl">Lot P&L</div>
          <div className="rv" style={{color: lotPnl >= 0 ? 'var(--teal)' : 'var(--red)'}}>
            {lotPnl >= 0 ? `+₹\${lotPnl.toLocaleString('en-IN')}` : `−₹\${Math.abs(lotPnl).toLocaleString('en-IN')}`}
          </div>
        </div>
      </div>
    </>
  )
}

function GreekDelta() {
  return (
    <>
      <div className="card">
        <div className="card-title">Delta — the speed of your option</div>
        <p>Delta measures how much an option's price moves for every 1-point change in Nifty. A delta of 0.5 means if Nifty moves 100 points, your option moves approximately 50 points. It is the most important Greek for understanding day-to-day P&L.</p>
      </div>

      <div className="grid2">
        <div className="card" style={{borderColor:'rgba(26,127,75,0.2)',background:'rgba(26,127,75,0.04)'}}>
          <Tag type="call">Call options</Tag>
          <div className="card-title">Delta: 0 to +1</div>
          <div className="metric-row">
            <Metric label="Deep ITM" val="≈ 1.0" color="green" />
            <Metric label="ATM" val="≈ 0.5" color="gold" />
            <Metric label="Deep OTM" val="≈ 0.0" color="red" />
          </div>
          <p style={{fontSize:'13px',marginTop:'10px'}}>A deep ITM call moves almost exactly like Nifty itself. A deep OTM call barely reacts to price moves.</p>
        </div>
        <div className="card" style={{borderColor:'rgba(192,57,43,0.2)',background:'rgba(192,57,43,0.04)'}}>
          <Tag type="put">Put options</Tag>
          <div className="card-title">Delta: −1 to 0</div>
          <div className="metric-row">
            <Metric label="Deep ITM" val="≈ −1.0" color="red" />
            <Metric label="ATM" val="≈ −0.5" color="gold" />
            <Metric label="Deep OTM" val="≈ 0.0" color="red" />
          </div>
          <p style={{fontSize:'13px',marginTop:'10px'}}>Negative because puts gain value when Nifty falls. A −0.5 delta put gains 50 points for every 100-point Nifty drop.</p>
        </div>
      </div>

      <Analogy>
        Delta is like a car's speedometer. If your delta is 0.5, you're travelling at half the speed of Nifty. Deep ITM options have delta near 1 — they move almost point-for-point with the index. Deep OTM options have delta near 0 — they barely move at all until the market gets close to their strike.
      </Analogy>

      <Divider />
      <h3>Nifty example — April 2026</h3>
      <div className="card">
        <p>Nifty is at <strong style={{color:'var(--text)',fontWeight:600}}>24,400</strong>. You hold the 24,400 CE (ATM call), which has a delta of approximately <strong style={{color:'var(--text)',fontWeight:600}}>0.50</strong>. The option is trading at ₹150.</p>
        <Scenario type="win" label="Nifty jumps 200 points to 24,600">
          Option moves: 0.50 × 200 = <strong className="g">+100 points</strong>. New option price ≈ ₹250. Lot P&L = +₹6,500.
        </Scenario>
        <Scenario type="lose" label="Nifty falls 200 points to 24,200">
          Option moves: 0.50 × (−200) = <strong className="r">−100 points</strong>. New option price ≈ ₹50. Lot P&L = −₹6,500.
        </Scenario>
      </div>

      <Divider />
      <h3>Interactive delta calculator</h3>
      <p style={{fontSize:'14px',color:'var(--text2)',marginBottom:'1rem'}}>Adjust the delta and Nifty move to see the option's price change and lot P&L.</p>
      <div className="calc-box">
        <DeltaCalc />
      </div>

      <Divider />
      <h3>Key things to remember about Delta</h3>
      <div className="card">
        <div className="pill-row" style={{flexDirection:'column',alignItems:'flex-start',gap:'6px'}}>
          <span className="pill">ATM options always have delta ≈ 0.5 for calls, ≈ −0.5 for puts</span>
          <span className="pill">Delta increases as the option moves deeper ITM</span>
          <span className="pill">Delta decreases as the option moves further OTM</span>
          <span className="pill">A delta of 0.5 also means roughly a 50% chance of expiring ITM</span>
          <span className="pill">Put delta + Call delta (same strike) always sum to approximately 1</span>
        </div>
      </div>
    </>
  )
}

function ThetaCalc() {
  const [days, setDays] = React.useState(20)
  const [theta, setTheta] = React.useState(5)
  const [startPremium, setStartPremium] = React.useState(150)
  const decayed = Math.max(0, startPremium - theta * days)
  const pct = ((startPremium - decayed) / startPremium * 100).toFixed(0)
  return (
    <>
      <div className="slider-row">
        <label>Starting premium (₹)</label>
        <input type="range" min="50" max="500" step="10" value={startPremium}
          onChange={e => setStartPremium(+e.target.value)} />
        <span className="sval">₹{startPremium}</span>
      </div>
      <div className="slider-row">
        <label>Daily Theta (₹/day)</label>
        <input type="range" min="1" max="30" step="1" value={theta}
          onChange={e => setTheta(+e.target.value)} />
        <span className="sval">₹{theta}</span>
      </div>
      <div className="slider-row">
        <label>Days elapsed</label>
        <input type="range" min="0" max="30" step="1" value={days}
          onChange={e => setDays(+e.target.value)} />
        <span className="sval">{days}d</span>
      </div>
      <div className="result-row">
        <div className="result-box">
          <div className="rl">Premium paid</div>
          <div className="rv">₹{startPremium}</div>
        </div>
        <div className="result-box">
          <div className="rl">Remaining value</div>
          <div className="rv" style={{color: decayed < startPremium * 0.4 ? 'var(--red)' : 'var(--teal)'}}>
            ₹{Math.round(decayed)}
          </div>
        </div>
        <div className="result-box">
          <div className="rl">Decayed away</div>
          <div className="rv" style={{color:'var(--red)'}}>−₹{Math.round(startPremium - decayed)} ({pct}%)</div>
        </div>
      </div>
    </>
  )
}

function GreekTheta() {
  return (
    <>
      <div className="card">
        <div className="card-title">Theta — the silent cost of holding time</div>
        <p>Every option loses value with each passing day, even if Nifty doesn't move at all. This daily erosion is measured by Theta. If an option has Theta of −5, it loses approximately ₹5 per unit per day from time decay alone. Theta is the enemy of option buyers and the friend of option sellers.</p>
      </div>

      <div className="grid2">
        <div className="card" style={{borderColor:'rgba(192,57,43,0.2)',background:'rgba(192,57,43,0.04)'}}>
          <Tag type="put">For buyers</Tag>
          <div className="card-title">Theta hurts you</div>
          <p>Every day that passes without Nifty moving your way, your premium shrinks. You are fighting against the clock. The longer you hold, the more time value bleeds out.</p>
          <div className="metric-row" style={{marginTop:'10px'}}>
            <Metric label="Theta effect" val="Negative" color="red" />
            <Metric label="Time passing" val="Hurts" color="red" />
          </div>
        </div>
        <div className="card" style={{borderColor:'rgba(26,127,75,0.2)',background:'rgba(26,127,75,0.04)'}}>
          <Tag type="call">For sellers</Tag>
          <div className="card-title">Theta works for you</div>
          <p>You collected the premium upfront. Every day that passes without the market moving against you, the option you sold is worth less — and you keep more of the premium as profit.</p>
          <div className="metric-row" style={{marginTop:'10px'}}>
            <Metric label="Theta effect" val="Positive" color="green" />
            <Metric label="Time passing" val="Helps" color="green" />
          </div>
        </div>
      </div>

      <Analogy>
        Theta is like a melting ice cube. The moment you buy an option, you hold a block of ice (your premium) that starts melting immediately. The heat is time. The closer you get to expiry, the faster it melts — the last few days before expiry, time decay accelerates sharply. Option sellers are the ones selling you the ice cube, and they benefit as it melts.
      </Analogy>

      <Divider />
      <h3>Nifty example — April 2026</h3>
      <div className="card">
        <p>You buy the 24,400 CE with 20 days to expiry. Premium is ₹150 per unit. Theta is approximately <strong style={{color:'var(--text)',fontWeight:600}}>−₹5 per day</strong> (lot = 65 units, so −₹325/day per lot).</p>
        <Scenario type="lose" label="After 10 days — Nifty still at 24,400">
          10 × ₹5 = <strong className="r">₹50 decayed away</strong>. Premium now ≈ ₹100. You've lost ₹3,250 per lot just from time — even though Nifty hasn't moved.
        </Scenario>
        <Scenario type="lose" label="Final 3 days — Theta accelerates">
          Theta near expiry is often 2 to 3 times higher. Premium can drop from ₹30 to near zero in the last 3 days. This is when time decay becomes a cliff, not a slope.
        </Scenario>
      </div>

      <Divider />
      <h3>Interactive Theta decay calculator</h3>
      <p style={{fontSize:'14px',color:'var(--text2)',marginBottom:'1rem'}}>See how time decay erodes your premium as days pass (simplified linear model — real decay accelerates near expiry).</p>
      <div className="calc-box">
        <ThetaCalc />
      </div>

      <Divider />
      <h3>Key things to remember about Theta</h3>
      <div className="card">
        <div className="pill-row" style={{flexDirection:'column',alignItems:'flex-start',gap:'6px'}}>
          <span className="pill">ATM options have the highest Theta — the most time value to decay</span>
          <span className="pill">Deep ITM and OTM options have lower Theta</span>
          <span className="pill">Theta accelerates sharply in the last 5 to 7 days before expiry</span>
          <span className="pill">Sellers of weekly/monthly options benefit most from Theta</span>
          <span className="pill">Buying options just before expiry is extremely risky — Theta is brutal</span>
        </div>
      </div>
    </>
  )
}

function GreekVega() {
  const [iv, setIv] = React.useState(15)
  const [vega, setVega] = React.useState(0.5)
  const baseIV = 15
  const ivChange = iv - baseIV
  const premiumChange = (vega * ivChange).toFixed(1)
  const lotChange = Math.round(vega * ivChange * 65)
  return (
    <>
      <div className="card">
        <div className="card-title">Vega — the volatility multiplier</div>
        <p>Vega measures how much an option's price changes for every 1% change in implied volatility (IV). When markets become uncertain and IV spikes — like during a geopolitical event or RBI announcement — option premiums inflate even if Nifty doesn't move. Vega is why options can get expensive just before major events.</p>
      </div>

      <div className="grid2">
        <div className="card" style={{borderColor:'rgba(26,127,75,0.2)',background:'rgba(26,127,75,0.04)'}}>
          <Tag type="call">IV rises</Tag>
          <div className="card-title">Premiums inflate — buyers benefit</div>
          <p>When IV rises (panic, uncertainty, event risk), all options become more expensive. If you already hold an option, its value increases even if Nifty hasn't moved. This is called a Vega gain.</p>
          <div className="metric-row" style={{marginTop:'10px'}}>
            <Metric label="IV ↑" val="Premium ↑" color="green" />
            <Metric label="Good for" val="Buyers" color="green" />
          </div>
        </div>
        <div className="card" style={{borderColor:'rgba(192,57,43,0.2)',background:'rgba(192,57,43,0.04)'}}>
          <Tag type="put">IV falls</Tag>
          <div className="card-title">Premiums collapse — sellers benefit</div>
          <p>When IV falls (calm markets, post-event), premiums shrink. Option sellers collect this collapse. This is why selling options just after a big event can be profitable even if Nifty barely moves.</p>
          <div className="metric-row" style={{marginTop:'10px'}}>
            <Metric label="IV ↓" val="Premium ↓" color="red" />
            <Metric label="Good for" val="Sellers" color="green" />
          </div>
        </div>
      </div>

      <Analogy>
        Think of Vega like the price of an umbrella. On a sunny day, umbrellas are cheap — no one is worried. But the moment weather forecasts show a storm approaching, umbrella prices spike. The storm hasn't hit yet, but the uncertainty alone inflates the price. Options work the same way — when markets fear a big move, IV rises and all options get more expensive, even before anything actually happens.
      </Analogy>

      <Divider />
      <h3>Nifty example — April 2026</h3>
      <div className="card">
        <p>You hold the 24,400 CE with Vega of <strong style={{color:'var(--text)',fontWeight:600}}>0.5</strong>. The premium is ₹150. India VIX is at 15.</p>
        <Scenario type="win" label="RBI policy day — VIX spikes from 15% to 20%">
          Vega gain = 0.5 × (+5) = <strong className="g">+2.5 points per unit</strong>. Premium rises from ₹150 to ₹152.5. Lot P&L = +₹162 — without Nifty moving at all.
        </Scenario>
        <Scenario type="lose" label="After the event — VIX collapses from 20% to 14%">
          Vega loss = 0.5 × (−6) = <strong className="r">−3 points per unit</strong>. Premium shrinks even if Nifty moved in your direction. Post-event IV crush is a common trap for option buyers.
        </Scenario>
      </div>

      <Divider />
      <h3>Interactive Vega calculator</h3>
      <p style={{fontSize:'14px',color:'var(--text2)',marginBottom:'1rem'}}>Base IV is 15%. Drag to change implied volatility and see the premium impact (Vega = 0.5 per 1% IV change).</p>
      <div className="calc-box">
        <div className="slider-row">
          <label>Implied volatility (%)</label>
          <input type="range" min="8" max="35" step="0.5" value={iv}
            onChange={e => setIv(parseFloat(e.target.value))} />
          <span className="sval">{iv.toFixed(1)}%</span>
        </div>
        <div className="slider-row">
          <label>Vega</label>
          <input type="range" min="0.1" max="2" step="0.1" value={vega}
            onChange={e => setVega(parseFloat(e.target.value))} />
          <span className="sval">{vega.toFixed(1)}</span>
        </div>
        <div className="result-row">
          <div className="result-box">
            <div className="rl">IV change</div>
            <div className="rv" style={{color: ivChange >= 0 ? 'var(--teal)' : 'var(--red)'}}>
              {ivChange >= 0 ? `+\${ivChange.toFixed(1)}` : ivChange.toFixed(1)}%
            </div>
          </div>
          <div className="result-box">
            <div className="rl">Premium change</div>
            <div className="rv" style={{color: parseFloat(premiumChange) >= 0 ? 'var(--teal)' : 'var(--red)'}}>
              {parseFloat(premiumChange) >= 0 ? `+₹\${premiumChange}` : `−₹\${Math.abs(parseFloat(premiumChange)).toFixed(1)}`}
            </div>
          </div>
          <div className="result-box">
            <div className="rl">Lot P&L</div>
            <div className="rv" style={{color: lotChange >= 0 ? 'var(--teal)' : 'var(--red)'}}>
              {lotChange >= 0 ? `+₹\${lotChange.toLocaleString('en-IN')}` : `−₹\${Math.abs(lotChange).toLocaleString('en-IN')}`}
            </div>
          </div>
        </div>
      </div>

      <Divider />
      <h3>Key things to remember about Vega</h3>
      <div className="card">
        <div className="pill-row" style={{flexDirection:'column',alignItems:'flex-start',gap:'6px'}}>
          <span className="pill">ATM options have the highest Vega — most sensitive to IV changes</span>
          <span className="pill">Long options (buyers) have positive Vega — IV rise helps them</span>
          <span className="pill">Short options (sellers) have negative Vega — IV rise hurts them</span>
          <span className="pill">Never buy options just before a major event expecting a big move — IV is already inflated</span>
          <span className="pill">After an event, IV typically collapses — this can wipe out option buyers even if they called the direction right</span>
        </div>
      </div>
    </>
  )
}

function GreekGamma() {
  return (
    <>
      <div className="card">
        <div className="card-title">Gamma — the rate of change of Delta</div>
        <p>Gamma measures how quickly Delta itself changes as Nifty moves. If Delta is your speed, Gamma is your acceleration. A high Gamma means your Delta is changing rapidly with every Nifty point — which can work powerfully in your favour as a buyer, or dangerously against you as a seller.</p>
      </div>

      <div className="grid2">
        <div className="card" style={{borderColor:'rgba(26,127,75,0.2)',background:'rgba(26,127,75,0.04)'}}>
          <Tag type="call">For buyers</Tag>
          <div className="card-title">Gamma accelerates your gains</div>
          <p>As Nifty moves in your direction, your Delta increases — which means each additional point Nifty moves earns you more than the last. This compounding effect is Gamma working for you.</p>
          <div className="metric-row" style={{marginTop:'10px'}}>
            <Metric label="Gamma" val="Positive" color="green" />
            <Metric label="Effect" val="Gains compound" color="green" />
          </div>
        </div>
        <div className="card" style={{borderColor:'rgba(192,57,43,0.2)',background:'rgba(192,57,43,0.04)'}}>
          <Tag type="put">For sellers</Tag>
          <div className="card-title">Gamma accelerates your losses</div>
          <p>As Nifty moves against you, your Delta increases in the wrong direction — each additional point costs you more than the last. Gamma is the primary risk that makes selling options dangerous during sharp moves.</p>
          <div className="metric-row" style={{marginTop:'10px'}}>
            <Metric label="Gamma" val="Negative" color="red" />
            <Metric label="Effect" val="Losses compound" color="red" />
          </div>
        </div>
      </div>

      <Analogy>
        Imagine you are driving and Delta is your current speed. Gamma is the accelerator pedal. For a buyer, as Nifty moves your way, it's like someone pressing the accelerator harder — each point you gain comes faster and earns more. For a seller, it's the opposite: a big adverse move is like the brakes failing — you keep accelerating into losses. This is why sharp, fast Nifty moves are particularly dangerous for option sellers.
      </Analogy>

      <Divider />
      <h3>Nifty example — April 2026</h3>
      <div className="card">
        <p>Nifty at <strong style={{color:'var(--text)',fontWeight:600}}>24,400</strong>. You hold the 24,400 CE (ATM). Delta = 0.50, Gamma = 0.003.</p>
        <Scenario type="win" label="Nifty moves to 24,500 (+100 points)">
          Delta increases by: 0.003 × 100 = <strong className="g">+0.30</strong>. New Delta ≈ 0.80. The option now moves 80 points for every 100-point Nifty rise — faster than before.
        </Scenario>
        <Scenario type="lose" label="Nifty moves to 24,300 (−100 points)">
          Delta decreases by: 0.003 × 100 = <strong className="r">−0.30</strong>. New Delta ≈ 0.20. The option now moves only 20 points per 100-point Nifty move — your position is losing momentum.
        </Scenario>
      </div>

      <Divider />
      <h3>Where is Gamma highest?</h3>
      <div className="card">
        <p style={{marginBottom:'12px'}}>Gamma is always highest for <strong style={{color:'var(--text)',fontWeight:600}}>ATM options</strong>, and it becomes extremely high in the final days before expiry. This is why:</p>
        <div className="metric-row">
          <Metric label="Deep ITM" val="Low Gamma" />
          <Metric label="ATM" val="Highest Gamma" color="blue" />
          <Metric label="Deep OTM" val="Low Gamma" />
        </div>
        <p style={{fontSize:'13px',marginTop:'12px',color:'var(--text2)'}}>Near expiry, ATM Gamma explodes. A 50-point Nifty swing on expiry day can swing an ATM option from worthless to ₹50 instantly. This is why expiry day is called Gamma day by experienced traders — and why selling ATM options on expiry day carries extreme risk.</p>
      </div>

      <Divider />
      <h3>Key things to remember about Gamma</h3>
      <div className="card">
        <div className="pill-row" style={{flexDirection:'column',alignItems:'flex-start',gap:'6px'}}>
          <span className="pill">Gamma is highest at ATM and near expiry</span>
          <span className="pill">Buyers benefit from Gamma — gains compound as the market moves their way</span>
          <span className="pill">Sellers fear Gamma — losses compound during sharp moves</span>
          <span className="pill">Selling ATM options on expiry day (Gamma day) is extremely high risk</span>
          <span className="pill">Gamma and Theta are opposites — high Gamma comes with high Theta cost for buyers</span>
        </div>
      </div>
    </>
  )
}


const PAGES = [Page01, Page02, Page03, Page04, Page05, Page06, Page07, Page08, Page09]

export default function App() {
  const [active, setActive] = useState(0)
  React.useEffect(() => { window._oa_nav = setActive; return () => { delete window._oa_nav; }; }, [setActive])
  const [chatOpen, setChatOpen] = useState(false)
  const Page = PAGES[active]
  const progress = ((active + 1) / PAGES.length) * 100

  return (
    <div className="app">
      <header style={{position:'fixed',top:0,left:0,right:0,width:'100%',height:'56px',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 2rem',background:'rgba(245,245,247,0.96)',backdropFilter:'blur(20px) saturate(180%)',WebkitBackdropFilter:'blur(20px) saturate(180%)',borderBottom:'1px solid rgba(0,0,0,0.08)',boxShadow:'0 1px 0 rgba(0,0,0,0.06)'}}>
        <span className="logo">Options <span>Academy</span></span>
        <span className="header-byline">by Shriansh Jena</span>
      </header>

      <div className="hero">
        <div className="hero-eyebrow">A structured guide to options trading</div>
        <h1>Learn options trading<br />from <em>absolute zero</em></h1>
        <p className="hero-sub">No jargon, no overwhelm. Clear concepts, Indian market context — built so the ideas actually stick.</p>
        <div className="hero-pills">
          <span className="hero-pill">Calls &amp; Puts</span>
          <span className="hero-pill">Buying &amp; Selling</span>
          <span className="hero-pill">Interactive Calculators</span>
          <span className="hero-pill">₹ Examples</span>
        </div>
      </div>

      <main className="content">
        <nav className="chapter-nav">
          {CHAPTERS.map((ch, i) => (
            <button key={i} className={`ch-btn ${active === i ? 'active' : ''}`} onClick={() => setActive(i)}>
              <span className="ch-num">{ch.num}</span>
              <span className="ch-label">{ch.label}</span>
            </button>
          ))}
        </nav>

        <div className="progress-bar">
          <div className="progress-fill" style={{width:`${progress}%`}} />
        </div>

        <Page />

        <div style={{display:'flex', justifyContent:'space-between', marginTop:'2.5rem', gap:'8px'}}>
          {active > 0 && (
            <button className="nav-btn" onClick={() => setActive(a => a - 1)}>
              ← {CHAPTERS[active - 1].label}
            </button>
          )}
          <div style={{flex:1}} />
          {active < CHAPTERS.length - 1 && (
            <button className="nav-btn" onClick={() => setActive(a => a + 1)}>
              {CHAPTERS[active + 1].label} →
            </button>
          )}
        </div>
      </main>

      <footer>
        <div className="footer-top">
          <span className="footer-brand">
            <span className="footer-brand-name">Options <span className="footer-brand-blue">Academy</span></span>
          </span>
          <span className="footer-built">For educational purposes only</span>
        </div>
        <div className="footer-divider" />
        <p className="footer-thanks">
          A heartfelt thank you to <strong>Deepak Singh</strong>, <strong>Sanjay Kumar</strong>, and the entire <strong>Deepsea Finvest</strong> team — for their time, patience, and dedication in teaching and guiding this learning experience. This platform would not exist without you.
        </p>
      </footer>

      <ChatBot onNavigate={setActive} open={chatOpen} onToggle={() => setChatOpen(o => !o)} />
    </div>
  )
}
