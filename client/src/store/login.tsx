// import create from 'zustand';

// const initialToken = localStorage.getItem('authorization');

// export const useLogin = create(() => ({
//   name: 'isLogin',
//   isLogin: initialToken ? true : false,
//   authorization: initialToken,
//   setLogin: () => set(() => ({})),
//   setLogout: () => set(() => ({})),
// }));

// type State = {
//   productName: number;
//   type: string;
//   title: string;
//   content: string;
//   reviewImg: string;
// };

// type Action = {
//   setTitle: (title: State['title']) => void;
//   setContent: (content: State['content']) => void;
// };

// export const useLogind = create<State & Action>((set) => ({
//   authorization: initialToken
//   refresh: '',
//   title: '',
//   content: '',
//   reviewImg: '',
//   setTitle: (input) => set(() => ({ title: input })),
//   setContent: (input) => set(() => ({ content: input })),
// }));

export const hi = () => {
  return <div>hi</div>;
};
