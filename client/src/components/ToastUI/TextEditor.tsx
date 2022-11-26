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

function TextEditor() {
  const editorRef = useRef<Editor>(null);
  const { content, setContent } = useReview();

  const handleClick = () => {
    const data = editorRef.current?.getInstance().getMarkdown();
    if (typeof data === 'string') {
      setContent(data);
    }
    console.log(`마크다운으로 보내기 작동함`, content);
  };

  return (
    <>
      <Editor
        ref={editorRef}
        previewStyle="vertical"
        initialValue="내용을 입력해주세요"
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
      <div className="flex justify-center mt-3">
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
