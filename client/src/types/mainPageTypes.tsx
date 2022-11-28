import exp from 'constants';
import { Dispatch, SetStateAction } from 'react';
import { createDeflate } from 'zlib';

export interface QuestionContent {
  content: string;
}

export interface AnswerContent {
  questionId: number;
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
  writerId?: number;
  questionId?: number;
  answerId?: string;
  content?: string;
  questionContent?: string;
  adoptedId?: number;
}

export interface PendingQuestionProps {
  createdAt: number;
  nickname: string;
  content: string;
  answerCards: null | any;
  writerId: number;
  id: number;
}

export interface QuestionListsProps {
  id: number;
  writerId: number;
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

export interface QuestionMapProps {
  id: number;
  adoptedId: number;
  createdAt: number;
  nickname: string;
  content: string;
  answerCards: null | any;
  writerId: number;
}

export interface QuestionProps {
  adoptedId: number;
  createdAt: number;
  nickname: string;
  content: string;
  answerCards: null | any;
  writerId: number;
}

export interface PendingAnswerProps {
  createdAt: number;
  nickname: string;
  content: string;
  writerId: number;
  id: string;
  questionId: number;
  questionWriterId: number;
  questionContent: string;
}

export interface AnswerProps {
  createdAt: number;
  nickname: string;
  content: string;
  writerId: number;
  id: number;
  adoptedId: number;
}

export interface AnswerCardsProps {
  id: string;
  createdAt: number;
  nickname: string;
  content: string;
  writerId: number;
}

export interface AnswerMoreProps {
  count: number;
}

export interface WriteAnswerProps {
  setShowModal(state: boolean): void;
  content: string;
  answerId?: string;
  questionId?: number;
  questionContent?: string;
}

export interface setShowModalProps {
  setShowModal(state: boolean): void;
  msg: string;
}

export interface EditQuestionProps {
  setShowModal(state: boolean): void;
  content: string;
  questionId?: number;
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
