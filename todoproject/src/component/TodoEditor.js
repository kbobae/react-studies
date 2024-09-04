import { useState, useRef } from "react";
import "./TodoEditor.css";

 const TodoEditor = ({onCreate}) => {
    //사용자가 입력 폼에 입력한 데이터를 저장할 State 변수 content를 만듦
    const [content, setContent] = useState("");
    const inputRef = useRef();
    const onChangeContent = (e) => {
        setContent(e.target.value);
    };
    //함수 onCreate를 호출하고 인수로 content의 값을 전달함
    const onSubmit = () => {
        if(!content) {
            inputRef.current.focus();
            return; //입력 안했을 때 아이템 추가X, 포커스 상태로
        }
        onCreate(content);
        setContent(""); //새 아이템 추가 후 입력 폼 초기화
    };
    //키보드 엔터키 눌러 아이템 추가
    const onKeyDown = (e) => {
        if(e.keyCode === 13) {
            onSubmit();
        }
    };

     return (
         <div className="TodoEditor">
            <h4>새로운 Todo 작성하기 ✏️</h4>
             <div className="editor_wrapper">
                 <input 
                    ref={inputRef}
                    value={content}
                    onChange={onChangeContent}
                    onKeyDown={onKeyDown}
                    placeholder="새로운 Todo..." />
                 <button onClick={onSubmit}>추가</button>
            </div>
        </div>
     );
 };
 export default TodoEditor;