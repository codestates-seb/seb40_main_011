//다크모드

import create from 'zustand';

type IDarkMode = {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
};

const useDarkMode = create<IDarkMode>((set) => ({
  darkMode: false,
  setDarkMode: (input) => set(() => ({ darkMode: input })),
}));

export default useDarkMode;
