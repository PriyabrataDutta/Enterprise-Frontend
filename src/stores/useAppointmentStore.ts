import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Appointment {
  id: string;
  patientName: string;
  phoneNumber: string;
  doctorName: string;
  date: string;
  timeSlot: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  type: string;
  paymentStatus: 'Paid' | 'Unpaid';
}

interface AppointmentState {
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id' | 'status'>) => void;
  updateStatus: (id: string, status: Appointment['status']) => void;
}

export const useAppointmentStore = create<AppointmentState>()(
  persist(
    (set) => ({
      // specific mock data for demo purposes
      appointments: [
        {
          id: '1',
          patientName: 'John Doe',
          phoneNumber: '+1234567890',
          doctorName: 'Dr. Sarah Johnson',
          date: 'Today',
          timeSlot: '09:00 AM',
          status: 'Confirmed',
          type: 'Checkup',
          paymentStatus: 'Paid',
        },
      ],

      addAppointment: (newApt) =>
        set((state) => ({
          appointments: [
            {
              ...newApt,
              id: Math.random().toString(36).substr(2, 9), // Generate random ID
              status: 'Confirmed',
            },
            ...state.appointments,
          ],
        })),

      updateStatus: (id, status) =>
        set((state) => ({
          appointments: state.appointments.map((apt) =>
            apt.id === id ? { ...apt, status } : apt,
          ),
        })),
    }),
    {
      name: 'appointments-storage', // Save to localStorage
    },
  ),
);
