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
// import AddPost from '../Buttons/AddPost';

function TextEditor() {
  const editorRef = useRef<Editor>(null);
  // const [text, setText] = useState('');
  const { content, setContent } = useReview();

  // const onChange = () => {
  //   const data = editorRef.current?.getInstance().getMarkdown();
  //   console.log(data);
  // };

  // const showContents = () => {
  //   const contentMark = editorRef.current?.getInstance().getMarkdown();
  //   console.log(contentMark);
  // };

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
        initialValue=""
        height="550px"
        usageStatistics={false}
        // onChange={onChange}
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
      />
      <div className="flex justify-center mt-3">
        <button onClick={handleClick}>작성 완료</button>
      </div>
    </>
  );
}

export default TextEditor;
