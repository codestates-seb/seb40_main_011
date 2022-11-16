//프로필 수정
import { useState } from 'react';
import { BsXLg } from 'react-icons/bs';

const EditProfile = () => {
  const [username, setUsername] = useState();

  return (
    <div className="modal-bg">
      <div className="modal-window">
        <button className="mt-3 ml-auto mr-3">
          <BsXLg />
        </button>
        <div className="px-24 py-16">
          <div className="text-4xl">닉네임을 수정하시겠습니까?</div>
          <div className="my-2 text-xl text-slate-500">
            새로운 닉네임을 입력해주세요
          </div>
          <div className="flex items-end border-b">
            <input
              type="text"
              value={username}
              placeholder=""
              className="flex w-full mt-24 "
            />
          </div>
          <div className="text-sm text-slate-500">닉네임을 입력해주세요</div>
          <div className="flex justify-center pt-36">
            <button className="w-1/3 py-3 mx-5 border rounded-3xl">
              아니요
            </button>
            <button className="w-1/3 py-3 mx-5 border rounded-3xl bg-slate-300">
              네
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
