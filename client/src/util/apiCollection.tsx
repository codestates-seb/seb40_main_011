import axios from 'axios';
import {
  LoginInputs,
  SignupInputs,
  QuestionContent,
} from '../types/mainPageTypes';
import { OptOutInputs } from '../components/Modal/OptOut';
import { Token } from '../components/MyPage/Profile';

export const getReview = async () =>
  await axios
    .get('/api/review')
    .then((data) => data)
    .catch((err) => err.response);

export const getProduct = async () =>
  await axios
    .get('/api/product')
    .then((data) => data)
    .catch((err) => err.response);

export const postProduct = async (data: any) =>
  await axios
    .post('/api/product', data)
    .then((data) => data)
    .catch((err) => err.response);

export const getReviewDetail = async (params: string | undefined) =>
  await axios
    .get(`/api/review/${params}`)
    .then((data) => data)
    .catch((err) => err.response);

export const postLogin = async (data: LoginInputs) => {
  try {
    const loginResponse = await axios.post('/api/login', data);
    return loginResponse;
  } catch (err: any) {
    return err.response;
  }
};

export const getSearchResult = async () => {
  try {
    const searchResponse = await axios.get('/api/products/1');
    return searchResponse;
  } catch (err: any) {
    return err.response;
  }
};

export const postSignup = async (data: SignupInputs) => {
  try {
    const signupResponse = await axios.post('/api/register', data);
    return signupResponse;
  } catch (err: any) {
    return err.response;
  }
};
export const getUserProfile = async () => {
  try {
    const optOut = await axios.get('/api/user', {
      headers: {
        Authorization: initialToken,
      },
    });
    return optOut;
  } catch (err: any) {
    return err.response;
  }
};

export const delAccount = async () => {
  try {
    const optOut = await axios.patch('/api/withdraw');
    return optOut;
  } catch (err: any) {
    return err.response;
  }
};

export const editAccount = async () => {
  try {
    const editUserInfo = await axios.patch('/api/user');
    return editUserInfo;
  } catch (err: any) {
    return err.response;
  }
};

export const postQuestion = async (data: QuestionContent) => {
  try {
    const response = await axios.post('/api/questions', data, {
      headers: { Authorization: localStorage.getItem('authorization') },
    });
    return response;
  } catch (err: any) {
    return err.response;
  }
};
