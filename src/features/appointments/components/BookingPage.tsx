import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from 'sonner';
import { OtpVerification } from './OtpVerification';
import { useAppointmentStore } from '@/stores/useAppointmentStore';

const timeSlots = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
];

export const BookingPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const addAppointment = useAppointmentStore((state) => state.addAppointment);

  // Form State
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const [showOtp, setShowOtp] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // --- 1. SMART DATA CAPTURE ---
  useEffect(() => {
    // Check local storage for previously saved patient data
    const savedUser = localStorage.getItem('medi_connect_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setFormData(parsed);
        toast.info(`Welcome back, ${parsed.name}!`, {
          description: "We've pre-filled your details.",
        });
      } catch (e) {
        console.error('Failed to parse user data');
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInitiateBooking = () => {
    if (!selectedSlot || !formData.name || formData.phone.length < 10) {
      return toast.error('Please fill all details and select a slot');
    }
    setShowOtp(true);
  };

  const handleBookingConfirmed = async () => {
    setShowOtp(false);
    setIsProcessing(true);

    // --- 2. SAVE USER DATA FOR NEXT TIME ---
    localStorage.setItem('medi_connect_user', JSON.stringify(formData));

    // Simulate API
    await new Promise((r) => setTimeout(r, 1500));

    // Add to Global Store (Doctor will see this)
    addAppointment({
      patientName: formData.name,
      phoneNumber: formData.phone,
      doctorName: 'Dr. Sarah Johnson', // In real app, fetch name using 'id'
      date: new Date().toLocaleDateString(),
      timeSlot: selectedSlot!,
      type: 'Consultation',
      paymentStatus: 'Unpaid',
    });

    setIsProcessing(false);
    toast.success('Booking Confirmed!');
    navigate('/appointment-success');
  };

  return (
    <div className='max-w-4xl mx-auto py-12 px-4'>
      {showOtp && (
        <OtpVerification
          phoneNumber={formData.phone}
          onVerified={handleBookingConfirmed}
          onCancel={() => setShowOtp(false)}
        />
      )}

      <div className='bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col md:flex-row'>
        {/* Left Side: Doctor Info */}
        <div className='md:w-1/3 bg-slate-50 dark:bg-slate-800 p-8 border-r border-slate-200 dark:border-slate-700'>
          <h3 className='text-lg font-bold text-slate-900 dark:text-white mb-2'>
            Dr. Sarah Johnson
          </h3>
          <p className='text-blue-600 dark:text-blue-400 font-medium mb-6'>
            Cardiologist
          </p>

          <div className='space-y-4 text-sm text-slate-600 dark:text-slate-300'>
            <div className='flex items-center'>
              <CalendarIcon className='w-4 h-4 mr-3 opacity-70' /> Today
            </div>
            <div className='flex items-center'>
              <Clock className='w-4 h-4 mr-3 opacity-70' /> 30 Mins Duration
            </div>
            <div className='flex items-center font-bold text-lg text-slate-900 dark:text-white mt-4'>
              $150.00
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className='md:w-2/3 p-8'>
          <h2 className='text-2xl font-bold text-slate-900 dark:text-white mb-6'>
            Patient Details
          </h2>

          <div className='space-y-5'>
            <Input
              label='Full Name'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              icon={<User className='w-4 h-4' />}
              placeholder='Ex. John Doe'
            />

            <div className='grid md:grid-cols-2 gap-4'>
              <Input
                label='Phone Number'
                name='phone'
                value={formData.phone}
                onChange={handleInputChange}
                type='tel'
                icon={<Phone className='w-4 h-4' />}
                placeholder='9876543210'
              />
              <Input
                label='Email (Optional)'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                type='email'
                icon={<Mail className='w-4 h-4' />}
                placeholder='john@example.com'
              />
            </div>

            <div>
              <label className='text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 block'>
                Select Time Slot
              </label>
              <div className='grid grid-cols-3 gap-2'>
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2 px-3 rounded-lg text-sm transition-all border ${
                      selectedSlot === slot
                        ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-200 dark:ring-blue-900'
                        : 'border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}>
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleInitiateBooking}
              isLoading={isProcessing}
              className='w-full h-12 text-base mt-4 bg-emerald-600 hover:bg-emerald-700'>
              Verify & Confirm Booking
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
