import { MoreHorizontal, CheckCircle2, Clock, XCircle } from 'lucide-react';

const transactions = [
  {
    id: 'TRX-9871',
    user: { name: 'Emma Wilson', email: 'emma.w@company.com', initials: 'EW' },
    amount: '$450.00',
    status: 'Success',
    date: 'Just now',
    method: 'Visa •••• 4242',
  },
  {
    id: 'TRX-9872',
    user: {
      name: 'James Rodriquez',
      email: 'j.rod@startup.io',
      initials: 'JR',
    },
    amount: '$120.50',
    status: 'Pending',
    date: '2 min ago',
    method: 'Mastercard •••• 5599',
  },
  {
    id: 'TRX-9873',
    user: { name: 'Lisa Chen', email: 'lisa.chen88@gmail.com', initials: 'LC' },
    amount: '$950.00',
    status: 'Failed',
    date: '15 min ago',
    method: 'PayPal',
  },
  {
    id: 'TRX-9874',
    user: {
      name: 'Michael Brown',
      email: 'm.brown@consulting.net',
      initials: 'MB',
    },
    amount: '$2,450.00',
    status: 'Success',
    date: '1 hour ago',
    method: 'Wire Transfer',
  },
  {
    id: 'TRX-9875',
    user: { name: 'Sarah Miller', email: 'sarah.m@design.co', initials: 'SM' },
    amount: '$35.00',
    status: 'Success',
    date: '3 hours ago',
    method: 'Visa •••• 8812',
  },
];

export const RecentTransactions = () => {
  return (
    <div className='rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden dark:bg-slate-900 dark:border-slate-800'>
      <div className='flex items-center justify-between border-b border-slate-100 p-6 dark:border-slate-800'>
        <div>
          <h3 className='text-base font-semibold text-slate-900 dark:text-white'>
            Recent Transactions
          </h3>
          <p className='text-sm text-slate-500 dark:text-slate-400'>
            Latest financial activity from your users.
          </p>
        </div>
        <button className='text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'>
          View All
        </button>
      </div>
      <div className='overflow-x-auto'>
        <table className='w-full text-left text-sm'>
          <thead className='bg-slate-50 text-slate-500 dark:bg-slate-800/50 dark:text-slate-400'>
            <tr>
              <th className='px-6 py-3 font-medium'>Customer</th>
              <th className='px-6 py-3 font-medium'>Status</th>
              <th className='px-6 py-3 font-medium'>Date</th>
              <th className='px-6 py-3 font-medium'>Method</th>
              <th className='px-6 py-3 font-medium text-right'>Amount</th>
              <th className='px-6 py-3 font-medium'></th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-100 dark:divide-slate-800'>
            {transactions.map((trx) => (
              <tr
                key={trx.id}
                className='group hover:bg-slate-50 transition-colors dark:hover:bg-slate-800/50'>
                <td className='px-6 py-4'>
                  <div className='flex items-center'>
                    <div className='h-9 w-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mr-3 dark:bg-blue-900/30 dark:text-blue-400'>
                      {trx.user.initials}
                    </div>
                    <div>
                      <div className='font-medium text-slate-900 dark:text-slate-200'>
                        {trx.user.name}
                      </div>
                      <div className='text-xs text-slate-500 dark:text-slate-500'>
                        {trx.user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4'>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${
                      trx.status === 'Success'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/30'
                        : trx.status === 'Pending'
                          ? 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900/30'
                          : 'bg-red-50 text-red-700 border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30'
                    }`}>
                    {trx.status === 'Success' && (
                      <CheckCircle2 className='mr-1 h-3 w-3' />
                    )}
                    {trx.status === 'Pending' && (
                      <Clock className='mr-1 h-3 w-3' />
                    )}
                    {trx.status === 'Failed' && (
                      <XCircle className='mr-1 h-3 w-3' />
                    )}
                    {trx.status}
                  </div>
                </td>
                <td className='px-6 py-4 text-slate-500 dark:text-slate-400'>
                  {trx.date}
                </td>
                <td className='px-6 py-4 text-slate-500 dark:text-slate-400'>
                  {trx.method}
                </td>
                <td className='px-6 py-4 text-right font-medium text-slate-900 dark:text-slate-200'>
                  {trx.amount}
                </td>
                <td className='px-6 py-4 text-right'>
                  <button className='text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 dark:hover:text-slate-200'>
                    <MoreHorizontal className='h-4 w-4' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
