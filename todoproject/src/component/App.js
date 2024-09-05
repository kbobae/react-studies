import React, {useMemo, useCallback, useReducer, useRef} from "react";
import './App.css';
import Header from './Header';
import TodoEditor from './TodoEditor';
import TodoList from './TodoList';

const mockTodo = [
  {
    id : 0,
    isDone : false,
    content : "React 공부하기",
    createdDate : new Date().getTime(),
  },
  {
    id : 1,
    isDone : false,
    content : "독서하기",
    createdDate : new Date().getTime(),
  },
  {
    id : 2,
    isDone : false,
    content : "영화보기",
    createdDate : new Date().getTime(),
  },
];

function reducer(state, action) {
  switch(action.type) {
    case "CREATE": {
      return [action.newItem, ...state];
    }
    case "UPDATE": {
      return state.map((it) =>
        it.id === action.targetId ? {...it, isDone: !it.isDone} : it
      );
    }
    case "DELETE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    default:
      return state;
  }
}

//Context는 반드시 컴포넌트 밖에서 생성
//export를 이용해 TodoContext 내보내기
// export const TodoContext = React.createContext();

export const TodoStateContext = React.createContext();
export const TodoDispatchContext = React.createContext();

 function App() {
  const [todo, dispatch] = useReducer(reducer, mockTodo);

  const idRef = useRef(3); //목 데이터의 id가 0,1,2 -> 초깃값 3으로 설정

  //새 할 일 아이템을 추가하는 함수
  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      newItem: {
        id: idRef.current,
        content,
        isDone: false,
        createdDate: new Date().getTime(),
      },
    });
    idRef.current += 1;
  };

  //아이템 수정 함수 - 최적화(useCallback으로 메모이제이션)
  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: "UPDATE",
      targetId,
    });
  }, []);

  //아이템 삭제 함수 - 최적화(useCallback으로 메모이제이션)
  const onDelete = useCallback((targetId) => {
    dispatch({
      type: "DELETE",
      targetId,
    });
  }, []);

  //App 컴포넌트가 리렌더되어도 다시 생성하지 않도록 함
  const memoizedDispatches = useMemo(() => {
    return {onCreate, onUpdate, onDelete};
  }, []);

   return (
     <div className="App">
      <Header />
      <TodoStateContext.Provider value={todo}>
        <TodoDispatchContext.Provider value={memoizedDispatches}>
          <TodoEditor /> 
          <TodoList />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
     </div>
   );
 }

 export default App;
