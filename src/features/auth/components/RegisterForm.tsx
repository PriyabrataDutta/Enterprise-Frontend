import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { handleFormError } from '@/utils/errorHandler';
import { AuthLayout } from './AuthLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from 'sonner';

const schema = z.object({
  firstName: z.string().min(2, 'Required'),
  lastName: z.string().min(2, 'Required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Min 8 characters'),
});

type RegisterSchema = z.infer<typeof schema>;

export const RegisterForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(schema),
  });

  // FIX: Removed unused 'data' parameter
  const onSubmit = async () => {
    try {
      await new Promise((r) => setTimeout(r, 1000));
      toast.success('Account created! Please log in.');
      navigate('/auth/login');
    } catch (err) {
      handleFormError(err, setError);
    }
  };

  return (
    <AuthLayout
      title='Create an account'
      subtitle='Start your 30-day free trial'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div className='grid grid-cols-2 gap-4'>
          <Input
            label='First Name'
            {...register('firstName')}
            error={errors.firstName?.message}
          />
          <Input
            label='Last Name'
            {...register('lastName')}
            error={errors.lastName?.message}
          />
        </div>
        <Input
          label='Email'
          type='email'
          {...register('email')}
          error={errors.email?.message}
        />
        <Input
          label='Password'
          type='password'
          {...register('password')}
          error={errors.password?.message}
        />

        <Button
          type='submit'
          isLoading={isSubmitting}
          className='w-full h-11 text-base mt-2'>
          Create Account
        </Button>

        <p className='text-center text-sm text-slate-600'>
          Already have an account?{' '}
          <Link
            to='/auth/login'
            className='font-semibold text-blue-600 hover:text-blue-500'>
            Log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};
