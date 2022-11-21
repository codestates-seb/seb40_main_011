import { InstanceV1 } from './axiosInstance';
import { LoginInputs } from '../types/mainPageTypes';

const getReview = async () =>
  await InstanceV1.get('/api/review')
    .then((data) => data)
    .catch((err) => err.response);

const getProduct = async () =>
  await InstanceV1.get('/api/product')
    .then((data) => data)
    .catch((err) => err.response);

const postProduct = async (data: any) =>
  await InstanceV1.post('/api/product', data)
    .then((data) => data)
    .catch((err) => err.response);

const getUserProfile = async () =>
  await InstanceV1.get('/api/user')
    .then((data) => data)
    .catch((err) => err.response);

const getReviewDetail = async (params: string | undefined) =>
  await InstanceV1.get(`/api/review/${params}`)
    .then((data) => data)
    .catch((err) => err.response);

const postLogin = async (data: LoginInputs) =>
  await InstanceV1.post('/api/login', data)
    .then((data) => data)
    .catch((err) => err.response);

export {
  getReview,
  getProduct,
  getUserProfile,
  postLogin,
  getReviewDetail,
  postProduct,
};
