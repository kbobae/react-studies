import React, { useReducer, useRef, useEffect, useState } from "react";
import {Routes, Route, Link} from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";

//createContext 메서드를 호출해 일기 State값을 컴포넌트 트리에 공급할 Context 만듦
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

//컴포넌트의 라이프 사이클과 관련 없고, 컴포넌트가 리렌더할 때 다시 생성할
//필요가 없는 값이나 함수는 반드시 컴포넌트 외부에 선언
const mockData = [
  {
    id: "mock1",
    date: new Date().getTime() - 1,
    content: "mock1",
    emotionId: 1,
  },
  {
    id: "mock2",
    date: new Date().getTime() - 2,
    content: "mock2",
    emotionId: 2,
  },
  {
    id: "mock3",
    date: new Date().getTime() - 3,
    content: "mock3",
    emotionId: 3,
  },
];

function reducer(state, action) {
  switch(action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      return [action.data, ...state];
    }
    case "UPDATE": {
      return state.map((it) => 
        String(it.id) === String(action.data.id) ? {...action.data} : it
      );
    }
    case "DELETE": {
      return state.filter((it) => String(it.id) !== String(action.targetId));
    }
    default: {
      return state;
    }
  }
}

function App() {
  //현재의 App 컴포넌트에서 데이터 로딩 상태를 알려주는 State 만들기
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  //useReducer를 호출해 일기 데이터를 관리할 변수 data 만들기
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(() => {
    dispatch({
      type: "INIT",
      data: mockData,
    });
    setIsDataLoaded(true); //데이터 로딩 모두 완료 시 true로 변경
  }, []);

  //새 일기를 생성하는 함수
  const onCreate = (date, content, emotionId) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current,
        date: new Date(date).getTime(),
        content,
        emotionId,
      },
    });
    idRef.current += 1;
  };

  //일기 수정하는 함수
  const onUpdate = (targetId, date, content, emotionId) => {
    dispatch({
      type: "UPDATE",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotionId,
      },
    });
  };

  //일기 삭제하는 함수
  const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      targetId,
    });
  };

  //isDataLoaded가 true일 때 자식 컴포넌트들을 페이지에 마운트
  if (!isDataLoaded) {
    return <div>데이터를 불러오는 중입니다...</div>;
  } else{
    return (
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider 
          value={{
            onCreate, onUpdate, onDelete
          }}>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/diary/:id" element={<Diary />} />
              <Route path="/edit/:id" element={<Edit />} />
            </Routes>
          </div>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    );
  }
}

export default App;
