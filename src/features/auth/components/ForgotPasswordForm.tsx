import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { handleFormError } from '@/utils/errorHandler';
import { AuthLayout } from './AuthLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

const schema = z.object({ email: z.string().email('Invalid email') });

export const ForgotPasswordForm = () => {
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
      await new Promise((r) => setTimeout(r, 1000));
      toast.success(`Reset link sent to ${data.email}`);
    } catch (err) {
      handleFormError(err, setError);
    }
  };

  return (
    <AuthLayout
      title='Reset Password'
      subtitle="We'll send you a link to reset it.">
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        <Input
          label='Email'
          type='email'
          {...register('email')}
          error={errors.email?.message as string}
        />

        <Button
          type='submit'
          isLoading={isSubmitting}
          className='w-full h-11 text-base'>
          Send Reset Link
        </Button>

        <div className='text-center'>
          <Link
            to='/auth/login'
            className='inline-flex items-center text-sm font-medium text-slate-600 hover:text-blue-600'>
            <ArrowLeft className='mr-2 h-4 w-4' /> Back to login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};
