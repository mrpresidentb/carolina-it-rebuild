
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ContactForm from '@/components/ContactForm';
import { Computer, Printer, Globe, Bug } from 'lucide-react';

const Index = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-itblue/10 to-itblue/5 py-16 md:py-24">
        <div className="container mx-auto">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Expert On-Site IT Support in Charlotte
              </h1>
              <p className="text-lg md:text-xl text-gray-700">
                IT Carolina provides professional IT services to small businesses and individuals throughout the Charlotte area.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="bg-itblue hover:bg-itblue-dark">
                  <Link to="/contact">Get Support</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/services">Our Services</Link>
                </Button>
              </div>
            </div>
            <div className="order-first md:order-last">
              <img
                src="https://images.squarespace-cdn.com/content/v1/65ceda6257234b70b68cc0fb/1714350468323-H9LLYACENDR9ZPCAOP0G/image-asset.jpeg"
                alt="IT Support Services"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="section bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our IT Services</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              We offer a comprehensive range of IT services to keep your technology running smoothly and efficiently.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-itblue/10 flex items-center justify-center mb-4">
                <Computer className="h-6 w-6 text-itblue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Computer Support</h3>
              <p className="text-gray-600">
                Troubleshooting, repairs, and optimization for all your PC and Mac needs.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-itblue/10 flex items-center justify-center mb-4">
                <Printer className="h-6 w-6 text-itblue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Printer Services</h3>
              <p className="text-gray-600">
                Installation, configuration, and troubleshooting for all printer types.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-itblue/10 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-itblue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Network Solutions</h3>
              <p className="text-gray-600">
                WiFi setup, internet troubleshooting, and network optimization.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-itblue/10 flex items-center justify-center mb-4">
                <Bug className="h-6 w-6 text-itblue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Virus Removal</h3>
              <p className="text-gray-600">
                Detection and removal of malware, viruses, and other security threats.
              </p>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <Button asChild className="bg-itblue hover:bg-itblue-dark">
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose IT Carolina</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              We're committed to providing personalized IT support that meets your specific needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-itblue flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Service</h3>
              <p className="text-gray-600">
                Our technicians have years of experience solving complex IT issues.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-itblue flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Response</h3>
              <p className="text-gray-600">
                We understand that IT issues are urgent and respond quickly to your needs.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-itblue flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Honest Pricing</h3>
              <p className="text-gray-600">
                No hidden fees or unnecessary services. Just fair prices for quality work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-gray-700 mb-6">
                Whether you're experiencing IT issues or need help with a new project, we're here to help.
                Fill out the form and we'll get back to you as soon as possible.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-itblue/10 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-itblue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <a href="tel:+17043185006" className="text-lg font-medium hover:text-itblue">(704) 318-5006</a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-itblue/10 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-itblue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a href="mailto:info@itcarolina.us" className="text-lg font-medium hover:text-itblue">info@itcarolina.us</a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-itblue/10 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-itblue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-lg font-medium">Charlotte, NC</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
