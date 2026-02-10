import { UseFormSetError } from 'react-hook-form';
import { toast } from 'sonner';

interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export const handleFormError = <T extends Record<string, any>>(
  error: any,
  setError: UseFormSetError<T>,
) => {
  const data = error.response?.data as ApiErrorResponse;

  // 1. Validation Errors (Red text under inputs)
  if (data?.errors) {
    Object.entries(data.errors).forEach(([key, messages]) => {
      // @ts-ignore
      setError(key, { type: 'server', message: messages[0] });
    });
    return;
  }

  // 2. Generic Errors (Toast popup)
  if (data?.message) {
    toast.error(data.message);
    return;
  }
  // 3. Fallback for unexpected errors
  toast.error('Something went wrong. Please try again.');
};
