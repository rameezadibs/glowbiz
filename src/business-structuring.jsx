import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Check, Building2, Layers3, PanelsTopLeft, Settings2, BriefcaseBusiness, GitBranch, Globe2, Landmark, UserRound, TrendingUp, Plus, Minus } from 'lucide-react';
import { ProcessWaves } from './process';
import './business-structuring.css';

const helpPoints = [
  'Assessing whether mainland, free zone, or offshore is the right fit for your business model and goals',
  'Aligning business activity with the appropriate jurisdiction and regulatory requirements',
  'Evaluating ownership, control, and operational needs',
  'Structuring the setup to support banking and residency later',
  'Identifying when an offshore or holding layer makes strategic sense (e.g., for asset protection, international expansion, or family governance)',
];
const solutions = [
  { title: 'Company Registrations & Renewals', icon: Building2, image: '/business/business.png',
    alt: 'Company registrations and renewals in the UAE',
    paragraphs: ['Mainland, Free Zone, and Offshore company setup, including guidance on the right jurisdiction, licence activity, ownership structure, and renewal requirements.', "GlowBiz helps coordinate the incorporation process from initial structuring through licensing and ongoing renewals, while considering how the chosen structure will support the client's operational, banking and residency requirements."] },
  { title: 'Corporate Structuring & Holding Companies', icon: Layers3, image: '/business/corporate.png',
    alt: 'Corporate structuring and holding companies advisory',
    paragraphs: ['Advisory and execution support for UAE holding companies, special purpose structures, asset-holding entities, and international ownership arrangements.', 'Where a straightforward operating company is not sufficient, GlowBiz helps clients consider structures that better support asset ownership, international expansion, investment holdings or longer-term family and business objectives.'] },
  { title: 'Virtual & Physical Office Solutions', icon: PanelsTopLeft, image: '/business/virtual.png',
    alt: 'Virtual and physical office solutions in Dubai and the UAE',
    paragraphs: ['Assistance with flexi desk, virtual office, serviced office, and physical office arrangements based on licensing, banking, and operational requirements.', 'The appropriate office solution is considered as part of the wider structure rather than simply as a licensing requirement, particularly where banking substance or physical operations are relevant.'] },
  { title: 'PRO & Corporate Support Services', icon: Settings2, image: '/business/PRO.png',
    alt: 'PRO and corporate administration support services',
    paragraphs: ['Support with government documentation, amendments, renewals, attestations, licensing updates, and ongoing corporate administration.', 'This provides clients with continuity after incorporation and a single point of coordination for routine corporate requirements.'] },
];
const framework = [
  ['Business model', BriefcaseBusiness], ['Revenue source', GitBranch], ['Client geography', Globe2],
  ['Banking strategy', Landmark], ['Visa requirement', UserRound], ['Long-term expansion', TrendingUp],
];
const faqs = [
  ['Which is better—mainland or free zone?', 'If you plan to operate directly in the UAE market, mainland is usually the stronger option. If your business is primarily international, service-based, or needs a lighter setup structure, a free zone is often more suitable.'],
  ['When does offshore make sense?', 'Offshore is typically used for holding structures, asset ownership, or wider structuring needs. It is not the usual choice for someone who wants to actively trade or operate on the ground in the UAE.'],
  ['Should I choose the cheapest setup?', 'No. A cheaper setup that does not support banking, operations, or future flexibility can become more expensive later. The right structure matters more than the lowest starting cost.'],
  ['Does the business structure affect banking?', 'Yes. Banks look at the business model, ownership, activity, location, substance, and commercial logic. A poorly chosen structure can make banking more difficult or even impossible.'],
  ['Can a free zone company do business in UAE mainland?', <><p>Not directly.</p><p>You need:</p><ul><li>Local distributor, OR</li><li>Mainland branch</li></ul><p>This is one of the most misunderstood areas — and where many setups go wrong.</p></>],
  ['Which is better for consulting or service businesses?', 'Free zone is usually sufficient — if your clients are international or remote.'],
  ['Which is better for trading or retail?', 'Mainland — because you need direct UAE market access.'],
];
function Eyebrow({ children }) { return <p className="bs-eyebrow"><span aria-hidden="true" />{children}</p>; }
function ConsultationLink({ children, secondary = false }) { return <Link to="/contact" className={secondary ? 'bs-text-link' : 'bs-button'}>{children}<ArrowRight size={19} aria-hidden="true" /></Link>; }
function Architecture({ asset, alt, className = '' }) {
  const src = asset.startsWith('/') ? asset : `/assets/${asset}.webp`;
  return <div className={`bs-architecture ${className}`}><img src={src} alt={alt} loading="lazy" decoding="async" /></div>;
}
function Faqs() {
  const [open, setOpen] = useState(null);
  const col1 = faqs.slice(0, 4);
  const col2 = faqs.slice(4);

  const renderFaqItem = ([question, answer], index) => (
    <div className={`bs-faq-item ${open === index ? 'is-open' : ''}`} key={question}>
      <h3>
        <button
          id={`bs-question-${index}`}
          aria-expanded={open === index}
          aria-controls={`bs-answer-${index}`}
          onClick={() => setOpen(open === index ? null : index)}
        >
          <span>{question}</span>
          {open === index ? <Minus size={20} aria-hidden="true" /> : <Plus size={20} aria-hidden="true" />}
        </button>
      </h3>
      <div
        className="bs-faq-answer"
        id={`bs-answer-${index}`}
        role="region"
        aria-labelledby={`bs-question-${index}`}
        aria-hidden={open !== index}
        inert={open !== index}
      >
        <div>
          <div className="bs-faq-answer-inner">
            {typeof answer === 'string' ? <p>{answer}</p> : answer}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="bs-faq-section" aria-labelledby="bs-faq-heading">
      <div className="bs-faq-container bs-shell">
        <header className="bs-faq-header">
          <Eyebrow>YOUR QUESTIONS, CONSIDERED</Eyebrow>
          <h2 id="bs-faq-heading">Business Structuring<span>Frequently Asked Questions</span></h2>
          <p className="bs-faq-subtitle">Clear guidance on mainland, free zone, and offshore setups to help you make informed decisions.</p>
        </header>
        <div className="bs-faq-grid">
          <div className="bs-faq-column">
            {col1.map((item, i) => renderFaqItem(item, i))}
          </div>
          <div className="bs-faq-column">
            {col2.map((item, i) => renderFaqItem(item, i + 4))}
            <Link to="/contact" className="bs-faq-item bs-faq-prompt-item">
              <span>Need guidance tailored to your setup?</span>
              <span className="bs-faq-cta-btn">
                Discuss Structure <ArrowRight size={15} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
export default function BusinessStructuringPage() {
  return <main id="main-content" className="business-structuring-page">
    <section className="bs-hero" aria-labelledby="bs-heading">
      <div className="bs-hero-content"><Link to="/services" className="bs-back"><ArrowLeft size={16} aria-hidden="true" />All services</Link>
        <h1 id="bs-heading" className="bs-hero-title">Business Structuring</h1>
        <p className="bs-hero-subtitle">Build the Right Structure <em>From the Beginning.</em></p>
        <div className="bs-introduction"><p>Choosing the right business structure in the UAE is one of the most important early decisions. The structure you select affects ownership, market access, licensing, residency options, banking readiness, and long-term flexibility.</p><p>GlowBiz helps clients assess mainland, free zone, and offshore structures based on your actual objectives—not just what is easiest to sell.</p></div>
        <div className="bs-help"><h2>What GlowBiz Helps With</h2><ul>{helpPoints.map(point => <li key={point}><span className="bs-check"><Check size={13} strokeWidth={1.7} aria-hidden="true" /></span><span>{point}</span></li>)}</ul></div>
        <div className="bs-actions"><ConsultationLink>Discuss Your Structure</ConsultationLink><ConsultationLink>Book a Consultation</ConsultationLink></div>
      </div>
      <figure className="bs-hero-visual"><img src="/assets/structuring-routes.webp" alt="Three translucent architectural structures on a reflective white platform: Mainland — Direct Access to the UAE Market; Free Zone — Efficient for International Business; Offshore — Strategic for Asset Protection." width="1600" height="1600" fetchPriority="high" /><figcaption><span>MAINLAND</span><i aria-hidden="true" /><span>FREE ZONE</span><i aria-hidden="true" /><span>OFFSHORE</span></figcaption></figure>
    </section>

    <section className="bs-solutions" aria-labelledby="bs-solutions-heading">
      <ProcessWaves />
      <div className="bs-shell">
        <Eyebrow>BUSINESS STRUCTURING SOLUTIONS</Eyebrow><h2 id="bs-solutions-heading">From Establishment to<span>Ongoing Corporate Support.</span></h2>
        <div className="bs-solutions-grid">{solutions.map((solution, index) => { const Icon = solution.icon; return <article key={solution.title} className="bs-solution bs-solution-compact">
          <div className="bs-solution-marker"><Icon size={25} strokeWidth={1.3} aria-hidden="true" /></div><h3>{solution.title}</h3>{solution.paragraphs.map(text => <p key={text}>{text}</p>)}
        </article>; })}</div>
      </div>
    </section>

    <section className="bs-framework" aria-labelledby="bs-framework-heading"><div className="bs-shell"><Eyebrow>HOW WE DECIDE THE RIGHT STRUCTURE FOR YOU</Eyebrow><h2 id="bs-framework-heading">A Practical Framework<span>for a Stronger Foundation.</span></h2>
      <ol className="bs-framework-steps">{framework.map(([name, Icon]) => <li key={name}><Icon size={32} strokeWidth={1.2} aria-hidden="true" /><h3>{name}</h3><span className="bs-factor-dot" aria-hidden="true" /></li>)}</ol>
      <div className="bs-practical"><p className="bs-small-label">At a practical level:</p><div><ul><li>Mainland structures provide direct access to the UAE market</li><li>Free zone structures are typically more efficient for international and service-based businesses</li></ul><p>The right choice depends on how and where your business generates revenue.</p></div></div>
    </div></section>

    <Faqs />

    <section className="bs-final" aria-labelledby="bs-final-heading"><div className="bs-final-content"><Eyebrow>START WITH THE RIGHT STRUCTURE</Eyebrow><h2 id="bs-final-heading">Need Help Choosing<span>the Right UAE Structure?</span></h2><p>Discuss your business model, market plans, banking requirements, residency needs, and long-term objectives before selecting a structure.</p><ConsultationLink>Schedule a Consultation</ConsultationLink></div></section>
  </main>;
}
