
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, Heading, Image, Settings } from 'lucide-react';

// Define settings structure
interface SiteSettings {
  seo: {
    siteTitle: string;
    siteDescription: string;
    defaultKeywords: string;
  };
  styling: {
    h1Color: string;
    h2Color: string;
    backgroundColor: string;
    primaryColor: string;
  };
}

// Initialize with default settings or get from localStorage
const getSettings = (): SiteSettings => {
  const savedSettings = localStorage.getItem('site_settings');
  if (savedSettings) {
    return JSON.parse(savedSettings);
  }
  return {
    seo: {
      siteTitle: "IT Support Services",
      siteDescription: "Professional IT support and services for businesses of all sizes",
      defaultKeywords: "IT support, computer repair, tech services",
    },
    styling: {
      h1Color: "#333333",
      h2Color: "#555555",
      backgroundColor: "#f6f6f7",
      primaryColor: "#33C3F0",
    }
  };
};

const AdminSettings = () => {
  const [settings, setSettings] = useState<SiteSettings>(getSettings);
  const [activeTab, setActiveTab] = useState("seo");

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem('site_settings', JSON.stringify(settings));
  }, [settings]);

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

  const handleSaveSettings = () => {
    localStorage.setItem('site_settings', JSON.stringify(settings));
    toast({
      title: "Settings Saved",
      description: "Your site settings have been updated",
    });

    // Apply styling changes immediately to see the effect
    document.documentElement.style.setProperty('--h1-color', settings.styling.h1Color);
    document.documentElement.style.setProperty('--h2-color', settings.styling.h2Color);
    document.documentElement.style.setProperty('--background-color', settings.styling.backgroundColor);
    document.documentElement.style.setProperty('--primary-color', settings.styling.primaryColor);
  };

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
            className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-itblue data-[state=active]:bg-transparent"
          >
            SEO Settings
          </TabsTrigger>
          <TabsTrigger 
            value="styling"
            className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-itblue data-[state=active]:bg-transparent"
          >
            Style & Appearance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="seo" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center">
                  <Image className="mr-2 h-5 w-5" />
                  SEO Settings
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
        </TabsContent>

        <TabsContent value="styling" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center">
                  <Palette className="mr-2 h-5 w-5" />
                  Style Settings
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <label htmlFor="backgroundColor" className="block text-sm font-medium mb-1">
                    Background Color
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
                    Primary Button Color
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
              
              <div className="mt-6 p-4 border rounded bg-gray-50">
                <h3 className="text-lg font-medium mb-2">Preview</h3>
                <div className="p-4" style={{backgroundColor: settings.styling.backgroundColor}}>
                  <h1 style={{color: settings.styling.h1Color}} className="text-2xl font-bold mb-2">
                    Sample H1 Heading
                  </h1>
                  <h2 style={{color: settings.styling.h2Color}} className="text-xl font-semibold mb-2">
                    Sample H2 Subheading
                  </h2>
                  <p className="mb-4">This is how your headings will look with the selected colors.</p>
                  <button 
                    style={{
                      backgroundColor: settings.styling.primaryColor,
                      color: '#fff',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.25rem',
                    }}
                  >
                    Sample Button
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex justify-end">
        <Button 
          onClick={handleSaveSettings} 
          className="bg-itblue hover:bg-itblue-dark"
        >
          Save Settings
        </Button>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
