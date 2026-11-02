import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  ArrowRight, 
  Building2, 
  Landmark, 
  Compass, 
  TrendingUp, 
  Users,
  ShieldCheck,
  CheckCircle2,
  Clock,
  FileText
} from 'lucide-react';
import { updatePageSeo, setJsonLd, removeJsonLd } from './seo-utils';
import { GLOWBIZ_WHATSAPP_CONFIG, getWhatsAppUrl } from './whatsapp-config';
import { ProcessWaves } from './process';
import './contact.css';

// WhatsApp icon SVG component
function WhatsAppIcon({ size = 20, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
      aria-hidden="true"
    >
      <path d="M12.031 2C6.503 2 2.016 6.486 2.016 12.014c0 1.765.46 3.488 1.334 5.006L2 22l5.12-1.343a9.98 9.98 0 0 0 4.91 1.28h.004c5.526 0 10.014-4.488 10.014-10.016 0-2.676-1.041-5.191-2.934-7.085A9.957 9.957 0 0 0 12.031 2zm0 18.258h-.003a8.27 8.27 0 0 1-4.218-1.155l-.302-.18-3.136.822.836-3.056-.197-.314a8.28 8.28 0 0 1-1.27-4.361c0-4.57 3.718-8.287 8.29-8.287 2.215 0 4.296.863 5.862 2.43 1.567 1.567 2.429 3.65 2.429 5.865 0 4.57-3.719 8.288-8.289 8.288zm4.542-6.197c-.249-.125-1.474-.727-1.703-.81-.228-.083-.395-.125-.561.125-.166.249-.644.81-.789.977-.145.166-.291.187-.54.062-.249-.125-1.052-.388-2.003-1.236-.74-.66-1.24-1.476-1.385-1.725-.145-.249-.015-.384.11-.508.112-.112.249-.291.374-.436.124-.145.166-.249.249-.415.083-.166.042-.312-.021-.436-.062-.125-.561-1.35-.769-1.85-.202-.488-.407-.422-.561-.43l-.478-.008c-.166 0-.436.062-.664.312-.228.249-.872.852-.872 2.078 0 1.226.893 2.41 1.018 2.576.125.166 1.756 2.682 4.254 3.762.594.257 1.058.411 1.421.526.598.19 1.142.163 1.572.099.48-.072 1.474-.602 1.682-1.184.207-.582.207-1.08.145-1.184-.062-.104-.228-.166-.477-.291z" />
    </svg>
  );
}

// 5 Interconnected Advisory Areas for Section 02
const advisoryPathways = [
  { id: 'business', label: 'Business', icon: Building2, desc: 'Corporate structuring & licences' },
  { id: 'banking', label: 'Banking', icon: Landmark, desc: 'KYC & treasury readiness' },
  { id: 'residency', label: 'Residency', icon: Compass, desc: '10-Year Golden Visa pathways' },
  { id: 'investment', label: 'Investment', icon: TrendingUp, desc: 'Real estate & asset holding' },
  { id: 'family', label: 'Family Planning', icon: Users, desc: 'Wills, succession & governance' }
];

// 5 Conversation topics for Section 03
const discussionTopics = [
  {
    topicKey: 'business',
    title: 'Business & Structuring',
    desc: 'Discuss company setup, jurisdiction, ownership structure and broader UAE business requirements.'
  },
  {
    topicKey: 'banking',
    title: 'Banking',
    desc: 'Discuss banking readiness, KYC preparation and the steps involved before approaching UAE financial institutions.'
  },
  {
    topicKey: 'residency',
    title: 'Golden Visa & Residency',
    desc: 'Discuss potential UAE residency pathways and how residency may connect with business or investment plans.'
  },
  {
    topicKey: 'investment',
    title: 'Investment & Real Estate',
    desc: 'Discuss UAE investment and property considerations within your broader objectives.'
  },
  {
    topicKey: 'family',
    title: 'Family Protection & Succession',
    desc: 'Discuss long-term family planning, succession, wills and related wealth protection considerations.'
  }
];

// 3 Helpful Guidance Prompts for Section 05
const contextPrompts = [
  {
    id: 'planning',
    label: 'HELPFUL CONTEXT',
    question: 'What Are You Planning?',
    guidance: 'For example: business setup, banking, residency, investment or long-term family planning.'
  },
  {
    id: 'location',
    label: 'HELPFUL CONTEXT',
    question: 'Where Are You Currently Based?',
    guidance: 'This helps provide context for international and cross-border requirements.'
  },
  {
    id: 'stage',
    label: 'HELPFUL CONTEXT',
    question: 'What Stage Are You At?',
    guidance: 'Exploring options, preparing to proceed, or already established in the UAE.'
  }
];

export default function ContactPage() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);

    // Document SEO Title and Description
    updatePageSeo({
      title: 'Contact GlowBiz | UAE Business & Wealth Advisory',
      description: 'Contact GlowBiz on WhatsApp to discuss UAE business setup, banking, residency, Golden Visa, investment, real estate and long-term planning requirements.',
      canonicalPath: '/contact',
      ogImage: '/contact-lounge.jpg',
      ogType: 'website',
      keywords: [
        'Contact GlowBiz WhatsApp',
        'GlowBiz UAE consultation',
        'Dubai business advisory WhatsApp',
        'UAE banking readiness consultation',
        'Golden Visa consultation UAE',
        'Dubai property investment advisory'
      ]
    });

    // ContactPage Schema.org JSON-LD
    const contactSchema = {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      '@id': 'https://glowbizsolutions.ae/contact#webpage',
      'url': 'https://glowbizsolutions.ae/contact',
      'name': 'Contact GlowBiz | UAE Business & Wealth Advisory',
      'description': 'Direct WhatsApp consultation entry point for GlowBiz UAE business setup, banking, residency, and wealth advisory.',
      'mainEntity': {
        '@type': 'Organization',
        'name': 'GlowBiz Solutions',
        'url': 'https://glowbizsolutions.ae',
        'contactPoint': {
          '@type': 'ContactPoint',
          'telephone': `+${GLOWBIZ_WHATSAPP_CONFIG.phoneNumber}`,
          'contactType': 'consultation',
          'availableLanguage': ['English', 'Arabic']
        }
      }
    };
    setJsonLd('schema-contact-page', contactSchema);

    return () => {
      removeJsonLd('schema-contact-page');
    };
  }, []);

  const fadeIn = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { 
      duration: reduceMotion ? 0 : 0.5, 
      delay: reduceMotion ? 0 : delay, 
      ease: [0.16, 1, 0.3, 1] 
    },
  });

  return (
    <div className="contact-page">
      {/* =================================================================
          SECTION 01 — CONTACT HERO
          ================================================================= */}
      <section className="cnt-hero-section" aria-labelledby="contact-hero-heading">
        <div className="cnt-hero-bg-accent" aria-hidden="true" />
        <div className="cnt-shell">
          <div className="cnt-hero-center-wrap">
            <motion.div {...fadeIn(0.05)} className="cnt-hero-content">
              <p className="cnt-eyebrow">LET’S CONNECT</p>
              
              <h1 id="contact-hero-heading" className="cnt-hero-title">
                <span className="cnt-h1-navy">Start a Conversation </span>
                <span className="cnt-h1-blue">with GlowBiz.</span>
              </h1>

              <p className="cnt-hero-lead">
                Whether you are considering business setup, banking, UAE residency, investment, real estate or long-term family planning, start a conversation with GlowBiz and understand the right next steps for your UAE journey.
              </p>

              <div className="cnt-hero-cta-wrap">
                <a 
                  href={getWhatsAppUrl('general')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cnt-wa-btn-primary"
                  aria-label="Chat on WhatsApp with GlowBiz"
                >
                  <WhatsAppIcon size={20} className="cnt-wa-icon" />
                  <span>Chat on WhatsApp</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </a>

                <div className="cnt-hero-reassurance">
                  <span className="cnt-live-dot" aria-hidden="true" />
                  <span>Direct Advisory • WhatsApp Official Channel</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =================================================================
          SECTION 02 — ONE CONVERSATION, CLEARER NEXT STEPS
          ================================================================= */}
      <section className="cnt-pathway-section" aria-labelledby="pathway-heading">
        <div className="cnt-shell">
          <div className="cnt-pathway-header">
            <motion.p {...fadeIn(0.05)} className="cnt-eyebrow justify-center">
              SIMPLE. DIRECT. PERSONAL.
            </motion.p>
            <motion.h2 {...fadeIn(0.1)} id="pathway-heading" className="cnt-section-title">
              One Conversation.<br />Clearer Next Steps.
            </motion.h2>
            <motion.p {...fadeIn(0.15)} className="cnt-section-subtitle">
              You do not need to know exactly which service you require before getting in touch. Share what you are planning, and GlowBiz can help you understand the areas that may need to be considered together.
            </motion.p>
          </div>

          <motion.div {...fadeIn(0.2)} className="cnt-track-container">
            <div className="cnt-pathway-steps" role="list">
              {advisoryPathways.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.id} className="cnt-path-step" role="listitem">
                    <div className="cnt-step-icon-wrap" aria-hidden="true">
                      <IconComponent size={22} />
                    </div>
                    <span className="cnt-step-label">{item.label}</span>
                    <span className="cnt-step-sub">{item.desc}</span>
                  </div>
                );
              })}
            </div>

            <div className="cnt-pathway-center-connector">
              <span className="cnt-connector-eyebrow">INTEGRATED UAE ADVISORY</span>
              <a 
                href={getWhatsAppUrl('general')}
                target="_blank"
                rel="noopener noreferrer"
                className="cnt-wa-btn-primary"
                aria-label="Start the conversation with GlowBiz on WhatsApp"
              >
                <WhatsAppIcon size={19} className="cnt-wa-icon" />
                <span>Start the Conversation</span>
                <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =================================================================
          SECTION 03 — WHAT YOU CAN DISCUSS
          ================================================================= */}
      <section className="cnt-topics-section relative isolate overflow-hidden" aria-labelledby="topics-heading">
        <ProcessWaves />
        <div className="cnt-shell">
          <div className="cnt-topics-header">
            <motion.p {...fadeIn(0.05)} className="cnt-eyebrow justify-center">
              HOW WE CAN HELP
            </motion.p>
            <motion.h2 {...fadeIn(0.1)} id="topics-heading" className="cnt-section-title">
              What Would You Like<br />to Discuss?
            </motion.h2>
          </div>

          <div className="cnt-topics-list">
            {discussionTopics.map((topic, index) => (
              <motion.div 
                key={topic.topicKey}
                {...fadeIn(0.06 * index)}
                className="cnt-topic-row"
              >
                <a 
                  href={getWhatsAppUrl(topic.topicKey)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cnt-topic-row-link"
                  aria-label={`Discuss ${topic.title} on WhatsApp`}
                >
                  <h3 className="cnt-topic-title">{topic.title}</h3>
                  <p className="cnt-topic-desc">{topic.desc}</p>
                  <div className="cnt-topic-action">
                    <span className="cnt-topic-btn">
                      <WhatsAppIcon size={16} className="text-emerald-500" />
                      <span>Discuss on WhatsApp</span>
                      <ArrowRight size={15} aria-hidden="true" />
                    </span>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================
          SECTION 04 — DIRECT WHATSAPP CONSULTATION CARD (REDESIGNED)
          ================================================================= */}
      <section className="cnt-consult-section" aria-labelledby="consultation-block-heading">
        <div className="cnt-shell">
          <motion.div {...fadeIn(0.08)} className="cnt-consult-card">
            {/* Left Column: Value Proposition & Direct WhatsApp Action */}
            <div className="cnt-consult-left">
              <div className="cnt-consult-badge-row">
                <span className="cnt-consult-pill">
                  <span className="cnt-live-pulse-dot" aria-hidden="true" />
                  DIRECT ADVISORY CHANNEL
                </span>
                <span className="cnt-consult-time-tag">Fast Response • Mon–Sat</span>
              </div>

              <h2 id="consultation-block-heading" className="cnt-consult-title">
                Your UAE Questions.<br />
                <span>One Direct Conversation.</span>
              </h2>

              <p className="cnt-consult-body">
                Skip long inquiry forms and waiting times. Connect with a dedicated GlowBiz senior advisor on WhatsApp to discuss your objectives, clarify requirements, and identify the most efficient route forward.
              </p>

              <div className="cnt-consult-cta-group">
                <a 
                  href={getWhatsAppUrl('general')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cnt-wa-btn-primary"
                  aria-label="Connect on WhatsApp with GlowBiz Senior Advisor"
                >
                  <WhatsAppIcon size={20} className="cnt-wa-icon" />
                  <span>Start WhatsApp Consultation</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </a>

                <span className="cnt-consult-reassurance-note">
                  <ShieldCheck size={16} className="text-royal" aria-hidden="true" />
                  100% Confidential • Direct Advisor Access
                </span>
              </div>
            </div>

            {/* Right Column: Advisory Highlights & What to Expect */}
            <div className="cnt-consult-right">
              <div className="cnt-consult-perks-card">
                <h3 className="cnt-perks-title">What to Expect from Your Session</h3>
                
                <ul className="cnt-perks-list">
                  <li className="cnt-perk-item">
                    <div className="cnt-perk-icon-wrap" aria-hidden="true">
                      <CheckCircle2 size={18} />
                    </div>
                    <div>
                      <strong>Objective Review & Assessment</strong>
                      <p>We evaluate your business activity, corporate structure, or residency route objectively.</p>
                    </div>
                  </li>

                  <li className="cnt-perk-item">
                    <div className="cnt-perk-icon-wrap" aria-hidden="true">
                      <Clock size={18} />
                    </div>
                    <div>
                      <strong>Timeline & Sequenced Milestones</strong>
                      <p>Clear guidance on whether company setup, residency, or banking should be prioritized first.</p>
                    </div>
                  </li>

                  <li className="cnt-perk-item">
                    <div className="cnt-perk-icon-wrap" aria-hidden="true">
                      <FileText size={18} />
                    </div>
                    <div>
                      <strong>Direct Transparent Costing</strong>
                      <p>Full breakdown of licensing fees, visa expenses, and banking readiness requirements.</p>
                    </div>
                  </li>
                </ul>

                <div className="cnt-perks-footer">
                  <span className="cnt-perks-footer-text">
                    Official UAE Strategic Advisory • DIFC Gate Precinct
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =================================================================
          SECTION 05 — BEFORE YOU MESSAGE
          ================================================================= */}
      <section className="cnt-context-section" aria-labelledby="context-heading">
        <div className="cnt-shell">
          <div className="cnt-context-header">
            <motion.p {...fadeIn(0.05)} className="cnt-eyebrow justify-center">
              BEFORE YOU CONNECT
            </motion.p>
            <motion.h2 {...fadeIn(0.1)} id="context-heading" className="cnt-section-title">
              A Little Context Helps Us<br />Understand Your Requirements.
            </motion.h2>
            <motion.p {...fadeIn(0.15)} className="cnt-section-subtitle">
              When contacting GlowBiz, you can briefly share what you are considering and where you currently are in your UAE journey.
            </motion.p>
          </div>

          <div className="cnt-prompts-grid">
            {contextPrompts.map((prompt, idx) => (
              <motion.div 
                key={prompt.id} 
                {...fadeIn(0.08 * idx)}
                className="cnt-prompt-card"
              >
                <span className="cnt-prompt-number">{prompt.label}</span>
                <h3 className="cnt-prompt-question">{prompt.question}</h3>
                <p className="cnt-prompt-guidance">{prompt.guidance}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================
          SECTION 06 — FINAL WHATSAPP CTA
          ================================================================= */}
      <section className="cnt-final-cta-section" aria-labelledby="final-cta-heading">
        <div className="cnt-shell">
          <motion.div {...fadeIn(0.08)} className="cnt-final-inner">
            <p className="cnt-eyebrow justify-center">READY WHEN YOU ARE</p>
            <h2 id="final-cta-heading" className="cnt-final-title">
              Start Your UAE Conversation<br />with GlowBiz.
            </h2>
            <p className="cnt-final-body">
              Tell us what you are considering, and begin with a clearer understanding of your next steps.
            </p>

            <a 
              href={getWhatsAppUrl('general')}
              target="_blank"
              rel="noopener noreferrer"
              className="cnt-wa-btn-primary"
              aria-label="Chat with GlowBiz on WhatsApp"
            >
              <WhatsAppIcon size={20} className="cnt-wa-icon" />
              <span>Chat with GlowBiz on WhatsApp</span>
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* =================================================================
          FLOATING WHATSAPP BUTTON (BOTTOM RIGHT)
          ================================================================= */}
      <aside aria-label="WhatsApp quick chat option">
        <a 
          href={getWhatsAppUrl('general')}
          target="_blank"
          rel="noopener noreferrer"
          className="cnt-floating-wa"
          aria-label="Chat with GlowBiz on WhatsApp (opens in new tab)"
        >
          <span className="cnt-floating-icon-bubble">
            <WhatsAppIcon size={20} />
          </span>
          <span className="cnt-floating-text">Chat with GlowBiz</span>
        </a>
      </aside>
    </div>
  );
}
