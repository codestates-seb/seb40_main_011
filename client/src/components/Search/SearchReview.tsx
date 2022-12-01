import { useEffect, useState } from 'react';
import { getSearchReview } from '../../util/apiCollection';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { ReviewLists } from '../../types/mainPageTypes';
import { useNavigate } from 'react-router-dom';

const SearchReview = ({ keyword }: any) => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState<ReviewLists[]>([]);
  const [hasNext, setHasNext] = useState(false);
  const [limit, setLimit] = useState(3);

  const onlyText = (data: string) => {
    return data
      .replace(/(\[.*\])(\((http)(?:s)?(:\/\/).*\))/g, ' ')
      .replace(/[^ㄱ-ㅎ가-힣a-zA-Z0-9]/g, ' ');
  };

  useEffect(() => {
    const getSearchData = async () => {
      const { data } = await getSearchReview(keyword, limit);
      setSearchData(data.reviewLists);
      setHasNext(data.hasNext);
    };
    getSearchData();
  }, [keyword, limit]);

  const onContentClick = (e: React.MouseEvent) => {
    navigate(`/review/${e.currentTarget.id}`);
  };

  const MoreBtn = () => {
    const onMoreClick = () => {
      setLimit(limit + 3);
    };
    if (hasNext) {
      return (
        <button
          className="ease-in-out duration-150 font-medium text-white pb-0.5 px-5 h-10 rounded-full bg-blue-500 hover:bg-blue-400"
          onClick={onMoreClick}
        >
          더보기
        </button>
      );
    }
    return null;
  };

  const SearchResultView = () => {
    return (
      <>
        {searchData?.map((el, idx) => (
          <div key={idx} className="flex mb-3 w-full items-center">
            {el.thumbnail !== undefined && el.thumbnail.length !== 0 ? (
              <div className="flex w-1/3 h-full border-r-2 items-center pr-2">
                <img
                  role="button"
                  onClick={onContentClick}
                  className="w-full object-contain mr-3 rounded-lg"
                  src={`https://codetech.nworld.dev${el.thumbnail}`}
                  id={el.id}
                ></img>
              </div>
            ) : null}
            <div className="pl-2 flex flex-col text-left w-full justify-center">
              <div className="pb-2 text-3xl">{el.title}</div>
              <div
                className="pb-1 text-xl ease-in-out duration-150 line-clamp-3 hover:bg-slate-300 hover:rounded-md p-1.5 text-slate-600 hover:text-cyan-900"
                role="button"
                onClick={onContentClick}
                id={el.id}
              >
                {onlyText(el.content)}
              </div>
              <div className="flex flex-row justify-between items-center w-full ">
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

  const NoResult = () => {
    if (searchData.length < 1) {
      return (
        <div className="flex w-full justify-center">
          <img
            className="object-fit"
            src={require('../../images/noSearchResult.png')}
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center justify-center w-[64rem]">
      <div className="mt-16 mb-4 justify-start w-full text-xl font-bold">
        # {keyword} 에 대한 리뷰 검색 결과
      </div>
      <NoResult />
      <SearchResultView />
      <MoreBtn />
    </div>
  );
};
export default SearchReview;
