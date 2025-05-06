
import { useEffect, useState } from 'react';

// Define site settings structure
export interface SiteSettings {
  seo: {
    siteTitle: string;
    siteDescription: string;
    defaultKeywords: string;
    pageSeo: {
      [key: string]: {
        title: string;
        description: string;
        noIndex: boolean;
      }
    },
    socialMedia: {
      ogTitle: string;
      ogDescription: string;
      ogImage: string;
    },
    advanced: {
      canonicalUrl: string;
      structuredData: string;
      excludeFromSearch: boolean;
    }
  };
  styling: {
    h1Color: string;
    h2Color: string;
    h3Color: string;
    bodyTextColor: string;
    backgroundColor: string;
    primaryColor: string;
    linkColor: string;
    buttonColor: string;
    buttonTextColor: string;
    formTextColor: string;
    headerBgColor: string;
    headerTextColor: string;
    headerNavTextColor: string;
    footerBgColor: string;
  };
  contact: {
    phone: string;
    email: string;
    address: string;
    businessHours: {
      monday: string;
      tuesday: string;
      wednesday: string;
      thursday: string;
      friday: string;
      saturday: string;
      sunday: string;
    }
  };
}

// Default settings
export const defaultSettings: SiteSettings = {
  seo: {
    siteTitle: "IT Carolina - Expert On-Site IT Support in Charlotte",
    siteDescription: "Professional IT support and services for businesses of all sizes in Charlotte, NC. We specialize in software troubleshooting, printer setup, and more.",
    defaultKeywords: "IT support, computer repair, tech services, Charlotte, printer services",
    pageSeo: {
      "/": {
        title: "IT Carolina - Expert On-Site IT Support in Charlotte",
        description: "Professional IT support and services for businesses of all sizes in Charlotte, NC. We specialize in software troubleshooting, printer setup, and more.",
        noIndex: false
      },
      "/services": {
        title: "Services - IT Carolina",
        description: "Our IT services for businesses and individuals in Charlotte, NC. We offer computer support, printer services, network solutions, and more.",
        noIndex: false
      },
      "/contact": {
        title: "Contact - IT Carolina",
        description: "Get in touch with our team for expert IT support and services in Charlotte.",
        noIndex: false
      },
      "/blog": {
        title: "Blog - IT Carolina",
        description: "Latest updates, tips, and news from IT Carolina.",
        noIndex: false
      },
      "/printers": {
        title: "Printer Services - IT Carolina",
        description: "Professional printer setup, troubleshooting, and maintenance services in Charlotte, NC.",
        noIndex: false
      },
    },
    socialMedia: {
      ogTitle: "",
      ogDescription: "",
      ogImage: ""
    },
    advanced: {
      canonicalUrl: "",
      structuredData: '{"@context":"https://schema.org","@type":"Organization","name":"IT Carolina"}',
      excludeFromSearch: false
    }
  },
  styling: {
    h1Color: "#000000",
    h2Color: "#000000",
    h3Color: "#000000",
    bodyTextColor: "#000000",
    backgroundColor: "#f6f6f7",
    primaryColor: "#00a0c6",
    linkColor: "#00a0c6",
    buttonColor: "#00a0c6",
    buttonTextColor: "#ffffff",
    formTextColor: "#000000",
    headerBgColor: "#182B3B",
    headerTextColor: "#ffffff",
    headerNavTextColor: "#ffffff",
    footerBgColor: "#f1f5f9"
  },
  contact: {
    phone: "(704) 318-5006",
    email: "info@itcarolina.us",
    address: "Charlotte, NC",
    businessHours: {
      monday: "9:00 AM - 6:00 PM",
      tuesday: "9:00 AM - 6:00 PM",
      wednesday: "9:00 AM - 6:00 PM",
      thursday: "9:00 AM - 6:00 PM",
      friday: "9:00 AM - 6:00 PM",
      saturday: "By appointment",
      sunday: "Closed"
    }
  }
};

export const useSettings = () => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load settings from localStorage
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('site_settings');
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        
        // Merge with default settings to ensure all properties exist
        const mergedSettings = {
          ...defaultSettings,
          ...parsedSettings,
          // Ensure nested objects are properly merged
          seo: {
            ...defaultSettings.seo,
            ...parsedSettings.seo,
            pageSeo: {
              ...defaultSettings.seo.pageSeo,
              ...(parsedSettings.seo?.pageSeo || {})
            },
            socialMedia: {
              ...defaultSettings.seo.socialMedia,
              ...(parsedSettings.seo?.socialMedia || {})
            },
            advanced: {
              ...defaultSettings.seo.advanced,
              ...(parsedSettings.seo?.advanced || {})
            }
          },
          styling: {
            ...defaultSettings.styling,
            ...(parsedSettings.styling || {})
          },
          // Add contact info with defaults
          contact: {
            ...defaultSettings.contact,
            ...(parsedSettings.contact || {})
          }
        };
        
        setSettings(mergedSettings);
        
        // Apply styling immediately
        applyThemeStyles(mergedSettings.styling);
      } else {
        // If no settings found, apply defaults
        applyThemeStyles(defaultSettings.styling);
      }
      setIsLoaded(true);
    } catch (error) {
      console.error("Error loading settings:", error);
      // Apply defaults if there's an error
      applyThemeStyles(defaultSettings.styling);
      setIsLoaded(true);
    }
  }, []);

  // Save settings to localStorage
  const saveSettings = (newSettings: SiteSettings) => {
    try {
      localStorage.setItem('site_settings', JSON.stringify(newSettings));
      setSettings(newSettings);
      
      // Apply styling immediately
      applyThemeStyles(newSettings.styling);
      
      return true;
    } catch (error) {
      console.error("Error saving settings:", error);
      return false;
    }
  };

  // Apply theme styles to document
  const applyThemeStyles = (styling: SiteSettings['styling']) => {
    document.documentElement.style.setProperty('--h1-color', styling.h1Color);
    document.documentElement.style.setProperty('--h2-color', styling.h2Color);
    document.documentElement.style.setProperty('--h3-color', styling.h3Color);
    document.documentElement.style.setProperty('--body-text-color', styling.bodyTextColor);
    document.documentElement.style.setProperty('--background-color', styling.backgroundColor);
    document.documentElement.style.setProperty('--primary-color', styling.primaryColor);
    document.documentElement.style.setProperty('--link-color', styling.linkColor);
    document.documentElement.style.setProperty('--button-color', styling.buttonColor);
    document.documentElement.style.setProperty('--button-text-color', styling.buttonTextColor);
    document.documentElement.style.setProperty('--form-text-color', styling.formTextColor);
    document.documentElement.style.setProperty('--header-bg-color', styling.headerBgColor);
    document.documentElement.style.setProperty('--header-text-color', styling.headerTextColor);
    document.documentElement.style.setProperty('--header-nav-text-color', styling.headerNavTextColor);
    document.documentElement.style.setProperty('--footer-bg-color', styling.footerBgColor);
  };

  return { settings, saveSettings, isLoaded };
};
