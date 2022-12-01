import { WriteReview } from '../../pages';
import { useEffect, useState } from 'react';
import { getReviewDetail } from '../../util/apiCollection';
import { useParams } from 'react-router-dom';
import useReview from '../../store/review';
import { Review } from '../../types/mainPageTypes';
import useCategorie from '../../store/categorie';

const EditReviewDetail = () => {
  const { clickName, setClickName } = useCategorie();
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

  const params = useParams();

  const { setTitle, setProductId, setThumbnailBase64, setThumnailImg } =
    useReview();

  useEffect(() => {
    const getReviewData = async () => {
      const { data } = await getReviewDetail(Number(params.id));
      setReview(data);
      setTitle(data.title);
      setClickName(data.type);
      setProductId(data.productId);
    };
    getReviewData();
  }, []);

  return (
    <>
      <WriteReview />
    </>
  );
};

export default EditReviewDetail;
