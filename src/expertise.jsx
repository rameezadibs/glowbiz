import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Box, Globe2, LayoutGrid, Settings2 } from 'lucide-react';
import { expertiseServices } from './expertise-data';
import './expertise.css';

const areaIcons = [Building2, Box, Globe2, LayoutGrid, Settings2];
export function ExpertiseSection() {
  const [active, setActive] = useState(0);
  const service = expertiseServices[active];
  function navigateTabs(event, index) {
    const keys = { ArrowDown: (index + 1) % 5, ArrowRight: (index + 1) % 5, ArrowUp: (index + 4) % 5, ArrowLeft: (index + 4) % 5, Home: 0, End: 4 };
    if (keys[event.key] !== undefined) {
      event.preventDefault();
      setActive(keys[event.key]);
      document.getElementById(`expertise-tab-${keys[event.key]}`)?.focus();
    }
  }
  return <section id="services" className="expertise-section" aria-labelledby="services-heading">
    <div className="expertise-intro">
      <p className="strategy-eyebrow"><span aria-hidden="true" />OUR EXPERTISE</p>
      <p className="expertise-lead">Your business structure, banking, residency, investments and long-term family planning should not be treated as separate decisions. GlowBiz brings these areas together, helping you build a more coordinated approach to your UAE presence.</p>
    </div>
    <div className="expertise-layout">
      <div className="expertise-tabs" role="tablist" aria-label="Explore our expertise" aria-orientation="vertical">
        {expertiseServices.map((item, index) => <button key={item.id} id={`expertise-tab-${index}`} role="tab" aria-selected={active === index} aria-controls="expertise-panel" tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onPointerMove={event => { if (event.pointerType === 'mouse') setActive(index); }} onKeyDown={event => navigateTabs(event, index)}>
          <span className="expertise-number" aria-hidden="true">0{index + 1}</span><span className="expertise-name">{item.title}</span><span className="expertise-arrow" aria-hidden="true"><ArrowRight size={20} strokeWidth={1.3} /></span>
        </button>)}
      </div>
      <div id="expertise-panel" role="tabpanel" aria-labelledby={`expertise-tab-${active}`} tabIndex={0} className="expertise-panel">
        <div key={service.id} className="expertise-copy">
          <p className="expertise-label">{service.label}</p>
          <h3>{service.heading[0]}<span>{service.heading[1]}</span></h3>
          <div className="expertise-areas"><p className="expertise-label">KEY AREAS INCLUDE</p><ul>{service.areas.map((area, index) => { const Icon = areaIcons[index]; return <li key={area}><span className="expertise-icon"><Icon size={24} strokeWidth={1.4} aria-hidden="true" /></span><span>{area}</span></li>; })}</ul></div>
          <Link className="expertise-cta expertise-desktop-cta" to={`/services/${service.id}`}>Learn More<ArrowRight size={20} aria-hidden="true" /></Link>
        </div>
        <div className="expertise-visual" aria-label="Service architecture">
          {expertiseServices.map((item, index) => <svg key={item.id} className={`expertise-artwork ${active === index ? 'is-active' : ''}`} viewBox="0 0 1672 941" preserveAspectRatio="none" role="img" aria-label={item.alt} aria-hidden={active !== index}>
            <defs>
              <linearGradient id={`scene-fade-${item.id}`} gradientUnits="userSpaceOnUse" x1="860" y1="0" x2="1060" y2="0"><stop offset="0" stopColor="black" /><stop offset="1" stopColor="white" /></linearGradient>
              <mask id={`scene-mask-${item.id}`} maskUnits="userSpaceOnUse" x="820" y="0" width="852" height="941">
                <path d="M1195 28 C1390 28 1550 80 1672 170 L1672 941 L610 941 C830 885 1100 853 1190 797 C1280 738 976 694 820 650 C880 500 970 355 1078 225 L1240 300 C1210 215 1188 108 1195 28Z" fill={`url(#scene-fade-${item.id})`} />
              </mask>
            </defs>
            {/* Retain the original sweeping canopy, pale text area and lower frame. */}
            <image href="/assets/expertise-business.webp" width="1672" height="941" preserveAspectRatio="none" />
            <image href={item.image} x="820" y="0" width="852" height="941" preserveAspectRatio="xMidYMid slice" mask={`url(#scene-mask-${item.id})`} />
          </svg>)}
        </div>
        <Link className="expertise-cta expertise-mobile-cta" to={`/services/${service.id}`}>Learn More<ArrowRight size={20} aria-hidden="true" /></Link>
      </div>
    </div>
  </section>;
}

export function ExpertiseDetail({ service, onConsultation }) {
  const isBanking = service.id === 'banking';
  const isVisa = service.id === 'golden-visa-residency';
  const isRealEstate = service.id === 'investment-real-estate' || service.id === 'real-estate' || service.id === 'investment';
  const isFamily = service.id === 'family-protection-succession' || service.id === 'family-protection-succession-advisory' || service.id === 'family';
  const isStandalone = isBanking || isVisa || isRealEstate || isFamily;
  const imageSrc = isBanking
    ? '/business/banking.png'
    : isVisa
    ? '/business/visa.png'
    : isRealEstate
    ? '/business/real%20estate.png'
    : isFamily
    ? '/business/family.png'
    : service.image;
  return <main id="main-content" className="expertise-detail">
    <Link to="/services#services" className="service-back">← All services</Link>
    <div className="expertise-detail-grid"><div><p className="expertise-label">{service.label}</p><h1>{service.heading[0]} <span>{service.heading[1]}</span></h1>{service.paragraphs.map(text => <p key={text}>{text}</p>)}<h2>Key Areas Include</h2><ul>{service.areas.map(area => <li key={area}>{area}</li>)}</ul><button className="expertise-cta" onClick={onConsultation}>Book a Consultation<ArrowRight size={20} /></button></div><div className={`expertise-detail-image ${isStandalone ? 'expertise-standalone-image' : ''}`}><img src={imageSrc} alt={service.alt} /></div></div>
  </main>;
}
