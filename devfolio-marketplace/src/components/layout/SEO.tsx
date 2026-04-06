import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  schema?: string;
}

const DEFAULT_DESCRIPTION = "Devfolio Marketplace - Helping individuals and brands build modern, responsive websites and powerful digital solutions.";
const DEFAULT_KEYWORDS = "portfolio, developer, marketplace, services, website builder, creator economy";

const SEO = ({ title, description = DEFAULT_DESCRIPTION, keywords = DEFAULT_KEYWORDS, schema }: SEOProps) => {
  useEffect(() => {
    // Set title
    const fullTitle = `${title} | Devfolio Marketplace`;
    document.title = fullTitle;

    // Set Canonical URL
    const canonicalUrl = window.location.origin + window.location.pathname;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);
    
    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Set meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords);

    // Open Graph tags for social sharing
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', fullTitle);

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute('content', description);

    // Schema.org JSON-LD Markup
    if (schema) {
      let script = document.querySelector('#seo-schema-markup');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('id', 'seo-schema-markup');
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = schema;
    } else {
      // Clean up if schema is removed when navigating
      const script = document.querySelector('#seo-schema-markup');
      if (script) script.remove();
    }
  }, [title, description, keywords, schema]);

  return null;
};

export default SEO;
