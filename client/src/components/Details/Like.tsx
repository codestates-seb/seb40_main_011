import { AiOutlineLike } from 'react-icons/ai';
import { LikeProps } from '../../types/mainPageTypes';
import { postLike } from '../../util/apiCollection';
import { loginRefresh } from '../../util/loginRefresh';
const HandleLike = ({ recommendNumber, reviewId }: LikeProps) => {
  const handleLikeClick = async () => {
    console.log(reviewId);
    if (reviewId !== null) {
      const response = await postLike(reviewId);
      switch (response.status) {
        case 201:
          location.reload();
          break;
        case 412:
          loginRefresh();
          handleLikeClick();
          break;
        case 404:
          window.alert(response.data.message);
      }
    }
  };
  return (
    <>
      <div className="p-2">{recommendNumber}</div>
      <button onClick={handleLikeClick}>
        <AiOutlineLike className="p-2" size="60" />
      </button>
    </>
  );
};

export default HandleLike;
