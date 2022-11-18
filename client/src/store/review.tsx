//안지은 작성
// import axios from 'axios';
import create from 'zustand';

type State = {
  // id: number;
  // nickname: string;
  productName: number;
  type: string;
  title: string;
  content: string;
  // view: number;
  // thumbnail: string;
  reviewImg: string;
  // createdAt: string;
  // modifedAt: string;
};

type Action = {
  setTitle: (title: State['title']) => void;
  setContent: (content: State['content']) => void;
};

const useReview = create<State & Action>((set) => ({
  // id: 0,
  // nickname: '',
  productName: 0,
  type: '',
  title: '',
  content: '',
  // thumbnail: '',
  reviewImg: '',
  setTitle: (input) => set(() => ({ title: input })),
  setContent: (input) => set(() => ({ content: input })),
}));

export default useReview;

// const voting = 'http://localhost:3001/categories/review/write';
// submitFetch: async (voting: RequestInfo | URL) => {
//     const response = await fetch(voting);
//     const json = await response.json();
//     set({ Votes: json.data });

// type State = {
//   title: string;
//   content: string;
// };

// type Action = {
//   updateTitle: (title: State['title']) => void;
//   updateContent: (content: State['content']) => void;
// };

// const useReview = create<State & Action>((set) => ({
//   //   voting: voting,
//   //   Votes: {},
//   submitFetch: async () => {
//     const url = await axios('http://localhost:3001/categories/review/write');
//     return url.data;
//   },
//   title: '',
//   content: '',
//   updateTitle: (title) => set({ title: title }),
//   updateContent: (content) => set({ content: content }),
// }));
