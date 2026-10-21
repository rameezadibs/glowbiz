import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronRight, Check } from 'lucide-react';
import './why-glowbiz.css';

const fivePrinciples = [
  {
    number: '01',
    heading: 'Strategic Perspective',
    content: "We approach each client’s situation holistically. Our objective is not just to complete a process, but to structure it correctly for your long-term benefit.",
    visual: '/why-glowbiz/principle-01.jpg',
    alt: 'High-angle architectural composition of structured pathways converging toward one selected route',
  },
  {
    number: '02',
    heading: 'Banking Insight',
    content: 'Banking readiness is where many poorly planned setups fail. GlowBiz prepares you professionally and realistically before you approach UAE banks, increasing your chances of approval.',
    visual: '/why-glowbiz/principle-02.jpg',
    alt: 'Layered translucent glass planes and geometric structures moving toward a clean institutional threshold',
  },
  {
    number: '03',
    heading: 'Integrated Advisory',
    content: 'Business setup, residency, banking, tax exposure, investment, and succession planning are interconnected. We help you address them in the right sequence for optimal results.',
    visual: '/why-glowbiz/principle-03.jpg',
    alt: 'Translucent blue sculptural ribbon pathways flowing and connecting into one continuous architectural system',
  },
  {
    number: '04',
    heading: 'International Client Focus',
    content: 'GlowBiz serves global clients entering the UAE from diverse jurisdictions and backgrounds. Our advice is tailored to cross-border realities-not generic local assumptions.',
    visual: '/why-glowbiz/principle-04.jpg',
    alt: 'Minimalist relief map installation showing refined international route lines converging toward the UAE',
  },
  {
    number: '05',
    heading: 'Bespoke Approach',
    content: 'Some clients need a straightforward business entry strategy. Others require comprehensive structuring across property, residency, wealth, and family planning. GlowBiz adapts to your unique needs.',
    visual: '/why-glowbiz/principle-05.jpg',
    alt: 'Architectural sculpture with multiple adapted geometric pathways converging around a central marble plinth',
    isBespoke: true,
  },
];

const strategicDisciplines = [
  {
    id: 'business',
    label: 'BUSINESS',
    posClass: 'node-pos-1',
    description: 'Jurisdiction, corporate form, and operational substance structure your entire UAE footprint.',
  },
  {
    id: 'banking',
    label: 'BANKING',
    posClass: 'node-pos-2',
    description: 'Account approval depends directly on transparent commercial rationale and governance.',
  },
  {
    id: 'residency',
    label: 'RESIDENCY',
    posClass: 'node-pos-3',
    description: 'Golden Visa and personal status align with your physical presence and executive role.',
  },
  {
    id: 'investment',
    label: 'INVESTMENT',
    posClass: 'node-pos-4',
    description: 'Commercial assets and real estate holdings integrate with local regulatory protections.',
  },
  {
    id: 'family',
    label: 'FAMILY PLANNING',
    posClass: 'node-pos-5',
    description: 'Succession protocols, DIFC wills, and asset holding vehicles protect legacy across generations.',
  },
];

const clientGroups = [
  {
    eyebrow: 'COMMERCIAL ENTERPRISE',
    title: 'Entrepreneurs',
    description: 'Founders and business owners establishing regional headquarters, operational entities, and cross-border commercial structures in the UAE.',
    image: '/business/virtual.png',
    alt: 'Contemporary architectural executive business and office environment in the UAE',
  },
  {
    eyebrow: 'CAPITAL ALLOCATION',
    title: 'Investors',
    description: 'Private investors acquiring real estate, establishing asset-holding structures, and structuring investments under stable UAE legal frameworks.',
    image: '/business/real-estate.png',
    alt: 'Refined investment terrace and architectural capital planning environment in Dubai',
  },
  {
    eyebrow: 'CROSS-BORDER LEGACY',
    title: 'International Families',
    description: 'Global families coordinating residency, succession planning, governance, and multi-jurisdictional asset protection for long-term continuity.',
    image: '/business/family.png',
    alt: 'International family looking toward the Dubai coastline and horizon from a private terrace',
  },
];

export default function WhyGlowBizPage({ onConsultation }) {
  const reduceMotion = useReducedMotion();
  const [activeNode, setActiveNode] = useState('business');

  const fadeIn = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <div className="why-glowbiz-page">
      {/* =================================================================
          SECTION 01 — HERO
          ================================================================= */}
      <section className="wg-hero wg-waterfront" aria-labelledby="wg-hero-heading">
        <motion.div className="wg-waterfront-art" aria-hidden="true"
          initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 1.1 }}>
          <img src="/why-glowbiz/waterfront.webp" alt="" width="1856" height="848" fetchPriority="high" />
        </motion.div>
        <div className="wg-waterfront-content">
          <motion.p {...fadeIn(0.05)} className="wg-eyebrow">WHY GLOWBIZ</motion.p>
          <motion.h1 {...fadeIn(0.15)} id="wg-hero-heading" className="wg-hero-title">
            <span className="wg-title-navy">Why Clients</span>{' '}
            <span className="wg-title-blue">Work With GlowBiz</span>
          </motion.h1>
          <motion.p {...fadeIn(0.25)} className="wg-hero-body">
            GlowBiz is a strategic consultancy-not just a business setup provider. Clients choose us because our advisory goes beyond licences and forms. We focus on helping you make better structural decisions across business, banking, residency, investment, and long-term family planning.
          </motion.p>
          <motion.div {...fadeIn(0.35)} className="wg-button-group">
            <Link to="/contact" className="wg-btn-primary">Book a Consultation <ArrowRight size={18} aria-hidden="true" /></Link>
            <Link to="/services" className="wg-btn-primary">Explore Our Services <ArrowRight size={18} aria-hidden="true" /></Link>
          </motion.div>
        </div>
      </section>

      {/* =================================================================
          SECTION 02 — EXPERIENCE / CREDIBILITY
          ================================================================= */}
      <section className="wg-experience" aria-labelledby="wg-exp-heading">
        {/* Subtle flowing background vector lines */}
        <svg className="wg-exp-bg-lines" viewBox="0 0 1440 400" fill="none" preserveAspectRatio="none" aria-hidden="true">
          <path d="M-100 200 C300 120, 700 280, 1540 180" stroke="#b7d4ef" strokeWidth="1.2" strokeDasharray="6 6" />
          <path d="M-100 240 C350 160, 750 320, 1540 220" stroke="#d5e6f6" strokeWidth="1" />
          <path d="M-100 160 C400 260, 800 120, 1540 200" stroke="#e0eef9" strokeWidth="1.5" />
        </svg>

        <div className="wg-shell">
          <div className="wg-experience-grid">
            {/* Visual Large Number */}
            <motion.div {...fadeIn(0.1)} className="wg-exp-number-col">
              <div className="wg-exp-giant-number" aria-hidden="true">
                20+
              </div>
              <p className="wg-exp-label">
                YEARS OF EXPERIENCE
              </p>
            </motion.div>

            {/* Main Content */}
            <motion.div {...fadeIn(0.2)} className="wg-exp-content-col">
              <h2 id="wg-exp-heading" className="wg-exp-lead-text">
                Practical insight shaped by decades in international finance.
              </h2>
              <p className="wg-exp-body">
                GlowBiz advisory is backed by more than 20 years of experience in international banking and financial services, providing practical insight into how entrepreneurs, investors, and financial institutions approach business, banking, and wealth decisions in the UAE.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =================================================================
          SECTION 03 — THE GLOWBIZ DIFFERENCE (FIVE PRINCIPLES)
          ================================================================= */}
      <section className="wg-difference" aria-labelledby="wg-diff-heading">
        <div className="wg-shell">
          <div className="wg-diff-header">
            <motion.p {...fadeIn(0.05)} className="wg-eyebrow">
              THE GLOWBIZ DIFFERENCE
            </motion.p>
            <motion.h2 {...fadeIn(0.15)} id="wg-diff-heading">
              Five Principles. One Strategic Approach.
            </motion.h2>
          </div>

          <div className="wg-journey-timeline">
            {/* Continuous vertical connecting line */}
            <div className="wg-journey-spine" aria-hidden="true" />

            {fivePrinciples.map((item, index) => {
              const isOdd = index % 2 === 0;
              return (
                <div
                  key={item.number}
                  className={`wg-journey-step ${isOdd ? 'step-odd' : 'step-even'}`}
                >
                  {/* Milestone Marker along the line */}
                  <div className="wg-step-milestone-marker" aria-hidden="true">
                    {item.number}
                  </div>

                  {/* Text Column */}
                  <motion.div {...fadeIn(0.1)} className="wg-step-text">
                    <span className="wg-step-badge">PRINCIPLE {item.number}</span>
                    <h3>{item.heading}</h3>
                    <p>{item.content}</p>
                  </motion.div>

                  {/* Visual Column */}
                  <motion.div {...fadeIn(0.2)} className="wg-step-visual">
                    <div className={`wg-step-img-card ${item.isBespoke ? 'card-bespoke' : ''}`}>
                      <img
                        src={item.visual}
                        alt={item.alt}
                        loading="lazy"
                        decoding="async"
                        width="800"
                        height="600"
                      />
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =================================================================
          SECTION 04 — CONNECTED THINKING
          ================================================================= */}
      <section className="wg-connected" aria-labelledby="wg-connected-heading">
        <div className="wg-shell">
          <div className="wg-connected-header">
            <motion.p {...fadeIn(0.05)} className="wg-eyebrow">
              CONNECTED THINKING
            </motion.p>
            <motion.h2 {...fadeIn(0.15)} id="wg-connected-heading">
              Better Decisions Begin with the Bigger Picture.
            </motion.h2>
          </div>

          {/* Interactive Connected System */}
          <div className="wg-orbital-system">
            {/* SVG Connecting Curves */}
            <svg className="wg-orbital-svg-bg" viewBox="0 0 980 520" fill="none" aria-hidden="true">
              {/* Outer connection ring */}
              <ellipse cx="490" cy="260" rx="400" ry="210" stroke="#cce0f3" strokeWidth="1.5" strokeDasharray="4 6" />
              <ellipse cx="490" cy="260" rx="270" ry="140" stroke="#e0eefa" strokeWidth="1" />
              
              {/* Lines connecting center to nodes */}
              {/* Node 1: Top (490, 60) */}
              <path d="M490 170 L490 85" stroke="#124a9d" strokeWidth="1.5" strokeOpacity="0.4" />
              {/* Node 2: Top Right (780, 150) */}
              <path d="M570 210 L740 155" stroke="#124a9d" strokeWidth="1.5" strokeOpacity="0.4" />
              {/* Node 3: Bottom Right (710, 410) */}
              <path d="M565 315 L685 405" stroke="#124a9d" strokeWidth="1.5" strokeOpacity="0.4" />
              {/* Node 4: Bottom Left (270, 410) */}
              <path d="M415 315 L295 405" stroke="#124a9d" strokeWidth="1.5" strokeOpacity="0.4" />
              {/* Node 5: Top Left (200, 150) */}
              <path d="M410 210 L240 155" stroke="#124a9d" strokeWidth="1.5" strokeOpacity="0.4" />
            </svg>

            {/* Core Strategy Center */}
            <div className="wg-orbital-center">
              <span className="wg-orbital-center-eyebrow">INTEGRATED CORE</span>
              <span className="wg-orbital-center-title">GLOWBIZ STRATEGY</span>
            </div>

            {/* 5 Satellites */}
            {strategicDisciplines.map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveNode(item.id)}
                onMouseEnter={() => setActiveNode(item.id)}
                className={`wg-satellite-node ${item.posClass} ${activeNode === item.id ? 'is-active' : ''}`}
                aria-pressed={activeNode === item.id}
              >
                <span className="wg-node-indicator" aria-hidden="true" />
                <span className="wg-node-label">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Interactive Context Notice */}
          <div className="wg-orbital-interactive-summary" role="status">
            <strong>{strategicDisciplines.find(n => n.id === activeNode)?.label}: </strong>
            {strategicDisciplines.find(n => n.id === activeNode)?.description}
          </div>
        </div>
      </section>

      {/* =================================================================
          SECTION 05 — WHO THIS APPROACH IS FOR
          ================================================================= */}
      <section className="wg-clients" aria-labelledby="wg-clients-heading">
        <div className="wg-shell">
          <div className="wg-clients-header">
            <motion.p {...fadeIn(0.05)} className="wg-eyebrow">
              BUILT FOR INTERNATIONAL CLIENTS
            </motion.p>
            <motion.h2 {...fadeIn(0.15)} id="wg-clients-heading">
              Strategic Guidance for Your UAE Journey.
            </motion.h2>
          </div>

          <div className="wg-clients-grid">
            {clientGroups.map((group, idx) => (
              <motion.article
                key={group.title}
                {...fadeIn(0.1 + idx * 0.1)}
                className="wg-client-card"
              >
                <div className="wg-client-img-wrap">
                  <img
                    src={group.image}
                    alt={group.alt}
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="410"
                  />
                </div>
                <div className="wg-client-body">
                  <span className="wg-client-eyebrow">{group.eyebrow}</span>
                  <h3 className="wg-client-title">{group.title}</h3>
                  <p className="wg-client-desc">{group.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
