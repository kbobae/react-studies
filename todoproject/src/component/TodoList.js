import { useState } from "react";
import TodoItem from "./TodoItem";
import "./TodoList.css";

 const TodoList = ({todo, onUpdate, onDelete}) => {
    //검색어 처리할 State 변수 만들기
    const [search, setSearch] = useState("");
    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    };
    //입력한 검색어에 따라 할 일 아이템 필터링(대소문자 구별X)
    const getSearchResult = () => {
        return search === ""
            ? todo
            : todo.filter((it) => 
                it.content.toLowerCase().includes(search.toLowerCase()));
    };

     return (
        <div className="TodoList">
            <h4>Todo List 🌱</h4>
            <input 
                value={search}
                onChange={onChangeSearch}
                className="searchbar" 
                placeholder="검색어를 입력하세요" />
            <div className="list_wrapper">
                {getSearchResult().map((it) => (
                // map을 이용해 HTML 요소 반복하여 렌더링
                // <div>{it.content}</div>
                // map을 이용해 컴포넌트 반복/ key 설정(컴포넌트 구분)
                    <TodoItem key={it.id} {...it} 
                            onUpdate={onUpdate} onDelete={onDelete}/>
                ))}
            </div>
        </div>
     ) 
 };

 export default TodoList;
