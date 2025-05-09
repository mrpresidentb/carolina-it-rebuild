
import React from 'react';
import { WebsiteImage } from '@/models/WebsiteImage';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface ImageSEOFormProps {
  image: WebsiteImage;
  onSave: (data: Partial<WebsiteImage>) => void;
}

const ImageSEOForm: React.FC<ImageSEOFormProps> = ({ image, onSave }) => {
  const form = useForm({
    defaultValues: {
      alt: image.alt || '',
      caption: image.caption || '',
      description: image.description || '',
      seoTitle: image.seo?.title || '',
      seoDescription: image.seo?.description || '',
      seoKeywords: image.seo?.keywords || ''
    }
  });

  const handleSubmit = form.handleSubmit((data) => {
    onSave({
      ...image,
      alt: data.alt,
      caption: data.caption,
      description: data.description,
      seo: {
        title: data.seoTitle,
        description: data.seoDescription,
        keywords: data.seoKeywords
      }
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          control={form.control}
          name="alt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alt Text (Important for SEO)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Describe what's in the image" />
              </FormControl>
              <FormDescription>
                This text is used by screen readers and search engines
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Caption (Optional)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Caption to display under the image" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Longer description of the image" />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="bg-gray-50 p-4 rounded-md space-y-4">
          <h4 className="text-lg font-medium">SEO Settings</h4>
          
          <FormField
            control={form.control}
            name="seoTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SEO Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="SEO title for this image" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="seoDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SEO Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="SEO description for this image" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="seoKeywords"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SEO Keywords</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Comma-separated keywords" />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Save SEO Settings</Button>
      </form>
    </Form>
  );
};

export default ImageSEOForm;
