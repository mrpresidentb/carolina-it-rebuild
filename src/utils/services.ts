
import { Service, ServiceFormData } from "@/models/Service";

// Get services from localStorage or return default services if none exist
export const getServices = (): Service[] => {
  const storedServices = localStorage.getItem('services');
  if (storedServices) {
    return JSON.parse(storedServices);
  }

  // Default services
  const defaultServices = [
    {
      id: 1,
      title: "Computer Troubleshooting",
      description: "Diagnosis and resolution of hardware and software issues affecting your computer's performance.",
      slug: "computer-troubleshooting",
      content: "<p>Our expert technicians will diagnose and resolve your computer issues quickly and effectively.</p>",
      visible: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      title: "Software Installation",
      description: "Professional installation and configuration of software applications for optimal performance.",
      slug: "software-installation",
      content: "<p>We provide professional software installation and configuration services to ensure your applications run smoothly.</p>",
      visible: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 3,
      title: "IT Support",
      description: "Comprehensive IT support services for businesses of all sizes.",
      slug: "it-support",
      content: "<p>Our IT support services ensure your business technology runs smoothly and efficiently.</p>",
      visible: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 4,
      title: "Printer Services",
      description: "Installation, repair and maintenance of printers and printing equipment.",
      slug: "printer-services",
      content: "<p>Our printer services keep your printing equipment running smoothly and efficiently.</p>",
      visible: true,
      createdAt: new Date().toISOString()
    }
  ];

  // Save default services
  localStorage.setItem('services', JSON.stringify(defaultServices));
  return defaultServices;
};

// Save services to localStorage
export const saveServices = (services: Service[]): void => {
  localStorage.setItem('services', JSON.stringify(services));
};

// Add a new service
export const addService = (serviceData: ServiceFormData): Service => {
  const services = getServices();
  const newId = services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1;
  
  const newService: Service = {
    id: newId,
    title: serviceData.title,
    description: serviceData.description,
    slug: serviceData.slug || serviceData.title.toLowerCase().replace(/\s+/g, '-'),
    content: serviceData.content,
    visible: serviceData.visible,
    createdAt: new Date().toISOString()
  };
  
  services.push(newService);
  saveServices(services);
  return newService;
};

// Update an existing service
export const updateService = (id: number, serviceData: ServiceFormData): Service | null => {
  const services = getServices();
  const index = services.findIndex(s => s.id === id);
  
  if (index === -1) {
    return null;
  }
  
  const updatedService: Service = {
    ...services[index],
    title: serviceData.title,
    description: serviceData.description,
    slug: serviceData.slug || serviceData.title.toLowerCase().replace(/\s+/g, '-'),
    content: serviceData.content,
    visible: serviceData.visible
  };
  
  services[index] = updatedService;
  saveServices(services);
  return updatedService;
};

// Delete a service
export const deleteService = (id: number): boolean => {
  const services = getServices();
  const filteredServices = services.filter(s => s.id !== id);
  
  if (filteredServices.length === services.length) {
    return false;
  }
  
  saveServices(filteredServices);
  return true;
};

// Get a service by ID
export const getServiceById = (id: number): Service | null => {
  const services = getServices();
  return services.find(s => s.id === id) || null;
};

// Get a service by slug
export const getServiceBySlug = (slug: string): Service | null => {
  const services = getServices();
  return services.find(s => s.slug === slug) || null;
};

// Get all visible services
export const getVisibleServices = (): Service[] => {
  const services = getServices();
  return services.filter(s => s.visible);
};
