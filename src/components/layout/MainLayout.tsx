import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';
import { LogOut, LayoutDashboard, Settings } from 'lucide-react';
import { cn } from '@/utils/cn';
import { ThemeToggle } from '@/components/ui/ThemeToggle'; // <--- Import

export const MainLayout = () => {
  const { logout, user } = useAuthStore();
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    // DARK MODE: Added dark:bg-slate-950
    <div className='flex h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300'>
      {/* Sidebar: Added dark:bg-slate-900 dark:border-slate-800 */}
      <aside className='w-64 hidden md:flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-colors duration-300'>
        <div className='h-16 flex items-center px-6 border-b border-slate-100 dark:border-slate-800'>
          <span className='text-xl font-bold text-slate-900 dark:text-white'>
            Enterprise<span className='text-blue-600'>App</span>
          </span>
        </div>

        <nav className='flex-1 p-4 space-y-1'>
          <Link
            to='/dashboard'
            className={cn(
              'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
              isActive('/dashboard') && !isActive('/dashboard/settings')
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                : 'text-slate-700 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200',
            )}>
            <LayoutDashboard
              className={cn(
                'w-5 h-5 mr-3',
                isActive('/dashboard')
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-slate-400',
              )}
            />
            Dashboard
          </Link>

          <Link
            to='/dashboard/settings'
            className={cn(
              'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
              isActive('/dashboard/settings')
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                : 'text-slate-700 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200',
            )}>
            <Settings
              className={cn(
                'w-5 h-5 mr-3',
                isActive('/dashboard/settings')
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-slate-400',
              )}
            />
            Settings
          </Link>
        </nav>

        <div className='p-4 border-t border-slate-100 dark:border-slate-800 space-y-4'>
          {/* THEME TOGGLE ADDED HERE */}
          <div className='px-2'>
            <ThemeToggle />
          </div>

          <div className='flex items-center px-2'>
            <div className='h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold text-xs'>
              {user?.firstName?.charAt(0) || 'U'}
            </div>
            <div className='ml-3 overflow-hidden'>
              <p className='text-sm font-medium text-slate-900 dark:text-slate-200 truncate'>
                {user?.firstName}
              </p>
              <p className='text-xs text-slate-500 dark:text-slate-500 truncate'>
                {user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className='flex w-full items-center px-2 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors'>
            <LogOut className='w-4 h-4 mr-3' />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className='flex-1 overflow-auto'>
        <div className='p-8 max-w-7xl mx-auto'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
