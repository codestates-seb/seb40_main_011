//안지은 작성
import create from 'zustand';

type State = {
  productId: string;
  title: string;
  content: string;
  thumbnailBase64: string;
  thumbnailImg: string;
};

type Action = {
  setProductId: (productId: State['productId']) => void;
  setTitle: (title: State['title']) => void;
  setContent: (content: State['content']) => void;
  setThumbnailBase64: (thumbnailBase64: State['thumbnailBase64']) => void;
  setThumnailImg: (thumbnailImg: State['thumbnailImg']) => void;
};

const useReview = create<State & Action>((set) => ({
  productId: '',
  title: '',
  content: '',
  thumbnailBase64: '',
  thumbnailImg: '',
  setProductId: (input) => set(() => ({ productId: input })),
  setTitle: (input) => set(() => ({ title: input })),
  setContent: (input) => set(() => ({ content: input })),
  setThumbnailBase64: (input) => set(() => ({ thumbnailBase64: input })),
  setThumnailImg: (input) => set(() => ({ thumbnailImg: input })),
}));

export default useReview;
