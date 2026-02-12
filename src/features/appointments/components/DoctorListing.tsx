import {
  Star,
  ShieldCheck,
  CheckCircle2,
  Target,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Phone,
  Clock,
  Award,
  HeartPulse,
  Building2,
  Image as ImageIcon,
  Stethoscope,
  CalendarCheck,
  Quote,
  ThumbsUp,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';

// --- MOCK DATA ---
const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    degree: 'MBBS, MD (Cardiology)',
    rating: 4.9,
    experience: '12 Years',
    image:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400&h=400',
    available: 'Today, 4:00 PM',
  },
  {
    id: 2,
    name: 'Dr. Mark Wilson',
    specialty: 'Neurologist',
    degree: 'MBBS, DM (Neuro)',
    rating: 4.8,
    experience: '9 Years',
    image:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400&h=400',
    available: 'Tomorrow, 10:00 AM',
  },
  {
    id: 3,
    name: 'Dr. Emily Chen',
    specialty: 'Pediatrician',
    degree: 'MBBS, DCH',
    rating: 4.9,
    experience: '15 Years',
    image:
      'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400&h=400',
    available: 'Today, 2:30 PM',
  },
  {
    id: 4,
    name: 'Dr. James Carter',
    specialty: 'Orthopedic',
    degree: 'MBBS, MS (Ortho)',
    rating: 4.7,
    experience: '8 Years',
    image:
      'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400&h=400',
    available: 'Mon, 10:00 AM',
  },
];

const treatments = [
  'Laparoscopic Cholecystectomy',
  'Fissures Treatment',
  'Bile Duct Cancer Surgery',
  'Laparoscopic Hernia Repair',
  'Piles/ Hemorrhoids Treatment',
  'Robotic-assisted colorectal surgery',
  'Adhesions Release',
  'Pilonidal Sinus Treatment',
  'Robotic-assisted gastric surgery',
  'Diagnostic Laparoscopy',
  'Esophageal Cancer Surgery',
  'Robotic-assisted liver Surgery',
  'Laparoscopic Splenectomy',
  'Liver Cancer Surgery',
  'Chronic Pancreatitis',
  'Laparoscopic Fundoplication',
  'Gall Bladder Cancer Surgery',
  'Pancreatic Cancer',
];

const reviews = [
  {
    id: 1,
    name: 'Rahul Verma',
    date: '2 days ago',
    rating: 5,
    text: "Excellent facilities and very caring staff. Dr. Sarah was very patient with my mother's treatment.",
  },
  {
    id: 2,
    name: 'Priya Singh',
    date: '1 week ago',
    rating: 4,
    text: 'Clean premises and quick billing process. The waiting time was a bit long but the treatment was worth it.',
  },
  {
    id: 3,
    name: 'Amit Kumar',
    date: '2 weeks ago',
    rating: 5,
    text: 'State of the art equipment. Best hospital in Bangalore for cardiac issues. Highly recommended!',
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    date: '3 weeks ago',
    rating: 5,
    text: 'The pediatric department is amazing. Dr. Emily is the best doctor for kids.',
  },
];

const photos = [
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=600',
];

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'doctors', label: 'Doctors' },
  { id: 'treatments', label: 'Treatments' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'gallery', label: 'Gallery' },
];

export const DoctorListing = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showFullIntro, setShowFullIntro] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      // Offset for sticky header
      const headerOffset = 180;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Horizontal scroll for doctor carousel
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 350;
      direction === 'left'
        ? current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
        : current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Active Tab Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-150px 0px -50% 0px', // Adjust trigger point
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );
    tabs.forEach((tab) => {
      const element = document.getElementById(tab.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className='min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-10'>
      {/* 1. Glass Navbar */}
      <nav className='sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all'>
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
          <div className='flex gap-3'>
            <Button
              variant='ghost'
              size='sm'
              className='hidden md:inline-flex text-slate-600'
              onClick={() => navigate('/provider/login')}>
              Provider Login
            </Button>
            <Button
              size='sm'
              className='bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-transform active:scale-95'
              onClick={() => scrollToSection('doctors')}>
              Book Appointment
            </Button>
          </div>
        </div>
      </nav>

      {/* 2. Professional Hero Section */}
      <section className='bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-800 mb-8'>
        <div className='h-48 md:h-[320px] w-full bg-slate-100 relative group overflow-hidden'>
          <img
            src='https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1600'
            alt='Clinic Cover'
            className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent'></div>
        </div>

        <div className='max-w-7xl mx-auto px-4 sm:px-6 relative pb-0'>
          <div className='flex flex-col md:flex-row items-center md:items-end -mt-16 md:-mt-14 mb-6 relative z-10'>
            <div className='relative flex-shrink-0'>
              <div className='h-32 w-32 md:h-44 md:w-44 rounded-full border-[4px] border-white dark:border-slate-900 bg-white shadow-xl flex items-center justify-center'>
                <img
                  src='https://cdn-icons-png.flaticon.com/512/3774/3774299.png'
                  alt='Clinic Logo'
                  className='w-full h-full object-cover p-2'
                />
              </div>
              <div className='absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-white dark:border-slate-900 flex items-center shadow-sm'>
                OPEN
              </div>
            </div>

            <div className='flex-1 text-center md:text-left mt-4 md:mt-0 md:ml-6 w-full'>
              <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-4'>
                <div>
                  <div className='flex items-center justify-center md:justify-start gap-2'>
                    <h1 className='text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight'>
                      PDuttaClinic
                    </h1>
                    <ShieldCheck className='w-6 h-6 text-blue-500 fill-blue-50' />
                  </div>
                  <p className='text-slate-500 dark:text-slate-400 font-medium text-base md:text-lg mt-1'>
                    Premium Multi-Specialty Hospital • Bangalore
                  </p>
                  <div className='flex items-center justify-center md:justify-start gap-6 mt-3 text-sm font-medium text-slate-600 dark:text-slate-300'>
                    <span className='flex items-center gap-1.5'>
                      <Star className='w-4 h-4 text-amber-500 fill-current' />{' '}
                      4.9 Rating
                    </span>
                    <span className='flex items-center gap-1.5'>
                      <MapPin className='w-4 h-4 text-blue-500' /> Tech Park
                      Road
                    </span>
                    <span className='flex items-center gap-1.5'>
                      <Clock className='w-4 h-4 text-emerald-500' /> 24/7 Open
                    </span>
                  </div>
                </div>
                <div className='flex gap-3 w-full md:w-auto md:mb-1'>
                  <Button
                    className='flex-1 md:flex-none h-11 px-6 bg-blue-600 hover:bg-blue-700 shadow-md transition-all hover:-translate-y-0.5'
                    onClick={() => scrollToSection('doctors')}>
                    <CalendarCheck className='w-4 h-4 mr-2' /> Book Visit
                  </Button>
                  <Button
                    variant='outline'
                    className='flex-1 md:flex-none h-11 px-6 border-slate-300 hover:bg-slate-50'>
                    <Phone className='w-4 h-4 mr-2' /> Contact
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs - Sticky within section */}
          <div className='border-t border-slate-100 dark:border-slate-800 mt-6 sticky top-16 bg-white dark:bg-slate-900 z-40 px-2 -mx-6 md:mx-0 md:px-0'>
            <div
              className='flex overflow-x-auto no-scrollbar gap-2 md:gap-8 px-4 md:px-0 scroll-smooth'
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  className={`py-4 px-2 text-sm font-semibold border-b-[3px] transition-all whitespace-nowrap outline-none ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400'
                  }`}>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Introduction & Performance (Overview) */}
      <section
        id='overview'
        className='max-w-7xl mx-auto px-4 sm:px-6 mb-16 scroll-mt-24'>
        <div className='grid md:grid-cols-3 gap-8'>
          <div className='md:col-span-2'>
            <h2 className='text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2'>
              <Building2 className='w-5 h-5 text-blue-600' /> About the Clinic
            </h2>
            <div className='bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800'>
              <p
                className={`text-slate-600 dark:text-slate-300 leading-relaxed ${!showFullIntro ? 'line-clamp-3 md:line-clamp-none' : ''}`}>
                PDuttaClinic is a pioneer in integrated healthcare, bringing
                together the best medical professionals and state-of-the-art
                technology. Since 2010, we have focused on a "Patient First"
                philosophy, ensuring affordable and high-quality care for
                everyone. Our facility is equipped with modular operation
                theaters, advanced ICU units, and a dedicated team available
                24/7.
              </p>
              <button
                onClick={() => setShowFullIntro(!showFullIntro)}
                className='md:hidden text-blue-600 text-sm font-semibold mt-2'>
                {showFullIntro ? 'Show Less' : 'Read More'}
              </button>

              <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800'>
                {[
                  {
                    icon: Clock,
                    label: '24/7 Emergency',
                    color: 'text-red-500',
                    bg: 'bg-red-50',
                  },
                  {
                    icon: Award,
                    label: 'NABH Accredited',
                    color: 'text-amber-500',
                    bg: 'bg-amber-50',
                  },
                  {
                    icon: HeartPulse,
                    label: 'Advanced ICU',
                    color: 'text-blue-500',
                    bg: 'bg-blue-50',
                  },
                  {
                    icon: ShieldCheck,
                    label: 'Insurance Support',
                    color: 'text-emerald-500',
                    bg: 'bg-emerald-50',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className='flex flex-col items-center text-center p-2 rounded-lg hover:bg-slate-50 transition-colors'>
                    <div
                      className={`p-2.5 rounded-full ${item.bg} ${item.color} mb-2`}>
                      <item.icon className='w-5 h-5' />
                    </div>
                    <span className='text-xs font-bold text-slate-700 dark:text-slate-300'>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className='bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-lg flex flex-col justify-between'>
            <div>
              <h3 className='text-lg font-semibold opacity-90 mb-6'>
                Clinic Performance
              </h3>
              <div className='space-y-6'>
                <div className='flex justify-between items-center border-b border-white/10 pb-4'>
                  <div>
                    <div className='text-3xl font-bold'>15+</div>
                    <div className='text-sm opacity-70'>Years Experience</div>
                  </div>
                  <ThumbsUp className='w-8 h-8 opacity-20' />
                </div>
                <div className='flex justify-between items-center border-b border-white/10 pb-4'>
                  <div>
                    <div className='text-3xl font-bold'>10k+</div>
                    <div className='text-sm opacity-70'>Happy Patients</div>
                  </div>
                  <HeartPulse className='w-8 h-8 opacity-20' />
                </div>
                <div className='flex justify-between items-center'>
                  <div>
                    <div className='text-3xl font-bold'>98%</div>
                    <div className='text-sm opacity-70'>Success Rate</div>
                  </div>
                  <Award className='w-8 h-8 opacity-20' />
                </div>
              </div>
            </div>
            <Button className='mt-6 bg-white text-blue-700 hover:bg-blue-50 border-0 w-full'>
              View Achievements
            </Button>
          </div>
        </div>
      </section>

      {/* 4. Doctors Carousel - Clean Cards */}
      <section
        id='doctors'
        className='bg-slate-50 dark:bg-slate-900/50 py-16 mb-12 scroll-mt-24'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6'>
          <div className='flex justify-between items-end mb-8'>
            <div>
              <h2 className='text-2xl font-bold text-slate-900 dark:text-white'>
                Our Top Specialists
              </h2>
              <p className='text-slate-500 mt-2'>
                Book appointments with highly qualified doctors.
              </p>
            </div>
            <div className='hidden md:flex gap-2'>
              <Button
                size='icon'
                variant='outline'
                onClick={() => scroll('left')}
                className='rounded-full bg-white hover:bg-slate-50'>
                <ChevronLeft className='w-5 h-5' />
              </Button>
              <Button
                size='icon'
                variant='outline'
                onClick={() => scroll('right')}
                className='rounded-full bg-white hover:bg-slate-50'>
                <ChevronRight className='w-5 h-5' />
              </Button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className='flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide px-1'
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {doctors.map((doc) => (
              <div
                key={doc.id}
                className='min-w-[300px] snap-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group'>
                <div className='h-60 overflow-hidden relative'>
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                  />
                  <div className='absolute top-3 right-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full text-xs font-bold text-amber-500 shadow-sm flex items-center'>
                    <Star className='w-3.5 h-3.5 mr-1 fill-current' />{' '}
                    {doc.rating}
                  </div>
                </div>

                <div className='p-5'>
                  <div className='flex justify-between items-start mb-2'>
                    <div>
                      <h3 className='text-lg font-bold text-slate-900 dark:text-white leading-tight'>
                        {doc.name}
                      </h3>
                      <p className='text-xs text-blue-600 font-semibold uppercase tracking-wide mt-1'>
                        {doc.specialty}
                      </p>
                    </div>
                  </div>

                  <p className='text-sm text-slate-500 mb-4 line-clamp-1'>
                    {doc.degree}
                  </p>

                  <div className='flex items-center gap-4 text-xs text-slate-500 mb-5 bg-slate-50 dark:bg-slate-800 p-3 rounded-lg'>
                    <span className='flex items-center gap-1'>
                      <Clock className='w-3.5 h-3.5 text-blue-500' />{' '}
                      {doc.experience} Exp.
                    </span>
                    <span className='w-px h-3 bg-slate-300'></span>
                    <span className='flex items-center gap-1'>
                      <CheckCircle2 className='w-3.5 h-3.5 text-emerald-500' />{' '}
                      Verified
                    </span>
                  </div>

                  <div className='flex gap-3'>
                    <Button
                      variant='outline'
                      className='flex-1 text-xs font-semibold'
                      onClick={() => navigate(`/doctor/${doc.id}`)}>
                      View Profile
                    </Button>
                    <Button
                      className='flex-1 text-xs font-semibold bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20'
                      onClick={() => navigate(`/book/${doc.id}`)}>
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Modern Treatments Grid (Pill Style) */}
      <section
        id='treatments'
        className='max-w-7xl mx-auto px-4 sm:px-6 mb-16 scroll-mt-24'>
        <div className='flex items-center gap-3 mb-8'>
          <div className='h-8 w-1.5 bg-blue-600 rounded-full'></div>
          <div>
            <h2 className='text-2xl font-bold text-slate-900 dark:text-white'>
              Specialized Treatments
            </h2>
            <p className='text-slate-500 text-sm'>
              Advanced procedures performed by experts.
            </p>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {treatments.map((treatment, idx) => (
            <div
              key={idx}
              className='group flex items-center p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-default'>
              <div className='h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 mr-4 group-hover:bg-blue-600 group-hover:text-white transition-colors'>
                <Target className='w-5 h-5' />
              </div>
              <span className='text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-blue-700 transition-colors'>
                {treatment}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Reviews Section */}
      <section
        id='reviews'
        className='bg-slate-50 dark:bg-slate-900/50 py-16 mb-16 scroll-mt-24'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6'>
          <div className='text-center mb-10'>
            <h2 className='text-2xl font-bold text-slate-900 dark:text-white'>
              Patient Stories
            </h2>
            <p className='text-slate-500 mt-2'>
              What our patients say about their experience.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
            {reviews.map((review) => (
              <div
                key={review.id}
                className='p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden'>
                <Quote className='absolute top-4 right-4 text-slate-100 dark:text-slate-800 w-16 h-16 -rotate-12' />
                <div className='flex items-center gap-4 mb-4 relative z-10'>
                  <div className='h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center font-bold text-lg shadow-md'>
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className='font-bold text-slate-900 dark:text-white'>
                      {review.name}
                    </p>
                    <div className='flex items-center gap-2'>
                      <div className='flex text-amber-500'>
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className='w-3.5 h-3.5 fill-current' />
                        ))}
                      </div>
                      <span className='text-xs text-slate-400'>
                        • {review.date}
                      </span>
                    </div>
                  </div>
                </div>
                <p className='text-slate-600 dark:text-slate-300 text-sm leading-relaxed relative z-10'>
                  "{review.text}"
                </p>
              </div>
            ))}
          </div>

          <div className='mt-8 text-center'>
            <Button
              variant='outline'
              className='px-8 rounded-full border-blue-200 text-blue-700 hover:bg-blue-50'>
              View All Reviews
            </Button>
          </div>
        </div>
      </section>

      {/* 7. Gallery Grid (Masonry feel) */}
      <section
        id='gallery'
        className='max-w-7xl mx-auto px-4 sm:px-6 mb-16 scroll-mt-24'>
        <div className='flex items-center justify-between mb-8'>
          <h2 className='text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2'>
            <ImageIcon className='w-6 h-6 text-blue-600' /> Clinic Gallery
          </h2>
          <Button variant='link' className='text-blue-600'>
            View All Photos
          </Button>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 h-[400px] md:h-[500px]'>
          {/* Main Feature Image */}
          <div className='col-span-2 row-span-2 relative rounded-2xl overflow-hidden group shadow-md cursor-pointer'>
            <img
              src={photos[0]}
              alt='Clinic Main'
              className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
            />
            <div className='absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-end p-6'>
              <span className='text-white font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300'>
                Main Reception
              </span>
            </div>
          </div>

          {/* Secondary Images */}
          {photos.slice(1, 5).map((photo, i) => (
            <div
              key={i}
              className='relative rounded-2xl overflow-hidden group shadow-sm cursor-pointer'>
              <img
                src={photo}
                alt='Clinic Interior'
                className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
              />
            </div>
          ))}
        </div>
      </section>

      {/* 8. Professional Footer */}
      <footer className='bg-slate-900 text-white pt-16 pb-8 border-t border-slate-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6'>
          <div className='grid md:grid-cols-4 gap-12 mb-12'>
            <div className='col-span-1 md:col-span-2'>
              <div className='flex items-center gap-2 mb-4'>
                <div className='bg-blue-600 p-1.5 rounded-lg'>
                  <Stethoscope className='w-5 h-5 text-white' />
                </div>
                <span className='text-2xl font-bold'>PDuttaClinic</span>
              </div>
              <p className='text-slate-400 text-sm leading-relaxed max-w-sm'>
                Providing world-class healthcare with a focus on patient safety
                and comfort. Our multi-specialty facility is equipped with the
                latest medical technology.
              </p>
            </div>

            <div>
              <h4 className='font-bold mb-4'>Quick Links</h4>
              <ul className='space-y-2 text-sm text-slate-400'>
                <li>
                  <a href='#' className='hover:text-blue-400 transition-colors'>
                    Find a Doctor
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-blue-400 transition-colors'>
                    Book Appointment
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-blue-400 transition-colors'>
                    Treatments
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-blue-400 transition-colors'>
                    Emergency
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className='font-bold mb-4'>Contact Us</h4>
              <ul className='space-y-2 text-sm text-slate-400'>
                <li className='flex items-center gap-2'>
                  <Phone className='w-4 h-4' /> +91 98765 43210
                </li>
                <li className='flex items-center gap-2'>
                  <MapPin className='w-4 h-4' /> Tech Park, Bangalore
                </li>
                <li className='flex items-center gap-2'>
                  <Clock className='w-4 h-4' /> Mon - Sun: 24 Hours
                </li>
              </ul>
            </div>
          </div>

          <div className='border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500'>
            <p>&copy; 2024 PDuttaClinic. All rights reserved.</p>
            <div className='flex gap-4 mt-4 md:mt-0'>
              <a href='#' className='hover:text-white'>
                Privacy Policy
              </a>
              <a href='#' className='hover:text-white'>
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
