
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Settings, FileText, Layers, Mail } from 'lucide-react';
import { getContactSubmissions } from '@/utils/contactSubmissions';
import { Badge } from '@/components/ui/badge';

const AdminNav = () => {
  const location = useLocation();
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  
  // Update unread messages count on component mount and location change
  useEffect(() => {
    const updateUnreadCount = () => {
      const count = getContactSubmissions().filter(msg => !msg.isRead).length;
      setUnreadMessagesCount(count);
    };
    
    updateUnreadCount();
    
    // Set up interval to check for new messages every 10 seconds
    const intervalId = setInterval(updateUnreadCount, 10000);
    
    return () => clearInterval(intervalId);
  }, [location]);

  const navItems = [
    {
      href: '/admin/dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    },
    {
      href: '/admin/services',
      label: 'Services',
      icon: <Layers className="mr-2 h-4 w-4" />,
    },
    {
      href: '/admin/blog',
      label: 'Blog',
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
    {
      href: '/admin/messages',
      label: 'Messages',
      icon: <Mail className="mr-2 h-4 w-4" />,
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : null,
    },
    {
      href: '/admin/settings',
      label: 'Settings',
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
  ];

  return (
    <nav className="space-y-1">
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            'flex items-center px-3 py-2 text-sm font-medium rounded-md',
            location.pathname === item.href
              ? 'bg-primary text-primary-foreground'
              : 'text-gray-600 hover:bg-gray-100'
          )}
        >
          {item.icon}
          <span>{item.label}</span>
          {item.badge && (
            <Badge className="ml-auto bg-blue-500">{item.badge}</Badge>
          )}
        </Link>
      ))}
    </nav>
  );
};

export default AdminNav;
