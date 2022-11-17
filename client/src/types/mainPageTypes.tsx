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
}
