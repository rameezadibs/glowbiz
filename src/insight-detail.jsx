import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle,
  ChevronDown,
  Building2,
  FileCheck2,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  List
} from 'lucide-react';
import { 
  getInsightBySlug, 
  getRelatedInsights 
} from './insights-data';
import {
  updatePageSeo,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  setJsonLd,
  removeJsonLd
} from './seo-utils';
import './insights.css';

export default function InsightDetailPage({ onConsultation }) {
  const { slug } = useParams();
  const reduceMotion = useReducedMotion();
  const article = getInsightBySlug(slug);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (article) {
      // 1. Update document head with comprehensive SEO tags
      updatePageSeo({
        title: `${article.seoTitle || article.title} | GlowBiz Solutions`,
        description: article.seoDescription || article.excerpt,
        canonicalPath: `/insights/${article.slug}`,
        ogImage: article.featuredImage,
        ogType: 'article',
        keywords: article.keywords || [],
        publishedTime: article.isoPublishedDate,
        modifiedTime: article.isoModifiedDate,
        section: article.category
      });

      // 2. Inject Article Schema.org JSON-LD
      setJsonLd('schema-article', buildArticleSchema(article));

      // 3. Inject BreadcrumbList Schema.org JSON-LD
      const breadcrumbs = [
        { name: 'Home', url: '/' },
        { name: 'Insights', url: '/insights' },
        { name: article.title, url: `/insights/${article.slug}` }
      ];
      setJsonLd('schema-breadcrumbs', buildBreadcrumbSchema(breadcrumbs));

      // 4. Inject FAQPage Schema.org JSON-LD if FAQs exist
      if (article.faqs && article.faqs.length > 0) {
        setJsonLd('schema-faq', buildFaqSchema(article.faqs));
      } else {
        removeJsonLd('schema-faq');
      }
    }

    return () => {
      removeJsonLd('schema-article');
      removeJsonLd('schema-breadcrumbs');
      removeJsonLd('schema-faq');
    };
  }, [article, slug]);

  const toggleFaq = index => {
    setOpenFaqIndex(prev => (prev === index ? null : index));
  };

  if (!article) {
    return (
      <main className="insight-detail-page py-32 text-center">
        <div className="ins-shell">
          <h1 className="text-3xl font-serif text-navy mb-4">Insight Not Found</h1>
          <p className="text-slate-600 mb-8">The insight article you are looking for does not exist or may have been relocated.</p>
          <Link to="/insights" className="button button-primary">
            Return to Insights Hub
          </Link>
        </div>
      </main>
    );
  }

  const related = getRelatedInsights(article.slug, 3);

  return (
    <article className="insight-detail-page" itemScope itemType="https://schema.org/Article">
      {/* Hidden microdata for crawlers */}
      <meta itemProp="headline" content={article.title} />
      <meta itemProp="description" content={article.seoDescription || article.excerpt} />
      <meta itemProp="image" content={article.featuredImage} />
      <meta itemProp="datePublished" content={article.isoPublishedDate || '2026-10-18T08:00:00+04:00'} />
      <meta itemProp="dateModified" content={article.isoModifiedDate || '2026-10-22T08:00:00+04:00'} />

      {/* Semantic Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="ins-breadcrumb-nav">
        <div className="ins-shell">
          <ol className="ins-breadcrumb-list">
            <li>
              <Link to="/">Home</Link>
              <span className="ins-bc-separator">/</span>
            </li>
            <li>
              <Link to="/insights">Insights</Link>
              <span className="ins-bc-separator">/</span>
            </li>
            <li aria-current="page">
              <span>{article.category}</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Article Header */}
      <header className="ins-detail-header-section">
        <div className="ins-shell">
          <div className="max-w-[820px] mx-auto">
            <Link to="/insights" className="ins-back-btn">
              <ArrowLeft size={16} aria-hidden="true" />
              <span>Back to All Insights</span>
            </Link>

            <div className="ins-featured-meta-row">
              <span className="ins-badge">{article.category}</span>
              <span className="ins-meta-item">
                <Calendar size={13} aria-hidden="true" />
                <time dateTime={article.isoPublishedDate}>{article.publishedDate}</time>
              </span>
              <span className="ins-meta-item">
                <Clock size={13} aria-hidden="true" />
                <span>{article.readingTime}</span>
              </span>
            </div>

            {/* ONE single H1 per article page */}
            <h1 className="ins-article-h1" itemProp="name">
              {article.title}
            </h1>

            {article.lead && (
              <p className="ins-article-lead">
                {article.lead}
              </p>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="ins-shell py-12">
        <div className="ins-article-body-container">
          {/* Hero Image */}
          <div className="ins-article-hero-img-wrap">
            <img 
              src={article.featuredImage} 
              alt={article.imageAlt || article.title} 
              width="1280" 
              height="720"
              fetchPriority="high"
            />
          </div>

          {/* Table of Contents Box (Enhances SEO & Sitelinks) */}
          {article.tableOfContents && article.tableOfContents.length > 0 && (
            <nav className="ins-toc-box" aria-label="Table of Contents">
              <div className="ins-toc-header">
                <List size={18} className="text-royal" aria-hidden="true" />
                <span className="ins-toc-title">Strategic Outline</span>
              </div>
              <ul className="ins-toc-list">
                {article.tableOfContents.map(item => (
                  <li key={item.id}>
                    <a href={`#${item.id}`}>{item.title}</a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Formatted Article Body */}
          <div className="ins-article-body-text" itemProp="articleBody">
            {article.sections && article.sections.map((sec) => (
              <section 
                key={sec.heading} 
                id={sec.id || undefined} 
                className="ins-article-content-section"
              >
                <h2 className="ins-article-h2">{sec.heading}</h2>
                {sec.content.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </section>
            ))}

            {/* Semantic Comparison Table (If provided) */}
            {article.comparisonTable && (
              <section id={article.comparisonTable.id || "comparative-table"} className="ins-table-section">
                <h2 className="ins-article-h2">{article.comparisonTable.title || 'Strategic Comparative Breakdown'}</h2>
                <div className="ins-comparison-table-wrapper">
                  <table className="ins-comparison-table">
                    <caption>{article.comparisonTable.caption}</caption>
                    <thead>
                      <tr>
                        {article.comparisonTable.headers.map((h, i) => (
                          <th key={i} scope="col">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {article.comparisonTable.rows.map((row, rIdx) => (
                        <tr key={rIdx}>
                          <th scope="row" className="font-semibold text-navy">{row[0]}</th>
                          {row.slice(1).map((cell, cIdx) => (
                            <td key={cIdx}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Editorial Pullquote Callout Block */}
            {article.callout && (
              <blockquote className="ins-article-callout">
                <p className="ins-callout-quote">“{article.callout.quote}”</p>
                {article.callout.attribution && (
                  <footer className="ins-callout-author">
                    — {article.callout.attribution}
                  </footer>
                )}
              </blockquote>
            )}

            {/* Related Service Cross-Link Banner */}
            {article.relatedServicePath && (
              <aside className="ins-service-link-card">
                <div className="flex items-center gap-3 mb-2">
                  <Building2 size={20} className="text-royal" aria-hidden="true" />
                  <span className="text-xs font-bold uppercase tracking-wider text-royal">Strategic Implementation</span>
                </div>
                <h3 className="text-lg font-serif font-bold text-navy mb-2">
                  Need advisory support for this strategic area?
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  GlowBiz advises international founders, family offices, and investors on structuring this discipline with complete regulatory compliance.
                </p>
                <Link to={article.relatedServicePath} className="ins-service-link-btn">
                  <span>Explore {article.relatedServiceLabel || 'Our Services'}</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </aside>
            )}

            {/* Strategic Considerations Box */}
            {article.considerations && article.considerations.length > 0 && (
              <aside className="ins-considerations-box" aria-label="Key Strategic Considerations">
                <h3 className="ins-box-title">
                  <AlertCircle size={18} aria-hidden="true" />
                  Key Strategic Considerations
                </h3>
                <ul className="ins-considerations-list">
                  {article.considerations.map((item, cIdx) => (
                    <li key={cIdx}>{item}</li>
                  ))}
                </ul>
              </aside>
            )}

            {/* Key Takeaways Box */}
            {article.takeaways && article.takeaways.length > 0 && (
              <div className="ins-takeaways-box" role="region" aria-label="Strategic Takeaways">
                <h3 className="ins-box-title">
                  <CheckCircle2 size={18} aria-hidden="true" />
                  Strategic Takeaways
                </h3>
                <ul className="ins-takeaways-list">
                  {article.takeaways.map((item, tIdx) => (
                    <li key={tIdx}>
                      <CheckCircle2 size={18} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* FAQ Accordion Section (High SEO & Rich Snippets Value) */}
            {article.faqs && article.faqs.length > 0 && (
              <section id="faqs" className="ins-faq-section" aria-labelledby="faq-section-heading">
                <div className="flex items-center gap-2 mb-4">
                  <HelpCircle size={20} className="text-royal" aria-hidden="true" />
                  <span className="text-xs font-bold uppercase tracking-wider text-royal">Advisory Clarifications</span>
                </div>
                <h2 id="faq-section-heading" className="ins-article-h2 mt-0">
                  Frequently Asked Questions
                </h2>
                <div className="ins-faq-list">
                  {article.faqs.map((faq, fIdx) => {
                    const isOpen = openFaqIndex === fIdx;
                    return (
                      <div key={fIdx} className="ins-faq-item">
                        <button
                          type="button"
                          className="ins-faq-question-btn"
                          onClick={() => toggleFaq(fIdx)}
                          aria-expanded={isOpen}
                        >
                          <span>{faq.question}</span>
                          <ChevronDown 
                            size={18} 
                            className={`transform transition-transform ${isOpen ? 'rotate-180 text-royal' : 'text-slate-400'}`} 
                          />
                        </button>
                        {isOpen && (
                          <div className="ins-faq-answer">
                            <p>{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* Related Insights Section */}
      {related.length > 0 && (
        <section className="ins-related-section" aria-labelledby="related-insights-heading">
          <div className="ins-shell">
            <div className="ins-section-header">
              <p className="ins-eyebrow">CONTINUE READING</p>
              <h2 id="related-insights-heading" className="ins-section-heading">
                Related Strategic Insights
              </h2>
            </div>

            <div className="ins-library-grid">
              {related.map(rel => (
                <Link 
                  key={rel.id} 
                  to={`/insights/${rel.slug}`} 
                  className="ins-library-card"
                >
                  <div className="ins-library-card-img-wrap">
                    <img 
                      src={rel.featuredImage} 
                      alt={rel.imageAlt} 
                      loading="lazy" 
                    />
                  </div>
                  <div className="ins-library-card-body">
                    <div className="flex items-center gap-3">
                      <span className="ins-badge">{rel.category}</span>
                      <span className="ins-meta-item"><Clock size={12} /> {rel.readingTime}</span>
                    </div>

                    <h3 className="ins-library-card-title">{rel.title}</h3>
                    <p className="ins-library-card-excerpt line-clamp-3">{rel.excerpt}</p>

                    <div className="ins-library-card-footer">
                      <span className="ins-meta-item"><Calendar size={13} /> {rel.publishedDate}</span>
                      <span className="ins-read-link text-sm font-semibold">
                        Read Insight <ArrowRight size={15} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Advisory Consultation CTA */}
      <section className="ins-cta-section" aria-labelledby="detail-cta-heading">
        <picture className="ins-cta-bg-picture pointer-events-none" aria-hidden="true">
          <img 
            src="/insights/cta-strategy-transition.jpg" 
            alt="Strategic master plan and advisory transition" 
            loading="lazy" 
          />
        </picture>
        <div className="ins-cta-wash" aria-hidden="true" />

        <div className="ins-shell">
          <div className="ins-cta-inner">
            <p className="ins-cta-eyebrow">
              FROM INSIGHT TO ACTION
            </p>

            <h2 id="detail-cta-heading" className="ins-cta-title">
              Need Clarity on Your<br />UAE Strategy?
            </h2>

            <p className="ins-cta-body">
              Understanding your options is the first step. GlowBiz can help you evaluate how business, banking, residency, investment and long-term planning decisions fit together.
            </p>

            <div className="ins-cta-btn-group">
              <button 
                type="button" 
                onClick={onConsultation}
                className="ins-cta-primary-btn"
              >
                Book a Consultation <ArrowRight size={18} aria-hidden="true" />
              </button>

              <Link to="/services" className="ins-cta-secondary-btn">
                Explore Our Services <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>

            <div className="ins-cta-pillars-row">
              <span className="ins-cta-pillar-item">
                <FileCheck2 size={16} className="text-sky-300" />
                Information
              </span>
              <span className="ins-cta-pillar-divider" aria-hidden="true" />
              <span className="ins-cta-pillar-item">
                <ShieldCheck size={16} className="text-sky-300" />
                Understanding
              </span>
              <span className="ins-cta-pillar-divider" aria-hidden="true" />
              <span className="ins-cta-pillar-item">
                <Sparkles size={16} className="text-sky-300" />
                Structured Strategy
              </span>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
