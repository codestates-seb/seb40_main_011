//리뷰 작성 페이지
//안지은 작성

import TextEditor from '../components/ToastUI/TextEditor';
import '../components/common.css';
import AddPost from '../components/Buttons/AddPost';
import CategorieSelector from '../components/Selectors/CategorieSelector';
import ProductSelector from '../components/Selectors/ProductSelector';

const WriteReview = () => {
  return (
    <div className="flex border border-zinc-500">
      <div className="w-1/2 h-screen m-auto mt-8 border border-orange-600">
        <div className="flex justify-between mb-3">
          <div className="inline-flex w-1/2 border border-blue-700">
            <CategorieSelector />
            <ProductSelector />
          </div>
          <button className="so-button-nomal">제품 추가하기</button>
        </div>
        <form>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            className="mb-5 signup-input"
          />
          <div>
            <TextEditor />
          </div>
          <div className="flex justify-center mt-3">
            <AddPost>작성 완료</AddPost>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteReview;
