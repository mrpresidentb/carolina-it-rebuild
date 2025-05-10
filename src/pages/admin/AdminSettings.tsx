import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, Heading, Image, Settings, Link as LinkIcon, Phone, Mail, MapPin, Clock, FileText } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useSettings, SiteSettings, defaultSettings } from '@/hooks/useSettings';
import { useWebsiteImages } from '@/hooks/useWebsiteImages';
import { useContentPages } from '@/hooks/useContentPages';
import ImageUploader from '@/components/admin/ImageUploader';
import { WebsiteImage } from '@/models/WebsiteImage';
import ContentEditor from '@/components/admin/ContentEditor';

// Define available pages for SEO settings
const availablePages = [
  { value: "/", label: "Home Page" },
  { value: "/services", label: "Services Page" },
  { value: "/printers", label: "Printer Services Page" },
  { value: "/blog", label: "Blog Page" },
  { value: "/contact", label: "Contact Page" },
];

const AdminSettings = () => {
  const { settings: savedSettings, saveSettings, isLoaded } = useSettings();
  const { images, updateImage, addImage, getImageForLocation } = useWebsiteImages();
  const { pages, updateContentPage, isLoaded: contentPagesLoaded } = useContentPages();
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [activeTab, setActiveTab] = useState("seo");
  const [selectedPage, setSelectedPage] = useState("/");
  const [selectedImageLocation, setSelectedImageLocation] = useState("homepage-hero");
  const [imageBeingEdited, setImageBeingEdited] = useState<WebsiteImage | null>(null);
  const [selectedContentPage, setSelectedContentPage] = useState("privacy-policy");
  const [newImageData, setNewImageData] = useState({
    name: '',
    url: '',
    alt: '',
    location: '',
    isUploaded: false,
    seo: {
      title: '',
      description: '',
      keywords: ''
    }
  });

  // Image locations by page
  const imageLocations = {
    "/": ["homepage-hero", "homepage-services", "homepage-about"],
    "/services": ["services-hero", "services-banner"],
    "/printers": ["printer-services-hero", "printer-services-banner"],
    "/blog": ["blog-hero"],
    "/contact": ["contact-hero"]
  };

  useEffect(() => {
    if (isLoaded) {
      setSettings(savedSettings);
    }
  }, [savedSettings, isLoaded]);

  useEffect(() => {
    // Get current image for selected location
    const currentImage = getImageForLocation(selectedImageLocation);
    setImageBeingEdited(currentImage || null);
    
    // Reset new image data form
    if (currentImage) {
      setNewImageData({
        name: currentImage.name,
        url: currentImage.url,
        alt: currentImage.alt || '',
        location: currentImage.location,
        isUploaded: !!currentImage.isUploaded,
        seo: {
          title: currentImage.seo?.title || '',
          description: currentImage.seo?.description || '',
          keywords: currentImage.seo?.keywords || ''
        }
      });
    } else {
      setNewImageData({
        name: selectedImageLocation.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        url: '',
        alt: '',
        location: selectedImageLocation,
        isUploaded: false,
        seo: {
          title: '',
          description: '',
          keywords: ''
        }
      });
    }
  }, [selectedImageLocation, getImageForLocation]);

  // Update image location options when page changes
  useEffect(() => {
    if (imageLocations[selectedPage as keyof typeof imageLocations]?.length > 0) {
      setSelectedImageLocation(imageLocations[selectedPage as keyof typeof imageLocations][0]);
    }
  }, [selectedPage]);

  // Handle image form field changes
  const handleImageFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('seo.')) {
      const seoField = name.split('.')[1];
      setNewImageData(prev => ({
        ...prev,
        seo: {
          ...prev.seo,
          [seoField]: value
        }
      }));
    } else {
      setNewImageData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle image upload
  const handleImageSelected = (imageUrl: string, imageFile?: File) => {
    setNewImageData(prev => ({
      ...prev,
      url: imageUrl,
      isUploaded: !!imageFile
    }));
  };

  // Save image
  const handleSaveImage = () => {
    if (!newImageData.url) {
      toast({
        title: "Image URL is required",
        description: "Please upload an image or provide a valid URL",
        variant: "destructive"
      });
      return;
    }

    if (imageBeingEdited) {
      // Update existing image
      const updatedImage = {
        ...imageBeingEdited,
        name: newImageData.name,
        url: newImageData.url,
        alt: newImageData.alt,
        location: newImageData.location,
        isUploaded: newImageData.isUploaded,
        seo: newImageData.seo
      };
      
      const success = updateImage(updatedImage);
      if (success) {
        toast({
          title: "Image updated",
          description: "The image has been updated successfully",
        });
        setImageBeingEdited(updatedImage);
      } else {
        toast({
          title: "Error",
          description: "Failed to update image",
          variant: "destructive"
        });
      }
    } else {
      // Add new image
      const success = addImage(newImageData);
      if (success) {
        toast({
          title: "Image added",
          description: "The new image has been added successfully",
        });
        // Refresh the current image
        const currentImage = getImageForLocation(selectedImageLocation);
        setImageBeingEdited(currentImage || null);
      } else {
        toast({
          title: "Error",
          description: "Failed to add image",
          variant: "destructive"
        });
      }
    }
  };

  // Handle content page save
  const handleSaveContentPage = (page) => {
    const success = updateContentPage(page);
    if (success) {
      toast({
        title: "Page Updated",
        description: `${page.title} has been updated successfully`,
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to update page",
        variant: "destructive"
      });
    }
  };

  // Handle SEO change
  const handleSEOChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        [name]: value
      }
    }));
  };

  const handlePageSeoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        pageSeo: {
          ...prev.seo.pageSeo,
          [selectedPage]: {
            ...prev.seo.pageSeo[selectedPage],
            [name]: value
          }
        }
      }
    }));
  };

  const handlePageNoIndexChange = (checked: boolean) => {
    setSettings(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        pageSeo: {
          ...prev.seo.pageSeo,
          [selectedPage]: {
            ...prev.seo.pageSeo[selectedPage],
            noIndex: checked
          }
        }
      }
    }));
  };

  const handleSocialMediaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        socialMedia: {
          ...prev.seo.socialMedia,
          [name]: value
        }
      }
    }));
  };

  const handleAdvancedSeoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        advanced: {
          ...prev.seo.advanced,
          [name]: value
        }
      }
    }));
  };

  const handleExcludeFromSearchChange = (checked: boolean) => {
    setSettings(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        advanced: {
          ...prev.seo.advanced,
          excludeFromSearch: checked
        }
      }
    }));
  };

  const handleStylingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      styling: {
        ...prev.styling,
        [name]: value
      }
    }));
  };

  const handleContactInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [name]: value
      }
    }));
  };

  const handleBusinessHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        businessHours: {
          ...prev.contact.businessHours,
          [name]: value
        }
      }
    }));
  };

  const handleSaveSettings = () => {
    const success = saveSettings(settings);
    
    if (success) {
      toast({
        title: "Settings Saved",
        description: "Your site settings have been updated",
      });
    } else {
      toast({
        title: "Error",
        description: "There was a problem saving your settings",
        variant: "destructive"
      });
    }
  };

  // Add a null check before accessing settings.seo.pageSeo[selectedPage]
  const pageSeoData = selectedPage && settings?.seo?.pageSeo?.[selectedPage] ? 
    settings.seo.pageSeo[selectedPage] : 
    { title: "", description: "", noIndex: false };

  // Find the currently selected content page
  const currentContentPage = pages.find(page => page.id === selectedContentPage);

  if (!isLoaded || !contentPagesLoaded) {
    return (
      <AdminLayout title="Settings">
        <div className="flex items-center justify-center h-64">
          <p>Loading settings...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Settings">
      <header className="mb-8 pb-4 border-b">
        <h1 className="text-2xl font-bold flex items-center">
          <Settings className="mr-2 h-5 w-5" />
          Site Settings
        </h1>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-8 border-b w-full justify-start rounded-none bg-transparent p-0">
          <TabsTrigger 
            value="seo"
            className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            SEO Settings
          </TabsTrigger>
          <TabsTrigger 
            value="styling"
            className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Theme Settings
          </TabsTrigger>
          <TabsTrigger 
            value="images"
            className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Image Settings
          </TabsTrigger>
          <TabsTrigger 
            value="contact"
            className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Contact Info
          </TabsTrigger>
          <TabsTrigger 
            value="legal"
            className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Legal Pages
          </TabsTrigger>
        </TabsList>

        <TabsContent value="seo" className="mt-0 space-y-6">
          {/* Global SEO Settings */}
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center">
                  <Image className="mr-2 h-5 w-5" />
                  Global SEO Settings
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="siteTitle" className="block text-sm font-medium mb-1">
                  Site Title
                </label>
                <Input 
                  id="siteTitle"
                  name="siteTitle"
                  value={settings.seo.siteTitle} 
                  onChange={handleSEOChange}
                  placeholder="Site title"
                />
                <p className="text-xs text-gray-500 mt-1">Recommended length: 50-60 characters</p>
              </div>
              <div>
                <label htmlFor="siteDescription" className="block text-sm font-medium mb-1">
                  Site Description
                </label>
                <Textarea 
                  id="siteDescription"
                  name="siteDescription"
                  value={settings.seo.siteDescription} 
                  onChange={handleSEOChange}
                  placeholder="Site description for SEO"
                />
                <p className="text-xs text-gray-500 mt-1">Recommended length: 150-160 characters</p>
              </div>
              <div>
                <label htmlFor="defaultKeywords" className="block text-sm font-medium mb-1">
                  Default Keywords
                </label>
                <Input
                  id="defaultKeywords"
                  name="defaultKeywords" 
                  value={settings.seo.defaultKeywords} 
                  onChange={handleSEOChange}
                  placeholder="Keywords separated by commas"
                />
              </div>
            </CardContent>
          </Card>

          {/* Page-specific SEO */}
          <Card>
            <CardHeader>
              <CardTitle>Page-specific SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="pageSelect" className="block text-sm font-medium mb-1">
                  Select Page
                </label>
                <Select 
                  value={selectedPage} 
                  onValueChange={setSelectedPage}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a page" />
                  </SelectTrigger>
                  <SelectContent>
                    {availablePages.map((page) => (
                      <SelectItem key={page.value} value={page.value}>
                        {page.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Use pageSeoData with null checks instead of directly accessing potentially undefined values */}
              <div>
                <label htmlFor="pageTitle" className="block text-sm font-medium mb-1">
                  Page Title
                </label>
                <Input 
                  id="pageTitle"
                  name="title"
                  value={pageSeoData.title} 
                  onChange={handlePageSeoChange}
                  placeholder="Page title"
                />
              </div>
              <div>
                <label htmlFor="pageDescription" className="block text-sm font-medium mb-1">
                  Page Description
                </label>
                <Textarea 
                  id="pageDescription"
                  name="description"
                  value={pageSeoData.description} 
                  onChange={handlePageSeoChange}
                  placeholder="Page description"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="noIndex" 
                  checked={pageSeoData.noIndex}
                  onCheckedChange={handlePageNoIndexChange}
                />
                <label
                  htmlFor="noIndex"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Exclude from search engines (noindex)
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Social Media / Open Graph */}
          <Card>
            <CardHeader>
              <CardTitle>Social Media (Open Graph)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="ogTitle" className="block text-sm font-medium mb-1">
                  OG Title
                </label>
                <Input 
                  id="ogTitle"
                  name="ogTitle"
                  value={settings.seo.socialMedia.ogTitle} 
                  onChange={handleSocialMediaChange}
                  placeholder="Leave blank to use meta title"
                />
              </div>
              <div>
                <label htmlFor="ogDescription" className="block text-sm font-medium mb-1">
                  OG Description
                </label>
                <Textarea 
                  id="ogDescription"
                  name="ogDescription"
                  value={settings.seo.socialMedia.ogDescription} 
                  onChange={handleSocialMediaChange}
                  placeholder="Leave blank to use meta description"
                />
              </div>
              <div>
                <label htmlFor="ogImage" className="block text-sm font-medium mb-1">
                  OG Image URL
                </label>
                <Input 
                  id="ogImage"
                  name="ogImage"
                  value={settings.seo.socialMedia.ogImage} 
                  onChange={handleSocialMediaChange}
                  placeholder="Image URL for social sharing"
                />
              </div>
            </CardContent>
          </Card>

          {/* Advanced SEO Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="canonicalUrl" className="block text-sm font-medium mb-1">
                  Canonical URL
                </label>
                <Input 
                  id="canonicalUrl"
                  name="canonicalUrl"
                  value={settings.seo.advanced.canonicalUrl} 
                  onChange={handleAdvancedSeoChange}
                  placeholder="https://example.com/page"
                />
              </div>
              <div>
                <label htmlFor="structuredData" className="block text-sm font-medium mb-1">
                  Structured Data (JSON-LD)
                </label>
                <Textarea 
                  id="structuredData"
                  name="structuredData"
                  value={settings.seo.advanced.structuredData} 
                  onChange={handleAdvancedSeoChange}
                  placeholder='{"@context":"https://schema.org","@type":"Organization","name":"Company Name"}'
                  className="font-mono text-sm"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="excludeFromSearch" 
                  checked={settings.seo.advanced.excludeFromSearch}
                  onCheckedChange={handleExcludeFromSearchChange}
                />
                <label
                  htmlFor="excludeFromSearch"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Exclude entire site from search engines
                </label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="styling" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center">
                  <Palette className="mr-2 h-5 w-5" />
                  Theme Settings
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Header Colors */}
                <div>
                  <Label className="text-base font-medium mb-3 block">Header Settings</Label>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="headerBgColor" className="block text-sm font-medium mb-1">
                        Header Background Color
                      </label>
                      <div className="flex">
                        <Input 
                          id="headerBgColor"
                          name="headerBgColor"
                          type="color"
                          value={settings.styling.headerBgColor} 
                          onChange={handleStylingChange}
                          className="w-12 h-10 p-1"
                        />
                        <Input 
                          type="text"
                          value={settings.styling.headerBgColor}
                          onChange={handleStylingChange}
                          name="headerBgColor"
                          className="ml-2 flex-1"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="headerTextColor" className="block text-sm font-medium mb-1">
                        Header Title Text Color
                      </label>
                      <div className="flex">
                        <Input 
                          id="headerTextColor"
                          name="headerTextColor"
                          type="color"
                          value={settings.styling.headerTextColor} 
                          onChange={handleStylingChange}
                          className="w-12 h-10 p-1"
                        />
                        <Input 
                          type="text"
                          value={settings.styling.headerTextColor}
                          onChange={handleStylingChange}
                          name="headerTextColor"
                          className="ml-2 flex-1"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="headerNavTextColor" className="block text-sm font-medium mb-1">
                        Header Navigation Text Color
                      </label>
                      <div className="flex">
                        <Input 
                          id="headerNavTextColor"
                          name="headerNavTextColor"
                          type="color"
                          value={settings.styling.headerNavTextColor} 
                          onChange={handleStylingChange}
                          className="w-12 h-10 p-1"
                        />
                        <Input 
                          type="text"
                          value={settings.styling.headerNavTextColor}
                          onChange={handleStylingChange}
                          name="headerNavTextColor"
                          className="ml-2 flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer & Background Colors */}
                <div>
                  <Label className="text-base font-medium mb-3 block">Footer & Background</Label>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="footerBgColor" className="block text-sm font-medium mb-1">
                        Footer Background Color
                      </label>
                      <div className="flex">
                        <Input 
                          id="footerBgColor"
                          name="footerBgColor"
                          type="color"
                          value={settings.styling.footerBgColor} 
                          onChange={handleStylingChange}
                          className="w-12 h-10 p-1"
                        />
                        <Input 
                          type="text"
                          value={settings.styling.footerBgColor}
                          onChange={handleStylingChange}
                          name="footerBgColor"
                          className="ml-2 flex-1"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="backgroundColor" className="block text-sm font-medium mb-1">
                        Site Background Color
                      </label>
                      <div className="flex">
                        <Input 
                          id="backgroundColor"
                          name="backgroundColor"
                          type="color"
                          value={settings.styling.backgroundColor} 
                          onChange={handleStylingChange}
                          className="w-12 h-10 p-1"
                        />
                        <Input 
                          type="text"
                          value={settings.styling.backgroundColor}
                          onChange={handleStylingChange}
                          name="backgroundColor"
                          className="ml-2 flex-1"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="primaryColor" className="block text-sm font-medium mb-1">
                        Primary Brand Color
                      </label>
                      <div className="flex">
                        <Input 
                          id="primaryColor"
                          name="primaryColor"
                          type="color"
                          value={settings.styling.primaryColor} 
                          onChange={handleStylingChange}
                          className="w-12 h-10 p-1"
                        />
                        <Input 
                          type="text"
                          value={settings.styling.primaryColor}
                          onChange={handleStylingChange}
                          name="primaryColor"
                          className="ml-2 flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Heading Colors */}
                <div>
                  <Label className="text-base font-medium mb-3 block">Heading Colors</Label>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="h1Color" className="block text-sm font-medium mb-1">
                        <Heading className="inline-block mr-1 h-4 w-4" /> H1 Color
                      </label>
                      <div className="flex">
                        <Input 
                          id="h1Color"
                          name="h1Color"
                          type="color"
                          value={settings.styling.h1Color} 
                          onChange={handleStylingChange}
                          className="w-12 h-10 p-1"
                        />
                        <Input 
                          type="text"
                          value={settings.styling.h1Color}
                          onChange={handleStylingChange}
                          name="h1Color"
                          className="ml-2 flex-1"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="h2Color" className="block text-sm font-medium mb-1">
                        <Heading className="inline-block mr-1 h-4 w-4" /> H2 Color
                      </label>
                      <div className="flex">
                        <Input 
                          id="h2Color"
                          name="h2Color"
                          type="color"
                          value={settings.styling.h2Color} 
                          onChange={handleStylingChange}
                          className="w-12 h-10 p-1"
                        />
                        <Input 
                          type="text"
                          value={settings.styling.h2Color}
                          onChange={handleStylingChange}
                          name="h2Color"
                          className="ml-2 flex-1"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="h3Color" className="block text-sm font-medium mb-1">
                        <Heading className="inline-block mr-1 h-4 w-4" /> H3 Color
                      </label>
                      <div className="flex">
                        <Input 
                          id="h3Color"
                          name="h3Color"
                          type="color"
                          value={settings.styling.h3Color} 
                          onChange={handleStylingChange}
                          className="w-12 h-10 p-1"
                        />
                        <Input 
                          type="text"
                          value={settings.styling.h3Color}
                          onChange={handleStylingChange}
                          name="h3Color"
                          className="ml-2 flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text & Link Colors */}
                <div>
                  <Label className="text-base font-medium mb-3 block">Text & Links</Label>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="bodyTextColor" className="block text-sm font-medium mb-1">
                        Body Text Color
                      </label>
                      <div className="flex">
                        <Input 
                          id="bodyTextColor"
                          name="bodyTextColor"
                          type="color"
                          value={settings.styling.bodyTextColor} 
                          onChange={handleStylingChange}
                          className="w-12 h-10 p-1"
                        />
                        <Input 
                          type="text"
                          value={settings.styling.bodyTextColor}
                          onChange={handleStylingChange}
                          name="bodyTextColor"
                          className="ml-2 flex-1"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="linkColor" className="block text-sm font-medium mb-1">
                        <LinkIcon className="inline-block mr-1 h-4 w-4" /> Link Color
                      </label>
                      <div className="flex">
                        <Input 
                          id="linkColor"
                          name="linkColor"
                          type="color"
                          value={settings.styling.linkColor} 
                          onChange={handleStylingChange}
                          className="w-12 h-10 p-1"
                        />
                        <Input 
                          type="text"
                          value={settings.styling.linkColor}
                          onChange={handleStylingChange}
                          name="linkColor"
                          className="ml-2 flex-1"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="formTextColor" className="block text-sm font-medium mb-1">
                        Form Text Color
                      </label>
                      <div className="flex">
                        <Input 
                          id="formTextColor"
                          name="formTextColor"
                          type="color"
                          value={settings.styling.formTextColor} 
                          onChange={handleStylingChange}
                          className="w-12 h-10 p-1"
                        />
                        <Input 
                          type="text"
                          value={settings.styling.formTextColor}
                          onChange={handleStylingChange}
                          name="formTextColor"
                          className="ml-2 flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Button Colors */}
                <div className="md:col-span-2">
                  <Label className="text-base font-medium mb-3 block">Button Settings</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="buttonColor" className="block text-sm font-medium mb-1">
                        Button Background Color
                      </label>
                      <div className="flex">
                        <Input 
                          id="buttonColor"
                          name="buttonColor"
                          type="color"
                          value={settings.styling.buttonColor} 
                          onChange={handleStylingChange}
                          className="w-12 h-10 p-1"
                        />
                        <Input 
                          type="text"
                          value={settings.styling.buttonColor}
                          onChange={handleStylingChange}
                          name="buttonColor"
                          className="ml-2 flex-1"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="buttonTextColor" className="block text-sm font-medium mb-1">
                        Button Text Color
                      </label>
                      <div className="flex">
                        <Input 
                          id="buttonTextColor"
                          name="buttonTextColor"
                          type="color"
                          value={settings.styling.buttonTextColor} 
                          onChange={handleStylingChange}
                          className="w-12 h-10 p-1"
                        />
                        <Input 
                          type="text"
                          value={settings.styling.buttonTextColor}
                          onChange={handleStylingChange}
                          name="buttonTextColor"
                          className="ml-2 flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Preview Section */}
              <div className="mt-8 p-6 border rounded-lg">
                <h3 className="text-lg font-medium mb-4">Preview</h3>
                <div className="p-4 rounded-lg" style={{backgroundColor: settings.styling.backgroundColor}}>
                  {/* Header Preview */}
                  <div className="p-4 mb-4 rounded-lg" style={{backgroundColor: settings.styling.headerBgColor}}>
                    <div style={{color: settings.styling.headerTextColor}} className="font-semibold">
                      Header Preview
                    </div>
                  </div>
                  
                  {/* Content Preview */}
                  <h1 style={{color: settings.styling.h1Color}} className="text-2xl font-bold mb-2">
                    Heading 1
                  </h1>
                  <h2 style={{color: settings.styling.h2Color}} className="text-xl font-semibold mb-2">
                    Heading 2
                  </h2>
                  <h3 style={{color: settings.styling.h3Color}} className="text-lg font-semibold mb-2">
                    Heading 3
                  </h3>
                  <p style={{color: settings.styling.bodyTextColor}} className="mb-4">
                    Sample text with a <span style={{color: settings.styling.linkColor}}>link</span> inside it.
                  </p>
                  <button 
                    style={{
                      backgroundColor: settings.styling.buttonColor,
                      color: settings.styling.buttonTextColor,
                      padding: '0.5rem 1rem',
                      borderRadius: '0.25rem',
                    }}
                    className="mb-4"
                  >
                    Button Preview
                  </button>
                  
                  {/* Footer Preview */}
                  <div className="p-4 mt-4 rounded-lg" style={{backgroundColor: settings.styling.footerBgColor}}>
                    <div className="text-sm">Footer Preview</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="mt-0 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center">
                  <Image className="mr-2 h-5 w-5" />
                  Page Images
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  {/* Page selector */}
                  <div className="mb-6">
                    <Label htmlFor="pageSelect" className="block text-sm font-medium mb-1">
                      Select Page
                    </Label>
                    <Select 
                      value={selectedPage} 
                      onValueChange={setSelectedPage}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a page" />
                      </SelectTrigger>
                      <SelectContent>
                        {availablePages.map((page) => (
                          <SelectItem key={page.value} value={page.value}>
                            {page.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Image location selector */}
                  <div className="mb-6">
                    <Label htmlFor="imageLocationSelect" className="block text-sm font-medium mb-1">
                      Image Location
                    </Label>
                    <Select 
                      value={selectedImageLocation} 
                      onValueChange={setSelectedImageLocation}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select image location" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedPage && imageLocations[selectedPage as keyof typeof imageLocations]?.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Current image preview */}
                  <div className="mb-6">
                    <Label className="block text-sm font-medium mb-2">
                      Current Image
                    </Label>
                    <div className="border rounded-md overflow-hidden h-48 flex items-center justify-center bg-gray-50">
                      {imageBeingEdited?.url ? (
                        <img 
                          src={imageBeingEdited.url} 
                          alt={imageBeingEdited.alt || 'Current image'} 
                          className="max-h-full max-w-full object-contain"
                        />
                      ) : (
                        <div className="text-gray-400 text-center">
                          <Image className="mx-auto h-10 w-10 mb-2" />
                          <p>No image set for this location</p>
                        </div>
                      )}
                    </div>
                    {imageBeingEdited?.name && (
                      <p className="text-sm mt-1 text-center font-medium">{imageBeingEdited.name}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Image name */}
                  <div>
                    <Label htmlFor="imageName" className="block text-sm font-medium mb-1">
                      Image Name
                    </Label>
                    <Input 
                      id="imageName"
                      name="name"
                      value={newImageData.name} 
                      onChange={handleImageFieldChange}
                      placeholder="e.g., Homepage Hero Banner"
                    />
                  </div>

                  {/* Image alt text */}
                  <div>
                    <Label htmlFor="imageAlt" className="block text-sm font-medium mb-1">
                      Alt Text
                    </Label>
                    <Input 
                      id="imageAlt"
                      name="alt"
                      value={newImageData.alt} 
                      onChange={handleImageFieldChange}
                      placeholder="Descriptive text for screen readers and SEO"
                    />
                    <p className="text-xs text-gray-500 mt-1">Important for accessibility and SEO</p>
                  </div>

                  {/* Image upload */}
                  <div>
                    <Label className="block text-sm font-medium mb-2">
                      Change Image
                    </Label>
                    <ImageUploader onImageSelected={handleImageSelected} />
                    {newImageData.url && newImageData.url !== imageBeingEdited?.url && (
                      <div className="mt-4 border rounded-md overflow-hidden p-2">
                        <p className="text-sm font-medium mb-2">New image will replace current one:</p>
                        <img 
                          src={newImageData.url} 
                          alt="New image preview" 
                          className="max-h-32 max-w-full object-contain mx-auto"
                        />
                      </div>
                    )}
                  </div>

                  {/* Image SEO */}
                  <div>
                    <Label className="block text-sm font-medium mb-2">
                      Image SEO Data
                    </Label>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="imageSeoTitle" className="block text-xs mb-1">
                          SEO Title
                        </Label>
                        <Input 
                          id="imageSeoTitle"
                          name="seo.title"
                          value={newImageData.seo.title} 
                          onChange={handleImageFieldChange}
                          placeholder="SEO title for this image"
                        />
                      </div>
                      <div>
                        <Label htmlFor="imageSeoDesc" className="block text-xs mb-1">
                          SEO Description
                        </Label>
                        <Textarea 
                          id="imageSeoDesc"
                          name="seo.description"
                          value={newImageData.seo.description} 
                          onChange={handleImageFieldChange}
                          placeholder="SEO description for this image"
                        />
                      </div>
                      <div>
                        <Label htmlFor="imageSeoKeywords" className="block text-xs mb-1">
                          SEO Keywords
                        </Label>
                        <Input 
                          id="imageSeoKeywords"
                          name="seo.keywords"
                          value={newImageData.seo.keywords} 
                          onChange={handleImageFieldChange}
                          placeholder="Keywords separated by commas"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Button 
                  onClick={handleSaveImage}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  {imageBeingEdited ? 'Update Image' : 'Add Image'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="mt-0 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center">
                  <Phone className="mr-2 h-5 w-5" />
                  Contact Information
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Phone Number
                </label>
                <Input 
                  id="phone"
                  name="phone"
                  value={settings.contact.phone} 
                  onChange={handleContactInfoChange}
                  placeholder="(123) 456-7890"
                />
                <p className="text-xs text-gray-500 mt-1">Displayed in header, footer, and contact pages</p>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <Input 
                  id="email"
                  name="email"
                  value={settings.contact.email} 
                  onChange={handleContactInfoChange}
                  placeholder="info@example.com"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium mb-1">
                  Address
                </label>
                <Input 
                  id="address"
                  name="address"
                  value={settings.contact.address} 
                  onChange={handleContactInfoChange}
                  placeholder="123 Main St, City, State, Zip"
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Business Hours
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="monday" className="block text-sm font-medium mb-1">
                    Monday
                  </label>
                  <Input 
                    id="monday"
                    name="monday"
                    value={settings.contact.businessHours.monday} 
                    onChange={handleBusinessHoursChange}
                    placeholder="9:00 AM - 5:00 PM"
                  />
                </div>
                <div>
                  <label htmlFor="tuesday" className="block text-sm font-medium mb-1">
                    Tuesday
                  </label>
                  <Input 
                    id="tuesday"
                    name="tuesday"
                    value={settings.contact.businessHours.tuesday} 
                    onChange={handleBusinessHoursChange}
                    placeholder="9:00 AM - 5:00 PM"
                  />
                </div>
                <div>
                  <label htmlFor="wednesday" className="block text-sm font-medium mb-1">
                    Wednesday
                  </label>
                  <Input 
                    id="wednesday"
                    name="wednesday"
                    value={settings.contact.businessHours.wednesday} 
                    onChange={handleBusinessHoursChange}
                    placeholder="9:00 AM - 5:00 PM"
                  />
                </div>
                <div>
                  <label htmlFor="thursday" className="block text-sm font-medium mb-1">
                    Thursday
                  </label>
                  <Input 
                    id="thursday"
                    name="thursday"
                    value={settings.contact.businessHours.thursday} 
                    onChange={handleBusinessHoursChange}
                    placeholder="9:00 AM - 5:00 PM"
                  />
                </div>
                <div>
                  <label htmlFor="friday" className="block text-sm font-medium mb-1">
                    Friday
                  </label>
                  <Input 
                    id="friday"
                    name="friday"
                    value={settings.contact.businessHours.friday} 
                    onChange={handleBusinessHoursChange}
                    placeholder="9:00 AM - 5:00 PM"
                  />
                </div>
                <div>
                  <label htmlFor="saturday" className="block text-sm font-medium mb-1">
                    Saturday
                  </label>
                  <Input 
                    id="saturday"
                    name="saturday"
                    value={settings.contact.businessHours.saturday} 
                    onChange={handleBusinessHoursChange}
                    placeholder="10:00 AM - 2:00 PM"
                  />
                </div>
                <div>
                  <label htmlFor="sunday" className="block text-sm font-medium mb-1">
                    Sunday
                  </label>
                  <Input 
                    id="sunday"
                    name="sunday"
                    value={settings.contact.businessHours.sunday} 
                    onChange={handleBusinessHoursChange}
                    placeholder="Closed"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="legal" className="mt-0 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Legal Pages
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex space-x-6">
                {/* Page selector sidebar */}
                <div className="w-1/4 border-r pr-4">
                  <h3 className="font-medium mb-3">Select Page</h3>
                  <div className="flex flex-col space-y-2">
                    <Button 
                      variant={selectedContentPage === "privacy-policy" ? "secondary" : "ghost"}
                      className="justify-start"
                      onClick={() => setSelectedContentPage("privacy-policy")}
                    >
                      Privacy Policy
                    </Button>
                    <Button 
                      variant={selectedContentPage === "terms-of-use" ? "secondary" : "ghost"}
                      className="justify-start"
                      onClick={() => setSelectedContentPage("terms-of-use")}
                    >
                      Terms of Use
                    </Button>
                  </div>
                </div>

                {/* Content editor */}
                <div className="flex-1">
                  {currentContentPage ? (
                    <ContentEditor 
                      page={currentContentPage} 
                      onSave={handleSaveContentPage}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-64 bg-gray-50 rounded-md border">
                      <p className="text-muted-foreground">Select a page to edit</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex justify-end">
        <Button 
          onClick={handleSaveSettings} 
          style={{
            backgroundColor: settings.styling.buttonColor,
            color: settings.styling.buttonTextColor
          }}
        >
          Save Settings
        </Button>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
