
import { ContactFormSubmission } from '@/models/ContactFormSubmission';

// Get submissions from localStorage
export const getContactSubmissions = (): ContactFormSubmission[] => {
  try {
    const savedSubmissions = localStorage.getItem('contact_submissions');
    if (savedSubmissions) {
      return JSON.parse(savedSubmissions);
    }
  } catch (error) {
    console.error("Error loading contact submissions:", error);
  }
  return [];
};

// Save a new submission
export const saveContactSubmission = (submission: Omit<ContactFormSubmission, 'id' | 'date' | 'isRead'>): boolean => {
  try {
    const submissions = getContactSubmissions();
    
    const newSubmission: ContactFormSubmission = {
      ...submission,
      id: generateId(),
      date: new Date().toISOString(),
      isRead: false
    };
    
    submissions.unshift(newSubmission); // Add to beginning of array
    localStorage.setItem('contact_submissions', JSON.stringify(submissions));
    
    return true;
  } catch (error) {
    console.error("Error saving contact submission:", error);
    return false;
  }
};

// Mark submission as read
export const markSubmissionAsRead = (id: string): boolean => {
  try {
    const submissions = getContactSubmissions();
    const updatedSubmissions = submissions.map(submission => 
      submission.id === id ? { ...submission, isRead: true } : submission
    );
    
    localStorage.setItem('contact_submissions', JSON.stringify(updatedSubmissions));
    return true;
  } catch (error) {
    console.error("Error marking submission as read:", error);
    return false;
  }
};

// Delete a submission
export const deleteContactSubmission = (id: string): boolean => {
  try {
    const submissions = getContactSubmissions();
    const updatedSubmissions = submissions.filter(submission => submission.id !== id);
    
    localStorage.setItem('contact_submissions', JSON.stringify(updatedSubmissions));
    return true;
  } catch (error) {
    console.error("Error deleting contact submission:", error);
    return false;
  }
};

// Helper to generate a unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};
