'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from '@/components/dashboard/sidebar';
import { MetricCard } from '@/components/dashboard/metric-card';
import { InteractiveChart } from '@/components/dashboard/interactive-chart';
import { DataTable } from '@/components/dashboard/data-table';
import { AIInsights } from '@/components/dashboard/ai-insights';
import { RealTimeFeed } from '@/components/dashboard/real-time-feed';
import { LoadingSkeleton, MetricCardSkeleton, ChartSkeleton } from '@/components/ui/loading-skeleton';
import { 
  mockMetrics, 
  generateRevenueData, 
  generateTrafficData, 
  generateConversionData,
  generateTableData,
  aiInsights
} from '@/lib/mockData';
import toast, { Toaster } from 'react-hot-toast';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    metrics: mockMetrics,
    revenueData: generateRevenueData(),
    trafficData: generateTrafficData(),
    conversionData: generateConversionData(),
    tableData: generateTableData()
  });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast.success('Dashboard loaded successfully!', {
        duration: 3000,
        position: 'top-right'
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Real-time data updates
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        revenueData: generateRevenueData(),
        conversionData: generateConversionData()
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const renderOverview = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <MetricCardSkeleton key={i} />)
          : data.metrics.map((metric, index) => (
              <MetricCard key={metric.id} metric={metric} index={index} />
            ))
        }
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isLoading ? (
          <>
            <ChartSkeleton />
            <ChartSkeleton />
          </>
        ) : (
          <>
            <InteractiveChart
              title="Revenue Trend"
              data={data.revenueData}
              type="area"
            />
            <InteractiveChart
              title="Traffic Sources"
              data={data.trafficData}
              type="pie"
            />
          </>
        )}
      </div>

      {/* AI Insights and Real-time Feed */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {isLoading ? (
          <>
            <div className="p-6 rounded-xl border bg-card/50">
              <LoadingSkeleton lines={5} />
            </div>
            <div className="p-6 rounded-xl border bg-card/50">
              <LoadingSkeleton lines={4} />
            </div>
          </>
        ) : (
          <>
            <AIInsights insights={aiInsights} />
            <RealTimeFeed />
          </>
        )}
      </div>
    </motion.div>
  );

  const renderAnalytics = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InteractiveChart
          title="Monthly Revenue"
          data={data.revenueData}
          type="line"
        />
        <InteractiveChart
          title="Conversion Trends"
          data={data.conversionData}
          type="bar"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InteractiveChart
          title="Traffic Distribution"
          data={data.trafficData}
          type="pie"
        />
        <InteractiveChart
          title="Performance Radar"
          data={data.trafficData.slice(0, 5)}
          type="radar"
        />
      </div>
    </motion.div>
  );

  const renderCampaigns = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {isLoading ? (
        <div className="p-6 rounded-xl border bg-card/50">
          <LoadingSkeleton lines={10} />
        </div>
      ) : (
        <DataTable 
          data={data.tableData} 
          title="Campaign Performance"
        />
      )}
    </motion.div>
  );

  const renderSettings = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 rounded-xl border bg-card/50 backdrop-blur-sm"
    >
      <h3 className="text-lg font-semibold mb-4">Dashboard Settings</h3>
      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-muted/50">
          <h4 className="font-medium mb-2">Data Refresh Rate</h4>
          <p className="text-sm text-muted-foreground">
            Dashboard updates every 30 seconds with real-time data
          </p>
        </div>
        <div className="p-4 rounded-lg bg-muted/50">
          <h4 className="font-medium mb-2">Export Options</h4>
          <p className="text-sm text-muted-foreground">
            Export data in CSV, PDF, or Excel formats from any table
          </p>
        </div>
        <div className="p-4 rounded-lg bg-muted/50">
          <h4 className="font-medium mb-2">AI Insights</h4>
          <p className="text-sm text-muted-foreground">
            Powered by advanced machine learning for predictive analytics
          </p>
        </div>
      </div>
    </motion.div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'analytics':
        return renderAnalytics();
      case 'campaigns':
        return renderCampaigns();
      case 'settings':
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 lg:p-8 lg:ml-0 ml-0 pt-16 lg:pt-6"
          >
            <div className="mb-8">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-bold tracking-tight"
              >
                {activeTab === 'overview' && 'Dashboard Overview'}
                {activeTab === 'analytics' && 'Analytics'}
                {activeTab === 'campaigns' && 'Campaign Management'}
                {activeTab === 'settings' && 'Settings'}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-muted-foreground mt-2"
              >
                {activeTab === 'overview' && 'Monitor your digital marketing performance in real-time'}
                {activeTab === 'analytics' && 'Deep dive into your marketing analytics and insights'}
                {activeTab === 'campaigns' && 'Manage and optimize your advertising campaigns'}
                {activeTab === 'settings' && 'Configure your dashboard preferences and settings'}
              </motion.p>
            </div>

            {renderContent()}
          </motion.div>
        </div>
      </main>

      <Toaster
        position="top-right"
        toastOptions={{
          className: 'bg-card border-border text-foreground',
          duration: 4000,
        }}
      />
    </div>
  );
}