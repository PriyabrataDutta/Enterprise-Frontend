import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';
import { handleFormError } from '@/utils/errorHandler';
import { AuthLayout } from './AuthLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from 'sonner';

const schema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

export const LoginForm = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      // MOCK API - Replace with actual API call
      await new Promise((r) => setTimeout(r, 1000));
      const mockRes = {
        accessToken: 'jwt',
        user: {
          id: '1',
          email: data.email,
          firstName: 'Admin',
          lastName: 'User',
          role: 'ADMIN' as const,
        },
      };

      setAuth(mockRes.accessToken, mockRes.user);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      handleFormError(err, setError);
    }
  };

  return (
    <AuthLayout
      title='Welcome back'
      subtitle='Enter your credentials to access your account'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        <Input
          label='Email'
          type='email'
          placeholder='name@company.com'
          {...register('email')}
          error={errors.email?.message as string}
        />

        <div className='space-y-1'>
          <div className='flex items-center justify-between'>
            <label className='text-sm font-medium text-slate-700'>
              Password
            </label>
            <Link
              to='/auth/forgot-password'
              class='text-xs font-medium text-blue-600 hover:text-blue-500'>
              Forgot password?
            </Link>
          </div>
          <Input
            type='password'
            {...register('password')}
            error={errors.password?.message as string}
          />
        </div>

        <Button
          type='submit'
          isLoading={isSubmitting}
          className='w-full h-11 text-base'>
          Sign In
        </Button>

        <p className='text-center text-sm text-slate-600'>
          Don't have an account?{' '}
          <Link
            to='/auth/register'
            className='font-semibold text-blue-600 hover:text-blue-500'>
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};
