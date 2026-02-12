import {
  MoreHorizontal,
  Calendar,
  Clock,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAppointmentStore } from '@/stores/useAppointmentStore'; // 1. Import Store

export const AppointmentsView = () => {
  // 2. Fetch real appointments from store
  const { appointments, updateStatus } = useAppointmentStore();

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-slate-900 dark:text-white'>
            Appointments
          </h1>
          <p className='text-slate-500 dark:text-slate-400'>
            Manage your schedule for today.
          </p>
        </div>
        <Button variant='outline'>
          <Calendar className='w-4 h-4 mr-2' /> View Calendar
        </Button>
      </div>

      <div className='bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full text-left text-sm'>
            <thead className='bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400'>
              <tr>
                <th className='px-6 py-4 font-medium'>Patient</th>
                <th className='px-6 py-4 font-medium'>Time Slot</th>
                <th className='px-6 py-4 font-medium'>Type</th>
                <th className='px-6 py-4 font-medium'>Payment</th>
                <th className='px-6 py-4 font-medium'>Status</th>
                <th className='px-6 py-4 font-medium text-right'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-100 dark:divide-slate-800'>
              {/* 3. Map over REAL appointments */}
              {appointments.map((apt) => (
                <tr
                  key={apt.id}
                  className='hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors'>
                  <td className='px-6 py-4'>
                    <div className='font-medium text-slate-900 dark:text-white'>
                      {apt.patientName}
                    </div>
                    <div className='text-xs text-slate-500'>
                      {apt.phoneNumber}
                    </div>
                  </td>
                  <td className='px-6 py-4 flex items-center text-slate-600 dark:text-slate-300'>
                    <Clock className='w-4 h-4 mr-2 text-slate-400' />{' '}
                    {apt.timeSlot}
                  </td>
                  <td className='px-6 py-4 text-slate-600 dark:text-slate-300'>
                    {apt.type}
                  </td>
                  <td className='px-6 py-4'>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        apt.paymentStatus === 'Paid'
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                          : 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400'
                      }`}>
                      {apt.paymentStatus}
                    </span>
                  </td>
                  <td className='px-6 py-4'>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        apt.status === 'Confirmed'
                          ? 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/30'
                          : apt.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400'
                            : 'bg-slate-50 text-slate-700 border-slate-100 dark:bg-slate-800 dark:text-slate-400'
                      }`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className='px-6 py-4 text-right'>
                    {/* Action Buttons to Change Status */}
                    <div className='flex justify-end space-x-2'>
                      {apt.status !== 'Completed' && (
                        <button
                          onClick={() => updateStatus(apt.id, 'Completed')}
                          className='text-emerald-600 hover:text-emerald-700 p-1'
                          title='Mark Complete'>
                          <CheckCircle className='w-4 h-4' />
                        </button>
                      )}
                      <button
                        onClick={() => updateStatus(apt.id, 'Cancelled')}
                        className='text-red-400 hover:text-red-600 p-1'
                        title='Cancel'>
                        <XCircle className='w-4 h-4' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {appointments.length === 0 && (
            <div className='p-12 text-center text-slate-500'>
              No appointments found. Wait for new bookings!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
