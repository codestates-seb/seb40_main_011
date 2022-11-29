import axios from 'axios';
import { Password } from '../components/Modal/EditPassword';
import { blob } from 'stream/consumers';
import { EditSncakReview } from '../components/Modal/SnackReviewModal';
import {
  LoginInputs,
  SignupInputs,
  QuestionContent,
  AnswerContent,
} from '../types/mainPageTypes';

let initialToken: any = localStorage.getItem('authorization');

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

// export const postProduct = async (data: any) =>
//   await axios
//     .post('/api/product', data)
//     .then((data) => data)
//     .catch((err) => err.response);

export const getReviewDetail = async (params: string | undefined) =>
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

export const delAccount = async (data: any) => {
  try {
    const optOut = await axios.patch('/api/withdraw', data, {
      headers: { Authorization: initialToken },
    });
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
        Authorization: initialToken,
      },
    });
    return searchResponse;
  } catch (err: any) {
    if (err.response.status === 412) {
      console.log('reissue 진행중...');
      reissueToken(initialToken, req);
    } else return console.error(err.response);
  }
};

const reissueToken = async (expired: any, req: any) => {
  const data = '';
  try {
    const resReissue = await axios.post('/api/refresh', data, {
      headers: {
        'Content-Type': 'application/json',
        Expired: expired,
        Refresh: localStorage.getItem('refresh'),
      },
    });

    initialToken = resReissue.headers.authorization;

    const originalResponse = await axios.post('/api/snack-reviews', req, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: initialToken,
      },
    });
    console.log(originalResponse);
    return originalResponse;
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

export const editSnack = async (snackId: number, data: EditSncakReview) => {
  try {
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
    console.log(response);
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
    console.log(response);
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
    console.log(response);
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
    console.log(response);
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
    console.log(response);
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
        Authorization: initialToken,
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
      headers: { Authorization: initialToken },
    });
    return submitImg;
  } catch (err: any) {
    return err.response;
  }
};
479;

export const editPassword = async (data: Password) => {
  try {
    const submitImg = await axios.patch('/api/user/password', data, {
      headers: { Authorization: initialToken },
    });
    return submitImg;
  } catch (err: any) {
    return err.response;
  }
};

export const getUserReview = async (url: string, params: string) => {
  try {
    const getReview = await axios.get(`/api/user/${url}${params}`, {
      headers: { Authorization: initialToken },
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
        Authorization: initialToken,
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

export const getProducts = async () => {
  try {
    const response = await axios.get(`/api/products/main-search`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (err: any) {
    return err.response;
  }
};
