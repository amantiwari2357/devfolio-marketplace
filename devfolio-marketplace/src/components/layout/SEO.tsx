import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
}

const DEFAULT_DESCRIPTION = "Devfolio Marketplace - Helping individuals and brands build modern, responsive websites and powerful digital solutions.";
const DEFAULT_KEYWORDS = "portfolio, developer, marketplace, services, website builder, creator economy";

const SEO = ({ title, description = DEFAULT_DESCRIPTION, keywords = DEFAULT_KEYWORDS }: SEOProps) => {
  useEffect(() => {
    // Set title
    const fullTitle = `${title} | Devfolio Marketplace`;
    document.title = fullTitle;
    
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

    // Optional: Open Graph tags for social sharing
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
  }, [title, description, keywords]);

  return null;
};

export default SEO;
