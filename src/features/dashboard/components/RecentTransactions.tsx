import { MoreHorizontal, CheckCircle2, Clock, XCircle } from 'lucide-react';

// ... (Rest of the file remains exactly the same, just the import line changed)

const transactions = [
  {
    id: 'TRX-9871',
    user: { name: 'Emma Wilson', email: 'emma.w@company.com', initials: 'EW' },
    amount: '$450.00',
    status: 'Success',
    date: 'Just now',
    method: 'Visa •••• 4242',
  },
  // ... (keep your transaction data)
];

export const RecentTransactions = () => {
  return (
    <div className='rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden'>
      <div className='flex items-center justify-between border-b border-slate-100 p-6'>
        <div>
          <h3 className='text-base font-semibold text-slate-900'>
            Recent Transactions
          </h3>
          <p className='text-sm text-slate-500'>
            Latest financial activity from your users.
          </p>
        </div>
        <button className='text-sm font-medium text-blue-600 hover:text-blue-700'>
          View All
        </button>
      </div>
      <div className='overflow-x-auto'>
        <table className='w-full text-left text-sm'>
          <thead className='bg-slate-50 text-slate-500'>
            <tr>
              <th className='px-6 py-3 font-medium'>Customer</th>
              <th className='px-6 py-3 font-medium'>Status</th>
              <th className='px-6 py-3 font-medium'>Date</th>
              <th className='px-6 py-3 font-medium'>Method</th>
              <th className='px-6 py-3 font-medium text-right'>Amount</th>
              <th className='px-6 py-3 font-medium'></th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-100'>
            {transactions.map((trx) => (
              <tr
                key={trx.id}
                className='group hover:bg-slate-50 transition-colors'>
                <td className='px-6 py-4'>
                  <div className='flex items-center'>
                    <div className='h-9 w-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mr-3'>
                      {trx.user.initials}
                    </div>
                    <div>
                      <div className='font-medium text-slate-900'>
                        {trx.user.name}
                      </div>
                      <div className='text-xs text-slate-500'>
                        {trx.user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4'>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${
                      trx.status === 'Success'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                        : trx.status === 'Pending'
                          ? 'bg-amber-50 text-amber-700 border-amber-100'
                          : 'bg-red-50 text-red-700 border-red-100'
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
                <td className='px-6 py-4 text-slate-500'>{trx.date}</td>
                <td className='px-6 py-4 text-slate-500'>{trx.method}</td>
                <td className='px-6 py-4 text-right font-medium text-slate-900'>
                  {trx.amount}
                </td>
                <td className='px-6 py-4 text-right'>
                  <button className='text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-200'>
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
