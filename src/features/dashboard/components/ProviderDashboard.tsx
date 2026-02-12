import { useAppointmentStore } from '@/stores/useAppointmentStore';
import { Users, Calendar, DollarSign, Activity } from 'lucide-react';

// --- HELPER COMPONENT ---
const StatCard = ({ title, value, icon: Icon, color }: any) => (
  <div className='bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm'>
    <div className='flex items-center justify-between'>
      <div>
        <p className='text-sm text-slate-500 dark:text-slate-400 font-medium'>
          {title}
        </p>
        <h3 className='text-2xl font-bold text-slate-900 dark:text-white mt-2'>
          {value}
        </h3>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className='w-6 h-6 text-white' />
      </div>
    </div>
  </div>
);

// --- MAIN COMPONENT (MUST BE 'export const') ---
export const ProviderDashboard = () => {
  // Safe check: default to empty array if store is undefined
  const appointments = useAppointmentStore((state) => state.appointments) || [];

  // Calculate Stats
  const totalAppointments = appointments.length;
  const pending = appointments.filter((a) => a.status === 'Pending').length;
  const completed = appointments.filter((a) => a.status === 'Completed').length;
  const revenue = completed * 150;

  return (
    <div className='space-y-8 animate-in fade-in duration-500'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-bold text-slate-900 dark:text-white'>
            Doctor Dashboard
          </h1>
          <p className='text-slate-500 dark:text-slate-400'>
            Welcome back. Here is your daily overview.
          </p>
        </div>
      </div>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
        <StatCard
          title='Total Bookings'
          value={totalAppointments}
          icon={Calendar}
          color='bg-blue-500'
        />
        <StatCard
          title='Pending Visits'
          value={pending}
          icon={Activity}
          color='bg-amber-500'
        />
        <StatCard
          title='Patients Treated'
          value={completed}
          icon={Users}
          color='bg-emerald-500'
        />
        <StatCard
          title='Total Revenue'
          value={`$${revenue}`}
          icon={DollarSign}
          color='bg-purple-500'
        />
      </div>
    </div>
  );
};
