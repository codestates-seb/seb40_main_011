import axios from 'axios';
import {
  LoginInputs,
  SignupInputs,
  QuestionContent,
} from '../types/mainPageTypes';

const initialToken = localStorage.getItem('authorization');

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
        Authorization: localStorage.getItem('authorization'),
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
    const editUserInfo = await axios.patch('/api/user/withdraw');
    return editUserInfo;
  } catch (err: any) {
    return err.response;
  }
};

export const postSnack = async (req: any) => {
  try {
    const searchResponse = await axios.post('/api/snack-reviews', req, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('authorization'),
      },
    });
    return searchResponse;
  } catch (err: any) {
    return err.response;
  }
};

export const getSnack = async (productId: any, limit: number) => {
  try {
    const response = await axios.get(
      `/api/snack-reviews?productId=${productId}&offset=0&limit=${limit}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response;
  } catch (err: any) {
    return err.response;
  }
};

export const getSnackStats = async (productId: number) => {
  try {
    const response = await axios.get(
      `/api/snack-reviews/stats?productId=${productId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response;
  } catch (err: any) {
    return err.response;
  }
};

export const deleteSnack = async (snackId: number) => {
  try {
    const response = await axios.delete(`/api/snack-reviews/${snackId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('authorization'),
      },
    });
    return response;
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

export const editProfileImg = async (data: any) => {
  try {
    const submitImg = await axios.patch(
      '/api/user/image',
      { headers: { Authorization: initialToken } },
      data
    );
    return submitImg;
  } catch (err: any) {
    return err.response;
  }
};

export const editProfile = async (data: any) => {
  try {
    const submitImg = await axios.patch('/api/user', {
      headers: { Authorization: initialToken },
      data,
    });
    return submitImg;
  } catch (err: any) {
    return err.response;
  }
};
