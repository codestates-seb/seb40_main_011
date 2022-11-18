import { InstanceV1 } from './axiosInstance';

const getReview = async () =>
  await InstanceV1.get('/review')
    .then((data) => data)
    .catch((err) => err.response);

const getProduct = async () =>
  await InstanceV1.get('/product')
    .then((data) => data)
    .catch((err) => err.response);

const getReviewDetail = async (params: string | undefined) =>
  await InstanceV1.get(`/review/${params}`)
    .then((data) => data)
    .catch((err) => err.response);

export { getReview, getProduct, getReviewDetail };
