import { instance } from './axiosInstance';

const getReview = async () =>
  await instance
    .get('/review')
    .then((data) => data)
    .catch((err) => err.response);

const getProduct = async () =>
  await instance
    .get('/product')
    .then((data) => data)
    .catch((err) => err.response);

export { getReview, getProduct };
