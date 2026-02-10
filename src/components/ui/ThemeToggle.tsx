import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '@/stores/useThemeStore';
import { Button } from '@/components/ui/Button';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={toggleTheme}
      className='w-full justify-start px-2'>
      {theme === 'light' ? (
        <>
          <Moon className='h-5 w-5 mr-3' />
          <span className='md:inline'>Dark Mode</span>
        </>
      ) : (
        <>
          <Sun className='h-5 w-5 mr-3' />
          <span className='md:inline'>Light Mode</span>
        </>
      )}
    </Button>
  );
};
