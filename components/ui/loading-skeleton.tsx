'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
}

export function LoadingSkeleton({ className, lines = 1 }: LoadingSkeletonProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div
          key={i}
          className="h-4 bg-gradient-to-r from-muted via-muted/50 to-muted rounded"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            backgroundSize: '200% 100%',
          }}
        />
      ))}
    </div>
  );
}

export function MetricCardSkeleton() {
  return (
    <div className="p-6 rounded-xl border bg-card/50 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <LoadingSkeleton className="w-24" />
          <LoadingSkeleton className="w-16" />
        </div>
        <LoadingSkeleton className="w-12 h-12 rounded-full" />
      </div>
      <div className="mt-4">
        <LoadingSkeleton className="w-20" />
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="p-6 rounded-xl border bg-card/50 backdrop-blur-sm">
      <LoadingSkeleton className="w-32 mb-4" />
      <div className="h-64 flex items-end justify-between space-x-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <LoadingSkeleton
            key={i}
            className={`w-8 rounded-t`}
            style={{ height: `${Math.random() * 100 + 50}px` }}
          />
        ))}
      </div>
    </div>
  );
}