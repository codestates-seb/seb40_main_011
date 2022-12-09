//다크모드

import create from 'zustand';
import { persist } from 'zustand/middleware';
type IDarkMode = {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
};

export const useDarkMode = create<IDarkMode>()(
  persist((set) => ({
    darkMode: false,
    setDarkMode: (input) => set(() => ({ darkMode: input })),
  }))
);
