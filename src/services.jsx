import { motion, useReducedMotion } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowDown, ArrowLeft, Building2, Landmark, ShieldCheck, BookUser, TrendingUp } from 'lucide-react';
import './services.css';
import { expertiseServices } from './expertise-data';
import { ExpertiseDetail } from './expertise';

export const services = [
  {
    id: 'uae-business-setup',
    number: '01',
    title: 'UAE Business Setup',
    lines: ['UAE Business', 'Setup'],
    icon: Building2,
    image: 'compliance',
    alt: 'Executive signing business establishment documentation overlooking Dubai skyline',
    description: 'End-to-end guidance for establishing mainland, freezone, and offshore companies in the UAE.',
    detail: 'Explore strategic business structuring, license application, and operational setup tailored to your UAE growth goals.'
  },
  {
    id: 'investment-real-estate',
    number: '02',
    title: 'Investment & Real Estate',
    lines: ['Investment &', 'Real Estate'],
    icon: TrendingUp,
    image: 'investment',
    alt: 'Dubai luxury real estate and investment positioning',
    description: 'Strategic guidance for clients evaluating UAE real estate opportunities and broader investment positioning.',
    detail: 'Strategic guidance for clients evaluating UAE real estate opportunities and broader investment positioning.'
  },
  {
    id: 'banking-financial-structuring',
    number: '03',
    title: 'Banking & Financial Structuring',
    lines: ['Banking & Financial', 'Structuring'],
    icon: Landmark,
    image: 'banking',
    alt: 'Contemporary banking towers and corporate financial institution',
    description: 'Strategic advisory for corporate banking readiness, account opening, and financial structuring.',
    detail: 'Seamless corporate and personal bank account opening with institutional compliance and financial structuring.'
  },
  {
    id: 'golden-visa-residency',
    number: '04',
    title: 'Golden Visa & Residency',
    lines: ['Golden Visa &', 'Residency'],
    icon: BookUser,
    image: 'visa',
    alt: 'UAE Golden Visa residency passport and international investor documentation',
    description: 'End-to-end residency solutions including 10-year UAE Golden Visas for investors & professionals.',
    detail: 'Streamlined Golden Visa application, real estate & investment visa eligibility, and family residency sponsorship.'
  },
  {
    id: 'family-protection-succession-advisory',
    number: '05',
    title: 'Family Protection & Succession Advisory',
    lines: ['Family Protection &', 'Succession Advisory'],
    icon: ShieldCheck,
    image: 'compliance',
    alt: 'Family estate planning, legacy protection and succession documentation',
    description: 'Guidance on wills, succession planning, and asset protection to safeguard family wealth and legacy.',
    detail: 'Guidance on wills, insurance considerations, and succession planning to help protect family interests and long-term assets.'
  },
];

function useReveal(delay = 0) {
  const reduced = useReducedMotion();
  return { initial: { opacity: 0, y: reduced ? 0 : 22 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .15 }, transition: { duration: .65, delay, ease: [.2, .65, .3, 1] } };
}

function ServiceCard({ service, index }) {
  const reduced = useReducedMotion();
  const navigate = useNavigate();
  const Icon = service.icon;
  const targetPath = service.id === 'uae-business-setup' ? '/services/business-structuring' : `/services/${service.id}`;
  return (
    <motion.article
      {...useReveal(index * .09)}
      whileHover={reduced ? undefined : { y: -6 }}
      className="service-card cursor-pointer"
      onClick={() => navigate(targetPath)}
    >
      <div className="service-photo">
        <motion.img whileHover={reduced ? undefined : { scale: 1.05 }} transition={{ duration: .7 }} src={`/assets/service-${service.image}-800.webp`} srcSet={`/assets/service-${service.image}-400.webp 400w, /assets/service-${service.image}-800.webp 800w`} sizes="(max-width: 600px) 88vw, (max-width: 1100px) 43vw, 22vw" alt={service.alt} loading="lazy" width="800" height="800" />
        <div className="service-photo-tint" />
      </div>
      <svg className="service-curve" viewBox="0 0 350 150" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 2 C90 85 220 128 350 140 V150 H0Z" fill="#ffffff" fillOpacity=".47"/>
        <path d="M0 26 C98 102 235 137 350 150 H0Z" fill="#f2f7ff" fillOpacity=".97"/>
      </svg>
      <div className="service-body">
        <span className="service-icon"><Icon size={31} strokeWidth={1.6} aria-hidden="true" /></span>
        <h3>{service.lines.map(line => <span key={line}>{line}</span>)}</h3>
        <p>{service.description}</p>
        <div className="service-link" aria-label={`Learn more about ${service.title}`}>
          <span className="learn-label">Learn More</span>
          <span className="service-arrow" aria-hidden="true"><ArrowRight size={21} /></span>
        </div>
      </div>
    </motion.article>
  );
}

export function ServicesSection({ standalone = false }) {
  const Heading = standalone ? motion.h1 : motion.h2;
  const navigate = useNavigate();
  return <section id="services" className="services-section relative isolate overflow-hidden" aria-labelledby="services-heading">
    <picture className="services-backdrop" aria-hidden="true"><img src="/assets/services-background.png" alt="" loading="lazy" width="1653" height="952" /></picture>
    <div className="services-inner"><div className="services-intro"><motion.p {...useReveal()} className="eyebrow flex items-center"><span aria-hidden="true"/>WHAT WE DO</motion.p><Heading {...useReveal(.08)} id="services-heading" className="services-heading">Our Core <em>Services</em></Heading><motion.p {...useReveal(.16)} className="services-description">Comprehensive business solutions to help you establish,<br className="services-desktop-break"/> manage and grow with confidence in the UAE.</motion.p></div>
    <div className="services-grid grid grid-cols-1 min-[601px]:grid-cols-2 min-[1025px]:grid-cols-3 xl:grid-cols-5 gap-5">{services.map((service, index) => <ServiceCard key={service.id} service={service} index={index}/>)}</div>
    <motion.div {...useReveal(.2)} className="services-footer"><span aria-hidden="true"/><button onClick={() => navigate(standalone ? '/' : '/services')} className="button button-primary">{standalone ? 'Back to Home' : 'View All Services'}<ArrowRight size={20} aria-hidden="true"/></button><span aria-hidden="true"/></motion.div></div>
  </section>;
}

export function ServicesHero() {
  const reducedMotion = useReducedMotion();
  return <section className="strategy-hero" aria-labelledby="strategy-heading">
    <div className="strategy-art"><img src="/assets/connected-services-reference.png" width="1981" height="793" fetchPriority="high" alt="Five connected frosted-glass architectural panels: Business Structuring, Banking, Residency, Investment & Real Estate, and Family Protection, on a reflective white platform beside the Dubai skyline." /></div>
    <div className="strategy-content">
      <p className="strategy-eyebrow"><span aria-hidden="true" />STRATEGIC UAE ADVISORY</p>
      <div className="strategy-copy"><p>GlowBiz provides strategic advisory designed to help international clients navigate the UAE business and financial landscape with clarity and confidence.</p><p>Rather than focusing only on administrative processes, we help you structure your business, banking, residency and investment decisions in a coordinated way from the beginning.</p></div>
      <div className="strategy-actions"><a className="strategy-primary" href="#services" onClick={event => { event.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth' }); }}>Explore Our Services<ArrowDown aria-hidden="true" /></a><Link className="strategy-primary" to="/contact">Book a Consultation<ArrowRight aria-hidden="true" /></Link></div>
    </div>
  </section>;
}

export function ConsultationPage({ onConsultation }) {
  return <main id="main-content" className="consultation-page"><p className="strategy-eyebrow">GLOWBIZ CONSULTATION</p><h1>Let’s connect your UAE strategy.</h1><p>Discuss your business, banking, residency, investment and family protection priorities with GlowBiz.</p><button className="button button-primary" onClick={onConsultation}>Prepare a consultation inquiry<ArrowRight size={20} aria-hidden="true" /></button></main>;
}

export function ServicePage({ onConsultation }) {
  const { serviceId } = useParams();
  const expertise = expertiseServices.find(item => 
    item.id === serviceId ||
    (item.id === 'family-protection-succession' && serviceId === 'family-protection-succession-advisory') ||
    (item.id === 'banking' && serviceId === 'banking-financial-structuring')
  );
  if (expertise) return <ExpertiseDetail service={expertise} onConsultation={onConsultation} />;
  const service = services.find(item => item.id === serviceId);
  if (!service) return <main className="service-detail"><h1>Service not found</h1><Link to="/services">Explore our services</Link></main>;
  const Icon = service.icon;
  const isBanking = service.id === 'banking-financial-structuring' || service.id === 'banking';
  const isVisa = service.id === 'golden-visa-residency' || service.id === 'visa';
  const isRealEstate = service.id === 'investment-real-estate' || service.id === 'real-estate' || service.id === 'investment';
  const isFamily = service.id === 'family-protection-succession-advisory' || service.id === 'family-protection-succession' || service.id === 'family';
  const imageSrc = isBanking ? '/business/banking.png' : isVisa ? '/business/visa.png' : isRealEstate ? '/business/real%20estate.png' : isFamily ? '/business/family.png' : `/assets/service-${service.image}-800.webp`;
  return <main id="main-content" className="service-detail"><Link className="service-back" to="/services"><ArrowLeft size={18}/>All services</Link><div className="service-detail-layout"><div><span className="service-icon"><Icon size={31} aria-hidden="true"/></span><p className="dialog-eyebrow">GLOWBIZ SOLUTIONS / {service.number}</p><h1>{service.title}</h1><p className="hero-description">{service.description}</p><p className="dialog-description">{service.detail}</p><button className="button button-primary" onClick={onConsultation}>Book Consultation<ArrowRight size={20}/></button></div><img src={imageSrc} alt={service.alt} width="800" height="800" /></div></main>;
}
