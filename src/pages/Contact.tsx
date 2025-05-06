
import React from 'react';
import ContactForm from '@/components/ContactForm';
import { useSettings } from '@/hooks/useSettings';

const Contact = () => {
  const { settings } = useSettings();
  
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-itblue/10 to-itblue/5 py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 md:text-5xl">Contact Us</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Get in touch with our team for expert IT support and services in Charlotte.
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="section bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-itblue/10 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-itblue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Phone</h3>
                    <p className="text-gray-600">
                      <a href={`tel:${settings.contact.phone}`} className="hover:text-itblue">{settings.contact.phone}</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-itblue/10 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-itblue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Email</h3>
                    <p className="text-gray-600">
                      <a href={`mailto:${settings.contact.email}`} className="hover:text-itblue">{settings.contact.email}</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-itblue/10 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-itblue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Location</h3>
                    <p className="text-gray-600">{settings.contact.address}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Business Hours</h3>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday</span>
                    <span className="font-medium">{settings.contact.businessHours.monday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tuesday</span>
                    <span className="font-medium">{settings.contact.businessHours.tuesday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Wednesday</span>
                    <span className="font-medium">{settings.contact.businessHours.wednesday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thursday</span>
                    <span className="font-medium">{settings.contact.businessHours.thursday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Friday</span>
                    <span className="font-medium">{settings.contact.businessHours.friday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium">{settings.contact.businessHours.saturday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium">{settings.contact.businessHours.sunday}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Service Area</h3>
                <p className="text-gray-600">
                  We provide on-site IT support throughout the greater Charlotte area, including surrounding 
                  communities. Our technicians will come to your home or office to resolve your IT issues.
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
