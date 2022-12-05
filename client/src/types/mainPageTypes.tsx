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
  image: string;
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
  thumbnail: string;
}
export interface Review {
  content: string;
  createdAt: string;
  productDetail: string;
  productName: string;
  recommendNumber: number;
  reviewComments: ReviewComments[];
  title: string;
  type: string;
  userId: number;
  userImage?: string;
  view: number;
  writer: string;
  productId: number;
  thumbnail: string;
  recommends: number[];
}

export interface ReviewProps {
  review: Review;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}
export interface markdownProps {
  markdown: string | undefined;
}

export interface editReviewProps {
  isEditMode?: boolean;
}

export interface BestReview {
  content: string;
  createdAt: string;
  id: number;
  image?: string;
  recommendNumber: number;
  title: string;
  type: string;
  writer: string;
}

export interface SubComments {
  id: number;
  nickname: string;
  createdAt: string;
  profileImg: string;
  subComment: string;
}
export interface ReviewComments {
  child: [];
  content: string;
  createdAt: string;
  id: number;
  parent: any;
  userId: number;
  userImage: string;
  writer: string;
}

export interface SearchData {
  hasNext: boolean;
  reviewLists: ReviewLists[];
}

export interface ReviewLists {
  id: string | undefined;
  content: string;
  recommendNumber: number;
  title: string;
  userImage: string;
  writer: string;
  thumbnail: string;
}

export interface CommentProps {
  reviewComments: ReviewComments | undefined;
}

export interface CommentsProps {
  comments: ReviewComments[] | undefined;
}

export interface CategoryProps {
  setCategory: Dispatch<SetStateAction<string>>;
  category: string;
}

export interface SubCommentProps {
  setMoreComment: Dispatch<SetStateAction<boolean>>;
  child: ReviewComments;
  moreComment: boolean;
}

export interface EditModeProps {
  isEditMode: boolean;
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
  editedComment: string | undefined;
  id: number;
  setComment?: any;
  userId: number;
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
  editable?: boolean;
}

export interface PendingQuestionProps {
  createdAt: number;
  nickname: string;
  content: string;
  answerCards: null | any;
  writerId: number;
  id: number;
  image: string;
}

export interface QuestionListsProps {
  id: number;
  writerId: number;
  createdAt: number;
  nickname: string;
  content: string;
  answerCards: null | PendingAnswerProps;
  image: string;
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
  image: string;
}

export interface QuestionProps {
  adoptedId: number;
  createdAt: number;
  nickname: string;
  content: string;
  answerCards: null | any;
  writerId: number;
  image: string;
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
  image: string;
}

export interface AnswerProps {
  content: string;
  createdAt: number;
  id: number;
  image: string;
  nickname: string;
  writerId: number;
  adoptedId: number;
}

export interface AnswerCardsProps {
  id: string;
  createdAt: number;
  nickname: string;
  content: string;
  writerId: number;
  image: string;
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
  productId?: number;
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
  menu: string[];
}

export interface DetailReviewProps {
  productId: number;
}

export interface ProductDetail {
  createdAt: string;
  detail: string;
  fileEntities: string | null;
  id: number;
  modifiedAt: string;
  modifier: string;
  name: string;
  reviews: Review[] | null;
  snackReviews: SnackReviewCards[] | null;
  type: string;
  writer: string;
}

export interface searchBarProps {
  searchBar: boolean;
  setSearchBar: Dispatch<SetStateAction<boolean>>;
}
