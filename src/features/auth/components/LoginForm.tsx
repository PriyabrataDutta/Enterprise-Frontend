import { Link } from 'react-router-dom';
import { AuthLayout } from './AuthLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/stores/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type LoginSchema = z.infer<typeof schema>;

export const LoginForm = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: LoginSchema) => {
    // MOCK LOGIN FOR DOCTOR
    await new Promise((r) => setTimeout(r, 1000));

    // Simulate getting a token
    const mockUser = {
      id: 'doc_123',
      email: data.email,
      firstName: 'Dr. Sarah',
      lastName: 'Johnson',
      role: 'ADMIN' as const,
    };

    setAuth('fake-jwt-token', mockUser);
    toast.success('Welcome back, Doctor!');
    navigate('/dashboard');
  };

  return (
    <AuthLayout title='Provider Login' subtitle='Access your clinic dashboard'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        <Input
          label='Work Email'
          placeholder='doctor@clinic.com'
          type='email'
          {...register('email')}
          error={errors.email?.message}
        />

        <div className='space-y-1'>
          <div className='flex items-center justify-between'>
            <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>
              Password
            </label>
            <Link
              to='/auth/forgot-password'
              className='text-xs font-medium text-blue-600 hover:text-blue-500'>
              Forgot password?
            </Link>
          </div>
          <Input
            label=''
            type='password'
            placeholder='••••••••'
            {...register('password')}
            error={errors.password?.message}
          />
        </div>

        <Button
          type='submit'
          isLoading={isSubmitting}
          className='w-full h-11 text-base'>
          Login to Dashboard
        </Button>

        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-slate-200 dark:border-slate-700'></div>
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='px-2 bg-white dark:bg-slate-900 text-slate-500'>
              Are you a patient?
            </span>
          </div>
        </div>

        <Button
          variant='outline'
          type='button'
          onClick={() => navigate('/')}
          className='w-full'>
          Go to Booking Page
        </Button>
      </form>
    </AuthLayout>
  );
};
