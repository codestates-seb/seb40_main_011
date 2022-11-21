import { Review } from '../types/mainPageTypes';
import { testInstance } from './axiosInstance';

const getReviewTest = async () =>
  await testInstance
    .get('/review')
    .then((data) => data)
    .catch((err) => err.response);

const getProductTest = async () =>
  await testInstance
    .get('/product')
    .then((data) => data)
    .catch((err) => err.response);

const getReviewDetailTest = async (params: string | undefined) =>
  await testInstance
    .get(`/review/${params}`)
    .then((data) => data)
    .catch((err) => err.response);

const getUserProfile = async () =>
  await testInstance
    .get('/user')
    .then((data) => data)
    .catch((err) => err.response);

export { getReviewTest, getProductTest, getReviewDetailTest, getUserProfile };
