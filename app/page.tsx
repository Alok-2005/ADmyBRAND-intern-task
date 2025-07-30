'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ChartBarIcon, SparklesIcon, ArrowRightIcon, StarIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleDemoRequest = () => {
    if (email) {
      toast.success('Demo request sent successfully!', {
        duration: 3000,
        position: 'top-right',
      });
      setEmail('');
    } else {
      toast.error('Please enter a valid email!', {
        duration: 3000,
        position: 'top-right',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900 overflow-hidden">
      <div className="container mx-auto px-4 py-20 relative">
        {/* Animated Background Particles */}
        <motion.div
          className="absolute inset-0 z-0"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 80%)',
            backgroundSize: '200% 200%',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center max-w-5xl mx-auto relative z-10"
        >
          {/* Logo and Title */}
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="flex items-center justify-center gap-4 mb-10"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
              className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl flex items-center justify-center shadow-xl"
            >
              <ChartBarIcon className="w-10 h-10 text-white" />
            </motion.div>
            <div className="text-left">
              <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                ADmyBRAND
              </h1>
              <p className="text-2xl text-muted-foreground font-medium">Insights</p>
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight"
          >
            Unlock the Power of AI-Driven Analytics
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Revolutionize your marketing strategy with real-time insights, predictive analytics, and stunning visualizations. Start optimizing today!
          </motion.p>

          {/* CTA Section with Email Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
          
            <Button
              onClick={() => router.push('/dashboard')}
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 bg-card/80 backdrop-blur-sm border border-border/50 hover:bg-card"
            >
              Explore Dashboard
            </Button>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {[
              {
                icon: ChartBarIcon,
                title: 'Interactive Visualizations',
                description: 'Dynamic charts with real-time updates and smooth animations.',
                color: 'bg-blue-100 dark:bg-blue-900/50',
                iconColor: 'text-blue-600 dark:text-blue-400',
              },
              {
                icon: SparklesIcon,
                title: 'AI-Driven Insights',
                description: 'Advanced machine learning for predictive analytics and recommendations.',
                color: 'bg-purple-100 dark:bg-purple-900/50',
                iconColor: 'text-purple-600 dark:text-purple-400',
              },
              {
                icon: StarIcon,
                title: 'Real-Time Monitoring',
                description: 'Live data feeds with instant notifications and performance tracking.',
                color: 'bg-green-100 dark:bg-green-900/50',
                iconColor: 'text-green-600 dark:text-green-400',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                whileHover={{ scale: 1.05, y: -10 }}
                className="p-6 rounded-2xl border bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto', feature.color)}>
                  <feature.icon className={cn('w-6 h-6', feature.iconColor)} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { label: 'Data Points', value: '10M+' },
              { label: 'Real-time Updates', value: '24/7' },
              { label: 'Chart Types', value: '5+' },
              { label: 'AI Accuracy', value: '96%' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.4 + index * 0.1, type: 'spring', stiffness: 200 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}