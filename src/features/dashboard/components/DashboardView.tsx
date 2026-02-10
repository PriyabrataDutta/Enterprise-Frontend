import { useQuery } from '@tanstack/react-query';
import {
  Users,
  DollarSign,
  Activity,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { RecentTransactions } from './RecentTransactions';

// --- Stat Card Component (Updated for Dark Mode) ---
const StatCard = ({ title, value, change, trend, icon: Icon }: any) => (
  <div className='rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:bg-slate-900 dark:border-slate-800'>
    <div className='flex items-center justify-between'>
      <p className='text-sm font-medium text-slate-500 dark:text-slate-400'>
        {title}
      </p>
      <div className='rounded-lg bg-slate-50 p-2 text-slate-600 dark:bg-slate-800 dark:text-slate-300'>
        <Icon className='h-4 w-4' />
      </div>
    </div>
    <div className='mt-4'>
      <h3 className='text-2xl font-bold text-slate-900 dark:text-white'>
        {value}
      </h3>
      <div className='flex items-center mt-1'>
        <span
          className={`flex items-center text-xs font-semibold ${
            trend === 'up'
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-red-600 dark:text-red-400'
          }`}>
          {trend === 'up' ? (
            <ArrowUpRight className='mr-1 h-3 w-3' />
          ) : (
            <ArrowDownRight className='mr-1 h-3 w-3' />
          )}
          {change}
        </span>
        <span className='ml-2 text-xs text-slate-400 dark:text-slate-500'>
          vs last month
        </span>
      </div>
    </div>
  </div>
);

// --- CSS Bar Chart Component (Updated) ---
const RevenueChart = () => (
  <div className='col-span-4 rounded-xl border border-slate-200 bg-white shadow-sm p-6 dark:bg-slate-900 dark:border-slate-800'>
    <div className='flex items-center justify-between mb-6'>
      <div>
        <h3 className='text-base font-semibold text-slate-900 dark:text-white'>
          Revenue Overview
        </h3>
        <p className='text-sm text-slate-500 dark:text-slate-400'>
          Gross revenue over the last 12 months.
        </p>
      </div>
      <select className='text-sm border-slate-200 rounded-md text-slate-600 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'>
        <option>This Year</option>
        <option>Last Year</option>
      </select>
    </div>

    <div className='mt-4 h-[250px] w-full flex items-end justify-between space-x-2 sm:space-x-4 px-2'>
      {[45, 72, 48, 92, 64, 85, 55, 96, 68, 88, 52, 78].map((height, i) => (
        <div
          key={i}
          className='flex flex-col items-center justify-end h-full w-full group cursor-pointer'>
          <div className='mb-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded absolute -mt-8 pointer-events-none dark:bg-slate-800 dark:text-slate-200'>
            ${height}k
          </div>
          <div
            style={{ height: `${height}%` }}
            className='w-full max-w-[40px] bg-blue-500/80 rounded-t-md transition-all duration-300 group-hover:bg-blue-600 group-hover:h-[calc(100%+5px)] relative dark:bg-blue-600 dark:group-hover:bg-blue-500'></div>
          <span className='mt-2 text-[10px] text-slate-400 font-medium dark:text-slate-500'>
            {
              [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ][i]
            }
          </span>
        </div>
      ))}
    </div>
  </div>
);

// --- Activity Feed Component (Updated) ---
const ActivityFeed = () => (
  <div className='col-span-3 rounded-xl border border-slate-200 bg-white shadow-sm p-6 dark:bg-slate-900 dark:border-slate-800'>
    <h3 className='text-base font-semibold text-slate-900 mb-6 dark:text-white'>
      Recent Activity
    </h3>
    <div className='relative space-y-0'>
      <div className='absolute top-0 bottom-0 left-[19px] w-px bg-slate-200 dark:bg-slate-800' />

      {[
        {
          text: 'New user registered',
          sub: 'jackson.lee@email.com',
          time: '2m ago',
          color: 'bg-blue-500',
        },
        {
          text: 'Server rebooted',
          sub: 'Automatic maintenance',
          time: '1h ago',
          color: 'bg-emerald-500',
        },
        {
          text: 'New invoice generated',
          sub: 'INV-2024-001',
          time: '3h ago',
          color: 'bg-amber-500',
        },
        {
          text: 'Database backup',
          sub: 'Snapshot created',
          time: '5h ago',
          color: 'bg-purple-500',
        },
        {
          text: 'Deployment successful',
          sub: 'v2.4.0 to production',
          time: '1d ago',
          color: 'bg-slate-500',
        },
      ].map((item, i) => (
        <div key={i} className='relative flex items-start pb-6 last:pb-0'>
          <div
            className={`relative z-10 h-10 w-10 flex-none rounded-full border-4 border-white dark:border-slate-900 ${item.color.replace('bg-', 'bg-').replace('500', '100')} flex items-center justify-center`}>
            <div className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
          </div>
          <div className='ml-4 flex-auto pt-1'>
            <p className='text-sm font-medium text-slate-900 dark:text-slate-200'>
              {item.text}
            </p>
            <p className='text-xs text-slate-500 dark:text-slate-500'>
              {item.sub}
            </p>
          </div>
          <div className='text-xs text-slate-400 pt-1 dark:text-slate-600'>
            {item.time}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const DashboardView = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 600));
      return {
        revenue: '$45,231.89',
        users: '2,350',
        activeNow: '+573',
        bounceRate: '12.5%',
      };
    },
  });

  return (
    <div className='space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight text-slate-900 dark:text-white'>
            Dashboard
          </h1>
          <p className='text-slate-500 dark:text-slate-400'>
            Overview of your system performance.
          </p>
        </div>
        <div className='flex items-center space-x-3'>
          <Button
            variant='outline'
            className='bg-white dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-700'>
            <Download className='mr-2 h-4 w-4' /> Export
          </Button>
          <Button>
            <Plus className='mr-2 h-4 w-4' /> Add User
          </Button>
        </div>
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <StatCard
          title='Total Revenue'
          value={isLoading ? '...' : data?.revenue}
          change='20.1%'
          trend='up'
          icon={DollarSign}
        />
        <StatCard
          title='Active Users'
          value={isLoading ? '...' : data?.users}
          change='180.1%'
          trend='up'
          icon={Users}
        />
        <StatCard
          title='Bounce Rate'
          value={isLoading ? '...' : data?.bounceRate}
          change='4.5%'
          trend='down'
          icon={Activity}
        />
        <StatCard
          title='Active Now'
          value={isLoading ? '...' : data?.activeNow}
          change='19'
          trend='up'
          icon={TrendingUp}
        />
      </div>

      <div className='grid gap-4 lg:grid-cols-7'>
        <RevenueChart />
        <ActivityFeed />
      </div>

      <RecentTransactions />
    </div>
  );
};
