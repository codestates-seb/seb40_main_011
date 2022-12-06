//안지은 작성
//대분류, 소분류 카테고리에 사용됨

import create from 'zustand';

type ICategoriesData = {
  id: number;
  name: string;
};

type Categories = {
  clickName: string;
  selectName: string;
  mainCategorySpread: boolean;
  productCategorySpread: boolean;
  beforeClickname: string;
  categoriesData: ICategoriesData[];
  setClickName: (clickName: string) => void;
  setSelectName: (selectName: string) => void;
  setMainCategorySpread: (mainCategorySpread: boolean) => void;
  setProductCategorySpread: (productCategorySpread: boolean) => void;
  setBeforeClickname: (beforeClickname: string) => void;
  setCategoriesData: (setCategories: ICategoriesData[]) => void;
  clearClickName: (clickName: string) => void;
};

const useCategories = create<Categories>((set) => ({
  clickName: '대분류 선택',
  selectName: '소분류 선택',
  mainCategorySpread: false,
  productCategorySpread: false,
  beforeClickname: '',
  categoriesData: [],
  setClickName: (input) => set(() => ({ clickName: input })),
  setSelectName: (input) => set(() => ({ selectName: input })),
  setMainCategorySpread: (input) => set(() => ({ mainCategorySpread: input })),
  setProductCategorySpread: (input) =>
    set(() => ({ productCategorySpread: input })),
  setBeforeClickname: (input) => set(() => ({ beforeClickname: input })),
  setCategoriesData: (input) => set(() => ({ categoriesData: input })),
  clearClickName: (input) => set(() => ({ clickName: '대분류 선택' })),
}));

export default useCategories;
