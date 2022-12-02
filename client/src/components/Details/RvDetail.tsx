// Review List fetching & boxing comp
import { getReviewDetail } from '../../util/apiCollection';
import { useEffect, useState } from 'react';
import { Review, ReviewComments } from '../../types/mainPageTypes';
import { useNavigate, useParams } from 'react-router-dom';
import { CommentInput } from './CommentInput';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import Comment from './Comment';
import HandleLike from './Like';
import { useIsLogin } from '../../store/login';
import useReview from '../../store/review';
import { AiOutlineHeart } from 'react-icons/ai';
import CheckModal from './DeleteModal';

const RvDetail = () => {
  interface markdownProps {
    markdown: string | undefined;
  }
  const { setContent } = useReview();
  const navigate = useNavigate();
  const params = useParams();
  const reviewId = Number(params.id);
  const [review, setReview] = useState<Review>({
    content: '',
    createdAt: '',
    productDetail: '',
    productName: '',
    recommendNumber: 0,
    reviewComments: [],
    title: '',
    type: '',
    userId: 0,
    userImage: '',
    view: 0,
    writer: '',
    productId: 0,
  });
  const { loginId } = useIsLogin();
  const [comments, setComments] = useState<ReviewComments[]>([]);
  const [showModal, setShowModal] = useState(false);
  const getParsedDate = (createdAt: string) => {
    return new Date(createdAt).toLocaleDateString('ko-KR');
  };

  useEffect(() => {
    const getReviewData = async () => {
      const { data } = await getReviewDetail(reviewId);
      setReview(data);
      setComments(data?.reviewComments);
      setContent(data.content);
    };
    getReviewData();
  }, []);

  const onTypeClick = () => {
    navigate(`/categories/review/${review.productId}`);
  };

  const ConvertedContent = ({ markdown = review?.content }: markdownProps) => {
    return (
      <>
        {markdown && (
          <div id="viewer">
            <Viewer initialValue={markdown} />
          </div>
        )}
      </>
    );
  };

  const CommentView = () => {
    if (review !== undefined && review?.reviewComments?.length > 0) {
      return (
        <div className="flex flex-col h-full w-full my-8 border-t-2">
          <div className="flex justify-start w-full p-4 mb-4 mt-6 text-2xl font-bold ">
            Comment
          </div>
          {review.reviewComments.map((el: ReviewComments, idx: number) => (
            <Comment key={idx} reviewComments={el} />
          ))}
        </div>
      );
    } else return null;
  };

  const onEditClick = () => {
    navigate(`/review/edit/${params.id}`);
  };

  const ReviewInfo = () => {
    const handleDeleteReview = () => {
      console.log(reviewId);
      setShowModal(!showModal);
    };
    if (review.userId === Number(loginId)) {
      return (
        <div className="flex items-end justify-between w-full p-4 border-b border-gray-200 ">
          <div className="flex bg-white rounded-3xl p-2 items-center">
            <img
              className="w-12 h-12 m-2 rounded-full"
              src={`https://codetech.nworld.dev${review?.userImage}`}
            />
            <div className="flex flex-col items-end p-2 text-lg">
              <div className="pt-0.5 font-medium text-gray-600">
                {review?.writer}
                <div className="text-gray-500/60 before:text-gray-300 text-md font-medium tracking-tight">
                  {getParsedDate(review?.createdAt)}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col text-gray-500/60 before:text-gray-300 text-md font-medium tracking-tight">
            <div>
              <button
                onClick={handleDeleteReview}
                className="text-md border border-gray-300 font-medium px-3 bg-white rounded-full mx-0.5 py-0.5 text-gray-400 hover:text-gray-500 hover:font-bold hover:bg-gray-200"
              >
                삭제
              </button>
              <button
                onClick={onEditClick}
                className="text-md border border-gray-300 font-medium px-3 bg-white rounded-full mx-0.5 py-0.5 text-gray-400 hover:text-gray-500 hover:font-bold hover:bg-gray-200"
              >
                수정
              </button>
            </div>
            <div className="flex mx-0.5 my-3">
              <div className="mr-2">조회수 {review.view}</div>
              <div className="flex items-center">
                <AiOutlineHeart size="25" /> {review.recommendNumber}
              </div>
            </div>
          </div>
        </div>
      );
    } else
      return (
        <div className="flex items-end justify-between w-full p-4 border-b border-gray-200 ">
          <div className="flex bg-white rounded-3xl p-2 items-center">
            <img
              className="w-12 h-12 m-2 rounded-full"
              src={`https://codetech.nworld.dev${review?.userImage}`}
            />
            <div className="flex flex-col items-end p-2 text-lg">
              <div className="pt-0.5 font-medium text-gray-600">
                {review?.writer}
                <div className="text-gray-500/60 before:text-gray-300 text-md font-medium tracking-tight">
                  {getParsedDate(review?.createdAt)}
                </div>
              </div>
            </div>
          </div>
          <div className="mb-3 flex mx-0.5 mt-4 text-gray-500/60 before:text-gray-300 text-md font-medium tracking-tight">
            <div className="mr-2">조회수 {review.view}</div>
            <div className="flex items-center">
              <AiOutlineHeart size="25" /> {review.recommendNumber}
            </div>
          </div>
        </div>
      );
  };

  return (
    <>
      {showModal && (
        <CheckModal
          setShowModal={setShowModal}
          msg="정말 삭제하시겠습니까?"
          productId={review.productId}
        />
      )}
      <div className="bg-zinc-100">
        <div className="flex flex-col justify-center mx-auto w-full lg:w-[64rem] ">
          <div className="w-full">
            <div className="flex justify-start p-4 m-4 text-sm">
              <div
                className="font-medium text-gray-600 bg-white hover:bg-slate-300 hover:text-slate-700 mx-2 flex items-center h-12 rounded-full ease-in-out duration-150 pl-4 pr-5"
                role="button"
                onClick={onTypeClick}
              >
                {review.productName}
              </div>
            </div>

            <div className="flex justify-center p-4 mx-4 text-[3rem] font-bold max-md:text-[2rem]">
              {review?.title}
            </div>
          </div>
          <ReviewInfo />
          <section className="flex flex-col items-center border-b border-gray-200">
            <div id="viewer" className="p-4 my-16 whitespace-pre-wrap">
              <ConvertedContent markdown={review.content} />
            </div>
            <HandleLike userId={review.userId} />
            <CommentView />
            <CommentInput />
          </section>
        </div>
      </div>
    </>
  );
};

export default RvDetail;
