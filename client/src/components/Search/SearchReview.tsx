import { useEffect, useState } from 'react';
import { getSearchResult } from '../../util/apiCollection';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const SearchReview = ({ keyword }: any) => {
  const [review, setReview] = useState();

  useEffect(() => {
    const getReviewData = async () => {
      const { data } = await getSearchResult();
      setReview(data);
    };
    getReviewData();
  }, []);

  const onContentClick = () => {
    return console.log('content');
  };

  const onLikeClick = () => {
    return console.log('hi');
  };

  const onMoreClick = () => {
    return console.log('bye');
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="mt-16 mb-4 mx-16 justify-start w-2/3 text-xl font-bold">
          # {keyword} 에 대한 리뷰 검색 결과
        </div>
        <div className="w-2/3 mb-8 mx-16 rounded-lg border border-slate-900 flex items-center">
          <div className="w-1/3 border-r border-black">
            <img
              className="rounded-l-lg flex"
              src="https://img2.quasarzone.com/editor/2022/11/11/75f9d1f0e49980190d3967e19b0458e5.jpg"
            ></img>
          </div>
          <div className="flex flex-col p-3 w-full">
            <div className="text-xl font-bold p-2">Review Title</div>
            <div
              className="ease-in-out duration-150 line-clamp-2 hover:bg-slate-300 hover:rounded-md p-1.5 text-slate-600 hover:text-cyan-900"
              role="button"
              onClick={onContentClick}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing Lorem
              Ipsum passages, and more recently with desktop
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex w-1/8">
                <button onClick={onLikeClick}>
                  <AiOutlineHeart size="30" className="p-1" />
                </button>
                <div className="p-1">123</div>
              </div>
              <div>Author</div>
            </div>
          </div>
        </div>
        <button onClick={onMoreClick}>더보기</button>
      </div>
    </>
  );
};
export default SearchReview;
