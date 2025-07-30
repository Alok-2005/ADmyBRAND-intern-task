export interface MetricData {
  id: string;
  title: string;
  value: string;
  change: number;
  changeText: string;
  icon: string;
  color: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  revenue?: number;
  users?: number;
  conversions?: number;
  date?: string;
  color: string;
}

export interface TableRow {
  id: string;
  campaign: string;
  status: 'active' | 'paused' | 'completed';
  impressions: number;
  clicks: number;
  ctr: number;
  cost: number;
  revenue: number;
  roas: number;
  date: string;
}

export const mockMetrics: MetricData[] = [
  {
    id: '1',
    title: 'Total Revenue',
    value: '$124,563',
    change: 12.5,
    changeText: 'vs last month',
    icon: 'currency-dollar',
    color: 'bg-gradient-to-r from-blue-500 to-blue-600'
  },
  {
    id: '2',
    title: 'Active Users',
    value: '23,456',
    change: 8.2,
    changeText: 'vs last month',
    icon: 'users',
    color: 'bg-gradient-to-r from-purple-500 to-purple-600'
  },
  {
    id: '3',
    title: 'Conversions',
    value: '1,847',
    change: -3.1,
    changeText: 'vs last month',
    icon: 'chart-bar',
    color: 'bg-gradient-to-r from-green-500 to-green-600'
  },
  {
    id: '4',
    title: 'Growth Rate',
    value: '15.3%',
    change: 5.7,
    changeText: 'vs last month',
    icon: 'trending-up',
    color: 'bg-gradient-to-r from-amber-500 to-amber-600'
  }
];

export const generateRevenueData = (): ChartDataPoint[] => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const colors = [
    '#3B82F6',
    '#8B5CF6',
    '#10B981',
    '#F59E0B',
    '#EF4444',
    '#6B7280',
    '#EC4899',
    '#14B8A6',
    '#F97316',
    '#6366F1',
    '#22C55E',
    '#D946EF'
  ];

  return months.map((month, index) => ({
    name: month,
    revenue: Math.floor(Math.random() * 50000) + 20000,
    users: Math.floor(Math.random() * 5000) + 2000,
    conversions: Math.floor(Math.random() * 500) + 100,
    value: Math.floor(Math.random() * 50000) + 20000,
    color: colors[index % colors.length]
  }));
};

export const generateTrafficData = (): ChartDataPoint[] => {
  return [
    { name: 'Organic Search', value: 4567, color: '#3B82F6' },
    { name: 'Direct', value: 3891, color: '#8B5CF6' },
    { name: 'Social Media', value: 2134, color: '#10B981' },
    { name: 'Email', value: 1567, color: '#F59E0B' },
    { name: 'Paid Ads', value: 1234, color: '#EF4444' }
  ];
};

export const generateConversionData = (): ChartDataPoint[] => {
  const days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return date.toISOString().split('T')[0];
  });

  const colors = [
    '#3B82F6',
    '#8B5CF6',
    '#10B981',
    '#F59E0B',
    '#EF4444',
    '#6B7280',
    '#EC4899',
    '#14B8A6',
    '#F97316',
    '#6366F1'
  ];

  return days.map((date, index) => ({
    name: `Day ${index + 1}`,
    date,
    value: Math.floor(Math.random() * 100) + 50,
    conversions: Math.floor(Math.random() * 50) + 10,
    color: colors[index % colors.length]
  }));
};

export const generateTableData = (): TableRow[] => {
  const campaigns = ['Summer Sale', 'Holiday Special', 'Brand Awareness', 'Product Launch', 'Retargeting'];
  const statuses: ('active' | 'paused' | 'completed')[] = ['active', 'paused', 'completed'];

  return Array.from({ length: 25 }, (_, i) => {
    const impressions = Math.floor(Math.random() * 100000) + 10000;
    const clicks = Math.floor(impressions * (Math.random() * 0.05 + 0.01));
    const cost = Math.floor(Math.random() * 5000) + 500;
    const revenue = Math.floor(cost * (Math.random() * 3 + 1));

    return {
      id: `campaign-${i + 1}`,
      campaign: `${campaigns[i % campaigns.length]} ${i + 1}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      impressions,
      clicks,
      ctr: Number(((clicks / impressions) * 100).toFixed(2)),
      cost,
      revenue,
      roas: Number((revenue / cost).toFixed(2)),
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
  });
};

export const aiInsights = [
  {
    id: '1',
    type: 'opportunity',
    title: 'Conversion Rate Optimization',
    description: 'Your mobile conversion rate is 23% lower than desktop. Consider A/B testing mobile checkout flow.',
    impact: 'High',
    confidence: 0.89
  },
  {
    id: '2',
    type: 'warning',
    title: 'Ad Spend Alert',
    description: 'Campaign "Holiday Special" is spending 34% above target with declining ROAS.',
    impact: 'Medium',
    confidence: 0.92
  },
  {
    id: '3',
    type: 'success',
    title: 'Performance Winner',
    description: 'Campaign "Brand Awareness" exceeded conversion goals by 45% this week.',
    impact: 'High',
    confidence: 0.96
  }
];