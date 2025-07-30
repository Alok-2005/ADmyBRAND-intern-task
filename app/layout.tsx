import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ADmyBRAND Insights - AI-Powered Analytics Dashboard',
  description: 'Modern analytics dashboard for digital marketing agencies with AI-powered insights and real-time data visualization.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          defaultTheme="system"
          storageKey="dashboard-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}