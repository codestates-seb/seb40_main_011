import { postRefresh } from './apiCollection';

// login status
export const loginRefresh = async () => {
  const loginResult = await postRefresh();
  console.log(loginResult);
  switch (loginResult.status) {
    case 200:
      localStorage.setItem(
        'authorization',
        loginResult.headers.get('authorization')
      );
  }
};
