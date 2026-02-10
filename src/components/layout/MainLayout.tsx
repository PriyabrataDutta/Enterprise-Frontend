import { Outlet, Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';
import { LogOut, LayoutDashboard, Settings } from 'lucide-react';

export const MainLayout = () => {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 hidden md:flex flex-col bg-white border-r">
        <div className="h-16 flex items-center justify-center border-b font-bold text-xl text-blue-600">Enterprise</div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/dashboard" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
            <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
          </Link>
          <Link to="/dashboard/settings" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
            <Settings className="w-5 h-5 mr-3" /> Settings
          </Link>
        </nav>
        <div className="p-4 border-t">
          <div className="mb-4 text-sm text-gray-500">Logged in as {user?.firstName}</div>
          <button onClick={logout} className="flex w-full items-center p-2 text-red-600 hover:bg-red-50 rounded">
            <LogOut className="w-5 h-5 mr-3" /> Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};
