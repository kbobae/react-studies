import React from 'react'; //UI 컴포넌트를 만들고 렌더링하는 데 사용
import ReactDOM from 'react-dom/client'; //리액트 컴포넌트를 실제 DOM에 렌더링
import './index.css'; //모든 컴포넌트에 적용됨
import App from './component/App'; //App - 메인 컴포넌트

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

//root : 리액트 애플리케이션이 렌더링될 DOM 요소를 가리킴
//createRoot : 이 요소를 애플리케이션의 루트로 사용
//document.getElementById('root') : HTML 파일에서 id가 root인 요소를 선택
// 리액트 컴포넌트들은 이 요소 안에 렌더링됨

//App 컴포넌트를 root 요소에 렌더링함 -> App 컴포넌트와 그 하위 컴포넌트들이 화면에 표시됨