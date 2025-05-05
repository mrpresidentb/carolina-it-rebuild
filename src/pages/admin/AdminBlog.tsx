
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/components/admin/AdminLayout';
import { FileText, Plus, Edit, Trash2, ChevronLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

// Mock data structure for a blog post
interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  slug: string;
  seoTitle: string;
  seoDescription: string;
}

// Initialize with empty blog posts array or get from localStorage
const getBlogPosts = () => {
  const savedPosts = localStorage.getItem('blog_posts');
  return savedPosts ? JSON.parse(savedPosts) : [];
};

const AdminBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>(getBlogPosts);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');

  // Save posts to localStorage when they change
  const savePosts = (newPosts: BlogPost[]) => {
    localStorage.setItem('blog_posts', JSON.stringify(newPosts));
    setPosts(newPosts);
  };

  const handleCreateNew = () => {
    setIsCreating(true);
    setCurrentPost(null);
    resetForm();
  };

  const handleEditPost = (post: BlogPost) => {
    setIsEditing(true);
    setCurrentPost(post);
    setTitle(post.title);
    setContent(post.content);
    setExcerpt(post.excerpt);
    setSeoTitle(post.seoTitle || post.title);
    setSeoDescription(post.seoDescription || post.excerpt);
  };

  const handleDeletePost = (postId: string) => {
    const newPosts = posts.filter(post => post.id !== postId);
    savePosts(newPosts);
    toast({
      title: "Post Deleted",
      description: "The blog post has been deleted.",
    });
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setExcerpt('');
    setSeoTitle('');
    setSeoDescription('');
  };

  const handleCancel = () => {
    setIsCreating(false);
    setIsEditing(false);
    setCurrentPost(null);
    resetForm();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (title.trim() === '' || content.trim() === '') {
      toast({
        title: "Error",
        description: "Title and content are required.",
        variant: "destructive",
      });
      return;
    }

    if (isEditing && currentPost) {
      // Update existing post
      const updatedPosts = posts.map(post => 
        post.id === currentPost.id 
          ? {
              ...post,
              title,
              content,
              excerpt: excerpt || content.substring(0, 150) + '...',
              seoTitle: seoTitle || title,
              seoDescription: seoDescription || excerpt,
              date: new Date().toISOString(),
            }
          : post
      );
      savePosts(updatedPosts);
      toast({
        title: "Post Updated",
        description: "Your blog post has been updated.",
      });
    } else {
      // Create new post
      const newPost: BlogPost = {
        id: Date.now().toString(),
        title,
        content,
        excerpt: excerpt || content.substring(0, 150) + '...',
        slug: title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-'),
        date: new Date().toISOString(),
        seoTitle: seoTitle || title,
        seoDescription: seoDescription || excerpt,
      };
      savePosts([...posts, newPost]);
      toast({
        title: "Post Created",
        description: "Your new blog post has been created.",
      });
    }

    setIsCreating(false);
    setIsEditing(false);
    setCurrentPost(null);
    resetForm();
  };

  if (isCreating || isEditing) {
    return (
      <AdminLayout title="Blog">
        <div className="mb-6 flex items-center">
          <Button variant="ghost" onClick={handleCancel} className="mr-2">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Posts
          </Button>
          <h2 className="text-xl font-semibold">
            {isEditing ? "Edit Post" : "Create New Post"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
                <Input 
                  id="title" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter post title"
                />
              </div>
              <div>
                <label htmlFor="content" className="block text-sm font-medium mb-1">Content</label>
                <Textarea 
                  id="content" 
                  value={content} 
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your post content here..."
                  className="min-h-[200px]"
                />
              </div>
              <div>
                <label htmlFor="excerpt" className="block text-sm font-medium mb-1">
                  Excerpt <span className="text-gray-400">(optional)</span>
                </label>
                <Textarea 
                  id="excerpt" 
                  value={excerpt} 
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="A short excerpt for previews..."
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="seoTitle" className="block text-sm font-medium mb-1">
                  SEO Title <span className="text-gray-400">(optional)</span>
                </label>
                <Input 
                  id="seoTitle" 
                  value={seoTitle} 
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder="SEO optimized title"
                />
              </div>
              <div>
                <label htmlFor="seoDescription" className="block text-sm font-medium mb-1">
                  SEO Description <span className="text-gray-400">(optional)</span>
                </label>
                <Textarea 
                  id="seoDescription" 
                  value={seoDescription} 
                  onChange={(e) => setSeoDescription(e.target.value)}
                  placeholder="SEO meta description..."
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" className="bg-itblue hover:bg-itblue-dark">
              {isEditing ? "Update Post" : "Create Post"}
            </Button>
          </div>
        </form>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Blog">
      <header className="mb-8 pb-4 border-b flex justify-between items-center">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <Button className="bg-itblue hover:bg-itblue-dark" onClick={handleCreateNew}>
          <Plus className="mr-2 h-4 w-4" />
          Create New Post
        </Button>
      </header>

      {posts.length > 0 ? (
        <div className="grid gap-6">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span>{post.title}</span>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEditPost(post)}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </CardTitle>
                <div className="text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString()}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{post.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-lg shadow text-center">
          <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No blog posts yet</h3>
          <p className="text-gray-500 mb-6">Create your first blog post to share updates and news</p>
          <Button className="bg-itblue hover:bg-itblue-dark" onClick={handleCreateNew}>
            <Plus className="mr-2 h-4 w-4" />
            Create First Post
          </Button>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminBlog;
