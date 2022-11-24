//리뷰 작성 페이지
//안지은 작성

import React, { ChangeEvent, useCallback, useState } from 'react';
import '../components/common.css';
// import AddPost from '../components/Buttons/AddPost';
// import CategorieSelector from '../components/Selectors/CategorieSelector';
import CategorieSelector from '../components/Selectors/CategorieSelector';
import ProductSelector from '../components/Selectors/ProductSelector';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextEditor from '../components/ToastUI/TextEditor';
import useReview from '../store/review';
import AddProduct from '../components/Modal/AddProduct';

const WriteReview = () => {
  const { productName, type, title, content, reviewImg, setTitle, setContent } =
    useReview();
  const [isModal, setIsModal] = useState(false);
  const navigate = useNavigate();
  const onSubmit = () => {
    axios({
      url: 'https://codetech.nworld.dev/api/reviews',
      method: 'post',
      data: {
        productName: productName,
        type: type,
        title: title,
        content: content,
        thumbnail: [reviewImg],
      },
    })
      .then(() => {
        navigate('/');
        setTitle('');
        setContent('');
      })
      .catch((err) => console.log(err));
  };

  const onChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const titleUpdate = e.target.value;
    setTitle(titleUpdate);
  }, []);

  const onClickModal = (e?: React.MouseEvent<HTMLElement>) => {
    setIsModal(!isModal);
  };

  return (
    <div className="flex border border-zinc-500">
      {isModal == false ? null : (
        // <AddProduct />
        <AddProduct isModal={isModal} setIsModal={setIsModal} />
      )}
      <div className="w-1/2 h-screen m-auto mt-8 border border-orange-600">
        <div className="flex justify-between mb-3">
          <div className="inline-flex w-1/2 border border-blue-700">
            <CategorieSelector />
            <ProductSelector />
          </div>
          {/* <Link to="/products"> */}
          <button className="so-button-nomal" onClick={onClickModal}>
            제품 추가하기
            {/* {isModal == false ? null : (
              <AddProduct isModal={isModal} setIsModal={setIsModal} />
            )} */}
          </button>
          {/* </Link> */}
        </div>
        <form
          name="reviewWrite"
          action="https://codetech.nworld.dev/api/reviews"
          method="POST"
          onSubmit={onSubmit}
        >
          <label>제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={onChangeTitle}
            placeholder="제목을 입력하세요"
            className="mb-5 signup-input"
          />
          <div>
            <TextEditor />
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteReview;
// const [title, updateTitle] = useStore((state) => [
//   state.title,
//   state.updateTitle,
// ]);
// const [content, updateContent] = useStore((state) => [
//   state.content,
//   state.updateContent,
// ]);
// const setTitle = useStore((state) => state.setTitle);

// const [title, setTitle] = useState('');
// const [content, setContent] = useState();

// const handleSubmit = useCallback(
//   async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       await axios
//         .post('http://localhost:3001/categories/review/write', {
//           title: title,
//           content: content,
//         })
//         .then((res) => {
//           console.log('보내졌냐!', res.data);
//         });
//     } catch (err) {
//       console.log('error', err);
//     }
//   },
//   []
// );

// const onChangeContent = useCallback((e: ChangeEvent<HTMLInputElement>) => {
//   const contentUpdate = e.target.value;
//   setTitle(contentUpdate);
// }, []);
