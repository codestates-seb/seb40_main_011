import { useEffect, useState } from 'react';
import { getSearchReview } from '../../util/apiCollection';
import { AiOutlineHeart } from 'react-icons/ai';
import { ReviewLists } from '../../types/mainPageTypes';
import { useNavigate } from 'react-router-dom';

const SearchReview = ({ keyword }: { keyword: string }) => {
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
      <div className="w-full bg-white rounded-3xl px-5 md:px-12 pt-6 sm:pt-8 md:pt-10 md:pb-1 mb-8 dark:bg-DMSubColor">
        {searchData?.map((el, idx) => (
          <button
            onClick={onContentClick}
            key={idx}
            className="flex flex-col mb-4 md:flex-row md:mb-8"
          >
            <div className="w-full aspect-[16/9] md:h-48 md:w-2/5 lg:w-1/3 overflow-hidden rounded-2xl md:rounded-3xl flex-none flex items-center mr-6">
              <img
                className="w-full scale-105"
                src={`https://codetech.nworld.dev${el.thumbnail}`}
                id={el.id}
              />
            </div>
            <div className="flex flex-col justify-between w-full h-48 py-2 overflow-hidden text-left md:3/5 lg:w-2/3">
              <div>
                <div className="mb-2 text-xl font-bold tracking-tight line-clamp-1">
                  {el.title}
                </div>
                <div
                  className="pb-1 overflow-hidden tracking-tight text-black/60 line-clamp-3 dark:text-gray-400"
                  id={el.id}
                >
                  {onlyText(el.content)}
                </div>
              </div>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <img
                    className="rounded-full w-10 h-10 m-2"
                    src={`https://codetech.nworld.dev${el.userImage}`}
                  />
                  <div className="text-lg font-medium tracking-tight text-black/80 dark:text-gray-300">
                    {el.writer}
                  </div>
                </div>
                <div className="flex items-center">
                  <AiOutlineHeart
                    size="30"
                    className="text-2xl text-black/40 dark:text-gray-300"
                  />
                  <div className="mx-1 text-lg font-medium text-black/70 dark:text-gray-300">
                    {el.recommendNumber}
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
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
    <div className="flex flex-col items-center justify-center w-full lg:w-[64rem] mx-auto px-4">
      <div className="mt-8 md:mt-16 mb-4 justify-start w-full text-3xl font-bold dark:text-white tracking-tighter">
        # {keyword}{' '}
        <span className="font-normal dark:text-white/60">리뷰 검색결과</span>
      </div>
      <NoResult />
      <SearchResultView />
      <MoreBtn />
    </div>
  );
};
export default SearchReview;
