'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from '@/components/dashboard/sidebar';
import { MetricCard } from '@/components/dashboard/metric-card';
import { InteractiveChart } from '@/components/dashboard/interactive-chart';
import { DataTable } from '@/components/dashboard/data-table';
import { AIInsights, InsightProps } from '@/components/dashboard/ai-insights';
import { RealTimeFeed } from '@/components/dashboard/real-time-feed';
import { Notifications } from '@/components/dashboard/notifications';
import { Profile } from '@/components/dashboard/profile';
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
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });
  const [data, setData] = useState({
    metrics: mockMetrics,
    revenueData: generateRevenueData(),
    trafficData: generateTrafficData(),
    conversionData: generateConversionData(),
    tableData: generateTableData(),
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast.success('Dashboard loaded successfully!', {
        duration: 3000,
        position: 'top-right',
      });
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        revenueData: generateRevenueData(),
        conversionData: generateConversionData(),
      }));
      toast('Data updated in real-time', {
        icon: '🔄',
        duration: 2000,
        position: 'top-right',
      });
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('ADmyBRAND Insights Dashboard', 14, 22);
    doc.setFontSize(12);
    doc.text(`Date Range: ${format(dateRange.from, 'PP')} - ${format(dateRange.to, 'PP')}`, 14, 32);

    autoTable(doc, {
      head: [['Metric', 'Value', 'Change']],
      body: data.metrics.map(metric => [metric.title, metric.value, `${metric.change}%`]),
      startY: 40,
    });

    autoTable(doc, {
      head: [['Campaign', 'Status', 'Impressions', 'Clicks', 'CTR', 'Cost', 'Revenue', 'ROAS', 'Date']],
      body: data.tableData.map(row => [
        row.campaign,
        row.status,
        row.impressions.toLocaleString(),
        row.clicks.toLocaleString(),
        `${row.ctr}%`,
        `$${row.cost.toLocaleString()}`,
        `$${row.revenue.toLocaleString()}`,
        `${row.roas}x`,
        row.date,
      ]),
      startY: (doc as any).lastAutoTable.finalY + 10,
    });

    doc.save('dashboard-report.pdf');
    toast.success('PDF exported successfully!', { position: 'top-right', duration: 3000 });
  };

  const exportToCSV = () => {
    const headers = ['Metric', 'Value', 'Change'];
    const metricRows = data.metrics.map(metric => [
      metric.title,
      metric.value,
      `${metric.change}%`,
    ]);
    const campaignHeaders = ['Campaign', 'Status', 'Impressions', 'Clicks', 'CTR', 'Cost', 'Revenue', 'ROAS', 'Date'];
    const campaignRows = data.tableData.map(row => [
      row.campaign,
      row.status,
      row.impressions.toLocaleString(),
      row.clicks.toLocaleString(),
      `${row.ctr}%`,
      `$${row.cost.toLocaleString()}`,
      `$${row.revenue.toLocaleString()}`,
      `${row.roas}x`,
      row.date,
    ]);

    const csvContent = [
      headers.join(','),
      ...metricRows.map(row => row.join(',')),
      '', // Empty line to separate sections
      campaignHeaders.join(','),
      ...campaignRows.map(row => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dashboard-data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('CSV exported successfully!', { position: 'top-right', duration: 3000 });
  };

  const renderOverview = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-semibold">Key Metrics</h2>
        <div className="flex items-center gap-3">
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
            className="bg-card/80 backdrop-blur-sm"
          />
          <Button
            onClick={exportToPDF}
            variant="outline"
            className="flex items-center gap-2 bg-card/80 backdrop-blur-sm"
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            Export PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <MetricCardSkeleton key={i} />)
          : data.metrics.map((metric, index) => (
              <MetricCard key={metric.id} metric={metric} index={index} />
            ))}
      </div>

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
              className="shadow-xl"
            />
            <InteractiveChart
              title="Traffic Sources"
              data={data.trafficData}
              type="pie"
              className="shadow-xl"
            />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {isLoading ? (
          <>
            <div className="p-6 rounded-2xl border bg-card/50 backdrop-blur-sm">
              <LoadingSkeleton lines={5} />
            </div>
            <div className="p-6 rounded-2xl border bg-card/50 backdrop-blur-sm">
              <LoadingSkeleton lines={4} />
            </div>
          </>
        ) : (
          <>
            <AIInsights insights={aiInsights as InsightProps[]} />
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
      className="space-y-8"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-semibold">Analytics Overview</h2>
        <DateRangePicker
          value={dateRange}
          onChange={setDateRange}
          className="bg-card/80 backdrop-blur-sm"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InteractiveChart
          title="Monthly Revenue"
          data={data.revenueData}
          type="line"
          className="shadow-xl"
        />
        <InteractiveChart
          title="Conversion Trends"
          data={data.conversionData}
          type="bar"
          className="shadow-xl"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InteractiveChart
          title="Traffic Distribution"
          data={data.trafficData}
          type="pie"
          className="shadow-xl"
        />
        <InteractiveChart
          title="Performance Radar"
          data={data.trafficData.slice(0, 5)}
          type="radar"
          className="shadow-xl"
        />
      </div>
    </motion.div>
  );

  const renderCampaigns = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-semibold">Campaign Management</h2>
        <DateRangePicker
          value={dateRange}
          onChange={setDateRange}
          className="bg-card/80 backdrop-blur-sm"
        />
      </div>

      {isLoading ? (
        <div className="p-6 rounded-2xl border bg-card/50 backdrop-blur-sm">
          <LoadingSkeleton lines={10} />
        </div>
      ) : (
        <DataTable data={data.tableData} title="Campaign Performance" />
      )}
    </motion.div>
  );

  const renderNotifications = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <h2 className="text-2xl font-semibold">Notifications</h2>
      <Notifications />
    </motion.div>
  );

  const renderProfile = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <h2 className="text-2xl font-semibold">Profile Settings</h2>
      <Profile />
    </motion.div>
  );

  const renderSettings = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 rounded-2xl border bg-card/50 backdrop-blur-sm shadow-lg"
    >
      <h3 className="text-2xl font-semibold mb-6">Dashboard Settings</h3>
      <div className="space-y-6">
        <div className="p-6 rounded-xl bg-muted/50 backdrop-blur-sm">
          <h4 className="font-medium text-lg mb-2">Data Refresh Rate</h4>
          <p className="text-sm text-muted-foreground">
            Configure real-time data updates (current: every 30 seconds)
          </p>
          <select
            className="mt-3 px-4 py-2 rounded-md border border-input bg-background text-sm"
            defaultValue="30"
          >
            <option value="15">15 seconds</option>
            <option value="30">30 seconds</option>
            <option value="60">60 seconds</option>
          </select>
        </div>
        <div className="p-6 rounded-xl bg-muted/50 backdrop-blur-sm">
          <h4 className="font-medium text-lg mb-2">Export Options</h4>
          <p className="text-sm text-muted-foreground">
            Export dashboard data in multiple formats
          </p>
          <div className="mt-3 flex gap-3">
            <Button onClick={exportToPDF} variant="outline">
              Export as PDF
            </Button>
            <Button onClick={exportToCSV} variant="outline">
              Export as CSV
            </Button>
          </div>
        </div>
        <div className="p-6 rounded-xl bg-muted/50 backdrop-blur-sm">
          <h4 className="font-medium text-lg mb-2">AI Insights</h4>
          <p className="text-sm text-muted-foreground">
            Toggle AI-powered recommendations and analytics
          </p>
          <Button className="mt-3" onClick={() => toast.success('AI settings updated!', { position: 'top-right', duration: 3000 })}>
            Configure AI
          </Button>
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
      case 'notifications':
        return renderNotifications();
      case 'profile':
        return renderProfile();
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
            className="p-6 lg:p-10 lg:ml-0 ml-0 pt-16 lg:pt-6"
          >
            <div className="mb-8">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl font-bold tracking-tight"
              >
                {activeTab === 'overview' && 'Dashboard Overview'}
                {activeTab === 'analytics' && 'Analytics'}
                {activeTab === 'campaigns' && 'Campaign Management'}
                {activeTab === 'notifications' && 'Notifications'}
                {activeTab === 'profile' && 'Profile Settings'}
                {activeTab === 'settings' && 'Settings'}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-muted-foreground mt-2"
              >
                {activeTab === 'overview' && 'Monitor your digital marketing performance in real-time'}
                {activeTab === 'analytics' && 'Deep dive into your marketing analytics and insights'}
                {activeTab === 'campaigns' && 'Manage and optimize your advertising campaigns'}
                {activeTab === 'notifications' && 'View and manage your recent notifications'}
                {activeTab === 'profile' && 'Update your user profile and preferences'}
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
          className: 'bg-card/80 backdrop-blur-sm border-border text-foreground shadow-lg',
          duration: 4000,
        }}
      />
    </div>
  );
}