import { CheckCircle2, Calendar, MapPin, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

export const AppointmentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4'>
      <div className='bg-white dark:bg-slate-900 rounded-2xl shadow-xl max-w-md w-full p-8 text-center border border-slate-100 dark:border-slate-800'>
        <div className='mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-6'>
          <CheckCircle2 className='h-10 w-10 text-emerald-600 dark:text-emerald-400' />
        </div>

        <h1 className='text-2xl font-bold text-slate-900 dark:text-white mb-2'>
          Booking Confirmed!
        </h1>
        <p className='text-slate-500 dark:text-slate-400 mb-8'>
          Your appointment has been successfully scheduled.
        </p>

        <div className='bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 mb-8 text-left space-y-3'>
          <div className='flex items-center text-sm text-slate-600 dark:text-slate-300'>
            <Calendar className='w-4 h-4 mr-3 text-blue-500' />
            <span>Upcoming Appointment</span>
          </div>
          <div className='flex items-center text-sm text-slate-600 dark:text-slate-300'>
            <MapPin className='w-4 h-4 mr-3 text-red-500' />
            <span>City Heart Clinic, Building A</span>
          </div>
          <div className='flex items-center text-sm text-emerald-600 dark:text-emerald-400 font-medium'>
            <MessageCircle className='w-4 h-4 mr-3' />
            <span>Confirmation sent via SMS</span>
          </div>
        </div>

        <div className='space-y-3'>
          <Button onClick={() => navigate('/')} className='w-full'>
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};
