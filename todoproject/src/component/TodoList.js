import { useContext, useMemo, useState } from "react";
import { TodoStateContext } from "./App";
import TodoItem from "./TodoItem";
import "./TodoList.css";

 const TodoList = () => {
    //TodoStateContext.Provider에서 객체 데이터가 아닌 todo 배열을 전달 -> {todo}를 todo로 수정
    const todo = useContext(TodoStateContext);

    //useContext를 호출하고 TodoContext를 인수로 전달해 이 Context가 공급하는 데이터를 storeData에 저장
    // const storeData = useContext(TodoContext);
    // console.log(storeData);

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

    //할 일 분석 기능
    const analyzeTodo = useMemo(() => {
        // console.log("analyzeTodo 함수 호출");
        const totalCount = todo.length;
        const doneCount = todo.filter((it) => it.isDone).length;
        const notDoneCount = totalCount - doneCount;
        return {
            totalCount,
            doneCount,
            notDoneCount,
        };
    }, [todo]);
    //함수 analyzeTodo 호출하고 반환 객체를 구조 분해 할당
    //useMemo는 함수가 아닌 값을 반환 - analyzeTodo() -> analyzeTodo
    const {totalCount, doneCount, notDoneCount} = analyzeTodo;

     return (
        <div className="TodoList">
            <h4>Todo List 🌱</h4>
            <div>
                <div>총개수: {totalCount}</div>
                <div>완료된 할 일: {doneCount}</div>
                <div>아직 완료하지 못한 할 일: {notDoneCount}</div>
            </div>
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
                    <TodoItem key={it.id} {...it} />
                ))}
            </div>
        </div>
     ) 
 };

 //TodoList 컴포넌트에 전달하는 Props 모두 제거함
 //-> Todo 값이 undefined이므로 length 프로퍼티로 접근하면 오류 발생
 //-> todo의 기본값을 빈 배열로 하는 defaultProps 설정
 TodoList.defaultProps = {
    todo: [],
 };

 export default TodoList;
