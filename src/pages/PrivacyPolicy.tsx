
import React from 'react';
import { getContentPageBySlug } from '@/utils/contentPages';
import { ContentPage, defaultPages } from '@/models/ContentPage';
import { useEffect, useState } from 'react';

const PrivacyPolicy: React.FC = () => {
  const [page, setPage] = useState<ContentPage>(defaultPages.privacyPolicy);

  useEffect(() => {
    const privacyPolicy = getContentPageBySlug('privacy-policy');
    if (privacyPolicy) {
      setPage(privacyPolicy);
    }
  }, []);

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  );
};

export default PrivacyPolicy;
