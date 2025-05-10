
export interface WebsiteImage {
  id: string;
  name: string;
  url: string;
  alt: string; // For SEO purposes
  caption?: string;
  description?: string;
  location: string; // Where on the website this image is used (e.g., "hero", "about-section")
  isUploaded?: boolean; // Flag to mark if this was an uploaded file (as opposed to external URL)
  seo: {
    title?: string;
    description?: string;
    keywords?: string;
  }
}
