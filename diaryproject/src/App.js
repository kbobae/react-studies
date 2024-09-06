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

//일기 데이터 업데이트할 때마다 로컬 스토리지에 저장
function reducer(state, action) {
  switch(action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newState = [action.data, ...state];
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }
    case "UPDATE": {
      const newState = state.map((it) =>
        String(it.id) === String(action.data.id) ? {...action.data} : it
      );
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }
    case "DELETE": {
      const newState = state.filter(
        (it) => String(it.id) !== String(action.targetId)
      );
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
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

  //로컬 스토리지에 저장한 데이터를 가져와 일기 State 초기화
  useEffect(() => {
    const rawData = localStorage.getItem("diary");
    if(!rawData) {
      setIsDataLoaded(true);
      return;
    }
    const localData = JSON.parse(rawData);
    if(localData.length === 0) {
      setIsDataLoaded(true);
      return;
    }
    localData.sort((a, b) => Number(b.id) - Number(a.id)); //불러온 일기데이터를 내림차순으로 정렬
    idRef.current = localData[0].id + 1; //id 중복 방지
    dispatch({type: "INIT", data: localData});
    setIsDataLoaded(true);
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
