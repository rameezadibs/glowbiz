/**
 * GlowBiz Solutions — High-Performance SEO & Structured Data Engine
 * Manages dynamic meta tags, Open Graph, Twitter cards, canonical URLs,
 * and JSON-LD schema (Article, Breadcrumbs, FAQPage, Organization).
 */

const BASE_URL = 'https://glowbizsolutions.ae';

/**
 * Updates or creates a meta tag in document head
 */
function setMetaTag(selector, attributeName, attributeValue, content) {
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Updates or creates canonical link
 */
function setCanonicalUrl(url) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

/**
 * Updates or inserts a JSON-LD structured data block
 */
export function setJsonLd(id, schemaObject) {
  let script = document.getElementById(id);
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schemaObject);
}

/**
 * Removes a JSON-LD script if needed
 */
export function removeJsonLd(id) {
  const script = document.getElementById(id);
  if (script) {
    script.remove();
  }
}

/**
 * Injects complete SEO metadata for an article or page
 */
export function updatePageSeo({
  title,
  description,
  canonicalPath = '',
  ogImage = '/assets/dubai-1920.webp',
  ogType = 'website',
  keywords = [],
  publishedTime,
  modifiedTime,
  author = 'GlowBiz Solutions Advisory Practice',
  section
}) {
  const fullUrl = `${BASE_URL}${canonicalPath}`;
  const fullImageUrl = ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`;

  // 1. Page Title
  document.title = title;

  // 2. Standard Meta Description & Keywords
  setMetaTag('meta[name="description"]', 'name', 'description', description);
  if (keywords.length > 0) {
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords.join(', '));
  }

  // 3. Canonical Tag
  setCanonicalUrl(fullUrl);

  // 4. Open Graph Tags
  setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
  setMetaTag('meta[property="og:url"]', 'property', 'og:url', fullUrl);
  setMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
  setMetaTag('meta[property="og:image"]', 'property', 'og:image', fullImageUrl);
  setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'GlowBiz Solutions');
  setMetaTag('meta[property="og:locale"]', 'property', 'og:locale', 'en_AE');

  if (publishedTime) {
    setMetaTag('meta[property="article:published_time"]', 'property', 'article:published_time', publishedTime);
  }
  if (modifiedTime) {
    setMetaTag('meta[property="article:modified_time"]', 'property', 'article:modified_time', modifiedTime);
  }
  if (section) {
    setMetaTag('meta[property="article:section"]', 'property', 'article:section', section);
  }

  // 5. Twitter Card Tags
  setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
  setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
  setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
  setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', fullImageUrl);
}

/**
 * Builds schema.org Article structured data
 */
export function buildArticleSchema(article) {
  const fullUrl = `${BASE_URL}/insights/${article.slug}`;
  const fullImageUrl = article.featuredImage.startsWith('http') 
    ? article.featuredImage 
    : `${BASE_URL}${article.featuredImage}`;

  // Estimate total word count from sections
  const totalWords = article.sections 
    ? article.sections.reduce((acc, sec) => acc + sec.content.join(' ').split(/\s+/).length, 250)
    : 800;

  // Convert reading time to ISO 8601 duration (e.g., '7 min read' -> 'PT7M')
  const minutesMatch = (article.readingTime || '').match(/\d+/);
  const duration = minutesMatch ? `PT${minutesMatch[0]}M` : 'PT6M';

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${fullUrl}#article`,
    'isPartOf': {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      'name': 'GlowBiz Solutions',
      'url': BASE_URL
    },
    'headline': article.title,
    'description': article.seoDescription || article.excerpt,
    'image': [fullImageUrl],
    'datePublished': article.isoPublishedDate || '2026-10-18T08:00:00+04:00',
    'dateModified': article.isoModifiedDate || '2026-10-22T08:00:00+04:00',
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': fullUrl
    },
    'wordCount': totalWords,
    'timeRequired': duration,
    'speakable': {
      '@type': 'SpeakableSpecification',
      'cssSelector': ['.ins-article-h1', '.ins-article-lead']
    },
    'author': {
      '@type': 'Organization',
      'name': 'GlowBiz Solutions Advisory Practice',
      'url': BASE_URL,
      'areaServed': 'United Arab Emirates'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'GlowBiz Solutions',
      'url': BASE_URL,
      'logo': {
        '@type': 'ImageObject',
        'url': `${BASE_URL}/logo.png`
      }
    },
    'about': [
      {
        '@type': 'Thing',
        'name': article.category
      },
      {
        '@type': 'Place',
        'name': 'United Arab Emirates'
      }
    ],
    'articleSection': article.category,
    'keywords': article.keywords ? article.keywords.join(', ') : article.category,
    'inLanguage': 'en-US'
  };
}

/**
 * Builds schema.org BreadcrumbList structured data
 */
export function buildBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`
    }))
  };
}

/**
 * Builds schema.org FAQPage structured data for rich snippet search results
 */
export function buildFaqSchema(faqs) {
  if (!faqs || faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };
}
