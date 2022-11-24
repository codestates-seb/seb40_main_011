// import { initialToken } from '../store/login';
import axios from 'axios';
// import { useIsLogin } from '../store/login';
// const { initialToken } = useIsLogin();

import {
  LoginInputs,
  SignupInputs,
  QuestionContent,
} from '../types/mainPageTypes';

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

export const getUserProfile = async () =>
  await axios
    .get('/api/user')
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

export const postSignup = async (data: SignupInputs) => {
  try {
    const signupResponse = await axios.post('/api/register', data);
    return signupResponse;
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
