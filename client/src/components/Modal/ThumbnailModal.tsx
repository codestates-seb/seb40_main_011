//썸네일 모달
//리뷰 작성페이지 사용

import { useState } from 'react';
import useReview from '../../store/review';
import { selectThumnailImg } from '../../util/apiCollection';
import Confirm from '../Modal/Confirm';

interface ThumbModalProps {
  openThum: boolean;
  setOpenThum(state: boolean): void;
}

const ThumbnailModal = ({ openThum, setOpenThum }: ThumbModalProps) => {
  const { thumbnailBase64, setThumbnailBase64, setThumnailImg } = useReview();

  const [img, setImg] = useState(false);
  //썸네일 이미지 (프리뷰) 데이터 들어온 이미지 주소 저장
  const [thumbnailCheck, setThumbnailCheck] = useState('/img');

  // 메세지 모달 보이는지, 안 보이는 여부
  const [showModal, setShowModal] = useState(false);
  const modalMsg: string[] = [
    '썸네일 등록 완료!',
    '썸네일 등록 실패 ㅜㅜ 다시 시도해 주세요',
  ];
  //모달 메세지 저장
  const [thumMsg, setThumMsg] = useState(modalMsg[0]);

  //썸네일 이미지 저장
  const handleChangeImg = async (e: any) => {
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onloadend = () => {
      const thumbnail: any = reader.result;
      setThumbnailCheck(thumbnail);
      setImg(true);
      setThumbnailBase64(e.target.files[0]);
    };
  };

  //이미지 삭제하는 함수
  const handleDeletImg = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setImg(!img);
  };

  //썸네일 이미지 post api 요청
  const handelSubmitThumbnail = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    const sizeData = {
      width: 400,
      height: 400,
    };

    const formData = new FormData();
    formData.append('file', thumbnailBase64);
    formData.append(
      'request',
      new Blob([JSON.stringify(sizeData)] as any, { type: 'application/json' })
    );

    // api 요청
    try {
      const thumbnailPostApi = await selectThumnailImg(formData);
      setThumnailImg(thumbnailPostApi.data);
      setThumMsg(modalMsg[0]);
      setShowModal(true);
      setOpenThum(false);
    } catch (err: unknown) {
      setThumMsg(modalMsg[1]);
      setShowModal(true);
      console.log(err);
    }
  };

  //취소 버튼 누르면 닫히는 모달 이벤트
  const closeModalHandler = () => {
    setOpenThum(!openThum);
    setThumbnailCheck('');
    setThumbnailBase64('');
  };

  return (
    <>
      <div className="fixed inset-0 z-40 flex items-center justify-center w-full h-screen bg-black/30 backdrop-blur-sm justify-content">
        {showModal && <Confirm msg={thumMsg} setShowModal={setShowModal} />}
        <div className="modal-window h-[550px] z-20 overflow-hidden max-sm:w-full dark:bg-DMSubColor">
          <h1 className="pt-12 pb-8 text-3xl text-center max-sm:text-2xl max-sm:px-5 max-sm:pt-12 dark:text-white">
            썸네일 선택해주세요
          </h1>
          <div className="flex justify-center ">
            <form
              encType="multipart/form-data"
              className="w-full px-10 max-sm:w-full max-sm:px-5"
            >
              <div className="pb-5">
                {img === false ? (
                  <div className="flex w-full rounded-lg bg-slate-200 h-72 dark:bg-DMMainTextColor dark:border-DMSubTextColor dark:text-white">
                    <div className="m-auto">
                      <input
                        type="file"
                        id="thumnail"
                        className="hidden"
                        accept="image/jpeg, image/png, image/jpg"
                        onChange={handleChangeImg}
                      />
                      <label
                        role="button"
                        htmlFor="thumnail"
                        className="text-sm text-gray-500 p-[10px] rounded-2xl bg-white"
                      >
                        썸네일 선택하기
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center mx-auto my-0 overflow-hidden rounded-lg w-fullrounded-lg bg-slate-200 h-72">
                    <div className="m-auto">
                      <img
                        src={thumbnailCheck}
                        alt=""
                        className="relative object-cover w-full h-full"
                      />
                    </div>
                    <button
                      onClick={handleDeletImg}
                      className="text-sm text-gray-500 p-[10px] rounded-2xl bg-white absolute"
                    >
                      이미지 삭제
                    </button>
                  </div>
                )}
              </div>
              <div className="flex justify-center pt-4">
                <button
                  className="w-1/3 py-3 mx-5 border rounded-3xl dark:bg-DMMainTextColor dark:border-DMSubTextColor dark:text-white"
                  onClick={closeModalHandler}
                >
                  취소
                </button>
                <button
                  className="w-1/3 py-3 mx-5 font-bold text-white bg-blue-600 rounded-3xl hover:bg-blue-500"
                  onClick={handelSubmitThumbnail}
                >
                  완료
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThumbnailModal;
