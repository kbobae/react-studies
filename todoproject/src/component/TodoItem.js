import React from "react";
import "./TodoItem.css";

//Props를 구조 분해 할당
const TodoItem = ({id, content, isDone, createdDate, onUpdate, onDelete}) => {
    console.log(`${id} TodoItem 업데이트`);
    //onUpdate를 호출하고 인수로 현재 틱이 발생한 아이템의 id 전달
    const onChangeCheckbox = () => {
        onUpdate(id);
    };

    const onClickDelete = () => {
        onDelete(id);
    };

    return (
        <div className="TodoItem">
            <div className="checkbox_col">
                <input onChange={onChangeCheckbox}
                        checked={isDone} type="checkbox" />
            </div>
            <div className="title_col">{content}</div>
            <div className="date_col">{new Date(createdDate).toLocaleDateString()}</div>
            <div className="btn_col">
                <button onClick={onClickDelete}>삭제</button>
            </div>
        </div>
    );
};
export default React.memo(TodoItem);