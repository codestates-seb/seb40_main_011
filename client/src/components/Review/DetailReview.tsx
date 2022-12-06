// [GET]
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DetailReviewProps } from '../../types/mainPageTypes';
import { getDetailList } from '../../util/apiCollection';
import RvSelectBox from './RvSelectBox';
import Avatar from '../Avatar/Avatar';
import { useNavigate } from 'react-router-dom';
import { useIsLogin } from '../../store/login';
import { AiFillStar, RiChat3Line, RiHeart3Line } from '../../icons';

interface ReviewDataType {
  hasNext: boolean | undefined;
  reviewLists: any;
}

const DetailReview = ({
  productId,
  detailReviewspread,
  setdetailReviewSpread,
}: any) => {
  const [reviewData, setReviewData] = useState<ReviewDataType>();
  const [limit, setLimit] = useState(3);
  const [selected, setSelected] = useState('최신 순');
  const navigate = useNavigate();
  const { isLogin } = useIsLogin();
  const onlyText = (data: string) => {
    return data
      .replace(/(\[.*\])(\((http)(?:s)?(:\/\/).*\))/g, ' ')
      .replace(/[^ㄱ-ㅎ가-힣a-zA-Z0-9]/g, ' ');
  };
  const sortList = [
    { sort: '최신 순', en: 'RECENT' },
    { sort: '좋아요 순', en: 'MOST_LIKE' },
    { sort: '댓글 순', en: 'TOP_COMMENT' },
  ];
  // console.log(reviewData?.reviewLists);
  useEffect(() => {
    const getSnackData = async () => {
      // const { data } = await getDetailList(productId, 'RECENT', limit);
      // console.log(data);
      if (selected === '최신 순') {
        const { data } = await getDetailList(productId, 'RECENT', limit);
        setReviewData(data);
      }
      if (selected === '좋아요 순') {
        const { data } = await getDetailList(productId, 'MOST_LIKE', limit);
        setReviewData(data);
      }
      if (selected === '댓글 순') {
        const { data } = await getDetailList(productId, 'TOP_COMMENT', limit);
        setReviewData(data);
      }
    };
    getSnackData();
  }, [limit, selected]);

  const menu = ['최신 순', '좋아요 순', '댓글 순'];

  const onMoreClick = (e: React.MouseEvent<HTMLElement>) => {
    setLimit(limit + 3);
  };

  return (
    <div
      className={`w-full bg-white rounded-3xl px-5 md:px-12 pt-6 sm:pt-8 md:pt-10 md:pb-3 mb-8 dark:bg-DMSubColor ${
        reviewData?.reviewLists.length === 0 && `hidden`
      }`}
    >
      <div className="flex items-center justify-between w-full mb-6 text-xl font-medium">
        <span className="text-2xl tracking-tight">상세 리뷰</span>
        <RvSelectBox
          spread={detailReviewspread}
          setSpread={setdetailReviewSpread}
          selected={selected}
          setSelected={setSelected}
          menu={menu}
        />
      </div>

      {reviewData?.reviewLists.map((el: any, idx: number) => {
        return (
          <Link to={`/review/${el.id}`} key={idx}>
            <div className="flex flex-col mb-8 md:flex-row md:mb-10">
              <div className="w-full aspect-[16/9] md:h-48 md:w-2/5 lg:w-1/3 overflow-hidden rounded-2xl md:rounded-3xl flex-none flex items-center mr-6">
                <img
                  src={`https://codetech.nworld.dev${el.thumbnail}`}
                  alt=""
                  className="w-full scale-105"
                />
              </div>
              <div className="flex flex-col justify-between w-full h-48 py-2 overflow-hidden text-left md:3/5 lg:w-2/3">
                <div>
                  <div className="mb-2 text-xl font-bold tracking-tight line-clamp-1">
                    {el.title}
                  </div>
                  <div className="pb-1 overflow-hidden tracking-tight text-black/60 line-clamp-3 dark:text-gray-400">
                    {onlyText(el.content)}
                  </div>
                </div>
                <div className="flex items-end justify-between w-full">
                  <div className="flex items-center">
                    <Avatar image={el.userImage} />
                    <div className="pl-3">
                      <div className="text-lg font-medium tracking-tight text-black/80 dark:text-gray-300">
                        {el.writer}
                      </div>
                      <div className="text-sm font-medium tracking-tight text-black/50 dark:text-gray-300">
                        {new Date(el.createdAt).toLocaleDateString('kr-KO', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <RiHeart3Line className="text-2xl text-black/40 dark:text-gray-300" />
                    <span className="mx-1 text-lg font-medium text-black/70 dark:text-gray-300">
                      {el.recommendNumber}
                    </span>
                    <RiChat3Line className="ml-2 text-2xl pl-0.5 text-black/40 dark:text-gray-300" />
                    <span className="mx-1 text-lg font-medium text-black/70 dark:text-gray-300">
                      {el.commentCount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
      {reviewData && reviewData?.hasNext && (
        <span
          role="button"
          onClick={onMoreClick}
          className="flex items-center justify-center w-full my-8 text-lg font-medium tracking-tight rounded-xl h-14 bg-zinc-100/80 hover:bg-zinc-200/70 text-zinc-400 hover:text-zinc-500"
        >
          더 보기
        </span>
      )}
    </div>
  );
};

export default DetailReview;
