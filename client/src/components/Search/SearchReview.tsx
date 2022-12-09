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
          className="w-full flex items-center justify-center mx-4 text-lg font-medium tracking-tight rounded-xl h-14 bg-zinc-200/40 text-zinc-400 hover:text-zinc-500 dark:bg-DMThrColor dark:text-white/40 hover:bg-zinc-300/50 dark:hover:text-white dark:hover:bg-DMMainTextColor"
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
          <button
            onClick={onContentClick}
            key={idx}
            className="flex w-full items-center m-4 rounded-3xl p-4 bg-white dark:bg-DMSubColor ease-in-out duration-150 hover:bg-slate-300 dark:hover:bg-DMThrColor"
          >
            <div className="h-48 w-1/4">
              <img
                className="rounded-lg h-full w-full"
                src={`https://codetech.nworld.dev${el.thumbnail}`}
                id={el.id}
              ></img>
            </div>
            <div className="flex flex-col p-3 w-3/4">
              <div className="text-xl font-bold p-2 dark:text-white">
                {el.title}
              </div>
              <div
                className="dark:text-white/70 pb-1 text-md line-clamp-3 p-1.5 text-slate-600 hover:text-cyan-900 "
                id={el.id}
              >
                {onlyText(el.content)}
              </div>
              <div className="flex flex-row justify-between items-center w-full">
                <div className="flex w-1/8 items-center">
                  <AiOutlineHeart size="30" className="p-1 text-slate-500" />
                  <div className="py-1.5  text-slate-500">
                    {el.recommendNumber}
                  </div>
                </div>
                <div className="flex items-end">
                  <div className="p-2 dark:text-white/70">{el.writer}</div>
                  <img
                    className="rounded-full w-10 h-10 m-2"
                    src={`https://codetech.nworld.dev${el.userImage}`}
                  />
                </div>
              </div>
            </div>
          </button>
        ))}
      </>
    );
  };

  const NoResult = () => {
    if (searchData.length < 1) {
      return (
        <div className="flex w-full justify-center my-36">
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
    <div className="flex flex-col items-center justify-center w-full lg:w-[64rem] mx-auto">
      <div className="mt-16 mb-4 justify-start w-full text-xl font-bold dark:text-white">
        # {keyword} 에 대한 리뷰 검색 결과
      </div>
      <NoResult />
      <SearchResultView />
      <MoreBtn />
    </div>
  );
};
export default SearchReview;
