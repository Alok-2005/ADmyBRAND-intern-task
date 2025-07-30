'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/components/theme-provider';
import {
  HomeIcon,
  ChartBarIcon,
  TableCellsIcon,
  CogIcon,
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { easeInOut } from 'framer-motion';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navigation = [
  { id: 'overview', name: 'Overview', icon: HomeIcon },
  { id: 'analytics', name: 'Analytics', icon: ChartBarIcon },
  { id: 'campaigns', name: 'Campaigns', icon: TableCellsIcon },
  { id: 'notifications', name: 'Notifications', icon: BellIcon },
  { id: 'profile', name: 'Profile', icon: UserCircleIcon },
  { id: 'settings', name: 'Settings', icon: CogIcon },
];

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const themeIcons = {
    light: SunIcon,
    dark: MoonIcon,
    system: ComputerDesktopIcon,
  };

  const ThemeIcon = themeIcons[theme as keyof typeof themeIcons] || SunIcon;

  const cycleTheme = () => {
    const themes = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex] as any);
    toast.success(`Theme switched to ${themes[nextIndex]}`, {
      position: 'top-right',
      duration: 3000,
    });
  };

  const sidebarVariants = {
    open: { 
      width: 280, 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.3, 
        ease: easeInOut 
      } 
    },
    collapsed: { 
      width: 80, 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.3, 
        ease: easeInOut 
      } 
    },
    mobileOpen: { 
      x: 0, 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.4, 
        ease: easeInOut 
      } 
    },
    mobileClosed: { 
      x: -280, 
      opacity: 0, 
      scale: 0.95, 
      transition: { 
        duration: 0.4, 
        ease: easeInOut 
      } 
    },
  };

  const SidebarContent = () => (
    <motion.div
      initial={isCollapsed ? 'collapsed' : 'open'}
      animate={isCollapsed ? 'collapsed' : 'open'}
      variants={sidebarVariants}
      className="flex flex-col h-full bg-card/50 backdrop-blur-sm border-r border-border shadow-lg"
    >
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <ChartBarIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-foreground">ADmyBRAND</h2>
                  <p className="text-xs text-muted-foreground">Insights</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-2 h-8 w-8"
          >
            <Bars3Icon className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-2 h-8 w-8"
          >
            <XMarkIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <motion.button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileOpen(false);
                }}
                whileHover={{ x: 4, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="font-medium"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-4">
        <Button
          variant="ghost"
          onClick={cycleTheme}
          className={cn('w-full justify-start gap-3', isCollapsed && 'px-3')}
        >
          <ThemeIcon className="w-5 h-5" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                {theme === 'system' ? 'System' : theme === 'dark' ? 'Dark' : 'Light'}
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </div>
    </motion.div>
  );

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 h-10 w-10 bg-card/80 backdrop-blur-sm border"
      >
        <Bars3Icon className="w-5 h-5" />
      </Button>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.div 
        className="hidden lg:block"
        variants={sidebarVariants}
        initial={isCollapsed ? 'collapsed' : 'open'}
        animate={isCollapsed ? 'collapsed' : 'open'}
      >
        <SidebarContent />
      </motion.div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            variants={sidebarVariants}
            initial="mobileClosed"
            animate="mobileOpen"
            exit="mobileClosed"
            className="lg:hidden fixed left-0 top-0 h-full w-[280px] z-50"
          >
            <SidebarContent />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}