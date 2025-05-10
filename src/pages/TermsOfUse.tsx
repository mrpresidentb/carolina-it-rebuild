
import React from 'react';
import { getContentPageBySlug } from '@/utils/contentPages';
import { ContentPage, defaultPages } from '@/models/ContentPage';
import { useEffect, useState } from 'react';
import SiteHead from '@/components/SiteHead';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const TermsOfUse: React.FC = () => {
  const [page, setPage] = useState<ContentPage>(defaultPages.termsOfUse);

  useEffect(() => {
    const termsOfUse = getContentPageBySlug('terms-of-use');
    if (termsOfUse) {
      setPage(termsOfUse);
    }
  }, []);

  return (
    <>
      <SiteHead title={page.meta.title || page.title} description={page.meta.description} />
      <Navbar />
      <div className="container mx-auto py-12 px-4 max-w-4xl">
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: page.content }} />
      </div>
      <Footer />
    </>
  );
};

export default TermsOfUse;
