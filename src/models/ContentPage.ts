
export interface ContentPage {
  id: string;
  title: string;
  content: string;
  lastUpdated: string;
  slug: string;
  published: boolean;
  meta: {
    title?: string;
    description?: string;
  };
}

export const defaultPages = {
  privacyPolicy: {
    id: "privacy-policy",
    title: "Privacy Policy",
    content: "<h1>Privacy Policy</h1><p>Last updated: May 10, 2025</p><p>This privacy policy describes how we collect, use, and share your information when you use our services.</p><h2>Information We Collect</h2><p>We collect information you provide directly to us, such as your name, email address, and other contact information.</p>",
    lastUpdated: new Date().toISOString(),
    slug: "privacy-policy",
    published: true,
    meta: {
      title: "Privacy Policy",
      description: "Our privacy policy explains how we handle your data"
    }
  },
  termsOfUse: {
    id: "terms-of-use",
    title: "Terms of Use",
    content: "<h1>Terms of Use</h1><p>Last updated: May 10, 2025</p><p>By accessing or using our services, you agree to be bound by these terms. If you do not agree to these terms, you may not use our services.</p><h2>Use of Services</h2><p>You agree to use our services only for lawful purposes and in accordance with these terms.</p>",
    lastUpdated: new Date().toISOString(),
    slug: "terms-of-use",
    published: true,
    meta: {
      title: "Terms of Use",
      description: "Our terms of use explain the rules for using our services"
    }
  }
};
