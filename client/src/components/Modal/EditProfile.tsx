//프로필 수정
import { useState } from 'react';
const EditProfile = () => {
  const [username, setUsername] = useState();

  return (
    <div>
      <div>닉네임을 수정하시겠습니까?</div>
      <div>새로운 닉네임을 입력해주세요</div>
      <div>
        <input type="text" value={username}></input>
      </div>
      <div>
        <button>아니요</button>
        <button>네</button>
      </div>
    </div>
  );
};

export default EditProfile;
