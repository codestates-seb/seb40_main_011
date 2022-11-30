// [GET]
import { useEffect, useState } from 'react';
import { DetailReviewProps } from '../../types/mainPageTypes';
import { getDetailList } from '../../util/apiCollection';
import RvSelectBox from './RvSelectBox';

const DetailReview = ({ productId }: DetailReviewProps) => {
  const [reviewData, setReviewData] = useState();
  const [limit, setLimit] = useState(6);

  const [spread, setSpread] = useState(false);
  const [selected, setSelected] = useState('최신 순');

  const sortList = [
    { sort: '최신 순', en: 'RECENT' },
    { sort: '좋아요 순', en: 'MOST_LIKE' },
    { sort: '댓글 순', en: 'TOP_COMMENT' },
  ];

  useEffect(() => {
    const getSnackData = async () => {
      // const { data } = await getDetailList(productId, 'RECENT', limit);
      // console.log(data);
      if (selected === '최신 순') {
        const { data } = await getDetailList(productId, 'RECENT', limit);
        setReviewData(data);
      }
      if (selected === '최신 순') {
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

  const menu = ['최신 순', '최신 순', '댓글 순'];
  //   sortList.map((el) => {
  //     return el.sort;
  //   }),
  // ];

  const handleBoxClose = () => {
    if (!spread) return null;
    setSpread(!spread);
  };

  const onMoreClick = (e: React.MouseEvent<HTMLElement>) => {
    setLimit(limit + 3);
  };

  return (
    <>
      <div className="flex justify-between mb-4 text-xl font-medium">
        <div>상세 리뷰</div>
        <RvSelectBox
          spread={spread}
          setSpread={setSpread}
          selected={selected}
          setSelected={setSelected}
          menu={menu}
        />
      </div>
      <div className="flex mb-3">
        <img src="" alt="" className="w-[300px] h-[250px] mr-3" />
        <div className="flex flex-col overflow-hidden text-left w-[760px]">
          <div className="mb-1 text-2xl">review title</div>
          <div className="pb-1 overflow-hidden text-xl text-justify whitespace-normal h-36 text-ellipsis line-clamp-5">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia
            animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis
            est et expedita distinctio. Nam libero tempore, cum soluta nobis est
            eligendi optio cumque nihil impedit quo minus id quod maxime placeat
            facere possimus, omnis voluptas assumenda est, omnis dolor
            repellendus. Temporibus autem quibusdam et aut officiis debitis aut
            rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint
            et molestiae non recusandae. Itaque earum rerum hic tenetur a
            sapiente delectus, ut aut reiciendis voluptatibus maiores alias
            consequatur aut perferendis doloribus asperiores repellat
          </div>

          <div className="flex flex-row items-center  mt-2.5 w-full">
            <div>Likes</div>
            <div>Comment</div>
            <div className="flex flex-row items-center ml-auto">
              <div>username</div>
              <div>date</div>
              <img
                src=""
                alt=""
                className="w-16 h-16 rounded-full bg-slate-200"
              />
            </div>
          </div>
        </div>
      </div>
      <button
        className="px-10 py-2 my-5 rounded-xl bg-slate-200"
        onClick={onMoreClick}
      >
        더보기
      </button>
    </>
  );
};

export default DetailReview;
