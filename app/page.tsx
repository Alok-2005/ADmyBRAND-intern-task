"use client"
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useAnimation, AnimatePresence } from 'framer-motion';
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const Index = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollY } = useScroll();
  const controls = useAnimation();
   const router = useRouter();
  
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -25]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0.8]);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    
    // Trigger loading animation
    setIsLoaded(true);
    controls.start({ opacity: 1, y: 0 });
    
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100
      }
    }
  };

  const features = [
    {
      icon: ChartBarIcon,
      title: 'Interactive Visualizations',
      description: 'Dynamic charts with real-time updates and smooth animations for comprehensive data analysis.',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950/50',
      delay: 0
    },
    {
      icon: SparklesIcon,
      title: 'AI-Driven Insights',
      description: 'Advanced machine learning algorithms for predictive analytics and intelligent recommendations.',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950/50',
      delay: 0.1
    },
    {
      icon: BoltIcon,
      title: 'Real-Time Processing',
      description: 'Lightning-fast data processing with instant notifications and live performance tracking.',
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-50 dark:bg-amber-950/50',
      delay: 0.2
    },
    {
      icon: CpuChipIcon,
      title: 'Smart Automation',
      description: 'Intelligent automation workflows that optimize your marketing campaigns effortlessly.',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-950/50',
      delay: 0.3
    },
    {
      icon: GlobeAltIcon,
      title: 'Global Analytics',
      description: 'Worldwide data collection and analysis with multi-region insights and comparisons.',
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/50',
      delay: 0.4
    },
    {
      icon: TrophyIcon,
      title: 'Performance Excellence',
      description: 'Track key performance indicators and achieve exceptional results with data-driven strategies.',
      color: 'from-rose-500 to-pink-500',
      bgColor: 'bg-rose-50 dark:bg-rose-950/50',
      delay: 0.5
    },
  ];

  const stats = [
    { label: 'Data Points Processed', value: '10M+', icon: ChartBarIcon, color: 'text-blue-500' },
    { label: 'Real-time Updates', value: '24/7', icon: BoltIcon, color: 'text-amber-500' },
    { label: 'Chart Types Available', value: '15+', icon: StarIcon, color: 'text-purple-500' },
    { label: 'AI Accuracy Rate', value: '98%', icon: SparklesIcon, color: 'text-green-500' },
  ];

  // Floating particles component
  const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/20 rounded-full"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
          style={{
            left: `${10 + (i * 8) % 80}%`,
            top: `${20 + (i * 12) % 60}%`,
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ x: mousePosition.x * 0.02, y: mousePosition.y * 0.02 }}
          className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl float"
        />
        <motion.div
          style={{ x: mousePosition.x * -0.015, y: mousePosition.y * -0.015 }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl float-delayed"
        />
        <FloatingParticles />
      </div>

      <motion.div 
        className="container mx-auto px-4 py-20 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div
          style={{ opacity }}
          className="text-center max-w-6xl mx-auto mb-20"
        >
          {/* Logo and Title */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-6 mb-12"
          >
            <motion.div
              whileHover={{ 
                rotate: 360, 
                scale: 1.1,
                filter: "drop-shadow(0 0 20px hsl(var(--primary) / 0.5))"
              }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary-glow rounded-3xl flex items-center justify-center glow-soft pulse-glow">
                <ChartBarIcon className="w-12 h-12 text-primary-foreground" />
              </div>
            </motion.div>
            <motion.div 
              className="text-left"
              variants={itemVariants}
            >
              <h1 className="text-6xl font-extrabold text-gradient-hero">
                ADmyBRAND
              </h1>
              <p className="text-3xl text-muted-foreground font-light tracking-wide">Insights</p>
            </motion.div>
          </motion.div>

          {/* Hero Content */}
          <motion.div
            variants={itemVariants}
            className="space-y-8"
          >
            <motion.h2 
              className="text-5xl md:text-7xl font-bold text-foreground leading-tight"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
            >
              Transform Your
              <motion.span 
                className="block text-gradient-primary"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 120 }}
              >
                Marketing Intelligence
              </motion.span>
            </motion.h2>

            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Harness the power of AI-driven analytics to unlock unprecedented insights, 
              optimize campaigns in real-time, and drive exponential growth with data-driven precision.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                whileInView={{ 
                  boxShadow: "0 0 30px hsl(var(--primary) / 0.4)",
                }}
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
          className="mb-20"
        >
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-4xl font-bold text-foreground mb-4">
              Powerful Features for Modern Marketing
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the comprehensive suite of tools designed to elevate your marketing performance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: feature.delay,
                  type: "spring",
                  stiffness: 100,
                  damping: 10
                }}
                whileHover={{ 
                  y: -12, 
                  scale: 1.03,
                  boxShadow: "0 20px 40px -10px hsl(var(--primary) / 0.2)"
                }}
                className="group"
              >
                <Card className="h-full border-animated bg-card/80 backdrop-blur-sm hover:bg-card/90 transition-all duration-500 card-interactive">
                  <CardHeader className="pb-4">
                    <motion.div 
                      className={cn('w-16 h-16 rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden', feature.bgColor)}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      <div className={cn('absolute inset-0 bg-gradient-to-br opacity-20', feature.color)}></div>
                      <feature.icon className="w-8 h-8 text-foreground relative z-10 group-hover:scale-110 transition-transform" />
                    </motion.div>
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
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <Card className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border-border/50 glow-soft">
            <CardContent className="p-12">
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl font-bold text-foreground mb-4">
                  Trusted by Industry Leaders
                </h3>
                <p className="text-lg text-muted-foreground">
                  Join thousands of companies achieving exceptional results
                </p>
              </motion.div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: index * 0.1,
                      type: "spring", 
                      stiffness: 200,
                      damping: 10
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      y: -5,
                      transition: { type: "spring", stiffness: 400 }
                    }}
                    className="text-center group"
                  >
                    <motion.div 
                      className="flex items-center justify-center mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <stat.icon className={cn("w-6 h-6", stat.color)} />
                      </div>
                    </motion.div>
                    <motion.div 
                      className="text-4xl font-bold text-primary mb-2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
                    >
                      {stat.value}
                    </motion.div>
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
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 backdrop-blur-sm border-animated">
            <CardContent className="p-12">
              <div className="max-w-3xl mx-auto">
                <motion.h3 
                  className="text-4xl font-bold text-foreground mb-6"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                >
                  Ready to Transform Your Analytics?
                </motion.h3>
                <motion.p 
                  className="text-xl text-muted-foreground mb-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Start your journey with ADmyBRAND Insights today and unlock the full potential of your marketing data.
                </motion.p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <Button
                    onClick={() => router.push('/dashboard')}
                    size="lg"
                    className="btn-hero text-xl px-16 py-8 group relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary-glow to-primary opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10 flex items-center">
                      Get Started Now
                      <RocketLaunchIcon className="w-6 h-6 ml-3 group-hover:rotate-12 transition-transform" />
                    </span>
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;