//토스트 ui 에디터 컴포넌트
//안지은 작성
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import { useRef } from 'react';
import useReview from '../../store/review';
import { uploadEditorImage } from '../../util/apiCollection';
import { postEditorContent, editReview } from '../../util/apiCollection';
import { useNavigate, useParams } from 'react-router-dom';
import { loginRefresh } from '../../util/loginRefresh';

function TextEditor() {
  const params = useParams();

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
  const navigate = useNavigate();

  console.log(`thumbnailImg`, thumbnailImg);

  //리뷰수정부분 준일 작성
  if (params.id !== undefined) {
    console.log(content);
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
          console.log('Success');
          console.log(`submit.status`, submit.status);
          setTitle('');
          setContent('');
          setProductId('');
          setThumbnailBase64('');
          setThumnailImg('');
          navigate(`/review/${params.id}`);
          break;
        case 401:
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
          usageStatistics={false}
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

    //api 요청
    const submit = await postEditorContent(editorData);
    console.log(`submit`, submit);
    switch (submit.status) {
      default:
        console.log('Success');
        console.log(`submit.status`, submit.status);
        navigate('/');
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
  };
  return (
    <>
      <Editor
        ref={editorRef}
        previewStyle="vertical"
        initialValue={content || '내용을 입력하세요'}
        height="550px"
        usageStatistics={false}
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
