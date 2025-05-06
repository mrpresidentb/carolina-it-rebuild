
export interface ContactFormSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  isRead: boolean;
  priority?: 'low' | 'medium' | 'high';
}
