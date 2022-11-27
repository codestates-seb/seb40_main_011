import exp from 'constants';
import { Dispatch, SetStateAction } from 'react';
import { createDeflate } from 'zlib';

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
  avgScore: number;
  createdAt: string;
  filePath: string;
  id: number;
  name: string;
  reviewCount: number;
  snackCount: number;
  type: string;
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
  setCurrentPage: Dispatch<SetStateAction<number>>;
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

export interface XsRoundedButtonProps {
  name: string;
}

export interface BodyTopProps {
  nickname: string;
  createdAt: number;
}

export interface PendingQuestionProps {
  createdAt: number;
  nickname: string;
  content: string;
  answerCards: null | any;
}

export interface QuestionListsProps {
  id: number;
  createdAt: number;
  nickname: string;
  content: string;
  answerCards: null | PendingAnswerProps;
}

export interface QuestionListType {
  adoptedId: number;
  content: string;
  createdAt: string;
  deleted: boolean;
  id: number;
  image: string;
  modifiedAt: string;
  nickname: string;
  writerId: number;
}

export interface PendingAnswerProps {
  createdAt: number;
  nickname: string;
  content: string;
}

export interface AnswerCardsProps {
  id: string;
  createdAt: number;
  nickname: string;
  content: string;
}

export interface AnswerMoreProps {
  count: number;
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
  writerId: number;
}
export interface SnackReviewScore {
  [index: string]: number;
  costEfficiency: number;
  quality: number;
  satisfaction: number;
  design: number;
  performance: number;
}

export interface SnackReviewAvg {
  total: number;
  avgCe: number;
  avgQlt: number;
  avgStf: number;
  avgDsn: number;
  avgPerf: number;
}

export interface SelectBoxProps {
  spread: boolean;
  setSpread: Dispatch<SetStateAction<boolean>>;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}
