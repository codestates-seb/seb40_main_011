import axios from 'axios';
import { Password } from '../components/Modal/EditPassword';
import {
  LoginInputs,
  SignupInputs,
  QuestionContent,
  AnswerContent,
} from '../types/mainPageTypes';

export const postSnack = async (req: any) => {
  const reqUrl = '/api/snack-reviews';
  try {
    const searchResponse = await axios.post(reqUrl, req, {
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

export const getReviewDetail = async (params: number | undefined) =>
  await axios
    .get(`/api/reviews/${params}`)
    .then((data) => data)
    .catch((err) => err.response);

export const getBestReview = async (size: number) => {
  try {
    const response = await axios.get(`/api/reviews/best?size=${size}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (err: any) {
    return err.response;
  }
};

export const postLogin = async (data: LoginInputs) => {
  try {
    const loginResponse = await axios.post('/api/login', data);
    return loginResponse;
  } catch (err: any) {
    return err.response;
  }
};

export const postLike = async (reviewId: number) => {
  try {
    const likeResponse = await axios.post(
      '/api/recommend',
      {
        reviewId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('authorization'),
        },
      }
    );
    return likeResponse;
  } catch (err: any) {
    return err.response;
  }
};

export const postRefresh = async () => {
  try {
    const response = await axios.post('/api/refresh', '', {
      headers: {
        Expired: localStorage.getItem('authorization'),
        Refresh: localStorage.getItem('refresh'),
      },
    });
    return response;
  } catch (err: any) {
    return err.response;
  }
};

export const getProductDetail = async (productId: number) => {
  try {
    const searchResponse = await axios.get(`/api/products/${productId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return searchResponse;
  } catch (err: any) {
    return err.response;
  }
};

export const getSearchReview = async (keyword: string, limit: number) => {
  try {
    const searchResponse = await axios.get(
      `/api/reviews/search?keyword=${keyword}&offset=0&limit=${limit}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return searchResponse;
  } catch (err: any) {
    return err.response;
  }
};
export const getSearchProduct = async (keyword: string) => {
  try {
    const searchResponse = await axios.get(
      `/api/products/search?keyword=${keyword}&offset=0&limit=3`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
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

export const postEmail = async (data: any) => {
  try {
    const emailSubmit = await axios.post('/api/mail', data);
    return emailSubmit;
  } catch (err: any) {
    return err.response;
  }
};

export const postEmailCertificationCheck = async (data: any) => {
  try {
    const emailCheckRes = await axios.post('/api/mail/check', data);
    return emailCheckRes;
  } catch (err: any) {
    return err.response;
  }
};

export const getUserProfile = async () => {
  try {
    const getUserData = await axios.get('/api/user', {
      headers: {
        Authorization: localStorage.getItem('authorization'),
      },
    });
    return getUserData;
  } catch (err: any) {
    return err.response;
  }
};

export const delAccount = async (data: any) => {
  try {
    const optOut = await axios.patch('/api/withdraw', data, {
      headers: {
        Authorization: localStorage.getItem('authorization'),
      },
    });
    return optOut;
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

export const getGoodSnack = async (productId: any, limit: number) => {
  try {
    const response = await axios.get(
      `/api/snack-reviews?productId=${productId}&offset=0&limit=${limit}&sortByGrade=true&asc=false`,
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

export const getBadSnack = async (productId: any, limit: number) => {
  try {
    const response = await axios.get(
      `/api/snack-reviews?productId=${productId}&offset=0&limit=${limit}&sortByGrade=true&asc=true`,
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
    const response = await axios.get(`/api/product-stats/${productId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (err: any) {
    return err.response;
  }
};

export const editSnack = async (snackId: number, data: any) => {
  try {
    // console.log(data);
    const response = await axios.patch(`/api/snack-reviews/${snackId}`, data, {
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
    // console.log(response);
    return response;
  } catch (err: any) {
    return err.response;
  }
};

export const patchQuestion = async (questionId: number, content: string) => {
  try {
    const response = await axios.patch(
      `/api/questions/${questionId}`,
      { content },
      {
        headers: { Authorization: localStorage.getItem('authorization') },
      }
    );
    // console.log(response);
    return response;
  } catch (err: any) {
    return err.response;
  }
};

export const patchAnswer = async (answerId: string, content: string) => {
  try {
    const response = await axios.patch(
      `/api/answers/${answerId}`,
      { content },
      {
        headers: { Authorization: localStorage.getItem('authorization') },
      }
    );
    // console.log(response);
    return response;
  } catch (err: any) {
    return err.response;
  }
};

export const postAnswer = async (data: AnswerContent) => {
  try {
    const response = await axios.post('/api/answers', data, {
      headers: { Authorization: localStorage.getItem('authorization') },
    });
    // console.log(response);
    return response;
  } catch (err: any) {
    return err.response;
  }
};

export const postAdopt = async (data: {
  answerId: string;
  questionId: number;
}) => {
  const { questionId, answerId } = data;
  try {
    const response = await axios.post(
      `/api/questions/${questionId}/adopt`,
      { answerId },
      {
        headers: { Authorization: localStorage.getItem('authorization') },
      }
    );
    // console.log(response);
    return response;
  } catch (err: any) {
    return err.response;
  }
};

export const deleteQuestion = async (questionId: number | undefined) => {
  try {
    const response = await axios.delete(`/api/questions/${questionId}`, {
      headers: { Authorization: localStorage.getItem('authorization') },
    });
    // console.log(response);
    return response;
  } catch (err: any) {
    return err.response;
  }
};

export const deleteAnswer = async (answerId: string | undefined) => {
  try {
    const response = await axios.delete(`/api/answers/${answerId}`, {
      headers: { Authorization: localStorage.getItem('authorization') },
    });
    // console.log(response);
    return response;
  } catch (err: any) {
    return err.response;
  }
};

export const fetchQuestionData = async (
  size: number,
  asc: boolean,
  adoption: boolean
) => {
  try {
    const response = await axios.get(
      `/api/questions?size=${size}&adoption=${adoption}&asc=${asc}`
    );
    return response;
  } catch (err: any) {
    return err.reponse;
  }
};

export const editProfileImg = async (data: any) => {
  try {
    const submitImg = await axios.patch('/api/user/image', data, {
      headers: {
        Authorization: localStorage.getItem('authorization'),
        // 'Content-type': 'application/json',
        // 'Content-type': 'multipart/form-data',
      },
    });

    return submitImg;
  } catch (err: any) {
    return err.response;
  }
};

export const editNickname = async (data: any) => {
  try {
    const submitImg = await axios.patch('/api/user/nickname', data, {
      headers: { Authorization: localStorage.getItem('authorization') },
    });
    return submitImg;
  } catch (err: any) {
    return err.response;
  }
};
479;

export const editPassword = async (data: Password) => {
  try {
    const editNewPassword = await axios.patch('/api/user/password', data, {
      headers: { Authorization: localStorage.getItem('authorization') },
    });
    return editNewPassword;
  } catch (err: any) {
    return err.response;
  }
};

export const getUserReview = async (url: string, params: string) => {
  try {
    const getReview = await axios.get(`/api/user/${url}${params}`, {
      headers: { Authorization: localStorage.getItem('authorization') },
    });
    return getReview;
  } catch (err: any) {
    return err.response;
  }
};

export const selectProductImg = async (data: any) => {
  try {
    const submitImg = await axios.post('/api/products', data, {
      headers: {
        Authorization: localStorage.getItem('authorization'),
      },
    });
    return submitImg;
  } catch (err: any) {
    return err.response;
  }
};

export const uploadEditorImage = async (data: any) => {
  try {
    const editorImg = await axios.post('/api/upload', data);
    return editorImg;
  } catch (err: any) {
    return err.response;
  }
};

export const postEditorContent = async (data: any) => {
  try {
    const editorContent = await axios.post('/api/reviews', data, {
      headers: {
        Authorization: localStorage.getItem('authorization'),
      },
    });
    return editorContent;
  } catch (err: any) {
    return err.response;
  }
};

export const editReview = async (data: any) => {
  try {
    const editorContent = await axios.patch('/api/reviews', data, {
      headers: {
        Authorization: localStorage.getItem('authorization'),
      },
    });
    return editorContent;
  } catch (err: any) {
    return err.response;
  }
};
export const deleteReview = async (reviewId: number) => {
  try {
    const response = await axios.delete(`/api/reviews/${reviewId}`, {
      headers: {
        Authorization: localStorage.getItem('authorization'),
      },
    });
    return response;
  } catch (err: any) {
    return err.response;
  }
};

export const getProducts = async () => {
  try {
    const response = await axios.get(`/api/products/main-search`);
    return response;
  } catch (err: any) {
    return err.response;
  }
};

export const selectThumnailImg = async (data: any) => {
  try {
    const thumbnailImg = await axios.post('/api/thumbnail', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return thumbnailImg;
  } catch (err: any) {
    return err.response;
  }
};

export const postComment = async (req: any) => {
  try {
    const response = await axios.post('/api/review-comm', req, {
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

export const editComment = async (req: any) => {
  try {
    const response = await axios.patch('/api/review-comm', req, {
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

export const deleteComment = async (id: number) => {
  try {
    const searchResponse = await axios.delete(`/api/review-comm/${id}`, {
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

export const getDetailList = async (id: number, opt: string, limit: number) => {
  try {
    const getList = await axios.get(
      `api/reviews/product?id=${id}&sort=${opt}&offset=0&limit=${limit}`
    );
    return getList;
  } catch (err: any) {
    return err.response;
  }
};

export const patchAdoption = async (id: number | undefined) => {
  try {
    const response = await axios.patch(`/api/questions/${id}/adopt`, '', {
      headers: { Authorization: localStorage.getItem('authorization') },
    });
    // console.log(response);
    return response;
  } catch (err: any) {
    return err.response;
  }
};
