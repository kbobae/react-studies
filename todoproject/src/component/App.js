import {useReducer, useRef} from "react";
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

  //아이템 수정 함수
  const onUpdate = (targetId) => {
    dispatch({
      type: "UPDATE",
      targetId,
    });
  };

  //아이템 삭제 함수
  const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      targetId,
    });
  };

   return (
     <div className="App">
      <Header />
        <TodoEditor onCreate={onCreate} /> 
        <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
     </div>
   );
 }

 export default App;
