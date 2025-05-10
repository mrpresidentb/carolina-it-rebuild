
import { ContentPage, defaultPages } from '@/models/ContentPage';

// Get all content pages
export const getContentPages = (): ContentPage[] => {
  const savedPages = localStorage.getItem('content_pages');
  if (savedPages) {
    return JSON.parse(savedPages);
  }
  
  // If no saved pages, initialize with the defaults and save
  const initialPages = [defaultPages.privacyPolicy, defaultPages.termsOfUse];
  localStorage.setItem('content_pages', JSON.stringify(initialPages));
  return initialPages;
};

// Get a specific page by ID
export const getContentPageById = (id: string): ContentPage | undefined => {
  const pages = getContentPages();
  return pages.find(page => page.id === id);
};

// Get a specific page by slug
export const getContentPageBySlug = (slug: string): ContentPage | undefined => {
  const pages = getContentPages();
  return pages.find(page => page.slug === slug);
};

// Save a page (add new or update existing)
export const saveContentPage = (page: ContentPage): boolean => {
  try {
    const pages = getContentPages();
    const existingIndex = pages.findIndex(p => p.id === page.id);
    
    // Update the last updated timestamp
    const updatedPage = {
      ...page,
      lastUpdated: new Date().toISOString()
    };
    
    if (existingIndex >= 0) {
      // Update existing page
      pages[existingIndex] = updatedPage;
    } else {
      // Add new page
      pages.push(updatedPage);
    }
    
    localStorage.setItem('content_pages', JSON.stringify(pages));
    return true;
  } catch (error) {
    console.error("Error saving content page:", error);
    return false;
  }
};

// Delete a page
export const deleteContentPage = (id: string): boolean => {
  try {
    let pages = getContentPages();
    pages = pages.filter(page => page.id !== id);
    localStorage.setItem('content_pages', JSON.stringify(pages));
    return true;
  } catch (error) {
    console.error("Error deleting content page:", error);
    return false;
  }
};
