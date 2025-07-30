'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BellIcon, 
  CheckCircleIcon, 
  ExclamationCircleIcon,
  InformationCircleIcon 
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

interface Activity {
  id: string;
  type: 'success' | 'warning' | 'info';
  title: string;
  description: string;
  timestamp: Date;
}

const activityTemplates = [
  { type: 'success', title: 'Campaign Milestone', description: 'Summer Sale campaign reached 1000 conversions' },
  { type: 'warning', title: 'Budget Alert', description: 'Holiday Special is 80% through daily budget' },
  { type: 'info', title: 'New Traffic Source', description: 'Organic traffic increased by 15% in the last hour' },
  { type: 'success', title: 'Conversion Goal Met', description: 'Brand Awareness campaign exceeded daily conversion target' },
  { type: 'warning', title: 'High CPC Alert', description: 'Cost per click increased by 25% for Product Launch campaign' },
  { type: 'info', title: 'Audience Insight', description: 'Mobile users showing 30% higher engagement rate' }
];

export function RealTimeFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Add initial activities
    const initialActivities = activityTemplates.slice(0, 3).map((template, index) => ({
      id: `activity-${Date.now()}-${index}`,
      type: template.type as 'success' | 'warning' | 'info',
      title: template.title,
      description: template.description,
      timestamp: new Date(Date.now() - (index * 60000)) // Stagger timestamps
    }));

    setActivities(initialActivities);

    // Add new activity every 15 seconds
    const interval = setInterval(() => {
      const template = activityTemplates[Math.floor(Math.random() * activityTemplates.length)];
      const newActivity: Activity = {
        id: `activity-${Date.now()}`,
        type: template.type as 'success' | 'warning' | 'info',
        title: template.title,
        description: template.description,
        timestamp: new Date()
      };

      setActivities(prev => [newActivity, ...prev.slice(0, 9)]); // Keep only 10 most recent
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const iconMap = {
    success: CheckCircleIcon,
    warning: ExclamationCircleIcon,
    info: InformationCircleIcon
  };

  const colorMap = {
    success: {
      bg: 'bg-green-50 dark:bg-green-950/30',
      border: 'border-green-200 dark:border-green-900',
      icon: 'text-green-600 dark:text-green-400'
    },
    warning: {
      bg: 'bg-amber-50 dark:bg-amber-950/30',
      border: 'border-amber-200 dark:border-amber-900',
      icon: 'text-amber-600 dark:text-amber-400'
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-950/30',  
      border: 'border-blue-200 dark:border-blue-900',
      icon: 'text-blue-600 dark:text-blue-400'
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-xl border bg-card/50 backdrop-blur-sm"
    >
      <div className="flex items-center gap-2 mb-6">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <BellIcon className="w-6 h-6 text-primary" />
        </motion.div>
        <h3 className="text-lg font-semibold">Real-time Activity</h3>
        <div className="ml-auto">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {activities.map((activity, index) => {
            const Icon = iconMap[activity.type];
            const colors = colorMap[activity.type];

            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                layout
                className={cn(
                  "p-3 rounded-lg border transition-all duration-200",
                  colors.bg,
                  colors.border
                )}
              >
                <div className="flex items-start gap-3">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.05 + 0.1, type: "spring" }}
                    className={cn("p-1 rounded-full", colors.icon)}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm text-foreground">
                        {activity.title}
                      </h4>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                        {formatTimestamp(activity.timestamp)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {activity.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}