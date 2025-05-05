
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getServiceBySlug } from '@/utils/services';
import { Service } from '@/models/Service';

const ServicePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      const foundService = getServiceBySlug(slug);
      if (foundService) {
        setService(foundService);
      } else {
        // Redirect to not found if service doesn't exist
        navigate('/not-found');
      }
    }
    setLoading(false);
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <div className="animate-pulse flex space-x-4">
          <div className="space-y-6 py-1 w-full">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
        <p>The requested service could not be found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
      <p className="text-gray-600 mb-6">{service.description}</p>
      <div 
        className="prose max-w-none" 
        dangerouslySetInnerHTML={{ __html: service.content }}
      />
    </div>
  );
};

export default ServicePage;
