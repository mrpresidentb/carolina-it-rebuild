
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getVisibleServices } from '@/utils/services';
import { Service } from '@/models/Service';

const Footer = () => {
  const [services, setServices] = useState<Service[]>([]);
  const currentYear = new Date().getFullYear();
  
  useEffect(() => {
    // Get visible services for the footer
    setServices(getVisibleServices());
  }, []);
  
  return (
    <footer className="bg-gray-100" style={{ backgroundColor: 'var(--footer-bg-color, #f1f5f9)' }}>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold uppercase">IT CAROLINA</h3>
            <p className="text-sm">SVS Project L.L.C.</p>
          </div>
          
          <div className="flex flex-col items-center space-y-2">
            <p className="text-sm">
              <a href="tel:+18886610020" className="hover:text-itblue">888 (661) 0020</a>
            </p>
            <p className="text-sm">
              <a href="mailto:support@itcarolina.us" className="hover:text-itblue">support@itcarolina.us</a>
            </p>
            <p className="text-sm text-center">
              3540 Toringdon Way, Suite 200, Charlotte, NC 28277
            </p>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-600 hover:text-itblue" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
            <div className="mt-4 text-sm space-x-2">
              <Link to="/privacy-policy" className="hover:text-itblue">Privacy Policy</Link>
              <span>|</span>
              <Link to="/terms-of-use" className="hover:text-itblue">Terms of Use</Link>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-center text-xs">
            &copy; {currentYear} IT Carolina. All Rights Reserved!
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
