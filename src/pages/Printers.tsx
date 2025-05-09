
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Printer, Settings, Mail, Wrench } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';

const Printers = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            location="printer-services-hero"
            fallbackSrc="https://images.squarespace-cdn.com/content/v1/65ceda6257234b70b68cc0fb/1715024886621-TB1TAZGR9500YFCK67WN/image-asset.jpeg"
            fallbackAlt="Printer Services"
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="container mx-auto relative z-10 py-24 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-white mb-4 md:text-5xl">Printer Services</h1>
            <p className="text-xl text-white/90 mb-8">
              Professional printer installation, configuration, and troubleshooting services for businesses and individuals.
            </p>
            <Button asChild className="bg-itblue hover:bg-itblue-dark">
              <Link to="/contact">Get Printer Support</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Printer Services</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              We provide comprehensive printer support to ensure your printing equipment 
              works flawlessly for all your business needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-itblue/10 flex items-center justify-center mb-4">
                <Printer className="h-6 w-6 text-itblue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Printer Installation & Setup</h3>
              <p className="text-gray-600 mb-4">
                We'll handle the complete setup of your new printer, including hardware assembly, 
                software installation, and network configuration to ensure it's ready for immediate use.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-itblue mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Physical assembly and connection</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-itblue mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Driver and software installation</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-itblue mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Network printer configuration</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-itblue mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Setup on all necessary computers</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-itblue/10 flex items-center justify-center mb-4">
                <Settings className="h-6 w-6 text-itblue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Driver Installation & Updates</h3>
              <p className="text-gray-600 mb-4">
                We ensure your printer has the latest drivers installed for optimal performance and 
                compatibility with your operating system.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-itblue mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Finding and installing the correct drivers</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-itblue mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Updating outdated printer software</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-itblue mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Resolving driver conflicts</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-itblue mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Optimizing printer settings</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-itblue/10 flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-itblue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Scan-to-Email Setup</h3>
              <p className="text-gray-600 mb-4">
                We configure your printer to send scanned documents directly to email, streamlining 
                your workflow and increasing productivity.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-itblue mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Email server configuration</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-itblue mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Setting up address books</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-itblue mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Scan format and quality optimization</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-itblue mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Testing and verification</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-itblue/10 flex items-center justify-center mb-4">
                <Wrench className="h-6 w-6 text-itblue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Troubleshooting & Repair</h3>
              <p className="text-gray-600 mb-4">
                We diagnose and fix common printer issues, from paper jams to connectivity problems 
                and error messages.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-itblue mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Error code diagnosis</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-itblue mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Print quality issues</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-itblue mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Connectivity and network problems</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-itblue mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Hardware maintenance and cleaning</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Benefits of Professional Printer Support</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Expert printer services keep your equipment running smoothly and your business productive.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-itblue flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Increased Efficiency</h3>
              <p className="text-gray-600 text-center">
                Properly configured printers reduce workflow bottlenecks and improve productivity.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-itblue flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Reduced Costs</h3>
              <p className="text-gray-600 text-center">
                Proper maintenance extends printer life and reduces expensive repair or replacement needs.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-itblue flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Expert Solutions</h3>
              <p className="text-gray-600 text-center">
                We solve complex printer issues quickly that might otherwise cause frustration and downtime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-itblue">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need Printer Support?</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Contact IT Carolina today for expert printer support services in Charlotte.
          </p>
          <Button asChild variant="secondary" className="hover:bg-white">
            <Link to="/contact">Contact Us Now</Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Printers;
