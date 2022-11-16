//회원 탈퇴
import { useState } from 'react';
import { BsXLg, BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

const OptOut = () => {
  const [password, setPassword] = useState();

  return (
    <div className="modal-bg">
      <div className="modal-window">
        <button className="mt-3 ml-auto mr-3">
          <BsXLg />
        </button>
        <div className="px-24 py-16">
          <div className="text-4xl">정말 탈퇴하시겠습니까?</div>
          <div className="my-2 text-xl text-slate-500">
            회원탈퇴를 위해 비빌번호를 입력해주세요
          </div>
          <div className="flex items-end border-b">
            <input
              type="password"
              value={password}
              placeholder="비밀번호"
              className="flex w-full mt-24 text-lg p-1.5"
            />
            <button>
              <BsFillEyeFill className="w-[20px] h-[20px] mb-1 mr-1.5" />
            </button>
          </div>
          <div className="text-sm text-slate-500">
            {/* {true ? '비밀번호를 입력해주시요' : '비밀번호가 일치하지 않습니다.'} */}
          </div>
        </div>
        <div className="flex justify-center pt-20">
          <button className="w-1/3 py-3 mx-5 border rounded-3xl">아니요</button>
          <button className="w-1/3 py-3 mx-5 border rounded-3xl bg-slate-300">
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default OptOut;
