//토스트 ui 뷰어 컴포넌트
//리뷰 디테일 페이지에 데이터 보여줄 때 사용될 예정
//안지은 작성
//잘 작동하는지는 리뷰 디테일 페이지에서 확인할 수 있을 거 같습니다 (11.15)

import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';

import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

const test = `#markdown test`; //잘 뜨나 테스트삼아 쓰는 것. 나중에 지워도 돼요

export default function TextViewer() {
  return (
    <Viewer
      initialValue={test}
      plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
    />
  );
}
