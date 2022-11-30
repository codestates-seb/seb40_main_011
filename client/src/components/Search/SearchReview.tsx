import { useEffect, useState } from 'react';
import { getSearchReview } from '../../util/apiCollection';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { ReviewLists } from '../../types/mainPageTypes';
import { useNavigate } from 'react-router-dom';

const SearchReview = ({ keyword }: any) => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState<ReviewLists[]>([]);

  const onlyText = (data: string) => {
    return data.replace(/[^ㄱ-ㅎ가-힣a-zA-Z]/g, ' ');
  };

  useEffect(() => {
    const getSearchData = async () => {
      const { data } = await getSearchReview(keyword);
      setSearchData(data.reviewLists);
    };
    getSearchData();
  }, []);

  console.log(searchData);

  const onContentClick = () => {
    // navigate("/")
  };

  const onLikeClick = () => {
    return console.log('hi');
  };

  const onMoreClick = () => {
    return console.log('bye');
  };

  const SearchResultView = () => {
    return (
      <>
        {searchData?.map((el, idx) => (
          <div
            key={idx}
            className="flex flex-wrap flex-row w-2/3 mb-8 mx-16 rounded-lg border border-slate-900  items-center"
          >
            <div className="h-48 w-1/4 border-r-2">
              <img
                role="button"
                onClick={onContentClick}
                className="rounded-l-lg h-full w-full"
                src="https://img2.quasarzone.com/editor/2022/11/11/75f9d1f0e49980190d3967e19b0458e5.jpg"
              ></img>
            </div>
            <div className="flex flex-col p-3 w-3/4">
              <div className="text-xl font-bold p-2">{el.title}</div>
              <div
                className="ease-in-out duration-150 line-clamp-2 hover:bg-slate-300 hover:rounded-md p-1.5 text-slate-600 hover:text-cyan-900"
                role="button"
                onClick={onContentClick}
              >
                {onlyText(el.content)}
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="flex w-1/8">
                  <AiOutlineHeart size="30" className="p-1 text-slate-500" />
                  <div className="p-1 text-slate-500">{el.recommendNumber}</div>
                </div>
                <div className="flex items-end">
                  <div className="p-2">{el.writer}</div>
                  <img
                    className="rounded-full w-10 h-10 m-2"
                    src={`https://codetech.nworld.dev${el.userImage}`}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mt-16 mb-4 mx-16 justify-start w-2/3 text-xl font-bold">
        # {keyword} 에 대한 리뷰 검색 결과
      </div>
      <SearchResultView />
      <button onClick={onMoreClick}>더보기</button>
    </div>
  );
};
export default SearchReview;
