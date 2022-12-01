// Review List fetching & boxing comp
import { getReviewDetail } from '../../util/apiCollection';
import { useEffect, useState, useRef } from 'react';
import { Review, ReviewComments } from '../../types/mainPageTypes';
import { useNavigate, useParams } from 'react-router-dom';
import { CommentInput } from './CommentInput';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import Comment from './Comment';
import HandleLike from './Like';
import { useIsLogin } from '../../store/login';
import Confirm from '../Modal/Confirm';
import useReview from '../../store/review';

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
        <div className="flex flex-col items-center w-full my-8">
          <div className="flex justify-start w-full p-4 mb-4 text-2xl font-bold ">
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
        <div className="flex items-end justify-between w-full p-4 border-b border-gray-200">
          <div>
            <button
              onClick={handleDeleteReview}
              className="text-xs border border-gray-300 font-medium px-3 bg-white rounded-full mx-0.5 py-0.5 text-gray-400 hover:text-gray-500 hover:font-bold hover:bg-gray-200"
            >
              삭제
            </button>
            <button
              onClick={onEditClick}
              className="text-xs border border-gray-300 font-medium px-3 bg-white rounded-full mx-0.5 py-0.5 text-gray-400 hover:text-gray-500 hover:font-bold hover:bg-gray-200"
            >
              수정
            </button>
          </div>
          <div className="flex">
            <img
              className="w-12 h-12 m-2 rounded-full"
              src={`https://codetech.nworld.dev${review?.userImage}`}
            />
            <div className="flex flex-col items-end p-2">
              <div>{review?.writer}</div>
              <div>{getParsedDate(review?.createdAt)}</div>
            </div>
          </div>
        </div>
      );
    } else
      return (
        <div className="flex items-end justify-end w-full p-4 border-b border-gray-200">
          <div className="flex">
            <img
              className="w-12 h-12 m-2 rounded-full"
              src={`https://codetech.nworld.dev${review.userImage}`}
            />
            <div className="flex flex-col items-end p-2">
              <div>{review.writer}</div>
              <div>{getParsedDate(review.createdAt)}</div>
            </div>
          </div>
        </div>
      );
  };

  return (
    <>
      {showModal && <Confirm setShowModal={setShowModal} msg="really?" />}
      <div className="flex justify-center">
        <div className="flex flex-col items-center w-[64rem]">
          <div className="w-full ">
            <div className="flex justify-start p-4 m-4 text-sm">
              <div
                className="p-1 px-2 rounded-full bg-slate-100 text-slate-600"
                role="button"
                onClick={onTypeClick}
              >
                {review.productName}
              </div>
            </div>

            <div className="flex justify-center p-4 mx-4 text-[3rem] font-bold">
              {review?.title}
            </div>
          </div>
          <ReviewInfo />
          <section className="flex flex-col items-center border-b border-gray-200">
            <div id="viewer" className="p-4 my-16 whitespace-pre-wrap">
              <ConvertedContent markdown={review.content} />
            </div>
            <div className="flex items-end my-8 ">
              <HandleLike recommendNumber={review.recommendNumber} />
            </div>
            <CommentView />
            <CommentInput />
          </section>
        </div>
      </div>
    </>
  );
};

export default RvDetail;
