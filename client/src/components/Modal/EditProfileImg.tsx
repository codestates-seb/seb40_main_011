//프로필 이미지 변경
import { useState } from 'react';

const EditProgileImg = () => {
  return (
    <div>
      <div>프로필을 수정하시겠습니까?</div>
      <div>새로운 프로필을 업로드해주세요</div>
      <div>
        <input type="file" accept="imgge/*" id="imgUpload"></input>
        <label htmlFor="imgUpload">이미지 업로드</label>
      </div>
      <div>
        <button>아니요</button>
        <button>네</button>
      </div>
    </div>
  );
};

export default EditProgileImg;
