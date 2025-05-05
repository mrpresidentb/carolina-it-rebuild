
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img 
                src="https://images.squarespace-cdn.com/content/v1/65ceda6257234b70b68cc0fb/b061e9ad-fcec-4eef-880f-1297194cdf0c/logo2.png?format=1500w" 
                alt="IT Carolina Logo" 
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-600">
              Expert On-Site IT Support in Charlotte
            </p>
            <p className="text-sm text-gray-600">
              Charlotte, NC
            </p>
            <p className="text-sm font-medium">
              <a href="tel:+17043185006" className="hover:text-itblue">(704) 318-5006</a>
            </p>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services" className="text-gray-600 hover:text-itblue">
                  IT Support
                </Link>
              </li>
              <li>
                <Link to="/printers" className="text-gray-600 hover:text-itblue">
                  Printer Services
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-itblue">
                  PC & Mac Support
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-itblue">
                  Network Solutions
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-600 hover:text-itblue">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-itblue">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-itblue">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-itblue">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/printers" className="text-gray-600 hover:text-itblue">
                  Printer Services
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>
            <address className="not-italic">
              <p className="text-sm text-gray-600">Charlotte, NC</p>
              <p className="text-sm text-gray-600">
                <a href="tel:+17043185006" className="hover:text-itblue">(704) 318-5006</a>
              </p>
              <p className="text-sm text-gray-600">
                <a href="mailto:info@itcarolina.us" className="hover:text-itblue">info@itcarolina.us</a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-center text-xs text-gray-500">
            &copy; {currentYear} IT Carolina. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
