import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, FileCheck2, ShieldCheck, Landmark, Building2, Layers3, GitBranch, Plus, Minus } from 'lucide-react';
import pages from './service-detail-data.json';
import { ProcessWaves } from './process';
import './service-detail.css';
export const detailPages = pages;
function Copy({ paragraphs }) { return paragraphs.map((text, i) => text.startsWith('• ') ? <ul key={i} className="sd-copy-list">{text.split('\n').filter(Boolean).map(line => <li key={line}>{line.replace(/^• /, '')}</li>)}</ul> : <p key={i}>{text}</p>); }
function Button({ children }) { return <Link className="sd-button" to="/contact">{children}<ArrowRight size={18} aria-hidden="true" /></Link>; }
function Subtitle({ text }) {
  if (!text) return null;
  const parts = text.split(/(?<=[.!?])\s+/);
  if (parts.length >= 2) {
    return <>{parts[0]} <em>{parts.slice(1).join(' ')}</em></>;
  }
  const words = text.split(' ');
  if (words.length > 3) {
    const splitIndex = Math.ceil(words.length / 2);
    return <>{words.slice(0, splitIndex).join(' ')} <em>{words.slice(splitIndex).join(' ')}</em></>;
  }
  return <>{text}</>;
}
function Art({ kind }) {
 return <div className={`sd-art sd-art-${kind}`}>
 {kind === 'banking' ? <img src="/business/banking.png" alt="UAE corporate banking readiness and financial structuring" className="sd-art-img" /> :
 kind === 'residency' ? <img src="/business/visa.png" alt="UAE Golden Visa and residency documentation" className="sd-art-img" /> :
 kind === 'investment' ? <img src="/business/real-estate.png" alt="UAE investment and luxury real estate" className="sd-art-img" /> :
 <img src="/business/family.png" alt="UAE family protection and succession planning" className="sd-art-img" />}
 </div>;
}
function Faqs({ data }) {
  const [open, setOpen] = useState(null);
  const isInvestmentWaves = data.kind === 'investment';
  const isFamilyWaves = data.kind === 'family';
  const hasWaves = isInvestmentWaves || isFamilyWaves;
  return (
    <section className={`sd-faq-wrap ${isInvestmentWaves ? 'sd-investment-faq-waves' : ''} ${isFamilyWaves ? 'sd-family-faq-waves' : ''}`}>
      {hasWaves && <ProcessWaves />}
      <div className="sd-section sd-faq sd-shell">
        <div>
          <p className="sd-eyebrow">YOUR QUESTIONS, CONSIDERED</p>
          <h2>{data.label}<br/><em>Frequently Asked Questions</em></h2>
        </div>
        <div>
          {data.faqs.map((faq, i) => (
            <div className={`sd-faq-item ${open === i ? 'is-open' : ''}`} key={faq.question}>
              <h3>
                <button
                  id={`sd-q-${i}`}
                  aria-expanded={open === i}
                  aria-controls={`sd-a-${i}`}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span>{faq.question}</span>
                  {open === i ? <Minus size={20} /> : <Plus size={20} />}
                </button>
              </h3>
              <div
                id={`sd-a-${i}`}
                className="sd-answer"
                role="region"
                aria-labelledby={`sd-q-${i}`}
                aria-hidden={open !== i}
                inert={open !== i}
              >
                <div>
                  <div className="sd-answer-copy">
                    <Copy paragraphs={faq.answer} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default function ServiceDetailPage({ data }) {
 useEffect(()=>{document.title=`${data.label} — GlowBiz Solutions`;},[data]);
 const icons=data.kind==='investment'?[Building2,Layers3,Landmark]:[FileCheck2,ShieldCheck,Landmark];
 return <main id="main-content" className={`service-complete sd-${data.kind}`}>
 <section className="sd-hero sd-shell"><div className="sd-hero-copy"><Link to="/services" className="sd-back"><ArrowLeft size={15}/>All services</Link><h1 className="sd-hero-title">{data.label}</h1><p className="sd-hero-subtitle"><Subtitle text={data.heading}/></p><div className="sd-intro"><Copy paragraphs={data.intro}/></div><Button>{data.button}</Button></div><Art kind={data.kind}/></section>
 {data.kind!=='family'&&<Help data={data}/>}
  {data.solutions && (
    data.kind === 'family' ? (
      <section className="sd-solutions-wrap sd-family-legacy-waves">
        <ProcessWaves/>
        <div className="sd-shell sd-section sd-family-legacy-redesign">
          <div className="sd-family-header">
            <p className="sd-eyebrow">A CONNECTED LEGACY</p>
            <h2>Key Planning Areas</h2>
            <p className="sd-family-intro">A coherent structure ensures your family, wealth, and commercial interests remain protected across generations.</p>
          </div>
          <div className="sd-family-track-container">
            <div className="sd-family-horizontal-line" aria-hidden="true"/>
            <ol className="sd-family-timeline">
              {data.solutions.map((s, i) => {
                const Icon = icons[i % 3];
                return (
                  <li key={s.title} className="sd-family-step">
                    <div className="sd-family-marker-wrap">
                      <span className="sd-family-badge"><Icon size={18} strokeWidth={2} aria-hidden="true"/></span>
                    </div>
                    <div className="sd-family-card">
                      <span className="sd-family-step-tag">AREA 0{i + 1}</span>
                      <h3>{s.title}</h3>
                      <div className="sd-family-desc"><Copy paragraphs={s.paragraphs}/></div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>
    ) : data.kind === 'investment' ? (
      <section className="sd-solutions-wrap sd-inv-solutions-wrap">
        <div className="sd-section sd-shell sd-inv-solutions-section">
          <div className="sd-inv-header">
            <p className="sd-eyebrow">ADVISORY & COORDINATION</p>
            <h2>Related <em>Solutions</em></h2>
            <p className="sd-inv-lead">
              Property acquisition, workspace structuring, and financing in the UAE are directly connected. We coordinate each element so your setup supports banking readiness and long-term capital objectives.
            </p>
          </div>

          <div className="sd-inv-grid">
            {data.solutions.map((s, i) => {
              const Icon = icons[i % 3];
              const pillarTags = [
                'WORKSPACE & SUBSTANCE',
                'ACQUISITION & PORTFOLIO',
                'FINANCING & LEVERAGE'
              ];
              return (
                <article className="sd-inv-card" key={s.title}>
                  <div className="sd-inv-card-top">
                    <div className="sd-inv-icon-wrap" aria-hidden="true">
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <span className="sd-inv-pillar-tag">{pillarTags[i]}</span>
                  </div>

                  <h3 className="sd-inv-card-title">{s.title}</h3>

                  <div className="sd-inv-card-body">
                    <p className="sd-inv-main-p">{s.paragraphs[0]}</p>

                    {s.paragraphs[1] && (
                      <div className="sd-inv-highlight-box">
                        <span className="sd-inv-highlight-label">
                          <ShieldCheck size={14} className="sd-inv-shield-icon" aria-hidden="true" />
                          STRATEGIC ALIGNMENT
                        </span>
                        <p className="sd-inv-highlight-p">{s.paragraphs[1]}</p>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    ) : data.kind === 'banking' ? (
      <section className="sd-solutions-wrap sd-banking-solutions-wrap">
        <div className="sd-section sd-shell sd-banking-solutions-section">
          <div className="sd-banking-header">
            <p className="sd-eyebrow">ADVISORY & COORDINATION</p>
            <h2>Banking <em>Services</em></h2>
            <p className="sd-banking-lead">
              Institutional account opening and treasury readiness require structural clarity. We coordinate your commercial profile and compliance documentation to ensure credible presentation to UAE banks.
            </p>
          </div>

          <div className="sd-banking-grid">
            {data.solutions.map((s, i) => {
              const bankingIcons = [Landmark, ShieldCheck, FileCheck2];
              const Icon = bankingIcons[i % 3];
              const pillarTags = [
                'ACCOUNT STRUCTURING',
                'KYC & COMPLIANCE',
                'FINANCING & CREDIT'
              ];
              return (
                <article className="sd-banking-card" key={s.title}>
                  <div className="sd-banking-card-top">
                    <div className="sd-banking-icon-wrap" aria-hidden="true">
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <span className="sd-banking-pillar-tag">{pillarTags[i]}</span>
                  </div>

                  <h3 className="sd-banking-card-title">{s.title}</h3>

                  <div className="sd-banking-card-body">
                    <p className="sd-banking-main-p">{s.paragraphs[0]}</p>

                    {s.paragraphs[1] && (
                      <div className="sd-banking-highlight-box">
                        <span className="sd-banking-highlight-label">
                          <ShieldCheck size={14} className="sd-banking-shield-icon" aria-hidden="true" />
                          STRATEGIC ADVANTAGE
                        </span>
                        <p className="sd-banking-highlight-p">{s.paragraphs[1]}</p>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    ) : (
      <section className="sd-solutions-wrap">
        <div className="sd-section sd-shell">
          <p className="sd-eyebrow">ADVISORY & COORDINATION</p>
          <h2>Related Solutions</h2>
          <div className="sd-solutions">
            {data.solutions.map((s, i) => {
              const Icon = icons[i % 3];
              return (
                <article className="sd-solution" key={s.title}>
                  <div className="sd-solution-marker"><Icon size={30} strokeWidth={1.2}/></div>
                  <h3>{s.title}</h3>
                  <div><Copy paragraphs={s.paragraphs}/></div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    )
  )}
 {data.documents&&<section className={`sd-band ${data.kind==='banking'?'sd-banking-band':''}`}><div className="sd-shell sd-section sd-documents"><div><p className="sd-eyebrow">PREPARE A COHERENT PROFILE</p><h2>Typical<br/>Documentation Areas</h2></div><ul>{data.documents.map(item=><li key={item}><Check size={16}/>{item}</li>)}</ul></div></section>}
  {data.service && (
    <>
      <section className="sd-residency-pathway-wrap">
        <div className="sd-residency-service sd-shell sd-section">
          <div className="sd-service-symbol" aria-hidden="true">
            <div />
            <div />
            <div />
          </div>
          <div>
            <p className="sd-eyebrow">YOUR RESIDENCY PATHWAY</p>
            <h2>Visa & Residency Services</h2>
            <Copy paragraphs={data.service} />
          </div>
        </div>
      </section>
      <section className="sd-band sd-benefits-band">
        <div className="sd-shell sd-section sd-benefits-redesign">
          <div className="sd-benefits-header">
            <p className="sd-eyebrow">LONG-TERM STABILITY</p>
            <h2>Why Serious Investors<br /><em>Choose the UAE Golden Visa</em></h2>
            <p className="sd-benefits-intro">{data.benefitIntro}</p>
          </div>
          <div className="sd-benefits-track-container">
            <div className="sd-benefits-horizontal-line" aria-hidden="true" />
            <ol className="sd-benefits-timeline">
              {data.benefits.map(b => (
                <li key={b.title} className="sd-benefit-step">
                  <div className="sd-benefit-marker-wrap">
                    <span className="sd-benefit-badge">
                      <Check size={16} strokeWidth={2.2} aria-hidden="true" />
                    </span>
                  </div>
                  <div className="sd-benefit-card">
                    <h3>{b.title}</h3>
                    <p>{b.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  )}
 {data.considerations&&<><section className="sd-band"><div className="sd-shell sd-section"><p className="sd-eyebrow">BEFORE COMMITTING CAPITAL</p><h2>Key Considerations</h2><ol className="sd-considerations">{data.considerations.map(c=><li key={c}><h3>{c}</h3></li>)}</ol></div></section><section className="sd-shell sd-section sd-returns"><p className="sd-eyebrow">DEFINE YOUR OBJECTIVES</p><h2>Return Expectations</h2><p>{data.returns[0]}</p><div className="sd-balance">{[data.returns[1],data.returns[3],data.returns[2]].map(t=><div key={t}>{t.replace(/^• /,'')}</div>)}</div><p>{data.returns[4]}</p></section></>}
 {data.support&&<><section className="sd-band"><div className="sd-shell sd-section sd-support">{data.support.map((s,i)=><article key={s.title}><p className="sd-eyebrow">{i?'CONTINUITY':'PROTECTION'}</p><h2>{s.title}</h2><Copy paragraphs={s.paragraphs}/></article>)}<span className="sd-support-plus" aria-hidden="true">+</span></div></section><Help data={data}/></>}
 <Faqs key={data.id} data={data}/><section className="sd-final"><div className="sd-shell"><p className="sd-eyebrow">YOUR NEXT STEP</p><h2>{data.cta}</h2><Button>{data.button}</Button></div></section>
 </main>;
}
function Help({ data }) {
  const isBankingWaves = data.kind === 'banking';
  const isResidencyWaves = data.kind === 'residency';
  const isInvestmentWaves = data.kind === 'investment';
  return (
    <section className={`sd-help-wrap ${isBankingWaves ? 'sd-help-with-waves' : ''} ${isResidencyWaves ? 'sd-residency-help-waves' : ''} ${isInvestmentWaves ? 'sd-investment-help-waves' : ''}`}>
      {isBankingWaves && <ProcessWaves />}
      <div className="sd-section sd-shell sd-help">
        <div>
          <p className="sd-eyebrow">A CLEARER WAY FORWARD</p>
          <h2>{data.kind === 'family' ? 'How GlowBiz Supports This Area' : 'What GlowBiz Helps With'}</h2>
        </div>
        <ol>
          {data.help.map(p => (
            <li key={p}>
              <span className="sd-badge"><Check size={16} strokeWidth={2.2}/></span>
              <p>{p}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
