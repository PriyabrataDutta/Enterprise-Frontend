import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from 'sonner';
import { Loader2, Phone, ShieldCheck } from 'lucide-react';
import { auth, setupRecaptcha } from '@/lib/firebase';
import { signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';

interface Props {
  phoneNumber: string;
  onVerified: () => void;
  onCancel: () => void;
}

export const OtpVerification = ({
  phoneNumber,
  onVerified,
  onCancel,
}: Props) => {
  const [step, setStep] = useState<'SEND' | 'VERIFY'>('SEND');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);

  useEffect(() => {
    // Initialize the invisible recaptcha when component opens
    setupRecaptcha('recaptcha-container');
  }, []);

  const sendOtp = async () => {
    setIsLoading(true);
    try {
      const verifier = window.recaptchaVerifier;
      // Ensure phone has country code. Defaulting to +91 for India if missing.
      const formattedPhone = phoneNumber.startsWith('+')
        ? phoneNumber
        : `+91${phoneNumber}`;

      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        verifier,
      );
      setConfirmationResult(confirmation);
      setStep('VERIFY');
      toast.success('OTP Sent!', { description: `Sent to ${formattedPhone}` });
    } catch (error: any) {
      console.error(error);
      toast.error('Failed to send OTP', { description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!confirmationResult) return;
    setIsLoading(true);
    try {
      await confirmationResult.confirm(otp);
      toast.success('Phone Verified Successfully');
      onVerified();
    } catch (error) {
      toast.error('Invalid Code', {
        description: 'Please check and try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in zoom-in-95 duration-200'>
      <div className='bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl p-6 border border-slate-200 dark:border-slate-800'>
        {/* Invisible Container for Firebase Recaptcha */}
        <div id='recaptcha-container'></div>

        <div className='text-center mb-6'>
          <div className='mx-auto h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4'>
            {step === 'SEND' ? (
              <Phone className='h-6 w-6 text-blue-600' />
            ) : (
              <ShieldCheck className='h-6 w-6 text-emerald-600' />
            )}
          </div>
          <h2 className='text-xl font-bold text-slate-900 dark:text-white'>
            {step === 'SEND'
              ? 'Verify Phone Number'
              : 'Enter Verification Code'}
          </h2>
          <p className='text-sm text-slate-500 mt-2'>
            {step === 'SEND'
              ? `We will send a code to ${phoneNumber} to confirm your booking.`
              : `Enter the 6-digit code sent to ${phoneNumber}`}
          </p>
        </div>

        <div className='space-y-4'>
          {step === 'VERIFY' && (
            <Input
              label=''
              placeholder='123456'
              className='text-center text-2xl tracking-[0.5em] font-bold h-14'
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          )}

          <div className='flex gap-3 mt-6'>
            <Button
              variant='outline'
              onClick={onCancel}
              className='flex-1'
              disabled={isLoading}>
              Cancel
            </Button>

            {step === 'SEND' ? (
              <Button onClick={sendOtp} disabled={isLoading} className='flex-1'>
                {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                Send OTP
              </Button>
            ) : (
              <Button
                onClick={verifyOtp}
                disabled={isLoading || otp.length < 6}
                className='flex-1 bg-emerald-600 hover:bg-emerald-700'>
                {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                Verify & Book
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
