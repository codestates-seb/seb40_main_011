//제품 추가하기
//안지은 작성

import React, { ChangeEvent, useState } from 'react';
import CategorieSelector from '../Selectors/CategorieSelector';
import '../common.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useIsLogin } from '../../store/login';
import useCategorie from '../../store/categorie';
import { selectProductImg } from '../../util/apiCollection';

interface ModalProps {
  isModal: boolean;
  setIsModal(state: boolean): void;
}

const AddProduct = ({ isModal, setIsModal }: ModalProps) => {
  const { clickName } = useCategorie();
  const navigate = useNavigate();

  //clickName 대문자로 변경
  const encoded = encodeURI(clickName);
  const upperText = encoded.toUpperCase();

  const [name, setName] = useState('');
  const handelChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const [detail, setDetail] = useState('');
  const handelChangeDetail = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDetail(e.target.value);
  };

  //모달 열고 닫는 이벤트
  const openModalHandler = () => {
    setIsModal(!isModal);
  };

  const [userImg, setUserImg] = useState('/img');
  const [uploadImg, setUploadImg] = useState(false);

  //이미지 올리는 함수
  const handleChangeImg = async (e: any) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onloadend = () => {
      const resultImage: any = reader.result;
      setUserImg(resultImage);
      setUploadImg(true);
    };
  };

  // //폼 데이터 전송하는 함수
  // const handleSubmitImg = async () => {
  //   const formData = new FormData();
  //   // formData.append('request', productData as any);
  //   formData.append('file', userImg as any);

  //   const imgEditData = {
  //     request: {
  //       name: name,
  //       type: upperText,
  //       detail: detail,
  //     },
  //     file: formData,
  //   };
  //   console.log(`imgEditData`, imgEditData);
  //   const submitImg = async () => {
  //     await selectProductImg(imgEditData);
  //   };
  //   submitImg();
  // };

  //새로운 함수 작성
  const productData: any = {
    name: name,
    tpye: upperText,
    detail: detail,
  };

  console.log(`productData`, productData);

  const handleSubmitImg = async () => {
    const formData = new FormData();
    formData.append(
      'file',
      new Blob([uploadImg] as any, { type: 'application/json' })
    );
    formData.append(
      'request',
      new Blob([JSON.stringify(productData)] as any, {
        type: 'application/json',
      })
    );

    console.log(`formData`, formData);

    const submitForm = await selectProductImg(formData);
    switch (submitForm.status) {
      case 200:
        navigate('/review/write');
        location.reload();
        break;
      case 415:
        console.log('실패');
    }
  };

  // const productData = {
  //   name: name,
  //   type: upperText,
  //   detail: detail,
  // };
  // console.log(`productData`, productData);

  // const handleSubmit = async () => {
  //   const formData = new FormData();
  //   // formData.append('name', name);
  //   // formData.append('type', clickName);
  //   // formData.append('detail', detail);
  //   // const productData = {
  //   //   name: name,
  //   //   type: upperText,
  //   //   detail: detail,
  //   // };

  //   formData.append('request', productData as any);
  //   formData.append('file', img as any);

  //   axios
  //     .post('https://codetech.nworld.dev/api/products', {
  //       headers: {
  //         Authorization: initialToken,
  //         'Content-Type': 'multipart/form-data',
  //       },
  //       file: formData,
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       setName('');
  //       setImg(undefined);
  //       setImgPreview('');
  //       setDetail('');
  //     })
  //     .catch(function (error) {
  //       if (error.response) {
  //         console.log(`error.response.data`, error.response.data);
  //         console.log(`error.response.status`, error.response.status);
  //         console.log(`error.response.headers`, error.response.headers);
  //       } else if (error.request) {
  //         console.log(`error.request`, error.request);
  //       } else {
  //         console.log('Error', error.message);
  //       }
  //       console.log(`error.config`, error.config);
  //     });

  //   console.log(`폼데이터 잘 들어가나?`, formData);
  // };

  return (
    <>
      <div>
        <div className="top-0 left-0 flex modal-bg">
          <div className="modal-window h-[650px]">
            <h1 className="px-24 pt-16 pb-8 text-3xl">제품을 추가해주세요</h1>
            <div className="flex justify-center border border-red-700">
              <form
                id="form-data"
                className="w-2/3"
                // method="post"
                // action="/api/products"
                encType="multipart/form-data"
              >
                <div className="pb-5">
                  <p className="modal-font">분류</p>
                  <CategorieSelector />
                </div>
                <div className="pb-5">
                  <p className="modal-font">제품 이름</p>
                  <input
                    className="justify-between alsolute t-0 text-sm bg-white h-10 rounded border border-slate-200 flex items-center px-4 pb-0.5 font-medium text-gray-500 w-full"
                    type="text"
                    value={name}
                    onChange={handelChangeName}
                    placeholder="제품명을 입력해주세요"
                  />
                </div>
                <div className="pb-5">
                  <p className="modal-font">디테일</p>
                  <input
                    className="justify-between alsolute t-0 text-sm bg-white h-10 rounded border border-slate-200 flex items-center px-4 pb-0.5 font-medium text-gray-500 w-full"
                    type="text"
                    value={detail}
                    onChange={handelChangeDetail}
                    placeholder="디테일을 입력해주세요"
                  />
                </div>
                <div className="pb-5">
                  <p className="modal-font">이미지 업로드</p>
                  {uploadImg === false ? (
                    <div className="flex rounded-lg bg-slate-200 h-28">
                      <div className="m-auto">
                        <input
                          type="file"
                          className="real-upload"
                          accept="/image/*"
                          // onChange={handleImg}
                          onChange={handleChangeImg}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex rounded-lg bg-slate-200 h-28">
                      <div className="m-auto">
                        <img src={userImg} alt="" className="" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex justify-center pt-4">
                  <button
                    className="w-1/3 py-3 mx-5 border rounded-3xl"
                    onClick={openModalHandler}
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="w-1/3 py-3 mx-5 border rounded-3xl bg-slate-300"
                    // onClick={handleSubmit}
                    onClick={handleSubmitImg}
                  >
                    완료
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* )} */}
      </div>
    </>
  );
};

export default AddProduct;

// const handleImg = (e: ChangeEvent<HTMLInputElement>) => {
//   e.preventDefault();
//   if (e.target.files) {
//     const uploadFile = e.target.files[0];
//     setImg(uploadFile);
//     //가져온 이미지 프리뷰
//     const objectUrl = URL.createObjectURL(e.target.files[0]);
//     setImgPreview(objectUrl);
//     console.log(`objectUrl`, objectUrl);
//   }
// };

// const handleImg = (e: ChangeEvent<HTMLInputElement>) => {
//   e.preventDefault();
//   if (e.target.files) {
//     const uploadFile = e.target.files[0];
//     setImg(uploadFile);
//     //가져온 이미지 프리뷰
//     const objectUrl = URL.createObjectURL(e.target.files[0]);
//     setImgPreview(objectUrl);
//     console.log(`objectUrl`, objectUrl);
//   }
// };

// const formData = new FormData(document.getElementById('form-data'));

//이미지 업로드
//파일 미리 볼 url
// const [showImages, setShowImages] = useState<string[]>([]);
// const [showFile, setShowFile] = useState();
// const [img, setImg] = useState(null as any);
// const [previewImg, setPreviewImg] = useState(null as any);

// const insertImg = (e: ChangeEvent<HTMLInputElement>) => {
//   if (!showFile) return false;

//   const imgEl = document.querySelector('.img_box') as HTMLElement | null;
//   const reader = new FileReader();

//   reader.onload = () => {
//     if (imgEl != null) {
//       img.style.background = `url(${reader.result})`;
//       console.log(img.style.background);
//     }
//     reader.readAsDataURL(showFile[0]);
//   };
// };

// const [files, setFiles] = useState<File | null>(null);
// const [showImages, setShowImages] = useState<string[]>([]);
// const [showFile, setShowFile] = useState();

// const handleDelete = (idx: number) => {
//   setShowImages([
//     ...showImages.slice(0, idx),
//     ...showImages.slice(idx + 1, showImages.length),
//   ]);
// };

// const handleClick = (e: React.MouseEvent<HTMLElement>) => {
//   const formData = new FormData();
//   if (files) {
//     formData.append('file', files);
//   }

//   const config = {
//     // method: 'post',
//     // data: formData,
//     // withCredentials: true,
//     headers: {
//       Authorization: initialToken,
//     },
//   };

//   axios
//     .post('https://codetech.nworld.dev/api/products', formData, config)
//     .then((res) => console.log(res))
//     .catch((err) => console.log(`제품 등록하기 에러`, err));
// };

// // const onLoadFile = (e: ChangeEvent<HTMLInputElement>) => {
// //   const file = e.target.files;
// //   console.log(file);
// //   setShowFile(showFile);
// // };

// //이미지 업로드
// //파일 미리 볼 url
// const [img, setImg] = useState(null as any);
// const [previewImg, setPreviewImg] = useState(null as any);

// const insertImg = (e: ChangeEvent<HTMLInputElement>) => {
//   if (!showFile) return false;

//   const imgEl = document.querySelector('.img_box') as HTMLElement | null;
//   const reader = new FileReader();

//   reader.onload = () => {
//     if (imgEl != null) {
//       img.style.background = `url(${reader.result})`;
//       console.log(img.style.background);
//     }
//     reader.readAsDataURL(showFile[0]);
//   };
// };

{
  /* <여기부터 다른 코드임></여기부터> */
}
// const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
//   if (event.target.files) {
//     setFiles(event.target.files[0]);
//   }

//   const formData = new FormData();
//   if (files) {
//     formData.append('file', files);
//   }

//   const result: string | void = await axios(
//     'https://codetech.nworld.dev/api/products',
//     {
//       method: 'post',
//       data: formData,
//       withCredentials: true,
//       headers: {
//         Authorization:
//           'Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJVU0VSIl0sInVzZXJuYW1lIjoiY2FlY3VzLnJlZ2lvQGdtYWlsLmNvbSIsInN1YiI6ImNhZWN1cy5yZWdpb0BnbWFpbC5jb20iLCJpYXQiOjE2NjkwNDI0NzQsImV4cCI6MTY2OTA0NDI3NH0.RzBJZY2BI9F-BHi_HD7i_4Cp_husJMRk4wibawa4RlvudkeqmNbQofr8VxC0FikufmkOGuuink2w-_0wuH3Kcg',
//       },
//     }
//   ).then((res) => {
//     console.log(res.data);
//     navigator('/reviews');
//   });
//   // .catch((err) => console.log(err));
//   //catch를 넣으면 result에 오류 발생

//   if (result) setShowImages([...showImages, result]);
// };

// //파일 선택 함수
// const fileUploadValidHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const target = e.currentTarget;
//   const files = (target.files as FileList)[0];

//   if (files === undefined) {
//     return;
//   }

//   //파일 확장자 체크
//   if (!fileExtensionValid(files)) {
//     target.value = '';
//     alert(
//       '업로드 불가능한 확장자입니다. 가능한 확장자 : ${ALLOW_FILE_EXTENSION}'
//     );
//     return;
//   }

//   //파일 용량 체크
//   if (files.size > FILE_SIZE_MAX_LIMIT) {
//     target.value = '';
//     alert('업로드 가능한 파일 최대 용량은 5MB입니다');
//     return;
//   }
//   setIsFile(files);
// };

// //파일 업로드 함수
// const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
//   if (isFile !== undefined) {
//     try{
//       const formData = new FormData();
//       formData.append('file', isFile);

//       const result = await axios('http://localhost:8080/api/products', {
//        method: 'post',
//        body: formData,
//        headers: {
//        authorization:
//         'BearereyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJVU0VSIl0sInVzZXJuYW1lIjoiY2FlY3VzLnJlZ2lvQGdtYWlsLmNvbSIsInN1YiI6ImNhZWN1cy5yZWdpb0BnbWFpbC5jb20iLCJpYXQiOjE2NjkwMzM0NTgsImV4cCI6MTY2OTAzNTI1OH0.efTsIipJfAaj24zA5zNQ0BAxgY-PIz3T2PEuqWdvCVafCl4J1GCxiXvHq3IoKwo3NhB7krLNCbd11o4jCuN3Tw',
//     },
//   });
//     }
//   }
// };
// const fileUploadHandler = async() => {
//   if(isFile !== undefined){
//     try{
//       const formData = new FormData();
//       formData.append('file', isFile);

//       //Axios를 이용해 서버로 파일 업로드 요청
//       await axios
//         .post('http://localhost:8080/api/products', {
//           name: name,
//           type: type,
//           body: formData,
//           headers: 'Authorization: {{Authorization}}'
//         })
//       .then((res) => res.json())
//       .then((body) => body.url)
//       .catch((err) => console.log('err', err))
//     }
//   }
// }

// //파일 확장자 검사하는 함수
// const fileExtensionValid = ({ name }: { name: string }): boolean => {
//   const extension = removeFileName(name);
//   if (!(ALLOW_FILE_EXTENSION.indexOf(extension) > -1) || extension === '') {
//     return false;
//   }
//   return true;
// };

// //.을 제거한 순수 파일 확장자를 리턴
// const removeFileName = (originFileName: string): string => {
//   const lastIndex = originFileName.lastIndexOf('.');
//   if (lastIndex < 0) {
//     return '';
//   }
//   return originFileName.substring(lastIndex + 1).toLowerCase();
// };

//       <div>
//         <div className="top-0 left-0 flex modal-bg">
//           <div className="modal-window h-[650px]">
//             <h1 className="px-24 pt-16 pb-8 text-3xl">제품을 추가해주세요</h1>
//             <div className="flex justify-center border border-red-700">
//               <form
//                 className="w-2/3"
//                 method="post"
//                 action="https://codetech.nworld.dev/api/products"
//                 encType="multipart/form-data"
//               >
//                 <div className="pb-5">
//                   <p className="modal-font">분류</p>
//                   <CategorieSelector />
//                 </div>
//                 <div className="pb-5">
//                   <p className="modal-font">제품 이름</p>
//                   <input
//                     className="justify-between alsolute t-0 text-sm bg-white h-10 rounded border border-slate-200 flex items-center px-4 pb-0.5 font-medium text-gray-500 w-full"
//                     type="text"
//                     placeholder="제품명을 입력해주세요"
//                   />
//                 </div>
//                 <div className="pb-5">
//                   <p className="modal-font">디테일</p>
//                   <input
//                     className="justify-between alsolute t-0 text-sm bg-white h-10 rounded border border-slate-200 flex items-center px-4 pb-0.5 font-medium text-gray-500 w-full"
//                     type="text"
//                     placeholder="디테일을 입력해주세요"
//                   />
//                 </div>
//                 <div className="pb-5">
//                   <p className="modal-font">이미지 업로드</p>
//                   {files === null ? (
//                     <div className="flex rounded-lg bg-slate-200 h-28">
//                       <div className="m-auto">
//                         <button
//                           onClick={ImageOnClick}
//                           className="text-sm text-gray-500 p-[10px] rounded-2xl bg-white uploade"
//                         >
//                           Upload
//                         </button>
//                         {isImage === false ? null : (
//                           <input
//                             type="file"
//                             className="real-upload"
//                             accept="/image/*"
//                             onChange={handleUpload}
//                             onClick={ImageOnClick}
//                           />
//                         )}
//                       </div>
//                     </div>
//                   ) : (
//                     showImages.map((src, idx) => {
//                       return (
//                         <div
//                           className="flex rounded-lg bg-slate-200 h-28"
//                           key={idx}
//                         >
//                           <img className="m-auto" src={src}>
//                             <button
//                               // onClick={ImageOnClick}
//                               onClick={() => handleDelete(idx)}
//                               className="text-sm text-gray-500 p-[10px] rounded-2xl bg-white uploade"
//                             >
//                               Delete
//                             </button>
//                             {isImage === false ? null : (
//                               <input
//                                 type="file"
//                                 className="hidden real-upload"
//                                 accept="/products"
//                               />
//                             )}
//                           </img>
//                         </div>
//                       );
//                     })
//                   )}
//                 </div>
//                 <div className="flex justify-center pt-4">
//                   <button
//                     className="w-1/3 py-3 mx-5 border rounded-3xl"
//                     onClick={openModalHandler}
//                   >
//                     취소
//                   </button>
//                   <button
//                     type="submit"
//                     className="w-1/3 py-3 mx-5 border rounded-3xl bg-slate-300"
//                   >
//                     완료
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//         {/* )} */}
//       </div>
//     </>
//   );
// };
