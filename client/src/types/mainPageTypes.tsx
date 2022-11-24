import { Dispatch, SetStateAction } from 'react';

export interface QuestionContent {
  content: string;
}

export interface LoginInputs {
  email: string;
  password: string;
}

export interface SignupInputs {
  email: string;
  password: string;
  nickname: string;
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
  comments: ReviewComments[];
}

export interface SubComments {
  id: number;
  nickname: string;
  createdAt: string;
  profileImg: string;
  subComment: string;
}
export interface ReviewComments {
  id: number;
  nickname: string;
  createdAt: string;
  profileImg: string;
  comment: string;
  subComments: SubComments[];
}

export interface CommentProps {
  comments: ReviewComments[] | undefined;
}

export interface CategoryProps {
  setCategory: Dispatch<SetStateAction<string>>;
}

export interface SubCommentProps {
  setMoreComment: Dispatch<SetStateAction<boolean>>;
  subComments: SubComments[];
  moreComment: boolean;
  isEditSub: boolean;
  setIsEditSub: Dispatch<SetStateAction<boolean>>;
}

export interface EditModeProps {
  isEditMode: boolean;
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
  editedComment: string | undefined;
}

export interface SnackReviewProps {
  snackReviewData: SnackReviews | undefined;
}

export interface RatingCategory {
  ratingCategory: string[];
}
export interface SnackReviews {
  hasNext: boolean;
  cards: SnackReviewCards[];
}
export interface SnackReviewCards {
  content: string;
  createdAt: string;
  id: number;
  image: string | undefined;
  nickname: string;
  score: SnackReviewScore;
}
export interface SnackReviewScore {
  costEfficiency: number;
  quality: number;
  satisfaction: number;
  design: number;
  performance: number;
  grade: number;
}

export interface SnackReviewAvg {
  total: number;
  avgCe: number;
  avgQlt: number;
  avgStf: number;
  avgDsn: number;
  avgPerf: number;
}
