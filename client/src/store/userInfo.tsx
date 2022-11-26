import create from 'zustand';

export interface UserInfo {
  email: string | undefined;
  nickname: string | undefined;
  image: string | undefined;
  point: number | undefined;
}

const userInfo = create<UserInfo>((set) => ({
  email: '',
  nickname: '',
  image: '',
  point: 0,
}));

export default userInfo;
