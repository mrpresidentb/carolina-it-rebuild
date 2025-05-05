
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

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

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get blog posts from localStorage
    const savedPosts = localStorage.getItem('blog_posts');
    const parsedPosts = savedPosts ? JSON.parse(savedPosts) : [];
    setPosts(parsedPosts);
    setIsLoading(false);
  }, []);

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
        <h1 className="text-3xl font-bold mb-8">Blog</h1>
        <div className="text-center py-12">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">IT Carolina Blog</h1>
      
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl">{post.title}</CardTitle>
                <div className="text-sm text-gray-500 flex items-center mt-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(post.date)}
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link 
                  to={`/blog/${post.id}`} 
                  className="text-itblue hover:text-itblue-dark hover:underline"
                >
                  Read more
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-700 mb-2">No blog posts yet</h3>
          <p className="text-gray-500">Check back soon for updates and news!</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
