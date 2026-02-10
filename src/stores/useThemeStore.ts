import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';

          // Apply class to HTML element
          if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }

          return { theme: newTheme };
        }),
    }),
    {
      name: 'theme-storage', // name of the item in the storage (must be unique)
      onRehydrateStorage: () => (state) => {
        // Re-apply theme on page reload
        if (state?.theme === 'dark') {
          document.documentElement.classList.add('dark');
        }
      },
    },
  ),
);
