import React, { useRef, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence, MotionConfig, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronRight, Menu, X, Download, MapPin, Mail, Phone, ShieldCheck, Clock, Building2 } from 'lucide-react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { ServicesSection, ServicePage } from './services';
import ProcessSection from './process';
import './styles.css';

const details = {
  Services: { eyebrow: 'BUILT AROUND YOUR AMBITION', title: 'Expertise for your next chapter.', text: 'Explore advisory support for establishing, managing and growing your presence in the UAE.', items: ['UAE business establishment', 'Business management & growth', 'Wealth advisory for global clients'] },
  'Why GlowBiz': { eyebrow: 'YOUR GROWTH PARTNER IN THE UAE', title: 'A local perspective. A global outlook.', text: 'GlowBiz Solutions helps entrepreneurs, investors and international families establish, manage and grow with confidence in the UAE.' },
  About: { eyebrow: 'YOUR GROWTH PARTNER IN THE UAE', title: 'A local perspective. A global outlook.', text: 'GlowBiz Solutions helps entrepreneurs, investors and international families establish, manage and grow with confidence in the UAE.' },
  Insights: { eyebrow: 'A CLEARER PERSPECTIVE', title: 'Start with the right questions.', text: 'Your goals deserve a considered conversation. Explore the topics that matter to your next step in the UAE.', items: ['What do I need to establish a UAE business?', 'How can I plan for long-term growth?', 'What should international families consider?'] },
};

function Button({ children, secondary = false, className = '', ...props }) {
  return <button className={`button ${secondary ? 'button-secondary' : 'button-primary'} ${className}`} {...props}>{children}{!secondary && <ChevronRight size={20} strokeWidth={1.7} aria-hidden="true" />}</button>;
}

function Header({ onOpen }) {
  const location = useLocation();
  const route = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const close = e => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  const navigate = page => {
    setMenuOpen(false);
    if (page === 'Home') route('/');
    else if (page === 'Contact') onOpen('Consultation');
    else if (page === 'Why GlowBiz') onOpen('Why GlowBiz');
    else onOpen(page);
  };

  const navItems = ['Home', 'Services', 'Why GlowBiz', 'Insights', 'Contact'];

  return (
    <header className={`site-header sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner flex items-center justify-between">
        <Link to="/" className="brand-logo-link shrink-0" aria-label="GlowBiz Solutions home">
          <img src="/logo.png" alt="GlowBiz Solutions" className="brand-logo-img" />
        </Link>
        <nav className="desktop-nav flex items-center" aria-label="Main navigation">
          {navItems.map(page => {
            const active = page === 'Home'
              ? location.pathname === '/'
              : page === 'Services' && location.pathname.startsWith('/services');
            return (
              <button
                key={page}
                onClick={e => e.preventDefault()}
                className={`nav-link ${active ? 'active' : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                {page}
              </button>
            );
          })}
        </nav>
        <div className="header-actions flex items-center gap-3">
          <Button className="header-cta" onClick={e => e.preventDefault()}>
            Book Consultation
          </Button>
          <button
            className="menu-toggle p-2.5 rounded-full text-slate-900 border border-slate-300 bg-white/95 shadow-sm hover:text-royal hover:border-royal transition-all"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mobile-fullscreen-nav fixed inset-0 z-50 flex flex-col justify-between bg-white text-slate-900 p-6 sm:p-10 overflow-y-auto"
            aria-label="Mobile navigation"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <Link to="/" onClick={e => e.preventDefault()} className="brand-logo-link" aria-label="GlowBiz Solutions home">
                <img src="/logo.png" alt="GlowBiz Solutions" className="brand-logo-img h-10" />
              </Link>
              <button
                className="p-3 rounded-full bg-slate-100 text-slate-800 hover:bg-slate-200 transition-all"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Main Links List */}
            <div className="my-auto py-8 space-y-3">
              <p className="text-xs font-bold tracking-[3px] text-sky-800 uppercase mb-4 px-2">NAVIGATION</p>
              {navItems.map((page, idx) => {
                const active = page === 'Home' ? location.pathname === '/' : page === 'Services' && location.pathname.startsWith('/services');
                const num = String(idx + 1).padStart(2, '0');
                return (
                  <motion.button
                    key={page}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + idx * 0.05, duration: 0.35 }}
                    onClick={e => e.preventDefault()}
                    className={`group w-full flex items-center justify-between py-3.5 px-4 rounded-2xl transition-all ${
                      active ? 'bg-sky-50 text-royal font-bold' : 'text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold text-sky-600 font-mono tracking-wider">{num}</span>
                      <span className="text-2xl sm:text-3xl font-semibold tracking-tight">{page}</span>
                    </div>
                    <ChevronRight size={22} className={`transition-transform group-hover:translate-x-1 ${active ? 'text-royal' : 'text-slate-300'}`} />
                  </motion.button>
                );
              })}
            </div>

            {/* Bottom Footer Details */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <Button className="w-full min-h-[54px] text-base justify-center shadow-xl shadow-sky-900/15" onClick={e => e.preventDefault()}>
                Book Consultation
              </Button>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 pt-2 px-1">
                <span className="flex items-center gap-1.5"><MapPin size={14} className="text-royal shrink-0" /> DIFC Gate Precinct, Dubai</span>
                <span className="flex items-center gap-1.5"><Phone size={14} className="text-royal shrink-0" /> +971 (0)4 800 4569</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero({ onOpen }) {
  const reduceMotion = useReducedMotion();
  const entrance = delay => ({ initial: { opacity: 0, y: reduceMotion ? 0 : 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: .85, delay, ease: [.2, .65, .3, 1] } });
  return <section id="home" className="hero relative isolate overflow-hidden" aria-labelledby="hero-heading">
    <motion.picture className="hero-picture absolute inset-0 -z-20" initial={false} animate={reduceMotion ? {} : { scale: [1, 1.025] }} transition={{ duration: 24, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}>
      <source type="image/webp" srcSet="/assets/dubai-1280.webp 1280w, /assets/dubai-1920.webp 1920w, /assets/dubai-2560.webp 2560w" sizes="100vw" />
      <img src="/assets/dubai-1920.webp" alt="Dubai waterfront skyline and Burj Khalifa viewed from a sunlit glass terrace, with a translucent globe in the sky" fetchPriority="high" width="2560" height="1440" />
    </motion.picture>
    <div className="hero-wash absolute inset-0 -z-10" />
    <div className="hero-inner mx-auto">
      <div className="hero-content">
        <motion.p {...entrance(.1)} className="eyebrow flex items-center"><span aria-hidden="true" />YOUR GROWTH PARTNER IN THE UAE</motion.p>
        <motion.h1 {...entrance(.23)} id="hero-heading"><span>Strategic UAE Business</span><span>&amp; Wealth Advisory</span><span>for Global Clients</span></motion.h1>
        <motion.p {...entrance(.4)} className="hero-description">Helping entrepreneurs, investors and international families establish, manage and grow with confidence in the UAE.</motion.p>
        <motion.div {...entrance(.55)} className="hero-actions flex flex-wrap"><Button onClick={e => e.preventDefault()}>Book Consultation</Button><Button onClick={e => e.preventDefault()}>Explore Services</Button></motion.div>
      </div>
    </div>
  </section>;
}

function CtaSection({ onOpen }) {
  const reduceMotion = useReducedMotion();
  const entrance = delay => ({
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : delay, ease: [0.2, 0.65, 0.3, 1] }
  });

  return (
    <section className="cta-section relative isolate overflow-hidden" aria-labelledby="cta-heading">
      <picture className="cta-picture absolute inset-0 -z-20 pointer-events-none">
        <img src="/CTA.png" alt="" className="w-full h-full object-cover object-center" />
      </picture>
      <div className="cta-wash absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/70 via-slate-900/60 to-slate-950/70" />
      <div className="cta-inner mx-auto text-center relative z-10">
        <motion.p {...entrance(0.1)} className="cta-eyebrow inline-flex items-center gap-2">
          <span>READY TO ELEVATE YOUR UAE PRESENCE?</span>
        </motion.p>
        <motion.h2 {...entrance(0.2)} id="cta-heading" className="cta-title">
          Start Your UAE Journey with Clarity
        </motion.h2>
        <motion.p {...entrance(0.3)} className="cta-description mx-auto">
          If you are considering establishing a presence in the UAE — whether through business, investment, or residency — GlowBiz can help you structure the right approach from the beginning.
        </motion.p>
        <motion.div {...entrance(0.4)} className="cta-actions flex items-center justify-center flex-wrap gap-4">
          <Button onClick={e => e.preventDefault()}>
            Book Consultation
          </Button>
        </motion.div>
        <motion.div {...entrance(0.5)} className="cta-highlights flex items-center justify-center flex-wrap gap-8 mt-10">
          <span className="cta-highlight-item"><ShieldCheck size={18} /> Fast-Track Company Setup</span>
          <span className="cta-highlight-item"><Clock size={18} /> 100% Confidential Advisory</span>
          <span className="cta-highlight-item"><Building2 size={18} /> Dedicated UAE Specialist</span>
        </motion.div>
      </div>
    </section>
  );
}

function Footer({ onOpen }) {
  return (
    <footer className="site-footer relative">
      <div className="footer-top max-w-7xl mx-auto px-6 py-16">
        <div className="footer-grid grid grid-cols-1 min-[600px]:grid-cols-2 min-[1100px]:grid-cols-5 gap-10">
          <div className="footer-col footer-brand-col min-[1100px]:col-span-2">
            <Link to="/" onClick={e => e.preventDefault()} className="brand-logo-link shrink-0 mb-5 block" aria-label="GlowBiz Solutions home">
              <img src="/logo.png" alt="GlowBiz Solutions" className="brand-logo-img" />
            </Link>
            <p className="footer-brand-desc max-w-md text-slate-600 text-sm leading-relaxed mb-6">
              GlowBiz Solutions provides premier strategic business establishment, corporate banking, tax compliance, and residency advisory for entrepreneurs, investors, and global families in the UAE.
            </p>
            <div className="footer-contact-info space-y-2.5 text-sm text-slate-600">
              <p className="flex items-center gap-3"><MapPin size={17} className="text-royal shrink-0" /> DIFC Gate Precinct, Dubai, United Arab Emirates</p>
              <p className="flex items-center gap-3"><Mail size={17} className="text-royal shrink-0" /> advisory@glowbizsolutions.ae</p>
              <p className="flex items-center gap-3"><Phone size={17} className="text-royal shrink-0" /> +971 (0)4 800 4569</p>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-title text-navy font-bold text-sm tracking-wider uppercase mb-4">Core Services</h4>
            <ul className="footer-links space-y-2.5 text-sm text-slate-600">
              <li><a href="#" onClick={e => e.preventDefault()} className="hover:text-royal transition">UAE Business Setup</a></li>
              <li><a href="#" onClick={e => e.preventDefault()} className="hover:text-royal transition">Banking & KYC Advisory</a></li>
              <li><a href="#" onClick={e => e.preventDefault()} className="hover:text-royal transition">Corporate Tax & Compliance</a></li>
              <li><a href="#" onClick={e => e.preventDefault()} className="hover:text-royal transition">Golden Visa & Residency</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title text-navy font-bold text-sm tracking-wider uppercase mb-4">Navigation</h4>
            <ul className="footer-links space-y-2.5 text-sm text-slate-600">
              <li><a href="#" onClick={e => e.preventDefault()} className="hover:text-royal transition">Home</a></li>
              <li><a href="#" onClick={e => e.preventDefault()} className="hover:text-royal transition">Services</a></li>
              <li><button onClick={e => e.preventDefault()} className="hover:text-royal transition text-left">Why GlowBiz</button></li>
              <li><button onClick={e => e.preventDefault()} className="hover:text-royal transition text-left">Insights</button></li>
              <li><button onClick={e => e.preventDefault()} className="hover:text-royal transition text-left">Contact</button></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title text-navy font-bold text-sm tracking-wider uppercase mb-4">Governance</h4>
            <ul className="footer-links space-y-2.5 text-sm text-slate-600">
              <li><span className="cursor-pointer hover:text-royal transition" onClick={e => e.preventDefault()}>Privacy Policy</span></li>
              <li><span className="cursor-pointer hover:text-royal transition" onClick={e => e.preventDefault()}>Terms of Service</span></li>
              <li><span className="cursor-pointer hover:text-royal transition" onClick={e => e.preventDefault()}>Regulatory Disclosures</span></li>
              <li><span className="cursor-pointer hover:text-royal transition" onClick={e => e.preventDefault()}>Client Charter</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom border-t border-slate-200 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} GlowBiz Solutions. All rights reserved.</p>
          <p className="flex items-center gap-1">Designed with precision for global clients in the UAE</p>
        </div>
      </div>
    </footer>
  );
}

function DetailDialog({ page, onClose, onOpen }) {
  const ref = useRef(null);
  const [downloaded, setDownloaded] = useState(false);
  useEffect(() => { if (page) { ref.current.showModal(); document.body.style.overflow = 'hidden'; setDownloaded(false); } else ref.current.close(); return () => { document.body.style.overflow = ''; }; }, [page]);
  const prepareInquiry = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = `GlowBiz Solutions — Consultation inquiry\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nArea of interest: ${data.get('interest')}\n\n${data.get('message')}\n\nThis inquiry has been prepared locally. It has not been sent and no appointment has been booked.`;
    const url = URL.createObjectURL(new Blob([text], {type: 'text/plain'}));
    const link = document.createElement('a'); link.href = url; link.download = 'glowbiz-consultation-inquiry.txt'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); setDownloaded(true);
  };
  const detail = details[page];
  return <dialog ref={ref} onCancel={onClose} onClick={e => {if(e.target === ref.current) onClose();}} aria-labelledby="dialog-title" className="detail-dialog">
    <button className="dialog-close" onClick={onClose} aria-label="Close dialog"><X size={22} /></button>
    {page === 'Consultation' ? <><p className="dialog-eyebrow">LET’S TALK ABOUT YOUR NEXT CHAPTER</p><h2 id="dialog-title">Begin a conversation.</h2><p className="dialog-description">Prepare your consultation inquiry. Download a copy to share with your GlowBiz advisor; this form does not send a request or book an appointment.</p><form onSubmit={prepareInquiry} className="inquiry-form"><label>Full name<input autoComplete="name" name="name" required placeholder="Your name" /></label><label>Email address<input autoComplete="email" name="email" type="email" required placeholder="you@company.com" /></label><label>Area of interest<select name="interest"><option>UAE Business Setup</option><option>Banking & KYC Advisory</option><option>Corporate Tax & Compliance</option><option>Golden Visa & Residency</option></select></label><label>How can we help?<textarea name="message" rows="3" placeholder="Tell us a little about your goals" required /></label><button className="button button-primary" type="submit">Prepare inquiry<Download size={18} /></button>{downloaded && <p role="status" className="form-status">Your inquiry is ready. Save and share it with your advisor. No request has been sent.</p>}</form></> : detail && <><p className="dialog-eyebrow">{detail.eyebrow}</p><h2 id="dialog-title">{detail.title}</h2><p className="dialog-description">{detail.text}</p>{detail.items && <ul className="detail-list">{detail.items.map(item => <li key={item}>{item}<ArrowRight size={18} aria-hidden="true" /></li>)}</ul>}<Button onClick={() => onOpen('Consultation')}>Book Consultation</Button></>}
  </dialog>;
}

function App() {
  const [page, setPage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const onOpen = target => target === 'Services' ? navigate('/services') : setPage(target);
  useEffect(() => { window.scrollTo(0, 0); setPage(null); document.title = location.pathname.startsWith('/services') ? 'Our Services — GlowBiz Solutions' : 'GlowBiz Solutions — Your Growth Partner in the UAE'; }, [location.pathname]);
  return <MotionConfig reducedMotion="user"><a className="skip-link" href="#main-content">Skip to content</a><Header onOpen={onOpen} /><Routes><Route path="/" element={<main id="main-content"><Hero onOpen={onOpen} /><ServicesSection /><ProcessSection /><CtaSection onOpen={onOpen} /></main>} /><Route path="/services" element={<main id="main-content"><ServicesSection standalone /><CtaSection onOpen={onOpen} /></main>} /><Route path="/services/:serviceId" element={<><ServicePage onConsultation={() => setPage('Consultation')} /><CtaSection onOpen={onOpen} /></>} /><Route path="*" element={<main id="main-content" className="service-detail"><h1>Page not found</h1><Link to="/">Return home</Link></main>} /></Routes><Footer onOpen={onOpen} /><DetailDialog page={page} onClose={() => setPage(null)} onOpen={onOpen} /></MotionConfig>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><BrowserRouter><App /></BrowserRouter></React.StrictMode>);

