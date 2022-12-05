import { WriteReview } from '../../pages';
import { useEffect, useState } from 'react';
import { getReviewDetail } from '../../util/apiCollection';
import { useParams } from 'react-router-dom';
import useReview from '../../store/review';
import { Review } from '../../types/mainPageTypes';
import useCategories from '../../store/categories';

const EditReviewDetail = () => {
  const { clickName, setClickName } = useCategories();
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
    thumbnail: '',
    recommends: [],
  });

  // console.log(recommends);

  const [isEditMode, setIsEditMode] = useState(true);
  const params = useParams();

  const { setTitle, setProductId, setThumnailImg } = useReview();

  useEffect(() => {
    const getReviewData = async () => {
      const { data } = await getReviewDetail(Number(params.id));
      setReview(data);
      setTitle(data.title);
      setClickName(data.type);
      setProductId(data.productId);
      setThumnailImg(data.thumbnail);
    };
    getReviewData();
  }, []);

  return (
    <>
      <WriteReview isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
    </>
  );
};

export default EditReviewDetail;
