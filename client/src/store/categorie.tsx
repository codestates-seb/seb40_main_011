//안지은 작성
//대분류 카테고리에 사용됨

import create from 'zustand';

type Categories = {
  clickName: string;
  setClickName: (clickName: string) => void;
};

const useCategorie = create<Categories>((set) => ({
  clickName: '대분류 선택',
  setClickName: (input) => set(() => ({ clickName: input })),
}));

export default useCategorie;
