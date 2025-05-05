
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get blog posts from localStorage
    const savedPosts = localStorage.getItem('blog_posts');
    const parsedPosts: BlogPost[] = savedPosts ? JSON.parse(savedPosts) : [];
    
    // Find the post with the matching ID
    const foundPost = parsedPosts.find((p) => p.id === id);
    
    // Update meta tags for SEO if the post exists
    if (foundPost) {
      document.title = foundPost.seoTitle || foundPost.title;
      
      // Find or create meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', foundPost.seoDescription || foundPost.excerpt);
    }
    
    setPost(foundPost || null);
    setIsLoading(false);
  }, [id]);

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="text-center py-12">Loading post...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium text-gray-700 mb-4">Post not found</h3>
          <p className="text-gray-500 mb-6">The post you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/blog')} className="bg-itblue hover:bg-itblue-dark">
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <Link to="/blog" className="text-itblue hover:text-itblue-dark hover:underline mb-6 inline-block">
        ← Back to Blog
      </Link>
      
      <article className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        
        <div className="text-sm text-gray-500 flex items-center mb-8">
          <Calendar className="h-4 w-4 mr-1" />
          {formatDate(post.date)}
        </div>
        
        <div className="blog-content">
          {/* Simple rendering of content, in a real app you might use a markdown renderer */}
          {post.content.split('\n').map((paragraph, i) => (
            paragraph ? <p key={i}>{paragraph}</p> : <br key={i} />
          ))}
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
