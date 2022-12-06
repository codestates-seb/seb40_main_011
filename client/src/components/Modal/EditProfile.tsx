//프로필 수정
import { useState } from 'react';
import { BsXLg } from 'react-icons/bs';
import { EditProfileModalHandler } from '../MyPage/Profile';
import { editNickname } from '../../util/apiCollection';
import { loginRefresh } from '../../util/loginRefresh';

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
  const [notiNew, setNotiNew] = useState(false);
  const [notiNumber, setNotiNumber] = useState(false);

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
    console.log(data.nickname.length);
    if (data.nickname.length === 0) {
      setNotiNumber(false);
      setNotiNew(true);
    } else {
      if (!usernameError) {
        const submitEditNick = await editNickname(data);
        console.log(submitEditNick);
        switch (submitEditNick.status) {
          case 200:
            location.reload();
            break;
          case 400:
            setNotiNumber(true);
            setNotiNew(false);
            break;
          case 412: {
            loginRefresh();
            handleEditNickName();
            break;
          }
          default:
        }
      } else {
        setNotiNumber(true);
        setNotiNew(false);
      }
    }
  };

  return (
    <div className="modal-bg">
      <div className="modal-window">
        <button className="p-3 ml-auto" onClick={openEditProfileModalHandler}>
          <BsXLg />
        </button>
        <div className="px-6 py-4 sm:px-12 sm:py-8">
          <div className="text-xl sm:text-4xl">닉네임을 수정하시겠습니까?</div>
          <div className="my-2 mb-16 sm:text-xl text-slate-500 sm:mb-28">
            새로운 닉네임을 입력해주세요
          </div>

          {notiNew ? (
            <div className="px-2 pt-2 pb-2 mb-2 text-sm font-medium text-red-500 bg-red-100 rounded">
              닉네임을 입력 해주세요
            </div>
          ) : (
            <></>
          )}
          {notiNumber ? (
            <div className="px-2 pt-2 pb-2 mb-2 text-sm font-medium text-red-500 bg-red-100 rounded">
              <div> 닉네임은 2글자 이상 10글자 미만으로 입력해주세요</div>
            </div>
          ) : (
            <></>
          )}

          <div className="flex flex-col items-end justify-center border-b">
            <input
              type="text"
              value={username}
              onChange={handleUsername}
              placeholder="닉네임을 입력해주세요"
              className="flex w-full text-sm sm:text-lg dark:bg-DMSubColor"
            />
          </div>
          {usernameError && (
            <div className="text-sm text-red-600">
              닉네임은 2글자 이상 10글자 미만으로 입력해주세요
            </div>
          )}
        </div>
        <div className="flex justify-center pt-8 mb-10">
          <button
            className="w-1/3 py-3 mx-5 border rounded-3xl dark:bg-DMMainTextColor dark:border-DMSubTextColor "
            onClick={openEditProfileModalHandler}
          >
            취소
          </button>
          <button
            className="w-1/3 py-3 mx-5 text-white bg-blue-600 rounded-3xl hover:bg-blue-500"
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
