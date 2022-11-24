//안지은 작성

import { useState, useEffect } from 'react';
import axios from 'axios';
import useCategorie from '../store/categorie';

const useAxios = () => {
  const [data, setData] = useState([]);
  const { clickName, setClickName } = useCategorie();

  const encoded = encodeURI(clickName);
  //대문자로 변환
  const UpperText = encoded.toUpperCase();

  //카테고리 셀렉터의 clickname 값을 받아와서 그 값을 api 요청할 때 url 로 넣어서 보내기
  useEffect(() => {
    axios
      .get(`http://codetech.nworld.dev/api/products/review-search`, {
        params: { type: UpperText },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(function (error) {
        if (error.response) {
          // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // 요청이 이루어 졌으나 응답을 받지 못했습니다.
          // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
          // Node.js의 http.ClientRequest 인스턴스입니다.
          console.log(error.request);
        } else {
          // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  });
};

export default useAxios;
