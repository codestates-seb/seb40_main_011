import BodyForm from './BodyForm';
import BodyTop from './BodyTop';
import AnswerMore from './AnswerMore';

export interface count {
  count: number;
}

export default function PendingQuestion({
  createdAt,
  nickname,
  content,
  answerCards,
}) {
  return (
    <div className="flex my-6 mr-16">
      <img
        src="https://xsgames.co/randomusers/avatar.php?g=female"
        alt=""
        className="w-12 h-12 rounded-full mx-2 ring ring-slate-200"
      />
      <div>
        <BodyTop createdAt={createdAt} nickname={nickname} />
        <div className="ring-1 ring-gray-200 rounded-xl overflow-hidden bg-white">
          <div className="px-6 pt-3 pb-4 border-b border-gray-200">
            {content}
          </div>
          <BodyForm />
        </div>
        {answerCards !== null && <AnswerMore count={3} />}
      </div>
    </div>
  );
}
