import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, FileCheck2, ShieldCheck, Landmark, Building2, Layers3, GitBranch, Plus, Minus } from 'lucide-react';
import pages from './service-detail-data.json';
import { ProcessWaves } from './process';
import './service-detail.css';
export const detailPages = pages;
const number = i => String(i + 1).padStart(2, '0');
function Copy({ paragraphs }) { return paragraphs.map((text, i) => text.startsWith('• ') ? <ul key={i} className="sd-copy-list">{text.split('\n').filter(Boolean).map(line => <li key={line}>{line.replace(/^• /, '')}</li>)}</ul> : <p key={i}>{text}</p>); }
function Button({ children }) { return <Link className="sd-button" to="/contact">{children}<ArrowRight size={18} aria-hidden="true" /></Link>; }
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
 <section className="sd-hero sd-shell"><div className="sd-hero-copy"><Link to="/services" className="sd-back"><ArrowLeft size={15}/>All services</Link><p className="sd-eyebrow">{data.number} — {data.label.toUpperCase()}</p><h1>{data.heading}</h1><div className="sd-intro"><Copy paragraphs={data.intro}/></div><Button>{data.button}</Button></div><Art kind={data.kind}/></section>
 {data.kind!=='family'&&<Help data={data}/>}
 {data.solutions&&<section className={`sd-solutions-wrap ${data.kind==='family'?'sd-family-legacy-waves':''}`}>{data.kind==='family'&&<ProcessWaves />}<div className="sd-section sd-shell"><p className="sd-eyebrow">{data.kind==='family'?'A CONNECTED LEGACY':'ADVISORY & COORDINATION'}</p><h2>{data.kind==='banking'?'Banking Services':data.kind==='investment'?'Related Solutions':'Key Planning Areas'}</h2><div className={`sd-solutions ${data.kind==='family'?'sd-branches':''}`}>{data.solutions.map((s,i)=>{const Icon=icons[i%3];return <article className="sd-solution" key={s.title}><div className="sd-solution-marker"><span>{number(i)}</span><Icon size={30} strokeWidth={1.2}/></div><h3>{s.title}</h3><div><Copy paragraphs={s.paragraphs}/></div></article>})}</div></div></section>}
 {data.documents&&<section className={`sd-band ${data.kind==='banking'?'sd-banking-band':''}`}><div className="sd-shell sd-section sd-documents"><div><p className="sd-eyebrow">PREPARE A COHERENT PROFILE</p><h2>Typical<br/>Documentation Areas</h2></div><ul>{data.documents.map((item,i)=><li key={item}><span>{number(i)}</span><Check size={16}/>{item}</li>)}</ul></div></section>}
 {data.service&&<><section className="sd-residency-pathway-wrap"><div className="sd-residency-service sd-shell sd-section"><div className="sd-service-symbol" aria-hidden="true"><div/><div/><div/></div><div><p className="sd-eyebrow">YOUR RESIDENCY PATHWAY</p><h2>Visa & Residency Services</h2><Copy paragraphs={data.service}/></div></div></section><section className="sd-band"><div className="sd-shell sd-section sd-benefits"><div><p className="sd-eyebrow">LONG-TERM STABILITY</p><h2>Why Serious Investors<br/><em>Choose the UAE Golden Visa</em></h2><p>{data.benefitIntro}</p></div><ol>{data.benefits.map((b,i)=><li key={b.title}><span>{number(i)}</span><div><h3>{b.title}</h3><p>{b.text}</p></div></li>)}</ol></div></section></>}
 {data.considerations&&<><section className="sd-band"><div className="sd-shell sd-section"><p className="sd-eyebrow">BEFORE COMMITTING CAPITAL</p><h2>Key Considerations</h2><ol className="sd-considerations">{data.considerations.map((c,i)=><li key={c}><span>{number(i)}</span><h3>{c}</h3></li>)}</ol></div></section><section className="sd-shell sd-section sd-returns"><p className="sd-eyebrow">DEFINE YOUR OBJECTIVES</p><h2>Return Expectations</h2><p>{data.returns[0]}</p><div className="sd-balance">{[data.returns[1],data.returns[3],data.returns[2]].map(t=><div key={t}>{t.replace(/^• /,'')}</div>)}</div><p>{data.returns[4]}</p></section></>}
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
          {data.help.map((p, i) => (
            <li key={p}>
              <span>{number(i)}</span>
              <p>{p}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
