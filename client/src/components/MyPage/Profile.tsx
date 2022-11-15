//유저정보
//login state

function Profile(): JSX.Element {
  return (
    <div>
      <div className="flex items-center justify-center bg-slate-100">
        <div className="mx-10">
          <img
            src=""
            alt=""
            className="mt-10 bg-gray-400 border-none rounded-full w-60 h-60"
          />
          <div className="flex justify-center">
            <button className="px-12 py-2 mt-4 mb-10 bg-gray-400 rounded ">
              사진 업로드
            </button>
          </div>
        </div>
        <div className="">
          <div className="m-3 mt-0 text-4xl font-bold">UserName</div>
          <div className="m-2 text-sm font-semibold">email@eamil.com</div>
          <div className="m-2 text-sm font-semibold">num 위 / num point</div>
          <div className="flex mt-3 mb-10">
            <button className="py-2 m-4 ml-0 bg-white rounded px-14">
              닉네임 수정
            </button>
            <button className="py-2 m-4 bg-white rounded px-14">
              비밀번호 수정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
