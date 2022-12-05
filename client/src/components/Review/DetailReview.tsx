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
          <div className="flex mb-3" key={idx}>
            <img src="" alt="" className="w-[300px] h-[250px] mr-3 rouned" />
            <div className="flex flex-col overflow-hidden text-left w-[760px]">
              <div className="mb-1 text-2xl">{el.title}</div>
              <div className="pb-1 overflow-hidden text-xl text-justify whitespace-normal h-36 text-ellipsis line-clamp-5">
                {el.content}
              </div>

              <div className="flex flex-row items-center w-full ">
                <div className="mx-1 mt-4">좋아요 {el.recommendNumber}</div>
                <div className="mx-1 mt-4">댓글 {el.commentCount}</div>
                <div className="flex flex-row items-start ml-auto">
                  <Avatar image={el.userImage} />
                  <div className="mx-1 mt-3">
                    <div>{el.writer}</div>
                    <div className="ml-auto text-sm text-gray-400">
                      {' '}
                      {new Date(el.createdAt).toLocaleDateString('kr-KO', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                </div>

                {/* <img
                    src=
                    alt=""
                    className="w-16 h-16 rounded-full bg-slate-200"
                  /> */}
              </div>
            </div>
          </div>
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
        // <button
        //   className="px-10 py-2 my-5 rounded-xl bg-slate-200"
        //   onClick={onMoreClick}
        // >
        //   더보기
        // </button>
      )}
    </div>
  );
};

export default DetailReview;
