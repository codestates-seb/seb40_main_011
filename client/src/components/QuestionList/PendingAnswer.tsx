import { AiFillCheckCircle } from 'react-icons/ai';
import BodyTop from './BodyTop';
import { PendingAnswerProps } from '../../types/mainPageTypes';
import { postAdopt } from '../../util/apiCollection';
import { useIsLogin } from '../../store/login';
import Avatar from '../Avatar/Avatar';
import { loginRefresh } from '../../util/loginRefresh';

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
        console.error(Result.status + ' Error');
        break;
      case 412: {
        loginRefresh();
        handleAdopt();
      }
    }
  };

  return (
    <div className="w-full flex flex-col mt-5 pl-8 md:pl-12">
      <div className="w-full flex mb-3 items-center">
        <Avatar image={image} />
        <BodyTop
          createdAt={createdAt}
          nickname={nickname}
          writerId={writerId}
          answerId={answerId}
          content={content}
          questionContent={questionContent}
        />
      </div>
      <div className="w-full">
        <div className="flex w-full">
          <div
            className={`grow px-6 pt-5 pb-6 rounded bg-white dark:bg-DMSubColor text-gray-600  dark:text-white font-medium ${
              Number(loginId) !== questionWriterId && 'mr-2'
            }`}
          >
            {content}
          </div>
          {Number(loginId) === questionWriterId && (
            <div className=" flex-none w-16 ml-2 flex justify-center items-center">
              <button
                onClick={handleAdopt}
                className="group w-full h-full bg-green-200/50 dark:bg-green-100 rounded text-4xl hover:ring hover:ring-green-300 duration-300"
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
