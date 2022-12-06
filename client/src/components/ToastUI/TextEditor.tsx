//토스트 ui 에디터 컴포넌트
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';

import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import React, { useRef, useState } from 'react';
import useReview from '../../store/review';
import { uploadEditorImage } from '../../util/apiCollection';
import { postEditorContent, editReview } from '../../util/apiCollection';
import { useNavigate, useParams } from 'react-router-dom';
import { loginRefresh } from '../../util/loginRefresh';
import Confirm from '../Modal/Confirm';
import useCategories from '../../store/categories';

function TextEditor() {
  const params = useParams();
  //글자 수 세기
  const [contentCount, setContentCount] = useState('');
  //글자 수 세는 이벤트
  const onChangeContent = () => {
    const countData = editorRef.current?.getInstance().getHTML();
    if (countData !== undefined) {
      setContentCount(countData);
    }
  };

  const editorRef = useRef<Editor>(null);
  const {
    productId,
    title,
    content,
    setTitle,
    setContent,
    setProductId,
    setThumbnailBase64,
    setThumnailImg,
    thumbnailImg,
  } = useReview();
  const { setSelectName } = useCategories();
  const navigate = useNavigate();

  //메세지 모달 보이는지, 안 보이는 여부
  const [showModal, setShowModal] = useState(false);
  const modalMsg: string[] = [
    '제목을 입력해주세요',
    '제목은 50자를 넘을 수 없습니다',
    '카테고리에서 제품을 선택해주세요',
    '썸네일을 선택해주세요',
    '썸네일 등록 완료!',
    '썸네일 등록 실패 ㅜㅜ 다시 시도해 주세요',
    '리뷰는 300자 이상 작성해야 합니다',
    '게시글 등록 완료 :)',
    '게시글 등록 실패 ㅜㅜ',
  ];
  //모달 메세지 저장
  const [reviewMsg, setReviewMsg] = useState(modalMsg[0]);

  //리뷰수정부분
  if (params.id !== undefined) {
    const handleEditClick = async () => {
      const data = editorRef.current?.getInstance().getMarkdown();
      if (typeof data === 'string') {
        setContent(data);
      }
      const editorData = {
        id: params.id,
        productId: productId,
        title: title,
        content: data,
        thumbnail: thumbnailImg,
      };

      const submit = await editReview(editorData);
      switch (submit.status) {
        default:
          setTitle('');
          setContent('');
          setProductId('');
          setThumnailImg('');
          window.scrollTo(0, 0);
          navigate(`/review/${params.id}`);
          break;
        case 401 || 400:
          alert('에러');
          console.error(submit.status + 'Error');
          break;
        case 412: {
          loginRefresh();
          handleEditClick();
          break;
        }
      }
    };
    return (
      <>
        <Editor
          ref={editorRef}
          previewStyle="vertical"
          initialValue={content || '내용을 입력하세요'}
          height="550px"
          initialEditType="wysiwyg"
          usageStatistics={false}
          theme={localStorage.getItem('color-theme') === 'light' ? '' : 'dark'}
          plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
          hooks={{
            async addImageBlobHook(blob, callback) {
              const formData = new FormData();
              formData.append('file', blob);
              const imageURL = await uploadEditorImage(formData);
              const imageUrlData = imageURL.data;
              callback(`https://codetech.nworld.dev${imageUrlData}`, '');
            },
          }}
        />
        <div>
          <span className="text-sm text-gray-400">
            현재 글자수 {contentCount.length} / 최소 글자수 300자
          </span>
        </div>
        <div className="flex justify-center mt-10">
          <button
            onClick={handleEditClick}
            type="submit"
            className="w-[300px] h-16 pb-1 text-xl font-bold text-white bg-blue-600 rounded-md hover:bg-blue-500"
          >
            수정 완료
          </button>
        </div>
      </>
    );
  }

  const handleClick = async () => {
    const data = editorRef.current?.getInstance().getMarkdown();
    if (typeof data === 'string') {
      setContent(data);
    }
    const editorData = {
      productId: productId,
      title: title,
      content: data,
      thumbnail: thumbnailImg,
    };

    //프로덕트 아이디를 클릭하지 않았다면 뜨는 모달
    if (productId.length === 0) {
      setReviewMsg(modalMsg[2]);
      return setShowModal(true);
    }
    //타이틀 글자수가 0이거나 50자 이상이라면 뜨는 모달
    if (title.length === 0) {
      setReviewMsg(modalMsg[0]);
      return setShowModal(true);
    } else if (title.length >= 50) {
      setReviewMsg(modalMsg[1]);
      return setShowModal(true);
    }
    //썸네일을 선택하지 않았다면 뜨는 모달
    if (thumbnailImg.length === 0) {
      setReviewMsg(modalMsg[3]);
      return setShowModal(true);
    }
    //컨텐츠의 글자수가 0이거나 300이하라면 뜨는 모달
    if (contentCount.length === 0 || contentCount.length <= 300) {
      setReviewMsg(modalMsg[6]);
      return setShowModal(true);
    }

    //api 요청
    if (
      title.length !== 0 &&
      title.length <= 50 &&
      productId.length !== 0 &&
      contentCount.length !== 0 &&
      contentCount.length >= 300 &&
      thumbnailImg.length !== 0
    ) {
      const submit = await postEditorContent(editorData);
      console.log(`submit`, submit);
      console.log(`submit.data`, submit.data);
      switch (submit.status) {
        case 201:
          setReviewMsg(modalMsg[7]);
          setShowModal(true);
          setTitle('');
          setContent('');
          setProductId('');
          setThumnailImg('');
          setSelectName('소분류 선택');
          navigate(`/review/${submit.data}`);
          break;
        case 401:
          alert('에러');
          console.error(submit.status + 'Error');
          break;
        case 412: {
          loginRefresh();
          handleClick();
          break;
        }
      }
    }
  };

  return (
    <>
      {showModal && <Confirm msg={reviewMsg} setShowModal={setShowModal} />}
      <Editor
        ref={editorRef}
        previewStyle="vertical"
        initialValue=" "
        initialEditType="wysiwyg"
        height="550px"
        usageStatistics={false}
        theme={localStorage.getItem('color-theme') === 'light' ? '' : 'dark'}
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
        onChange={onChangeContent}
        hooks={{
          async addImageBlobHook(blob, callback) {
            const formData = new FormData();
            formData.append('file', blob);
            const imageURL = await uploadEditorImage(formData);
            const imageUrlData = imageURL.data;
            callback(`https://codetech.nworld.dev${imageUrlData}`, '');
          },
        }}
      />
      <div>
        <span className="text-sm text-gray-400">
          현재 글자수 {contentCount.length} / 최소 글자수 300자
        </span>
      </div>
      <div className="flex justify-center mt-10">
        <button
          onClick={handleClick}
          type="submit"
          className="w-[300px] h-16 pb-1 text-xl font-bold text-white bg-blue-600 rounded-md hover:bg-blue-500"
        >
          작성 완료
        </button>
      </div>
    </>
  );
}

export default TextEditor;
