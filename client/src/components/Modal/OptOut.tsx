//회원 탈퇴
import { useState } from 'react';
const OptOut = () => {
  const [password, setPassword] = useState();

  return (
    <div>
      <div>정말 탈퇴하시겠습니까?</div>
      <div>회원탈퇴를 위해 비빌번호를 입력해주세요</div>
      <div>
        <input type="password" value={password}></input>
      </div>
      <div>
        {true ? '비밀번호를 입력해주시요' : '비밀번호가 일치하지 않습니다.'}
      </div>
      <div>
        <button>아니요</button>
        <button>네</button>
      </div>
    </div>
  );
};

export default OptOut;
