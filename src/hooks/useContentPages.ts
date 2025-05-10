
import { useState, useEffect } from 'react';
import { ContentPage } from '@/models/ContentPage';
import { getContentPages, saveContentPage, deleteContentPage, getContentPageById } from '@/utils/contentPages';

export const useContentPages = () => {
  const [pages, setPages] = useState<ContentPage[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load pages from localStorage
  useEffect(() => {
    try {
      const loadedPages = getContentPages();
      setPages(loadedPages);
      setIsLoaded(true);
    } catch (error) {
      console.error("Error loading content pages:", error);
      setIsLoaded(true);
    }
  }, []);

  // Update a page
  const updateContentPage = (page: ContentPage) => {
    try {
      const success = saveContentPage(page);
      if (success) {
        setPages(getContentPages());
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating content page:", error);
      return false;
    }
  };

  // Add a new page
  const addContentPage = (page: Omit<ContentPage, 'id' | 'lastUpdated'>) => {
    try {
      const newPage = {
        ...page,
        id: `page-${Date.now().toString()}`,
        lastUpdated: new Date().toISOString()
      } as ContentPage;
      
      const success = saveContentPage(newPage);
      if (success) {
        setPages(getContentPages());
        return newPage.id;
      }
      return null;
    } catch (error) {
      console.error("Error adding content page:", error);
      return null;
    }
  };

  // Get a page by ID
  const getPageById = (id: string) => {
    return getContentPageById(id);
  };

  return {
    pages,
    isLoaded,
    updateContentPage,
    addContentPage,
    getPageById
  };
};
