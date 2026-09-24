import { motion, useReducedMotion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Building2, Landmark, ShieldCheck, BookUser } from 'lucide-react';
import './services.css';

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
    id: 'banking-kyc-advisory',
    number: '02',
    title: 'Banking & KYC Advisory',
    lines: ['Banking & KYC', 'Advisory'],
    icon: Landmark,
    image: 'banking',
    alt: 'Contemporary banking towers and corporate financial institution',
    description: 'Seamless corporate and personal bank account opening with full KYC regulatory guidance.',
    detail: 'Navigate bank selection, account opening documentation, and ongoing compliance requirements with expert advisors.'
  },
  {
    id: 'corporate-tax-compliance',
    number: '03',
    title: 'Corporate Tax & Compliance',
    lines: ['Corporate Tax &', 'Compliance'],
    icon: ShieldCheck,
    image: 'investment',
    alt: 'Corporate tax planning, balance sheet, and financial compliance charts',
    description: 'Stay fully compliant with UAE corporate tax laws, VAT, ESR, and financial reporting standards.',
    detail: 'Tailored corporate tax advisory, VAT registration, ESR compliance, and financial auditing readiness.'
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
];

function useReveal(delay = 0) {
  const reduced = useReducedMotion();
  return { initial: { opacity: 0, y: reduced ? 0 : 22 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .15 }, transition: { duration: .65, delay, ease: [.2, .65, .3, 1] } };
}

function ServiceCard({ service, index }) {
  const reduced = useReducedMotion();
  const Icon = service.icon;
  return <motion.article {...useReveal(index * .09)} whileHover={reduced ? undefined : { y: -6 }} className="service-card">
    <div className="service-photo"><motion.img whileHover={reduced ? undefined : {scale:1.05}} transition={{duration:.7}} src={`/assets/service-${service.image}-800.webp`} srcSet={`/assets/service-${service.image}-400.webp 400w, /assets/service-${service.image}-800.webp 800w`} sizes="(max-width: 600px) 88vw, (max-width: 1100px) 43vw, 22vw" alt={service.alt} loading="lazy" width="800" height="800" /><div className="service-photo-tint" /></div>
    <span className="service-number" aria-hidden="true">{service.number}</span>
    <svg className="service-curve" viewBox="0 0 350 150" preserveAspectRatio="none" aria-hidden="true"><path d="M0 2 C90 85 220 128 350 140 V150 H0Z" fill="#ffffff" fillOpacity=".47"/><path d="M0 26 C98 102 235 137 350 150 H0Z" fill="#f2f7ff" fillOpacity=".97"/></svg>
    <div className="service-body"><span className="service-icon"><Icon size={31} strokeWidth={1.6} aria-hidden="true" /></span><h3>{service.lines.map(line => <span key={line}>{line}</span>)}</h3><p>{service.description}</p><a href="#" onClick={e => e.preventDefault()} className="service-link" aria-label={`Learn more about ${service.title}`}><span className="learn-label">Learn More<span className="learn-rule" aria-hidden="true" /></span><span className="service-arrow" aria-hidden="true"><ArrowRight size={21} /></span></a></div>
  </motion.article>;
}

export function ServicesSection({ standalone = false }) {
  const Heading = standalone ? motion.h1 : motion.h2;
  return <section id="services" className="services-section relative isolate overflow-hidden" aria-labelledby="services-heading">
    <picture className="services-backdrop" aria-hidden="true"><img src="/assets/services-background.png" alt="" loading="lazy" width="1653" height="952" /></picture>
    <div className="services-inner"><div className="services-intro"><motion.p {...useReveal()} className="eyebrow flex items-center"><span aria-hidden="true"/>WHAT WE DO</motion.p><Heading {...useReveal(.08)} id="services-heading" className="services-heading">Our Core <em>Services</em></Heading><motion.p {...useReveal(.16)} className="services-description">Comprehensive business solutions to help you establish,<br className="services-desktop-break"/> manage and grow with confidence in the UAE.</motion.p></div>
    <div className="services-grid grid grid-cols-1 min-[601px]:grid-cols-2 min-[1101px]:grid-cols-4 gap-5">{services.map((service, index) => <ServiceCard key={service.id} service={service} index={index}/>)}</div>
    <motion.div {...useReveal(.2)} className="services-footer"><span aria-hidden="true"/><button onClick={e => e.preventDefault()} className="button button-primary">{standalone ? 'Back to Home' : 'View All Services'}<ArrowRight size={20} aria-hidden="true"/></button><span aria-hidden="true"/></motion.div></div>
  </section>;
}

export function ServicePage({ onConsultation }) {
  const { serviceId } = useParams();
  const service = services.find(item => item.id === serviceId);
  if (!service) return <main className="service-detail"><h1>Service not found</h1><Link to="/services">Explore our services</Link></main>;
  const Icon = service.icon;
  return <main id="main-content" className="service-detail"><Link className="service-back" to="/services"><ArrowLeft size={18}/>All services</Link><div className="service-detail-layout"><div><span className="service-icon"><Icon size={31} aria-hidden="true"/></span><p className="dialog-eyebrow">GLOWBIZ SOLUTIONS / {service.number}</p><h1>{service.title}</h1><p className="hero-description">{service.description}</p><p className="dialog-description">{service.detail}</p><button className="button button-primary" onClick={e => e.preventDefault()}>Book Consultation<ArrowRight size={20}/></button></div><img src={`/assets/service-${service.image}-800.webp`} alt={service.alt} width="800" height="800" /></div></main>;
}
