//토스트 ui 에디터 컴포넌트
//안지은 작성
import React from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

// interface IEditor {
//   htmlStr: string;
//   setHtmlStr: React.Dispatch<React.SetStateAction<string>>;
// }

export default function TextEditor() {
  return (
    <Editor
      previewStyle="vertical"
      height="550px"
      plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
    />
  );
}

export {};
