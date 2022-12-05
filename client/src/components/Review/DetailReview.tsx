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
      className={`w-full bg-white rounded-3xl px-8 md:px-12 pt-6 sm:pt-8 md:pt-10 md:pb-3 mb-8 ${
        reviewData?.reviewLists.length === 0 && `hidden`
      }`}
    >
      <div className="w-full flex justify-between items-center text-xl font-medium mb-6">
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
            <div className="rounded-3xl overflow-hidden flex flex-col md:flex-row mb-10">
              <div className="w-full md:w-2/5 lg:w-1/3 overflow-hidden rounded-3xl flex-none flex items-center mr-8">
                <img
                  // src={`https://codetech.nworld.dev${el.thumbnail}`}
                  src={`https://codetech.nworld.dev/images/1268bc17-8074-46a2-aecf-f488fe6db3db.png`}
                  alt=""
                  className="scale-125"
                />
              </div>
              <div className="w-full md:3/5 lg:w-2/3 h-48 flex flex-col overflow-hidden text-left justify-between py-2">
                <div>
                  <div className="mb-2 text-xl font-bold tracking-tight line-clamp-1">
                    {el.title}
                  </div>
                  <div className="pb-1 overflow-hidden tracking-tight text-black/60 line-clamp-3">
                    {onlyText(el.content)}
                  </div>
                </div>
                <div className="flex justify-between items-end w-full">
                  <div className="flex items-center">
                    <Avatar image={el.userImage} />
                    <div className="pl-3">
                      <div className="font-medium text-lg tracking-tight text-black/80">
                        {el.writer}
                      </div>
                      <div className="text-sm text-black/50 font-medium tracking-tight">
                        {new Date(el.createdAt).toLocaleDateString('kr-KO', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <RiHeart3Line className="text-2xl text-black/40" />
                    <span className="mx-1 text-lg font-medium text-black/70">
                      {el.recommendNumber}
                    </span>
                    <RiChat3Line className="ml-2 text-2xl pl-0.5 text-black/40" />
                    <span className="mx-1 text-lg font-medium text-black/70">
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
          className="w-full rounded-xl h-14 flex items-center justify-center bg-zinc-100/80 hover:bg-zinc-200/70 text-lg font-medium text-zinc-400 hover:text-zinc-500 tracking-tight my-8"
        >
          더 보기
        </span>
      )}
    </div>
  );
};

export default DetailReview;
