//회원 탈퇴
import { useState } from 'react';
import { BsXLg, BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { EditPasswordModalHandler } from '../MyPage/Profile';
const EditPassword = ({
  openEditPasswordModalHandler,
}: EditPasswordModalHandler) => {
  const [password, setPassword] = useState();

  return (
    <div className="modal-bg">
      <div className="modal-window">
        <button className="p-3 ml-auto" onClick={openEditPasswordModalHandler}>
          <BsXLg />
        </button>
        <div className="px-24 py-16">
          <div className="mb-6 text-3xl">비밀번호를 변경하시겠습니까?</div>

          <div className="flex items-end border-b ">
            <input
              type="password"
              value={password}
              placeholder="현재 비빌번호를 입력해주세요"
              className="flex w-full p-1.5 mt-4"
            />
          </div>
          <div className="invisible text-sm text-slate-500">
            비밀번호가 일치하지 않습니다
          </div>
          <div className="flex items-end border-b">
            <input
              type="password"
              value={password}
              placeholder="새 비빌번호를 입력해주세요 "
              className="flex w-full p-1.5 mt-4"
            />
          </div>
          <div className="invisible text-sm text-slate-500 ">
            숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요
          </div>
          <div className="flex items-end border-b">
            <input
              type="password"
              value={password}
              placeholder="새 비빌번호를 확인해주세요"
              className="flex w-full p-1.5 mt-4"
            />
          </div>
          <div className="invisible text-sm text-slate-500">
            비밀번호가 일치하지 않습니다
          </div>
        </div>
        <div className="flex justify-center pt-4">
          <button
            className="w-1/3 py-3 mx-5 border rounded-3xl"
            onClick={openEditPasswordModalHandler}
          >
            취소
          </button>
          <button className="w-1/3 py-3 mx-5 border rounded-3xl bg-slate-300">
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPassword;
