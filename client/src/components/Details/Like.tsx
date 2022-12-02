import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useState } from 'react';
import { postLike } from '../../util/apiCollection';
import { loginRefresh } from '../../util/loginRefresh';
import { useParams } from 'react-router-dom';
import { useIsLogin } from '../../store/login';

interface LikeProps {
  userId: number;
}

const HandleLike = ({ userId }: LikeProps) => {
  const [isHover, setIsHover] = useState(false);

  const params = useParams();
  const { loginId } = useIsLogin();
  const handleLikeClick = async () => {
    if (loginId) {
      const response = await postLike(Number(params.id));
      switch (response.status) {
        case 200:
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
  const HandleHover = () => {
    if (isHover) {
      return (
        <AiFillHeart
          color="blue"
          size="40"
          className="animate-ping absolute inline-flex opacity-75"
        />
      );
    }
    return null;
  };
  return (
    <>
      {userId === Number(loginId) ? null : (
        <button
          className="flex "
          onClick={handleLikeClick}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <AiOutlineHeart
            color="2962F6"
            size="40"
            className="relative inline-flex"
          />
          <HandleHover />
        </button>
      )}
    </>
  );
};

export default HandleLike;
