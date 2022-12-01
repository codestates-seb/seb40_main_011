import { AiOutlineLike } from 'react-icons/ai';
import { LikeProps } from '../../types/mainPageTypes';
import { postLike } from '../../util/apiCollection';
import { loginRefresh } from '../../util/loginRefresh';
import { useParams } from 'react-router-dom';
import { useIsLogin } from '../../store/login';
const HandleLike = ({ recommendNumber }: LikeProps) => {
  const params = useParams();
  const { loginId } = useIsLogin();
  const handleLikeClick = async () => {
    if (loginId) {
      const response = await postLike(Number(params.id));
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
