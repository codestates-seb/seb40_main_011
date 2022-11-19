import { InstanceV1 } from './axiosInstance';
import { Login } from '../types/mainPageTypes';

const getReview = async () =>
  await InstanceV1.get('/review')
    .then((data) => data)
    .catch((err) => err.response);

const getProduct = async () =>
  await InstanceV1.get('/product')
    .then((data) => data)
    .catch((err) => err.response);

const getUserProfile = async () =>
  await InstanceV1.get('/user')
    .then((data) => data)
    .catch((err) => err.response);

const postLogin = async (data: Login) =>
  await InstanceV1.post('/review', data)
    .then((data) => data)
    .catch((err) => err.response);

export { getReview, getProduct, getUserProfile, postLogin };
