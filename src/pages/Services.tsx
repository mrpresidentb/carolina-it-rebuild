
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Computer, Settings, Printer, Globe, Wrench, Bug, Download, Wifi, Mail } from 'lucide-react';

const services = [
  {
    id: 1,
    title: "Computer Troubleshooting",
    icon: Computer,
    description: "Diagnosis and resolution of hardware and software issues affecting your computer's performance."
  },
  {
    id: 2,
    title: "Software Installation",
    icon: Download,
    description: "Professional installation and configuration of software applications for optimal performance."
  },
  {
    id: 3,
    title: "Driver Installation",
    icon: Settings,
    description: "Installing and updating device drivers to ensure all hardware operates correctly."
  },
  {
    id: 4,
    title: "Internet Issues",
    icon: Globe,
    description: "Resolving connectivity problems, slow speeds, and setting up secure networks."
  },
  {
    id: 5,
    title: "PC Optimization",
    icon: Wrench,
    description: "Tune-up services to improve computer speed, startup time, and overall performance."
  },
  {
    id: 6,
    title: "Virus & Malware Removal",
    icon: Bug,
    description: "Detection and elimination of viruses, malware, and other security threats."
  },
  {
    id: 7,
    title: "Printer Setup & Repair",
    icon: Printer,
    description: "Installation, configuration, and troubleshooting for all types of printers."
  },
  {
    id: 8,
    title: "WiFi Setup & Security",
    icon: Wifi,
    description: "Setting up secure wireless networks and resolving WiFi connectivity issues."
  },
  {
    id: 9,
    title: "Email Configuration",
    icon: Mail,
    description: "Setting up and troubleshooting email clients and resolving email-related issues."
  }
];

const Services = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-itblue/10 to-itblue/5 py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 md:text-5xl">Our IT Services</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
            Professional on-site IT support for businesses and individuals in Charlotte
          </p>
          <Button asChild className="bg-itblue hover:bg-itblue-dark">
            <Link to="/contact">Request Service</Link>
          </Button>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-full bg-itblue/10 flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-itblue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* On-Site Support Section */}
      <section className="section bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">On-Site Support</h2>
              <p className="text-gray-700 mb-4">
                We come to your home or office to resolve your IT issues in person. Our technicians 
                are equipped to handle a wide range of problems and will ensure your technology is 
                working perfectly before we leave.
              </p>
              <p className="text-gray-700 mb-6">
                Benefits of on-site support include:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-itblue mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>No need to disconnect or transport your equipment</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-itblue mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Personalized service in your environment</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-itblue mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Face-to-face explanation of issues and solutions</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-itblue mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Immediate verification that the problem is solved</span>
                </li>
              </ul>
              <Button asChild className="bg-itblue hover:bg-itblue-dark">
                <Link to="/contact">Schedule On-Site Support</Link>
              </Button>
            </div>
            <div className="order-first md:order-last">
              <img
                src="https://images.squarespace-cdn.com/content/v1/65ceda6257234b70b68cc0fb/1714350468323-H9LLYACENDR9ZPCAOP0G/image-asset.jpeg"
                alt="On-Site IT Support"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-itblue">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Solve Your IT Problems?</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Contact us today for professional IT support tailored to your needs.
          </p>
          <Button asChild variant="secondary" className="hover:bg-white">
            <Link to="/contact">Contact Us Now</Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Services;
