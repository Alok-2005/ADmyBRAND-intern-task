'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BellIcon, XCircleIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import toast from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  message: string;
  category: 'Campaign' | 'System' | 'Alert';
  timestamp: Date;
  read: boolean;
}

const mockNotifications: Notification[] = [
  { id: '1', message: 'New campaign "Summer Sale" launched successfully!', category: 'Campaign', timestamp: new Date(Date.now() - 5 * 60 * 1000), read: false },
  { id: '2', message: 'Traffic spike detected on social media channels.', category: 'Alert', timestamp: new Date(Date.now() - 30 * 60 * 1000), read: false },
  { id: '3', message: 'Weekly performance report is ready for review.', category: 'System', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), read: true },
  { id: '4', message: 'Budget exceeded for "Winter Promo" campaign.', category: 'Alert', timestamp: new Date(Date.now() - 45 * 60 * 1000), read: false },
  { id: '5', message: 'System maintenance scheduled for tonight.', category: 'System', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), read: true },
];

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const filteredNotifications = notifications
    .filter(
      (n) =>
        n.message.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (categoryFilter === 'all' || n.category === categoryFilter)
    )
    .sort((a, b) =>
      sortOrder === 'newest'
        ? b.timestamp.getTime() - a.timestamp.getTime()
        : a.timestamp.getTime() - b.timestamp.getTime()
    );

  const dismissNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
    toast.success('Notification dismissed', { position: 'top-right', duration: 2000 });
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
    toast.success('All notifications marked as read', { position: 'top-right', duration: 2000 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 rounded-2xl border bg-card/50 backdrop-blur-sm shadow-lg"
    >
      <div className="flex items-center gap-2 mb-6">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <BellIcon className="w-6 h-6 text-primary" />
        </motion.div>
        <h3 className="text-2xl font-semibold">Notifications</h3>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Input
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <BellIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Campaign">Campaign</SelectItem>
            <SelectItem value="System">System</SelectItem>
            <SelectItem value="Alert">Alert</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as 'newest' | 'oldest')}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <p className="text-muted-foreground text-sm">No notifications found</p>
        ) : (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              className="w-full max-w-xs"
            >
              Mark All as Read
            </Button>
            <AnimatePresence>
              {filteredNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    'p-4 rounded-lg border flex items-start gap-3',
                    notification.read ? 'bg-muted/50' : 'bg-card'
                  )}
                >
                  <FunnelIcon className={cn(
                    'w-5 h-5 mt-1',
                    notification.category === 'Campaign' ? 'text-blue-500' :
                    notification.category === 'System' ? 'text-green-500' :
                    'text-red-500'
                  )} />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => dismissNotification(notification.id)}
                        className="p-1"
                      >
                        <XCircleIcon className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                    <Badge
                      className={cn(
                        'mt-2',
                        notification.category === 'Campaign' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                        notification.category === 'System' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      )}
                    >
                      {notification.category}
                    </Badge>
                    {!notification.read && (
                      <span className="ml-2 inline-block w-2 h-2 bg-red-500 rounded-full" />
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </>
        )}
      </div>
    </motion.div>
  );
}