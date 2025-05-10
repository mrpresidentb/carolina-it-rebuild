
import React, { useState, useEffect } from 'react';
import { ContentPage } from '@/models/ContentPage';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

interface ContentEditorProps {
  page: ContentPage;
  onSave: (page: ContentPage) => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ page, onSave }) => {
  const [editedPage, setEditedPage] = useState<ContentPage>(page);
  const [previewMode, setPreviewMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setEditedPage(page);
  }, [page]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('meta.')) {
      const metaField = name.split('.')[1];
      setEditedPage(prev => ({
        ...prev,
        meta: {
          ...prev.meta,
          [metaField]: value
        }
      }));
    } else {
      setEditedPage(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = () => {
    onSave(editedPage);
    toast({
      title: "Page Saved",
      description: `${editedPage.title} has been updated`,
    });
  };

  const lastUpdatedDate = new Date(editedPage.lastUpdated).toLocaleString();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Last updated: {lastUpdatedDate}
          </p>
        </div>
        <div className="space-x-2">
          <Button 
            variant={previewMode ? "outline" : "secondary"} 
            onClick={() => setPreviewMode(false)}
          >
            Edit
          </Button>
          <Button 
            variant={previewMode ? "secondary" : "outline"} 
            onClick={() => setPreviewMode(true)}
          >
            Preview
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>

      {previewMode ? (
        <Card>
          <CardContent className="pt-6">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: editedPage.content }}
            />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Page Title</Label>
            <Input
              id="title"
              name="title"
              value={editedPage.title}
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="content">HTML Content</Label>
            <Textarea
              id="content"
              name="content"
              value={editedPage.content}
              onChange={handleChange}
              rows={15}
              className="mt-1 font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Use HTML tags to format your content (h1, p, strong, etc.)
            </p>
          </div>

          <div className="pt-4 border-t">
            <h3 className="font-medium mb-3">SEO Settings</h3>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="meta.title">Meta Title</Label>
                <Input
                  id="meta.title"
                  name="meta.title"
                  value={editedPage.meta.title || ''}
                  onChange={handleChange}
                  placeholder="Leave blank to use page title"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="meta.description">Meta Description</Label>
                <Textarea
                  id="meta.description"
                  name="meta.description"
                  value={editedPage.meta.description || ''}
                  onChange={handleChange}
                  placeholder="Brief description for search engines"
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentEditor;
