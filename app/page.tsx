"use client"
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ChartBarIcon, 
  SparklesIcon, 
  ArrowRightIcon, 
  StarIcon,
  TrophyIcon,
  RocketLaunchIcon,
  BoltIcon,
  EyeIcon,
  GlobeAltIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import { Sidebar } from '@/components/dashboard/sidebar';

import { useRouter } from 'next/navigation';

const Index = () => {
  const [activeTab, setActiveTab] = useState('landing');
  const [email, setEmail] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -25]);

  const router = useRouter();

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

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

  const features = [
    {
      icon: ChartBarIcon,
      title: 'Interactive Visualizations',
      description: 'Dynamic charts with real-time updates and smooth animations for comprehensive data analysis.',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950/50',
    },
    {
      icon: SparklesIcon,
      title: 'AI-Driven Insights',
      description: 'Advanced machine learning algorithms for predictive analytics and intelligent recommendations.',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950/50',
    },
    {
      icon: BoltIcon,
      title: 'Real-Time Processing',
      description: 'Lightning-fast data processing with instant notifications and live performance tracking.',
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-50 dark:bg-amber-950/50',
    },
    {
      icon: CpuChipIcon,
      title: 'Smart Automation',
      description: 'Intelligent automation workflows that optimize your marketing campaigns effortlessly.',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-950/50',
    },
    {
      icon: GlobeAltIcon,
      title: 'Global Analytics',
      description: 'Worldwide data collection and analysis with multi-region insights and comparisons.',
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/50',
    },
    {
      icon: TrophyIcon,
      title: 'Performance Excellence',
      description: 'Track key performance indicators and achieve exceptional results with data-driven strategies.',
      color: 'from-rose-500 to-pink-500',
      bgColor: 'bg-rose-50 dark:bg-rose-950/50',
    },
  ];

  const stats = [
    { label: 'Data Points Processed', value: '10M+', icon: ChartBarIcon },
    { label: 'Real-time Updates', value: '24/7', icon: BoltIcon },
    { label: 'Chart Types Available', value: '15+', icon: StarIcon },
    { label: 'AI Accuracy Rate', value: '98%', icon: SparklesIcon },
  ];

  const renderLandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ x: mousePosition.x * 0.02, y: mousePosition.y * 0.02 }}
          className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl"
        />
        <motion.div
          style={{ x: mousePosition.x * -0.015, y: mousePosition.y * -0.015 }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center max-w-6xl mx-auto mb-20"
        >
          {/* Logo and Title */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="flex items-center justify-center gap-6 mb-12"
          >
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/70 rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/25">
                <ChartBarIcon className="w-12 h-12 text-primary-foreground" />
              </div>
              <div className="absolute inset-0 w-24 h-24 bg-gradient-to-br from-primary to-primary/70 rounded-3xl animate-pulse opacity-75"></div>
            </motion.div>
            <div className="text-left">
              <h1 className="text-6xl font-extrabold bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
                ADmyBRAND
              </h1>
              <p className="text-3xl text-muted-foreground font-light tracking-wide">Insights</p>
            </div>
          </motion.div>

          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              Transform Your
              <span className="block bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Marketing Intelligence
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Harness the power of AI-driven analytics to unlock unprecedented insights, 
              optimize campaigns in real-time, and drive exponential growth with data-driven precision.
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
      onClick={() => {
        router.push('/dashboard');
      }}
      size="lg"
      className="text-lg px-12 py-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-2xl shadow-primary/25"
    >
      Start Dashboard
      <ArrowRightIcon className="w-5 h-5 ml-2" />
    </Button>
              </motion.div>

              
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          style={{ y: y1 }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-foreground mb-4">
              Powerful Features for Modern Marketing
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the comprehensive suite of tools designed to elevate your marketing performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
                  <CardHeader className="pb-4">
                    <div className={cn('w-16 h-16 rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden', feature.bgColor)}>
                      <div className={cn('absolute inset-0 bg-gradient-to-br opacity-20', feature.color)}></div>
                      <feature.icon className="w-8 h-8 text-foreground relative z-10" />
                    </div>
                    <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          style={{ y: y2 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mb-20"
        >
          <Card className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border-border/50 shadow-2xl">
            <CardContent className="p-12">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-foreground mb-4">
                  Trusted by Industry Leaders
                </h3>
                <p className="text-lg text-muted-foreground">
                  Join thousands of companies achieving exceptional results
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.4 + index * 0.1, type: 'spring', stiffness: 200 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center group"
                  >
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <stat.icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 backdrop-blur-sm">
            <CardContent className="p-12">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-4xl font-bold text-foreground mb-6">
                  Ready to Transform Your Analytics?
                </h3>
                <p className="text-xl text-muted-foreground mb-8">
                  Start your journey with ADmyBRAND Insights today and unlock the full potential of your marketing data.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => setActiveTab('overview')}
                    size="lg"
                    className="text-xl px-16 py-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-2xl shadow-primary/25"
                  >
                    Get Started Now
                    <RocketLaunchIcon className="w-6 h-6 ml-3" />
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );

  const renderDashboardContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4 text-foreground">Dashboard Overview</h1>
            <p className="text-muted-foreground">Welcome to your smooth animated dashboard!</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4 text-foreground">Analytics</h1>
            <p className="text-muted-foreground">View your analytics data here.</p>
          </div>
        );
      case 'campaigns':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4 text-foreground">Campaigns</h1>
            <p className="text-muted-foreground">Manage your campaigns here.</p>
          </div>
        );
      case 'notifications':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4 text-foreground">Notifications</h1>
            <p className="text-muted-foreground">Check your notifications here.</p>
          </div>
        );
      case 'profile':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4 text-foreground">Profile</h1>
            <p className="text-muted-foreground">Manage your profile settings here.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4 text-foreground">Settings</h1>
            <p className="text-muted-foreground">Configure your app settings here.</p>
          </div>
        );
      default:
        return renderLandingPage();
    }
  };

  if (activeTab === 'landing') {
    return renderLandingPage();
  }

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 lg:ml-0">
        {renderDashboardContent()}
      </main>
    </div>
  );
};

export default Index;
