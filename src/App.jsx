import { useState } from 'react'

const CHAPTERS = [
  { num: '01', label: 'The Basics' },
  { num: '02', label: 'What is an Option?' },
  { num: '03', label: 'Call Options' },
  { num: '04', label: 'Put Options' },
  { num: '05', label: 'Buying & Selling Calls' },
  { num: '06', label: 'Buying & Selling Puts' },
  { num: '07', label: 'Quick Reference' },
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
        <p>When a company like Reliance Industries or TCS lists on the stock exchange, it divides itself into millions of small pieces called <strong style={{color:'var(--text)',fontWeight:600}}>shares</strong>. Buying a share means you own a tiny fraction of that company. If the company grows, your share is worth more. If it struggles, worth less.</p>
      </div>
      <div className="grid2">
        <div className="card">
          <Tag type="neutral">Price movement</Tag>
          <div className="card-title">Stock at ₹100 today</div>
          <div className="metric-row">
            <Metric label="If it rises to" val="₹120" color="green" />
            <Metric label="Your gain" val="+₹20" color="green" />
          </div>
          <div className="metric-row">
            <Metric label="If it falls to" val="₹80" color="red" />
            <Metric label="Your loss" val="-₹20" color="red" />
          </div>
        </div>
        <div className="card">
          <Tag type="neutral">Key idea</Tag>
          <div className="card-title">Direct exposure</div>
          <p>When you own a stock, every ₹1 move in price directly affects your investment. You have unlimited upside but can lose everything if the stock goes to zero.</p>
        </div>
      </div>
      <Divider />
      <h3>Why options were invented</h3>
      <div className="card">
        <p>Imagine you own 100 shares of a company. You're worried the price might fall in the next 3 months. You could sell your shares — but you'd miss out if the price actually rises. Options were created to solve exactly this kind of problem. They give you <strong style={{color:'var(--text)',fontWeight:600}}>flexibility and control</strong> without forcing you to commit fully.</p>
        <div className="pill-row" style={{marginTop:'12px'}}>
          <span className="pill">Hedge your investments</span>
          <span className="pill">Speculate with less capital</span>
          <span className="pill">Generate extra income</span>
          <span className="pill">Control risk precisely</span>
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
        <div className="gitem"><div className="gt">Strike Price</div><div className="gd">The fixed price at which you can buy or sell the stock. Agreed upfront and never changes during the contract.</div></div>
        <div className="gitem"><div className="gt">Premium</div><div className="gd">The price you pay to buy the option contract. As a buyer, this is your maximum possible loss — nothing more.</div></div>
        <div className="gitem"><div className="gt">Expiry Date</div><div className="gd">The deadline. After this date, the option ceases to exist. In India (2026 onwards), typically the last Tuesday of each month.</div></div>
        <div className="gitem"><div className="gt">Lot Size</div><div className="gd">Options trade in fixed lots — for example, 1 lot of Nifty = 65 units. You cannot buy a fraction of a lot.</div></div>
      </div>
      <Divider />
      <h3>Two types of options</h3>
      <div className="grid2">
        <div className="card call">
          <Tag type="call">Call</Tag>
          <div className="card-title">CALL Option</div>
          <p>Right to <strong style={{color:'var(--text)',fontWeight:600}}>buy</strong> the stock at the strike price. You profit when the price goes <strong style={{color:'var(--teal)',fontWeight:600}}>up</strong>.</p>
        </div>
        <div className="card put">
          <Tag type="put">Put</Tag>
          <div className="card-title">PUT Option</div>
          <p>Right to <strong style={{color:'var(--text)',fontWeight:600}}>sell</strong> the stock at the strike price. You profit when the price goes <strong style={{color:'var(--red)',fontWeight:600}}>down</strong>.</p>
        </div>
      </div>
    </>
  )
}

function Page03() {
  return (
    <>
      <div className="page-title">Call options — betting on a rise</div>
      <div className="page-sub">A call option gives you the right to BUY a stock at a fixed price.</div>
      <div className="card call">
        <Tag type="call">Call Option</Tag>
        <div className="card-title">The simple setup</div>
        <p>You believe Stock XYZ (currently ₹500) will rise in the next month. Instead of buying the actual stock, you buy a <strong style={{color:'var(--teal)',fontWeight:600}}>call option</strong> with a strike price of ₹520, paying a premium of ₹15.</p>
      </div>
      <div className="metric-row">
        <Metric label="Current price" val="₹500" />
        <Metric label="Strike price" val="₹520" color="blue" />
        <Metric label="Premium paid" val="₹15" color="red" />
        <Metric label="Breakeven" val="₹535" color="gold" />
      </div>
      <Analogy>
        You paid ₹15 (premium) for the right to buy at ₹520. So the stock must exceed ₹520 + ₹15 = <strong>₹535</strong> for you to actually profit. Below ₹535, your premium erodes. Above ₹535, every extra rupee is your gain.
      </Analogy>
      <Divider />
      <h3>What happens on expiry day?</h3>
      <Scenario type="win" label="Scenario 1 — Stock rises to ₹580">
        You exercise your right. Buy at ₹520, stock worth ₹580. <strong className="g">Profit = ₹580 − ₹520 − ₹15 = +₹45 per share</strong>
      </Scenario>
      <Scenario type="flat" label="Scenario 2 — Stock stays at ₹510">
        No point buying at ₹520 when market is ₹510. Option expires worthless. You lose only the premium: <strong className="r">−₹15 per share</strong>
      </Scenario>
      <Scenario type="lose" label="Scenario 3 — Stock falls to ₹450">
        Option expires worthless. You walk away. Loss is always capped at premium paid: <strong className="r">−₹15 per share</strong>
      </Scenario>
      <Divider />
      <h3>The key asymmetry</h3>
      <div className="card">
        <div className="pill-row">
          <span className="pill">Max loss = ₹15 (known, fixed)</span>
          <span className="pill">Max profit = unlimited</span>
          <span className="pill">Profit above ₹535</span>
        </div>
        <p style={{marginTop:'10px'}}>This asymmetry is options' core power — you risk a small, known amount (₹15) to gain potentially unlimited upside if the stock surges.</p>
      </div>
    </>
  )
}

function Page04() {
  return (
    <>
      <div className="page-title">Put options — betting on a fall</div>
      <div className="page-sub">A put option gives you the right to SELL a stock at a fixed price.</div>
      <div className="card put">
        <Tag type="put">Put Option</Tag>
        <div className="card-title">The simple setup</div>
        <p>You believe Stock XYZ (currently ₹500) will fall in the next month. You buy a <strong style={{color:'var(--red)',fontWeight:600}}>put option</strong> with a strike price of ₹480, paying a premium of ₹12.</p>
      </div>
      <div className="metric-row">
        <Metric label="Current price" val="₹500" />
        <Metric label="Strike price" val="₹480" color="blue" />
        <Metric label="Premium paid" val="₹12" color="red" />
        <Metric label="Breakeven" val="₹468" color="gold" />
      </div>
      <Analogy>
        You paid ₹12 for the right to sell at ₹480. The stock must fall below ₹480 − ₹12 = <strong>₹468</strong> for you to profit. Every rupee below ₹468 is your gain.
      </Analogy>
      <Divider />
      <h3>What happens on expiry day?</h3>
      <Scenario type="win" label="Scenario 1 — Stock falls to ₹420">
        You exercise your right. Sell at ₹480, stock worth only ₹420. <strong className="g">Profit = ₹480 − ₹420 − ₹12 = +₹48 per share</strong>
      </Scenario>
      <Scenario type="flat" label="Scenario 2 — Stock stays at ₹490">
        No point selling at ₹480 when market is ₹490. Option expires worthless: <strong className="r">−₹12 per share</strong>
      </Scenario>
      <Scenario type="lose" label="Scenario 3 — Stock rises to ₹560">
        Option expires worthless. You lose only the premium: <strong className="r">−₹12 per share</strong>
      </Scenario>
      <Divider />
      <h3>The added use case — insurance</h3>
      <div className="card">
        <div className="pill-row">
          <span className="pill">Max loss = ₹12 (known, fixed)</span>
          <span className="pill">Max profit ≈ strike price</span>
          <span className="pill">Profit below ₹468</span>
        </div>
        <p style={{marginTop:'10px'}}>Puts are also used as <strong style={{color:'var(--text)',fontWeight:600}}>portfolio insurance</strong>. If you already own a stock, a put protects you if prices crash — like a fire insurance policy for your investment.</p>
      </div>
    </>
  )
}

function CallCalc() {
  const [strike, setStrike] = useState(520)
  const [prem, setPrem] = useState(15)
  const [expiry, setExpiry] = useState(560)
  const buyPnl = expiry > strike ? (expiry - strike - prem) : -prem
  const sellPnl = -buyPnl
  return (
    <div className="calc-box">
      <h3>Interactive: call payoff at expiry</h3>
      <div className="slider-row">
        <label>Strike price (₹)</label>
        <input type="range" min="400" max="700" step="1" value={strike} onChange={e=>setStrike(+e.target.value)} />
        <span className="sval">₹{strike}</span>
      </div>
      <div className="slider-row">
        <label>Premium (₹)</label>
        <input type="range" min="5" max="80" step="1" value={prem} onChange={e=>setPrem(+e.target.value)} />
        <span className="sval">₹{prem}</span>
      </div>
      <div className="slider-row">
        <label>Expiry price (₹)</label>
        <input type="range" min="350" max="800" step="1" value={expiry} onChange={e=>setExpiry(+e.target.value)} />
        <span className="sval">₹{expiry}</span>
      </div>
      <div className="result-row">
        <div className="result-box">
          <div className="rl">Buy Call P&L</div>
          <div className={`rv ${buyPnl>=0?'green':'red'}`}>{buyPnl>=0?'+':''}{buyPnl} / share</div>
        </div>
        <div className="result-box">
          <div className="rl">Sell Call P&L</div>
          <div className={`rv ${sellPnl>=0?'green':'red'}`}>{sellPnl>=0?'+':''}{sellPnl} / share</div>
        </div>
        <div className="result-box">
          <div className="rl">Breakeven</div>
          <div className="rv">₹{strike + prem}</div>
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
        <p>You believe the stock will rise sharply. Your risk is limited to the premium. Your reward is theoretically unlimited. You are in control — you decide whether to exercise or not.</p>
        <div className="metric-row" style={{marginTop:'12px'}}>
          <Metric label="Outlook" val="Bullish ↑" color="green" />
          <Metric label="Max loss" val="Premium" color="red" />
          <Metric label="Max gain" val="Unlimited" color="green" />
        </div>
      </div>
      <div className="card sell">
        <Tag type="sell">Sell Call — Short Call</Tag>
        <div className="card-title">You collect premium → you carry the obligation</div>
        <p>You sell someone else a call option and <strong style={{color:'var(--text)',fontWeight:600}}>collect</strong> the premium upfront. But now you are <em>obligated</em> to sell them the stock at the strike price if they exercise. If the stock surges, your loss can be unlimited.</p>
        <div className="metric-row" style={{marginTop:'12px'}}>
          <Metric label="Outlook" val="Bearish / Flat ↓→" color="red" />
          <Metric label="Max gain" val="Premium" color="green" />
          <Metric label="Max loss" val="Unlimited" color="red" />
        </div>
      </div>
      <Divider />
      <CallCalc />
    </>
  )
}

function PutCalc() {
  const [strike, setStrike] = useState(480)
  const [prem, setPrem] = useState(12)
  const [expiry, setExpiry] = useState(430)
  const buyPnl = expiry < strike ? (strike - expiry - prem) : -prem
  const sellPnl = -buyPnl
  return (
    <div className="calc-box">
      <h3>Interactive: put payoff at expiry</h3>
      <div className="slider-row">
        <label>Strike price (₹)</label>
        <input type="range" min="300" max="700" step="1" value={strike} onChange={e=>setStrike(+e.target.value)} />
        <span className="sval">₹{strike}</span>
      </div>
      <div className="slider-row">
        <label>Premium (₹)</label>
        <input type="range" min="5" max="80" step="1" value={prem} onChange={e=>setPrem(+e.target.value)} />
        <span className="sval">₹{prem}</span>
      </div>
      <div className="slider-row">
        <label>Expiry price (₹)</label>
        <input type="range" min="200" max="700" step="1" value={expiry} onChange={e=>setExpiry(+e.target.value)} />
        <span className="sval">₹{expiry}</span>
      </div>
      <div className="result-row">
        <div className="result-box">
          <div className="rl">Buy Put P&L</div>
          <div className={`rv ${buyPnl>=0?'green':'red'}`}>{buyPnl>=0?'+':''}{buyPnl} / share</div>
        </div>
        <div className="result-box">
          <div className="rl">Sell Put P&L</div>
          <div className={`rv ${sellPnl>=0?'green':'red'}`}>{sellPnl>=0?'+':''}{sellPnl} / share</div>
        </div>
        <div className="result-box">
          <div className="rl">Breakeven</div>
          <div className="rv">₹{strike - prem}</div>
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
        <p>You believe the stock will fall. If it crashes, you profit handsomely. If it rises or stays flat, you lose only the premium — a capped, known loss. Puts also serve as portfolio insurance for existing stock positions.</p>
        <div className="metric-row" style={{marginTop:'12px'}}>
          <Metric label="Outlook" val="Bearish ↓" color="red" />
          <Metric label="Max loss" val="Premium" color="red" />
          <Metric label="Max gain" val="Strike − 0" color="green" />
        </div>
      </div>
      <div className="card sell">
        <Tag type="sell">Sell Put — Short Put</Tag>
        <div className="card-title">You collect premium → you carry the obligation to buy</div>
        <p>You sell a put option and collect the premium now. But you are <em>obligated</em> to buy their stock at the strike price if they exercise. If the stock crashes, you're forced to buy at a high price — a potentially large loss.</p>
        <div className="metric-row" style={{marginTop:'12px'}}>
          <Metric label="Outlook" val="Bullish / Flat ↑→" color="green" />
          <Metric label="Max gain" val="Premium" color="green" />
          <Metric label="Max loss" val="Strike × Lots" color="red" />
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
      <div className="page-sub">All four strategies, their risk profiles, and breakeven formulas.</div>
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
              <td className="red">Unlimited</td>
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
      <Divider />
      <h3>The golden rules</h3>
      <div className="card">
        <div className="pill-row" style={{flexDirection:'column', alignItems:'flex-start', gap:'6px'}}>
          <span className="pill">Buyers pay premium. Sellers collect premium.</span>
          <span className="pill">Buyers hold rights. Sellers hold obligations.</span>
          <span className="pill">Call buyers profit when price rises. Put buyers profit when price falls.</span>
          <span className="pill">Buyers have limited, known risk. Sellers can face unlimited risk.</span>
          <span className="pill">Most traders sell the option before expiry — you don't have to wait.</span>
        </div>
      </div>
      <Divider />
      <h3>What's next in your learning journey</h3>
      <div className="next-grid">
        <div className="next-item">ITM / ATM / OTM — what do these mean? <span className="arrow">→</span></div>
        <div className="next-item">Option Greeks — Delta, Theta, Vega, Gamma <span className="arrow">→</span></div>
        <div className="next-item">Time decay and why it hurts buyers <span className="arrow">→</span></div>
        <div className="next-item">Multi-leg strategies — straddles, spreads, strangles <span className="arrow">→</span></div>
      </div>
    </>
  )
}

const PAGES = [Page01, Page02, Page03, Page04, Page05, Page06, Page07]

export default function App() {
  const [active, setActive] = useState(0)
  const Page = PAGES[active]
  const progress = ((active + 1) / PAGES.length) * 100

  return (
    <div className="app">
      <header>
        <span className="logo">Options <span>Academy</span></span>
        <div className="header-right">
          <span className="header-tag">NSE · Indian Markets</span>
          <span className="header-byline">by Shriansh Jena</span>
        </div>
      </header>

      <div className="hero">
        <div className="hero-eyebrow">A structured guide to options trading</div>
        <h1>Learn options trading<br />from <em>absolute zero</em></h1>
        <p className="hero-sub">No jargon, no overwhelm. Clear concepts, real numbers, Indian market context — built so the ideas actually stick.</p>
        <div className="hero-pills">
          <span className="hero-pill">Calls &amp; Puts</span>
          <span className="hero-pill">Buying &amp; Selling</span>
          <span className="hero-pill">Interactive Calculators</span>
          <span className="hero-pill">₹ INR Examples</span>
        </div>
      </div>

      <main className="content">
        <nav className="chapter-nav">
          {CHAPTERS.map((ch, i) => (
            <button key={i} className={`ch-btn ${active===i?'active':''}`} onClick={()=>setActive(i)}>
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
            <button className="nav-btn prev" onClick={()=>setActive(a=>a-1)}>
              ← {CHAPTERS[active-1].label}
            </button>
          )}
          <div style={{flex:1}} />
          {active < CHAPTERS.length-1 && (
            <button className="nav-btn next" onClick={()=>setActive(a=>a+1)}>
              {CHAPTERS[active+1].label} →
            </button>
          )}
        </div>
      </main>

      <footer>
        <p>Options Academy · For educational purposes only</p>
        <p>Built by <strong>Shriansh Jena</strong></p>
      </footer>
    </div>
  )
}
