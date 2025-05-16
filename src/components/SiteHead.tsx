import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSettings } from '@/hooks/useSettings';

const SiteHead: React.FC = () => {
  const location = useLocation();
  const { settings, isLoaded } = useSettings();
  const currentPath = location.pathname;

  useEffect(() => {
    if (!isLoaded) return;
    
    // Get page-specific SEO or fall back to site defaults
    const pageSeo = settings.seo.pageSeo[currentPath] || {
      title: settings.seo.siteTitle,
      description: settings.seo.siteDescription,
      noIndex: settings.seo.advanced.excludeFromSearch
    };
    
    // Set page title
    document.title = pageSeo.title || settings.seo.siteTitle;
    
    // Update meta tags
    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement('meta');
      descriptionTag.setAttribute('name', 'description');
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.setAttribute('content', pageSeo.description || settings.seo.siteDescription);
    
    // Set keywords
    let keywordsTag = document.querySelector('meta[name="keywords"]');
    if (!keywordsTag) {
      keywordsTag = document.createElement('meta');
      keywordsTag.setAttribute('name', 'keywords');
      document.head.appendChild(keywordsTag);
    }
    keywordsTag.setAttribute('content', settings.seo.defaultKeywords);
    
    // Handle robots/noindex
    let robotsTag = document.querySelector('meta[name="robots"]');
    if (!robotsTag) {
      robotsTag = document.createElement('meta');
      robotsTag.setAttribute('name', 'robots');
      document.head.appendChild(robotsTag);
    }
    
    const robotsValue = (pageSeo.noIndex || settings.seo.advanced.excludeFromSearch) 
      ? 'noindex, nofollow' 
      : 'index, follow';
    robotsTag.setAttribute('content', robotsValue);
    
    // Set OpenGraph tags
    updateOpenGraphTags(
      settings.seo.socialMedia.ogTitle || pageSeo.title || settings.seo.siteTitle,
      settings.seo.socialMedia.ogDescription || pageSeo.description || settings.seo.siteDescription,
      settings.seo.socialMedia.ogImage
    );
    
    // Set canonical URL if provided, else fallback to location.origin + pathname
    let canonicalUrl = settings.seo.advanced.canonicalUrl;
    if (!canonicalUrl) {
      canonicalUrl = window.location.origin + location.pathname;
    }
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalUrl);

    // Add/update Twitter Card tags
    updateTwitterTags(
      pageSeo.title || settings.seo.siteTitle,
      pageSeo.description || settings.seo.siteDescription,
      settings.seo.socialMedia.ogImage
    );

    // Add JSON-LD structured data if provided
    updateStructuredData(settings.seo.advanced.structuredData);
    
  }, [currentPath, settings, isLoaded]);
  
  const updateOpenGraphTags = (title: string, description: string, image: string) => {
    // OG Title
    let ogTitleTag = document.querySelector('meta[property="og:title"]');
    if (!ogTitleTag) {
      ogTitleTag = document.createElement('meta');
      ogTitleTag.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitleTag);
    }
    ogTitleTag.setAttribute('content', title);
    
    // OG Description
    let ogDescTag = document.querySelector('meta[property="og:description"]');
    if (!ogDescTag) {
      ogDescTag = document.createElement('meta');
      ogDescTag.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescTag);
    }
    ogDescTag.setAttribute('content', description);
    
    // OG Image
    if (image) {
      let ogImageTag = document.querySelector('meta[property="og:image"]');
      if (!ogImageTag) {
        ogImageTag = document.createElement('meta');
        ogImageTag.setAttribute('property', 'og:image');
        document.head.appendChild(ogImageTag);
      }
      ogImageTag.setAttribute('content', image);
    }
    
    // OG URL
    let ogUrlTag = document.querySelector('meta[property="og:url"]');
    if (!ogUrlTag) {
      ogUrlTag = document.createElement('meta');
      ogUrlTag.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrlTag);
    }
    ogUrlTag.setAttribute('content', window.location.href);
    
    // OG Type
    let ogTypeTag = document.querySelector('meta[property="og:type"]');
    if (!ogTypeTag) {
      ogTypeTag = document.createElement('meta');
      ogTypeTag.setAttribute('property', 'og:type');
      document.head.appendChild(ogTypeTag);
    }
    ogTypeTag.setAttribute('content', 'website');
  };
  
  const updateTwitterTags = (title: string, description: string, image: string) => {
    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (!twitterTitle) {
      twitterTitle = document.createElement('meta');
      twitterTitle.setAttribute('name', 'twitter:title');
      document.head.appendChild(twitterTitle);
    }
    twitterTitle.setAttribute('content', title);

    let twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (!twitterDescription) {
      twitterDescription = document.createElement('meta');
      twitterDescription.setAttribute('name', 'twitter:description');
      document.head.appendChild(twitterDescription);
    }
    twitterDescription.setAttribute('content', description);

    if (image) {
      let twitterImage = document.querySelector('meta[name="twitter:image"]');
      if (!twitterImage) {
        twitterImage = document.createElement('meta');
        twitterImage.setAttribute('name', 'twitter:image');
        document.head.appendChild(twitterImage);
      }
      twitterImage.setAttribute('content', image);
    }

    let twitterCard = document.querySelector('meta[name="twitter:card"]');
    if (!twitterCard) {
      twitterCard = document.createElement('meta');
      twitterCard.setAttribute('name', 'twitter:card');
      document.head.appendChild(twitterCard);
    }
    twitterCard.setAttribute('content', 'summary_large_image');
  };
  
  const updateStructuredData = (jsonLdString: string) => {
    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }
    
    // Add new structured data if provided
    if (jsonLdString) {
      try {
        // Validate JSON
        JSON.parse(jsonLdString);
        
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = jsonLdString;
        document.head.appendChild(script);
      } catch (error) {
        console.error('Invalid JSON-LD structured data:', error);
      }
    }
  };
  
  return null; // This component doesn't render anything visible
};

export default SiteHead;
