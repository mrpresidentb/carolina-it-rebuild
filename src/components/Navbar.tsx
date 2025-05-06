
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { getVisibleServices } from '@/utils/services';
import { Service } from '@/models/Service';
import { useSettings } from '@/hooks/useSettings';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { settings } = useSettings();
  const services = getVisibleServices();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className="sticky top-0 z-50 w-full border-b backdrop-blur"
      style={{
        backgroundColor: `var(--header-bg-color, #182B3B)`
      }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img 
              src="https://images.squarespace-cdn.com/content/v1/65ceda6257234b70b68cc0fb/b061e9ad-fcec-4eef-880f-1297194cdf0c/logo2.png?format=1500w" 
              alt="IT Carolina Logo" 
              className="h-12 w-auto"
            />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          <Link 
            to="/" 
            className="text-base font-medium transition-colors hover:text-opacity-80"
            style={{ color: `var(--header-nav-text-color, #ffffff)` }}
          >
            Home
          </Link>
          <Link 
            to="/services" 
            className="text-base font-medium transition-colors hover:text-opacity-80"
            style={{ color: `var(--header-nav-text-color, #ffffff)` }}
          >
            Services
          </Link>
          {services.map(service => (
            <Link 
              key={service.id}
              to={service.slug === "printer-services" ? "/printers" : `/services/${service.slug}`}
              className="text-base font-medium transition-colors hover:text-opacity-80"
              style={{ color: `var(--header-nav-text-color, #ffffff)` }}
            >
              {service.title}
            </Link>
          ))}
          <Link 
            to="/blog" 
            className="text-base font-medium transition-colors hover:text-opacity-80"
            style={{ color: `var(--header-nav-text-color, #ffffff)` }}
          >
            Blog
          </Link>
          <Link 
            to="/contact" 
            className="text-base font-medium transition-colors hover:text-opacity-80"
            style={{ color: `var(--header-nav-text-color, #ffffff)` }}
          >
            Contact
          </Link>
        </nav>
        
        <div className="hidden md:flex">
          <Button 
            asChild 
            style={{
              backgroundColor: `var(--button-color, #00a0c6)`,
              color: `var(--button-text-color, #ffffff)`
            }}
          >
            <Link to="/contact">Get Support</Link>
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden p-2"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          style={{ color: `var(--header-nav-text-color, #ffffff)` }}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 top-16 z-50 md:hidden"
          style={{ backgroundColor: `var(--header-bg-color, #182B3B)` }}
        >
          <nav className="container mx-auto flex flex-col space-y-4 p-4">
            <Link 
              to="/" 
              className="py-2 text-lg font-medium hover:text-opacity-80"
              onClick={() => setIsMenuOpen(false)}
              style={{ color: `var(--header-nav-text-color, #ffffff)` }}
            >
              Home
            </Link>
            <Link 
              to="/services" 
              className="py-2 text-lg font-medium hover:text-opacity-80"
              onClick={() => setIsMenuOpen(false)}
              style={{ color: `var(--header-nav-text-color, #ffffff)` }}
            >
              Services
            </Link>
            {services.map(service => (
              <Link 
                key={service.id}
                to={service.slug === "printer-services" ? "/printers" : `/services/${service.slug}`}
                className="py-2 text-lg font-medium hover:text-opacity-80"
                onClick={() => setIsMenuOpen(false)}
                style={{ color: `var(--header-nav-text-color, #ffffff)` }}
              >
                {service.title}
              </Link>
            ))}
            <Link 
              to="/blog" 
              className="py-2 text-lg font-medium hover:text-opacity-80"
              onClick={() => setIsMenuOpen(false)}
              style={{ color: `var(--header-nav-text-color, #ffffff)` }}
            >
              Blog
            </Link>
            <Link 
              to="/contact" 
              className="py-2 text-lg font-medium hover:text-opacity-80"
              onClick={() => setIsMenuOpen(false)}
              style={{ color: `var(--header-nav-text-color, #ffffff)` }}
            >
              Contact
            </Link>
            <Button 
              asChild 
              className="mt-4 w-full"
              style={{
                backgroundColor: `var(--button-color, #00a0c6)`,
                color: `var(--button-text-color, #ffffff)`
              }}
            >
              <Link 
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Support
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
