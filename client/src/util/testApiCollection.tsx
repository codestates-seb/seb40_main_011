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

export { getReviewTest, getProductTest, getReviewDetailTest };
