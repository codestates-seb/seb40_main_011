import { AiFillCheckCircle } from 'react-icons/ai';
import BodyTop from './BodyTop';
import { PendingAnswerProps } from '../../types/mainPageTypes';
import { postAdopt } from '../../util/apiCollection';
import { useIsLogin } from '../../store/login';

export default function PendingAnswer({
  createdAt,
  nickname,
  content,
  writerId,
  id,
  questionId,
  questionWriterId,
  questionContent,
}: PendingAnswerProps) {
  const { loginId } = useIsLogin();

  const answerId = id;
  // // 답변 채택하기
  const handleAdopt = async () => {
    const Result = await postAdopt({ answerId, questionId });
    switch (Result.status) {
      case 200:
        // console.log('Success');
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
      <img
        src="https://xsgames.co/randomusers/avatar.php?g=male"
        alt=""
        className="w-12 h-12 rounded-2xl mx-3 ml-16 mt-3 ring ring-slate-200"
      />
      <div className="w-full">
        <BodyTop
          createdAt={createdAt}
          nickname={nickname}
          writerId={writerId}
          answerId={answerId}
          content={content}
          questionContent={questionContent}
        />
        <div className="flex">
          <div
            className={`grow px-4 pt-2 pb-3 rounded bg-white text-gray-600 font-medium ${
              loginId !== questionWriterId && 'mr-2'
            }`}
          >
            {content}
          </div>
          {loginId == questionWriterId && (
            <div className=" flex-none w-16 mx-2 flex justify-center items-center">
              <button
                onClick={handleAdopt}
                className="group w-full h-full bg-slate-200 hover:bg-green-200/50 rounded-lg"
              >
                <AiFillCheckCircle className="p-1 text-4xl text-slate-400 group-hover:text-green-600 mx-auto" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
