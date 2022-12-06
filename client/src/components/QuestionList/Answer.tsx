import BodyTop from './BodyTop';
import { AnswerProps } from '../../types/mainPageTypes';
import Avatar from '../Avatar/Avatar';
import { RiChatDeleteFill } from 'react-icons/ri';
import { useState } from 'react';
import UndoAdopt from '../Modal/UndoAdopt';

export default function Answer({
  createdAt,
  nickname,
  content,
  writerId,
  id,
  adoptedId,
  image,
}: AnswerProps) {
  const [showModal, setShowModal] = useState(false);

  const hanldeUndo = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      {showModal && (
        <UndoAdopt setShowModal={setShowModal} msg="채택을 취소하시겠습니까?" />
      )}
      <div className="w-full flex mt-3 mb-1">
        <div className="flex-none ml-10 mt-3">
          <Avatar image={image} />
        </div>
        <div className="w-full pl-2">
          <BodyTop
            createdAt={createdAt}
            nickname={nickname}
            adoptedId={adoptedId}
          />
          <div className="flex relative">
            <div
              className={`grow px-4 pt-2 pb-3 rounded bg-white text-gray-600 font-medium mr-2 ${
                id === adoptedId && `ring ring-green-400`
              }`}
            >
              {content}
            </div>
            {id === adoptedId && (
              <>
                <div className="tracking-tight absolute text-sm font-medium bg-green-500 text-white px-3 rounded-full pt-1 pb-1.5 right-16 -top-4">
                  채택된 답변
                </div>
                <div className="flex-none w-16 mx-2 flex justify-center items-start">
                  <button
                    onClick={hanldeUndo}
                    className="group w-full h-11 text-2xl bg-red-100 rounded duration-300 hover:ring hover:ring-red-300 "
                  >
                    <RiChatDeleteFill className="text-red-500 mx-auto" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
