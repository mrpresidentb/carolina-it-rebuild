
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';
import { ContactFormSubmission } from '@/models/ContactFormSubmission';
import { 
  getContactSubmissions, 
  markSubmissionAsRead, 
  deleteContactSubmission 
} from '@/utils/contactSubmissions';
import { Mail, Trash, MoreVertical } from 'lucide-react';
import { format } from 'date-fns';

const AdminMessages = () => {
  const [submissions, setSubmissions] = useState<ContactFormSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactFormSubmission | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Load submissions
  useEffect(() => {
    const loadSubmissions = () => {
      const data = getContactSubmissions();
      setSubmissions(data);
    };
    
    loadSubmissions();
    
    // Set up interval to check for new submissions every 60 seconds
    const intervalId = setInterval(loadSubmissions, 60000);
    
    return () => clearInterval(intervalId);
  }, []);

  const handleOpenSubmission = (submission: ContactFormSubmission) => {
    setSelectedSubmission(submission);
    setIsDialogOpen(true);
    
    // Mark as read if it's unread
    if (!submission.isRead) {
      if (markSubmissionAsRead(submission.id)) {
        setSubmissions(prev => 
          prev.map(item => 
            item.id === submission.id ? { ...item, isRead: true } : item
          )
        );
      }
    }
  };

  const handleDeleteSubmission = (id: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      if (deleteContactSubmission(id)) {
        setSubmissions(prev => prev.filter(item => item.id !== id));
        toast({
          title: "Message deleted",
          description: "The message has been deleted successfully",
        });
        
        if (selectedSubmission?.id === id) {
          setIsDialogOpen(false);
        }
      } else {
        toast({
          title: "Error",
          description: "There was a problem deleting the message",
          variant: "destructive",
        });
      }
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy h:mm a');
    } catch (error) {
      return dateString;
    }
  };

  const unreadCount = submissions.filter(submission => !submission.isRead).length;

  return (
    <AdminLayout title="Contact Messages">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Contact Messages</h1>
          {unreadCount > 0 && (
            <Badge variant="default" className="bg-blue-500">
              {unreadCount} New
            </Badge>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="mr-2 h-5 w-5" />
              Submissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {submissions.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                <p>No messages found</p>
                <p className="text-sm mt-2">When visitors submit the contact form, their messages will appear here.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((submission) => (
                      <TableRow 
                        key={submission.id}
                        className={submission.isRead ? "" : "bg-blue-50"}
                      >
                        <TableCell>{formatDate(submission.date)}</TableCell>
                        <TableCell>{submission.name}</TableCell>
                        <TableCell>{submission.email}</TableCell>
                        <TableCell>{submission.phone || "-"}</TableCell>
                        <TableCell>
                          {!submission.isRead && (
                            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                              New
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleOpenSubmission(submission)}
                              >
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDeleteSubmission(submission.id)}
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submission Detail Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Message from {selectedSubmission?.name}</DialogTitle>
              <DialogDescription>
                Received {selectedSubmission ? formatDate(selectedSubmission.date) : ''}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              <div>
                <h4 className="text-sm font-medium">Contact Information</h4>
                <div className="mt-1 space-y-2">
                  <p>Name: {selectedSubmission?.name}</p>
                  <p>Email: {selectedSubmission?.email}</p>
                  <p>Phone: {selectedSubmission?.phone || 'Not provided'}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium">Message</h4>
                <div className="mt-1 p-3 bg-gray-50 rounded-md">
                  <p className="whitespace-pre-wrap">{selectedSubmission?.message}</p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Close
                </Button>
                {selectedSubmission && (
                  <Button 
                    variant="destructive"
                    onClick={() => handleDeleteSubmission(selectedSubmission.id)}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminMessages;
