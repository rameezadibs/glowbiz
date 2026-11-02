import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowDown, 
  Search, 
  X, 
  Clock, 
  Calendar, 
  Building2, 
  Landmark, 
  ShieldCheck, 
  Compass, 
  TrendingUp, 
  Users,
  ChevronRight,
  CheckCircle2,
  FileCheck2,
  Sparkles
} from 'lucide-react';
import { 
  INSIGHT_CATEGORIES, 
  insightsArticles, 
  getFeaturedInsight,
  getSuggestedInsights 
} from './insights-data';
import {
  updatePageSeo,
  setJsonLd,
  removeJsonLd
} from './seo-utils';
import './insights.css';

// Strategic connection details for Section 05
const strategicConnectionsData = {
  business: {
    id: 'business',
    label: 'Business Structuring',
    shortLabel: 'BUSINESS',
    icon: Building2,
    description: 'Corporate form, licensing jurisdiction (Mainland vs Free Zone), and physical office substance establish the operational foundation for all secondary UAE approvals.',
    connections: [
      { target: 'Banking', text: 'Bank compliance evaluates the commercial rationale and verifiable substance of your corporate licence before opening accounts.' },
      { target: 'Residency', text: 'Company establishment dictates executive visa quotas, establishment card issuance, and shareholder residency eligibility.' },
      { target: 'Wealth & Family', text: 'Shareholding structures determine whether business interests pass directly to family members or encounter probate obstacles.' },
      { target: 'Investment', text: 'Corporate vehicles enable tax-efficient holding of commercial real estate and direct operating subsidiaries.' },
    ]
  },
  banking: {
    id: 'banking',
    label: 'Banking & Treasury',
    shortLabel: 'BANKING',
    icon: Landmark,
    description: 'Corporate bank account opening requires demonstrable shareholder track records, verifiable supplier contracts, and transparent source of wealth.',
    connections: [
      { target: 'Business', text: 'Trading activities on your licence must align precisely with transaction profiles and banking risk categorisation.' },
      { target: 'Investment', text: 'Smooth cross-border treasury accounts allow flexible deployment into property acquisitions and capital markets.' },
      { target: 'Residency', text: 'Personal UAE residency status and Emirates ID are prerequisite milestones for premier personal and corporate banking tiers.' },
      { target: 'Wealth & Family', text: 'Properly designated bank mandates and corporate signing authorities ensure business continuity in unexpected events.' },
    ]
  },
  residency: {
    id: 'residency',
    label: 'Residency & Golden Visa',
    shortLabel: 'RESIDENCY',
    icon: Compass,
    description: '10-year Golden Visa residency provides independent status, international travel flexibility, and multi-generational family security in Dubai and Abu Dhabi.',
    connections: [
      { target: 'Banking', text: 'Maintaining valid UAE tax residency status provides banking certainty under Common Reporting Standards (CRS).' },
      { target: 'Wealth & Family', text: 'Golden Visa holders can sponsor spouses, children of any age, and senior parents under one unified framework.' },
      { target: 'Investment', text: 'Qualifying real estate investments above statutory thresholds grant direct eligibility for 10-year residency.' },
      { target: 'Business', text: 'Residency allows founders to live, work, and direct local operations without depending on external employment sponsors.' },
    ]
  },
  investment: {
    id: 'investment',
    label: 'Investment & Real Estate',
    shortLabel: 'INVESTMENT',
    icon: TrendingUp,
    description: 'Capital deployment into prime real estate and local assets demands rigorous escrow verification, developer due diligence, and tailored title holding.',
    connections: [
      { target: 'Residency', text: 'Real estate portfolio acquisitions offer a direct, asset-backed pathway to 10-year Golden Visa status.' },
      { target: 'Wealth & Family', text: 'Holding properties within DIFC/ADGM Special Purpose Vehicles (SPVs) protects assets and prevents title probate delays.' },
      { target: 'Banking', text: 'Real estate transactions require verified source of funds and structured escrow banking coordination.' },
      { target: 'Business', text: 'Commercial real estate ownership provides tangible physical substance for operating entities.' },
    ]
  },
  wealth: {
    id: 'wealth',
    label: 'Wealth & Family Planning',
    shortLabel: 'WEALTH & FAMILY',
    icon: Users,
    description: 'Common-law DIFC Wills, private foundations, and family charters safeguard multi-generational assets across international jurisdictions.',
    connections: [
      { target: 'Business', text: 'Family governance agreements specify succession rules and share transfer procedures for operating companies.' },
      { target: 'Banking', text: 'Structured foundation accounts safeguard family liquidity and ensure swift emergency access for beneficiaries.' },
      { target: 'Residency', text: 'Unified family residency protects the next generation’s educational and living arrangements in the UAE.' },
      { target: 'Investment', text: 'Consolidating family property holdings into one asset protection vehicle simplifies multi-generational management.' },
    ]
  }
};

export default function InsightsPage({ onConsultation }) {
  const reduceMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState('All Insights');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStrategicNode, setActiveStrategicNode] = useState('business');

  useEffect(() => {
    window.scrollTo(0, 0);

    updatePageSeo({
      title: 'UAE Business, Banking & Investment Insights | GlowBiz Solutions',
      description: 'Explore strategic insights from GlowBiz on UAE business setup, banking, residency, Golden Visa, investment, real estate and succession planning for international clients.',
      canonicalPath: '/insights',
      ogImage: '/insights/mainland.png',
      ogType: 'website',
      keywords: [
        'UAE Business Insights',
        'Dubai company setup guide',
        'UAE banking readiness',
        'Golden Visa UAE pathways',
        'Corporate tax UAE considerations',
        'Dubai property investment due diligence',
        'Succession planning expat UAE'
      ]
    });

    const collectionSchema = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': 'https://glowbizsolutions.ae/insights#collection',
      'name': 'UAE Business, Banking & Investment Insights | GlowBiz Solutions',
      'description': 'Strategic intelligence and advisory insights on UAE business setup, corporate banking, residency, investment, and cross-border family succession.',
      'url': 'https://glowbizsolutions.ae/insights',
      'publisher': {
        '@type': 'Organization',
        'name': 'GlowBiz Solutions',
        'url': 'https://glowbizsolutions.ae',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://glowbizsolutions.ae/logo.png'
        }
      },
      'mainEntity': {
        '@type': 'ItemList',
        'itemListElement': insightsArticles.map((article, index) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'name': article.title,
          'url': `https://glowbizsolutions.ae/insights/${article.slug}`
        }))
      }
    };
    setJsonLd('schema-insights-collection', collectionSchema);

    return () => {
      removeJsonLd('schema-insights-collection');
    };
  }, []);

  // Filtered list of articles for the clean 1-by-1 organized catalogue
  const filteredArticles = useMemo(() => {
    return insightsArticles.filter(article => {
      const matchesCategory = 
        selectedCategory === 'All Insights' || article.category === selectedCategory;
      
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = 
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const scrollToArticles = () => {
    const el = document.getElementById('insights-catalogue');
    if (el) {
      const headerOffset = 90;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

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
    <div className="insights-page">
      {/* =================================================================
          SECTION 01 — INSIGHTS HERO
          ================================================================= */}
      <section className="ins-hero" aria-labelledby="insights-hero-heading">
        <div className="ins-hero-bg-accent" aria-hidden="true" />
        <div className="ins-shell">
          <div className="ins-hero-center-wrap text-center">
            <motion.div {...fadeIn(0.05)} className="ins-hero-content">
              <p className="ins-eyebrow justify-center">GLOWBIZ INSIGHTS</p>
              
              <h1 id="insights-hero-heading" className="ins-hero-title">
                <span className="ins-h1-navy">Clarity for Better </span>
                <span className="ins-h1-blue">UAE Decisions.</span>
              </h1>

              <p className="ins-hero-lead">
                Practical, structured advisory guides for entrepreneurs, investors and international families navigating business setup, banking readiness, residency, and long-term planning in the UAE.
              </p>

              <button 
                type="button"
                onClick={scrollToArticles}
                className="ins-hero-scroll-btn"
                aria-label="Scroll to insights directory"
              >
                <span>Browse All Insights</span>
                <ArrowDown size={17} aria-hidden="true" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =================================================================
          SECTION 02 — CLEAN TOPIC NAVIGATION STRIP
          ================================================================= */}
      <nav className="ins-categories-strip" aria-label="Insight categories filter">
        <div className="ins-shell">
          <div className="ins-categories-inner">
            <span className="ins-cat-eyebrow">
              FILTER BY TOPIC:
            </span>

            <div className="ins-cat-nav-list" role="tablist">
              {INSIGHT_CATEGORIES.map(category => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      setSelectedCategory(category);
                      scrollToArticles();
                    }}
                    className={`ins-cat-tab ${isActive ? 'active' : ''}`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* =================================================================
          SECTION 03 — ORGANIZED 1-BY-1 INSIGHTS DIRECTORY
          ================================================================= */}
      <section id="insights-catalogue" className="ins-catalogue-section" aria-labelledby="catalogue-heading">
        <div className="ins-shell">
          {/* Header & Search Toolbar */}
          <div className="ins-catalogue-toolbar">
            <div className="ins-catalogue-header-info">
              <span className="ins-catalogue-badge">Advisory Knowledge Hub</span>
              <h2 id="catalogue-heading" className="ins-catalogue-heading">
                All Strategic Insights
              </h2>
              <p className="ins-catalogue-subtitle">
                Organized guide-by-guide for comprehensive reference. Select any insight for detailed regulatory analysis, comparisons and step-by-step guidance.
              </p>
            </div>

            <div className="ins-search-wrap">
              <Search size={18} className="ins-search-icon" aria-hidden="true" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by topic, keyword, or title..." 
                className="ins-search-input"
                aria-label="Search insights"
              />
              {searchQuery && (
                <button 
                  type="button" 
                  onClick={() => setSearchQuery('')}
                  className="ins-search-clear-btn"
                  aria-label="Clear search query"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Status Counter Bar */}
          <div className="ins-catalogue-status-bar">
            <span className="ins-status-text">
              Showing <strong>{filteredArticles.length}</strong> {filteredArticles.length === 1 ? 'guide' : 'guides'}
              {selectedCategory !== 'All Insights' && (
                <> in <strong>{selectedCategory}</strong></>
              )}
              {searchQuery && (
                <> matching &ldquo;<strong>{searchQuery}</strong>&rdquo;</>
              )}
            </span>

            {(selectedCategory !== 'All Insights' || searchQuery) && (
              <button 
                type="button" 
                onClick={() => {
                  setSelectedCategory('All Insights');
                  setSearchQuery('');
                }}
                className="ins-reset-filter-btn"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* 3 in a row Grid Layout */}
          {filteredArticles.length > 0 ? (
            <div className="ins-grid" role="feed" aria-label="Insights directory">
              {filteredArticles.map((article, index) => {
                return (
                  <motion.article 
                    key={article.id}
                    {...fadeIn(0.04 * Math.min(index, 6))}
                    className="ins-card-item"
                  >
                    <Link 
                      to={`/insights/${article.slug}`} 
                      className="ins-card-link group"
                      aria-label={`Read guide: ${article.title}`}
                    >
                      {/* Rectangular Image Frame */}
                      <div className="ins-card-thumb-frame">
                        <img 
                          src={article.featuredImage} 
                          alt={article.imageAlt}
                          loading="lazy"
                          width="480"
                          height="300"
                        />
                        <span className="ins-card-category-badge">{article.category}</span>
                      </div>

                      {/* Card Content Body */}
                      <div className="ins-card-body">
                        <div className="ins-card-meta">
                          {article.isSuggested && (
                            <span className="ins-badge-suggested">Suggested</span>
                          )}
                          <span className="ins-meta-item">
                            <Clock size={13} aria-hidden="true" />
                            {article.readingTime}
                          </span>
                          <span className="ins-meta-item">
                            <Calendar size={13} aria-hidden="true" />
                            {article.publishedDate}
                          </span>
                        </div>

                        <h3 className="ins-card-title">
                          {article.title}
                        </h3>

                        <p className="ins-card-excerpt">
                          {article.excerpt}
                        </p>

                        <div className="ins-card-footer">
                          <span className="ins-card-read-btn">
                            <span>Read Full Insight</span>
                            <ArrowRight size={16} aria-hidden="true" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                );
              })}
            </div>
          ) : (
            <div className="ins-empty-state">
              <Search size={34} className="mx-auto text-slate-400" aria-hidden="true" />
              <h3 className="ins-empty-title">No Insights Found</h3>
              <p className="ins-empty-text">
                We couldn't find any guides matching your search criteria. Try adjusting your search query or selecting a different category.
              </p>
              <button 
                type="button" 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All Insights');
                }}
                className="button button-primary"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =================================================================
          SECTION 04 — STRATEGIC PERSPECTIVES (CONNECTED NETWORK)
          ================================================================= */}
      <section className="ins-perspectives-section" aria-labelledby="perspectives-heading">
        <div className="ins-shell">
          <div className="ins-perspectives-header">
            <motion.p {...fadeIn(0.05)} className="ins-eyebrow">STRATEGIC PERSPECTIVES</motion.p>
            <motion.h2 {...fadeIn(0.12)} id="perspectives-heading" className="ins-section-heading">
              Understand the Connections Behind Every Decision
            </motion.h2>
            <motion.p {...fadeIn(0.2)} className="ins-perspectives-lead">
              Important UAE decisions rarely exist in isolation. Business structure can influence banking. Residency can influence long-term planning. Investment decisions can affect liquidity and family objectives.
            </motion.p>
          </div>

          <motion.div {...fadeIn(0.25)} className="ins-network-container">
            {/* Interactive Discipline Selector Tabs */}
            <div className="ins-disciplines-row" role="tablist" aria-label="Select strategic discipline">
              {Object.keys(strategicConnectionsData).map(key => {
                const item = strategicConnectionsData[key];
                const IconComponent = item.icon;
                const isActive = activeStrategicNode === key;
                return (
                  <button
                    key={key}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveStrategicNode(key)}
                    className={`ins-node-btn ${isActive ? 'active' : ''}`}
                  >
                    <div className="ins-node-icon" aria-hidden="true">
                      <IconComponent size={20} />
                    </div>
                    <span className="ins-node-title">{item.shortLabel}</span>
                  </button>
                );
              })}
            </div>

            {/* Strategic Connections Detail Card */}
            {strategicConnectionsData[activeStrategicNode] && (
              <div className="ins-connection-detail-card">
                <h3 className="ins-detail-title">
                  {strategicConnectionsData[activeStrategicNode].label}
                </h3>
                <p className="ins-detail-body">
                  {strategicConnectionsData[activeStrategicNode].description}
                </p>

                <h4 className="text-xs font-bold tracking-wider text-royal uppercase mb-3">
                  Interconnected Strategic Dependencies:
                </h4>
                <div className="ins-detail-connections-list">
                  {strategicConnectionsData[activeStrategicNode].connections.map(conn => (
                    <div key={conn.target} className="ins-connection-item">
                      <ChevronRight size={16} aria-hidden="true" />
                      <div>
                        <strong className="block text-navy font-semibold">{conn.target}:</strong>
                        <span>{conn.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="ins-perspectives-cta">
              <Link to="/services" className="button button-primary">
                Explore Our Services <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
