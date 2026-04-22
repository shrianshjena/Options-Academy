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


const PAGES = [Page01, Page02, Page03, Page04, Page05, Page06, Page07, Page08]

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
