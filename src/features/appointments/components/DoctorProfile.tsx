import {
  Star,
  MapPin,
  Clock,
  CalendarCheck,
  ShieldCheck,
  Stethoscope,
  GraduationCap,
  Languages,
  ThumbsUp,
  CheckCircle2,
  ChevronLeft,
  Share2,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

// --- MOCK DATA FETCHING ---
// In a real app, you would fetch this based on the 'id' param
const doctorData = {
  id: 1,
  name: 'Dr. Sarah Johnson',
  specialty: 'Cardiologist',
  degree: 'MBBS, MD (Cardiology), FACC',
  experience: '12+ Years',
  patients: '5000+',
  rating: 4.9,
  reviews: 128,
  about:
    "Dr. Sarah Johnson is a distinguished Cardiologist with over a decade of experience in treating complex heart conditions. She specializes in interventional cardiology, heart failure management, and preventive cardiac care. Dr. Sarah is known for her patient-centric approach and has been awarded 'Best Cardiologist' in Bangalore for two consecutive years.",
  image:
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600&h=600',
  fee: '$150',
  languages: ['English', 'Hindi', 'Kannada'],
  services: [
    'Angiography & Angioplasty',
    'Pacemaker Implantation',
    'Hypertension Management',
    'Heart Failure Treatment',
  ],
  education: [
    {
      degree: 'MBBS',
      college: 'All India Institute of Medical Sciences (AIIMS)',
      year: '2008',
    },
    {
      degree: 'MD - General Medicine',
      college: 'Madras Medical College',
      year: '2012',
    },
    {
      degree: 'DM - Cardiology',
      college: 'Jayadeva Institute of Cardiovascular Sciences',
      year: '2016',
    },
  ],
};

export const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('about');

  return (
    <div className='min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-10'>
      {/* 1. Navbar (Consistent) */}
      <nav className='sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 h-16 flex items-center justify-between'>
          <div
            className='flex items-center gap-2 cursor-pointer'
            onClick={() => navigate('/')}>
            <div className='bg-blue-600 p-1.5 rounded-lg'>
              <Stethoscope className='w-5 h-5 text-white' />
            </div>
            <span className='text-xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent'>
              PDuttaClinic
            </span>
          </div>
          <Button variant='ghost' size='sm' onClick={() => navigate(-1)}>
            <ChevronLeft className='w-4 h-4 mr-2' /> Back
          </Button>
        </div>
      </nav>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-8'>
        {/* 2. Profile Header Card */}
        <div className='bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800 mb-8'>
          <div className='flex flex-col md:flex-row gap-8 items-start'>
            {/* Doctor Image */}
            <div className='w-full md:w-auto flex-shrink-0'>
              <div className='w-32 h-32 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-lg border-4 border-slate-100 dark:border-slate-800 mx-auto md:mx-0'>
                <img
                  src={doctorData.image}
                  alt={doctorData.name}
                  className='w-full h-full object-cover'
                />
              </div>
            </div>

            {/* Doctor Info */}
            <div className='flex-1 w-full text-center md:text-left'>
              <div className='flex flex-col md:flex-row justify-between items-start gap-4'>
                <div>
                  <div className='inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full mb-3'>
                    {doctorData.specialty}
                  </div>
                  <h1 className='text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center justify-center md:justify-start gap-2'>
                    {doctorData.name}
                    <ShieldCheck className='w-6 h-6 text-blue-500 fill-blue-50' />
                  </h1>
                  <p className='text-slate-500 dark:text-slate-400 font-medium mb-4'>
                    {doctorData.degree}
                  </p>

                  <div className='flex flex-wrap justify-center md:justify-start gap-4 text-sm text-slate-600 dark:text-slate-300'>
                    <div className='flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-lg'>
                      <Star className='w-4 h-4 text-amber-500 fill-current' />
                      <span className='font-bold text-slate-900 dark:text-white'>
                        {doctorData.rating}
                      </span>
                      <span className='text-slate-400'>
                        ({doctorData.reviews} Reviews)
                      </span>
                    </div>
                    <div className='flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-lg'>
                      <ThumbsUp className='w-4 h-4 text-blue-500' />
                      <span className='font-bold text-slate-900 dark:text-white'>
                        98%
                      </span>
                      <span className='text-slate-400'>Success Rate</span>
                    </div>
                    <div className='flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-lg'>
                      <MapPin className='w-4 h-4 text-emerald-500' />
                      <span>Bangalore, India</span>
                    </div>
                  </div>
                </div>

                <div className='w-full md:w-auto flex gap-2 md:block mt-4 md:mt-0'>
                  <Button
                    variant='outline'
                    size='icon'
                    className='rounded-full'>
                    <Share2 className='w-4 h-4' />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Main Content Grid */}
        <div className='grid md:grid-cols-3 gap-8'>
          {/* Left Column: Details */}
          <div className='md:col-span-2 space-y-6'>
            {/* Tabs */}
            <div className='border-b border-slate-200 dark:border-slate-800 flex gap-6'>
              {['about', 'services', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-sm font-bold capitalize transition-all border-b-2 ${
                    activeTab === tab
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}>
                  {tab}
                </button>
              ))}
            </div>

            {/* About Section */}
            {activeTab === 'about' && (
              <div className='space-y-6 animate-in fade-in slide-in-from-bottom-2'>
                <div className='bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800'>
                  <h3 className='text-lg font-bold text-slate-900 dark:text-white mb-4'>
                    Biography
                  </h3>
                  <p className='text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base'>
                    {doctorData.about}
                  </p>

                  <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div className='flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800'>
                      <div className='bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg text-blue-600'>
                        <Languages className='w-4 h-4' />
                      </div>
                      <div>
                        <p className='text-xs text-slate-500 uppercase font-bold'>
                          Languages
                        </p>
                        <p className='text-sm font-medium text-slate-900 dark:text-white'>
                          {doctorData.languages.join(', ')}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800'>
                      <div className='bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-lg text-emerald-600'>
                        <Clock className='w-4 h-4' />
                      </div>
                      <div>
                        <p className='text-xs text-slate-500 uppercase font-bold'>
                          Experience
                        </p>
                        <p className='text-sm font-medium text-slate-900 dark:text-white'>
                          {doctorData.experience}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800'>
                  <h3 className='text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2'>
                    <GraduationCap className='w-5 h-5 text-blue-600' />{' '}
                    Education
                  </h3>
                  <div className='space-y-4'>
                    {doctorData.education.map((edu, idx) => (
                      <div key={idx} className='flex gap-4'>
                        <div className='flex flex-col items-center'>
                          <div className='w-3 h-3 bg-blue-600 rounded-full'></div>
                          {idx !== doctorData.education.length - 1 && (
                            <div className='w-0.5 h-full bg-slate-200 dark:bg-slate-700 my-1'></div>
                          )}
                        </div>
                        <div>
                          <p className='font-bold text-slate-900 dark:text-white'>
                            {edu.degree}
                          </p>
                          <p className='text-sm text-slate-500'>
                            {edu.college}
                          </p>
                          <p className='text-xs text-slate-400 mt-1'>
                            {edu.year}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Services Section */}
            {activeTab === 'services' && (
              <div className='bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 animate-in fade-in'>
                <h3 className='text-lg font-bold text-slate-900 dark:text-white mb-4'>
                  Specializations
                </h3>
                <div className='grid sm:grid-cols-2 gap-4'>
                  {doctorData.services.map((service, idx) => (
                    <div
                      key={idx}
                      className='flex items-center p-3 border border-slate-100 dark:border-slate-800 rounded-lg hover:border-blue-200 transition-colors'>
                      <CheckCircle2 className='w-4 h-4 text-emerald-500 mr-3' />
                      <span className='text-sm font-medium text-slate-700 dark:text-slate-300'>
                        {service}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Booking Card */}
          <div className='md:col-span-1'>
            <div className='sticky top-24'>
              <div className='bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-blue-100 dark:border-slate-800 overflow-hidden'>
                <div className='bg-blue-600 p-4 text-white text-center'>
                  <p className='text-sm font-medium opacity-90'>
                    Consultation Fee
                  </p>
                  <p className='text-3xl font-bold mt-1'>{doctorData.fee}</p>
                </div>

                <div className='p-6 space-y-6'>
                  <div className='flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl'>
                    <CalendarCheck className='w-5 h-5 text-blue-600' />
                    <div>
                      <p className='font-bold text-slate-900 dark:text-white'>
                        Next Available
                      </p>
                      <p className='text-xs'>Today, 4:00 PM</p>
                    </div>
                  </div>

                  <div className='space-y-3'>
                    <Button
                      className='w-full h-12 text-base font-bold bg-blue-600 hover:bg-blue-700 shadow-md'
                      onClick={() => navigate(`/book/${id}`)}>
                      Book Appointment
                    </Button>
                    <Button variant='outline' className='w-full h-12 font-bold'>
                      Video Consultation
                    </Button>
                  </div>

                  <div className='text-center'>
                    <p className='text-xs text-slate-400'>
                      Usually responds within 1 hour
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
