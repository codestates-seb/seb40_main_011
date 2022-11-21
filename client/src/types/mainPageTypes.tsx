import { Dispatch, SetStateAction } from 'react';
export interface Login {
  email: string;
  password: string;
}
export interface Product {
  id: number;
  name: string;
  type: string;
  image: string;
  detail: string;
  createdAt: string;
  modifiedAt: string;
}
export interface Review {
  id: number;
  nickname: string;
  productName: number;
  type: string;
  title: string;
  content: string;
  view: number;
  thumbnail: string;
  reviewImg: string;
  createdAt: string;
  modifedAt: string;
  likes: number;
  profileImg: string;
  comments?: ReviewComments[] | undefined;
}
export interface ReviewComments {
  id: number;
  nickname: string;
  createdAt: string;
  profileImg: string;
  comment: string;
}

export interface CommentProps {
  comments: ReviewComments[] | undefined;
}

export interface CategoryProps {
  setCategory: Dispatch<SetStateAction<string>>;
}
