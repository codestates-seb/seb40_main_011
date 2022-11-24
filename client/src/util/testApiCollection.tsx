import { AxiosError } from 'axios';
import { Review } from '../types/mainPageTypes';
import { InstanceV1, testInstance } from './axiosInstance';

export const sampleTest = async (dataAmount: any) => {
  try {
    const reviewRes: any = await InstanceV1({
      url: '/api/products',
      method: 'get',
      data: { dataAmount },
    });
    return reviewRes.data;
  } catch (error: any) {
    return error.response;
  }
};

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
