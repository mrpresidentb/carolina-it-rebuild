
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
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
          <Link to="/" className="text-base font-medium transition-colors hover:text-itblue">
            Home
          </Link>
          <Link to="/services" className="text-base font-medium transition-colors hover:text-itblue">
            Services
          </Link>
          <Link to="/printers" className="text-base font-medium transition-colors hover:text-itblue">
            Printer Services
          </Link>
          <Link to="/blog" className="text-base font-medium transition-colors hover:text-itblue">
            Blog
          </Link>
          <Link to="/contact" className="text-base font-medium transition-colors hover:text-itblue">
            Contact
          </Link>
        </nav>
        
        <div className="hidden md:flex">
          <Button asChild className="bg-itblue hover:bg-itblue-dark">
            <Link to="/contact">Get Support</Link>
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden p-2 text-foreground"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
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
        <div className="fixed inset-0 top-16 z-50 bg-background md:hidden">
          <nav className="container mx-auto flex flex-col space-y-4 p-4">
            <Link 
              to="/" 
              className="py-2 text-lg font-medium hover:text-itblue"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/services" 
              className="py-2 text-lg font-medium hover:text-itblue"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/printers" 
              className="py-2 text-lg font-medium hover:text-itblue"
              onClick={() => setIsMenuOpen(false)}
            >
              Printer Services
            </Link>
            <Link 
              to="/blog" 
              className="py-2 text-lg font-medium hover:text-itblue"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to="/contact" 
              className="py-2 text-lg font-medium hover:text-itblue"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Button 
              asChild 
              className="mt-4 w-full bg-itblue hover:bg-itblue-dark"
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
