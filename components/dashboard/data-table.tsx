'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronUpIcon,
  ChevronDownIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { TableRow } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface DataTableProps {
  data: TableRow[];
  title: string;
}

type SortField = keyof TableRow;
type SortDirection = 'asc' | 'desc';

export function DataTable({ data, title }: DataTableProps) {
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const itemsPerPage = 10;

  const filteredAndSortedData = useMemo(() => {
    let filtered = data.filter(item => {
      const matchesSearch = item.campaign.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });

    return filtered;
  }, [data, sortField, sortDirection, searchTerm, statusFilter]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedData, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  const exportToCSV = () => {
    const headers = ['Campaign', 'Status', 'Impressions', 'Clicks', 'CTR %', 'Cost', 'Revenue', 'ROAS', 'Date'];
    const csvContent = [
      headers.join(','),
      ...filteredAndSortedData.map(row => [
        row.campaign,
        row.status,
        row.impressions,
        row.clicks,
        row.ctr,
        row.cost,
        row.revenue,
        row.roas,
        row.date
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'campaign-data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const variants = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      paused: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
    };

    return (
      <Badge className={cn('text-xs font-medium', variants[status as keyof typeof variants])}>
        {status}
      </Badge>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-xl border bg-card/50 backdrop-blur-sm"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-md border border-input bg-background text-sm"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="completed">Completed</option>
          </select>
          
          <Button
            onClick={exportToCSV}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {[
                { key: 'campaign', label: 'Campaign' },
                { key: 'status', label: 'Status' },
                { key: 'impressions', label: 'Impressions' },
                { key: 'clicks', label: 'Clicks' },
                { key: 'ctr', label: 'CTR %' },
                { key: 'cost', label: 'Cost' },
                { key: 'revenue', label: 'Revenue' },
                { key: 'roas', label: 'ROAS' },
                { key: 'date', label: 'Date' }
              ].map(({ key, label }) => (
                <th
                  key={key}
                  className="text-left py-3 px-4 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => handleSort(key as SortField)}
                >
                  <div className="flex items-center gap-1">
                    {label}
                    <motion.div
                      animate={{ rotate: sortField === key && sortDirection === 'desc' ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {sortField === key ? (
                        <ChevronUpIcon className="w-4 h-4" />
                      ) : (
                        <ChevronDownIcon className="w-4 h-4 opacity-50" />
                      )}
                    </motion.div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="wait">
              {paginatedData.map((row, index) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-border/50 hover:bg-muted/50 transition-colors"
                >
                  <td className="py-3 px-4 font-medium">{row.campaign}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="py-3 px-4">{row.impressions.toLocaleString()}</td>
                  <td className="py-3 px-4">{row.clicks.toLocaleString()}</td>
                  <td className="py-3 px-4">{row.ctr}%</td>
                  <td className="py-3 px-4">${row.cost.toLocaleString()}</td>
                  <td className="py-3 px-4">${row.revenue.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={cn(
                      "font-medium",
                      row.roas >= 2 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                    )}>
                      {row.roas}x
                    </span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{row.date}</td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-muted-foreground">
          Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)} of {filteredAndSortedData.length} results
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
              return (
                <Button
                  key={pageNum}
                  variant={pageNum === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(pageNum)}
                  className="w-8 h-8 p-0"
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </motion.div>
  );
}