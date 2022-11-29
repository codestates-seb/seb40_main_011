//안지은 작성
import create from 'zustand';

type State = {
  productId: string;
  title: string;
  content: string;
  reviewImg: string;
};

type Action = {
  setProductId: (productId: State['productId']) => void;
  setTitle: (title: State['title']) => void;
  setContent: (content: State['content']) => void;
};

const useReview = create<State & Action>((set) => ({
  productId: '',
  title: '',
  content: '',
  reviewImg: '',
  setProductId: (input) => set(() => ({ productId: input })),
  setTitle: (input) => set(() => ({ title: input })),
  setContent: (input) => set(() => ({ content: input })),
}));

export default useReview;
