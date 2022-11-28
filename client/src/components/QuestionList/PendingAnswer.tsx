import { AiFillCheckCircle } from 'react-icons/ai';
import BodyTop from './BodyTop';
import { PendingAnswerProps } from '../../types/mainPageTypes';
import { postAdopt } from '../../util/apiCollection';
import { useIsLogin } from '../../store/login';
import Avatar from '../Avatar/Avatar';

export default function PendingAnswer({
  createdAt,
  nickname,
  content,
  writerId,
  id,
  questionId,
  questionWriterId,
  questionContent,
  image,
}: PendingAnswerProps) {
  const { loginId } = useIsLogin();
  const answerId = id;

  // // 답변 채택하기
  const handleAdopt = async () => {
    const Result = await postAdopt({ answerId, questionId });
    switch (Result.status) {
      case 200:
        location.reload();
        break;
      case 401:
        alert('에러');
        console.log('...');
        console.error(Result.status + ' Error');
        break;
      default:
    }
  };

  return (
    <div className="w-full flex mt-3 mb-1">
      <div className="ml-10 flex-none">
        <Avatar image={image} />
      </div>
      <div className="w-full">
        <BodyTop
          createdAt={createdAt}
          nickname={nickname}
          writerId={writerId}
          answerId={answerId}
          content={content}
          questionContent={questionContent}
        />
        <div className="flex w-full">
          <div
            className={`grow px-4 pt-2 pb-3 rounded bg-white text-gray-600 font-medium ${
              Number(loginId) !== questionWriterId && 'mr-2'
            }`}
          >
            {content}
          </div>
          {Number(loginId) === questionWriterId && (
            <div className=" flex-none w-16 mx-2 flex justify-center items-center">
              <button
                onClick={handleAdopt}
                className="group w-full h-full bg-green-200/50 rounded-lg text-4xl hover:ring hover:ring-green-300 duration-300"
              >
                <AiFillCheckCircle className="p-1 text-green-600 mx-auto" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
