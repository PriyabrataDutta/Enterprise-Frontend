import { useAuthStore } from '@/stores/useAuthStore';
import { Navigate } from 'react-router-dom';

interface Props {
  roles?: string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const Authorization = ({ roles, children, fallback = null }: Props) => {
  const user = useAuthStore((state) => state.user);
  if (!user) return <Navigate to='/auth/login' replace />;
  if (roles && !roles.includes(user.role)) return <>{fallback}</>;
  return <>{children}</>;
};
