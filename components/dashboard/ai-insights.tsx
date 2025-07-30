'use client';

import { motion } from 'framer-motion';
import { 
  LightBulbIcon, 
  ExclamationTriangleIcon, 
  CheckCircleIcon,
  SparklesIcon 
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

interface InsightProps {
  id: string;
  type: 'opportunity' | 'warning' | 'success';
  title: string;
  description: string;
  impact: string;
  confidence: number;
}

interface AIInsightsProps {
  insights: InsightProps[];
}

const iconMap = {
  opportunity: LightBulbIcon,
  warning: ExclamationTriangleIcon,
  success: CheckCircleIcon
};

const colorMap = {
  opportunity: {
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-200 dark:border-blue-900',
    icon: 'text-blue-600 dark:text-blue-400',
    title: 'text-blue-900 dark:text-blue-100'
  },
  warning: {
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-900',
    icon: 'text-amber-600 dark:text-amber-400',
    title: 'text-amber-900 dark:text-amber-100'
  },
  success: {
    bg: 'bg-green-50 dark:bg-green-950/30',
    border: 'border-green-200 dark:border-green-900',
    icon: 'text-green-600 dark:text-green-400',
    title: 'text-green-900 dark:text-green-100'
  }
};

export function AIInsights({ insights }: AIInsightsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-xl border bg-card/50 backdrop-blur-sm"
    >
      <div className="flex items-center gap-2 mb-6">
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <SparklesIcon className="w-6 h-6 text-primary" />
        </motion.div>
        <h3 className="text-lg font-semibold">AI-Powered Insights</h3>
      </div>

      <div className="space-y-4">
        {insights.map((insight, index) => {
          const Icon = iconMap[insight.type];
          const colors = colorMap[insight.type];

          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={cn(
                "p-4 rounded-lg border transition-all duration-200",
                colors.bg,
                colors.border
              )}
            >
              <div className="flex items-start gap-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                  className={cn("p-2 rounded-full", colors.icon)}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={cn("font-medium", colors.title)}>
                      {insight.title}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        insight.impact === 'High' 
                          ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                      )}>
                        {insight.impact} Impact
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {Math.round(insight.confidence * 100)}% confident
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {insight.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}