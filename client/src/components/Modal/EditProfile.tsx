//프로필 수정
import { useState } from 'react';
import { BsXLg } from 'react-icons/bs';
import { EditProfileModalHandler } from '../MyPage/Profile';
import { editNickname } from '../../util/apiCollection';

export interface EditProfile {
  nickname: string | null;
  password: string | null;
}

interface NicknameType {
  nickname: string;
}

const EditProfile = ({
  openEditProfileModalHandler,
}: EditProfileModalHandler) => {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState<boolean>(false);

  const handleUsername = (e: any) => {
    setUsername(e.target.value);
    if (!username || username.length < 2 || username.length > 20) {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
  };

  const handleEditNickName = async () => {
    const data: NicknameType = { nickname: username };

    if (!usernameError) {
      const submitEditNick = await editNickname(data);
      switch (submitEditNick.status) {
        case 200:
          location.reload();
          break;
        default:
      }
    } else {
      alert('닉네임은 2글자 이상 20글자 미만으로 해주세요');
    }
  };

  return (
    <div className="modal-bg">
      <div className="modal-window">
        <button className="p-3 ml-auto" onClick={openEditProfileModalHandler}>
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
              onChange={handleUsername}
              placeholder="닉네임을 입력해주세요"
              className="flex w-full mt-24 text-lg"
            />
          </div>
          {usernameError && (
            <div className="text-sm text-red-600">
              닉네임은 2글자 이상 20글자 미만으로 입력해주세요
            </div>
          )}
        </div>
        <div className="flex justify-center pt-16">
          <button
            className="w-1/3 py-3 mx-5 border rounded-3xl"
            onClick={openEditProfileModalHandler}
          >
            취소
          </button>
          <button
            className="w-1/3 py-3 mx-5 border rounded-3xl bg-slate-300"
            onClick={handleEditNickName}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
