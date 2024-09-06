import "./Editor.css";
import { useState, useEffect, useCallback } from "react";
import { emotionList, getFormattedDate } from "../util";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import EmotionItem from "./EmotionItem";

//initData : Editor 컴포넌트를 Edit 페이지에서 사용할 때 기존에 작성한 일기를 페이지에 보여줄 목적으로 전달되는 데이터
//onSubmit : 일기를 모두 작성하고 <작성 완료> 버튼을 클릭했을 때 호출할 이벤트 핸들러
const Editor = ({initData, onSubmit}) => {
    //useNavigate를 호출해 함수 navigate를 생성하면 페이지 간의 이동을 간편하게 구현할 수 있음
    const navigate = useNavigate();

    //Home 페이지에서 받은 initData를 State의 기본값으로 설정
    useEffect(() => {
        if (initData) {
            setState({
                ...initData,
                date: getFormattedDate(new Date(parseInt(initData.date))),
            });
        }
    }, [initData]);

    const [state, setState] = useState({
        date: getFormattedDate(new Date()), //초깃값 오늘 날짜로 설정
        emotionId:3,
        content: "",
    });

    //사용자가 입력한 날짜를 변경하면 호출되어 State를 업데이트함
    const handleChangeDate = (e) => {
        setState({
            ...state,
            date: e.target.value,
        });
    }; 

    //사용자가 작성한 일기 데이터를 state.content 프로퍼티에 저장
    const handleChangeContent = (e) => {
        setState({
            ...state,
            content: e.target.value,
        });
    };

    //작성 완료 버튼의 onClick 이벤트 핸들러
    const handleSubmit = () => {
        onSubmit(state);
    };

    //뒤로 가기 이벤트
    const handleOnGoBack = () => {
        navigate(-1);
    };

    //감정 이미지 선택 섹션에서 클릭한 이미지 번호를 emotionId에 저장한 후 이 번호로 현재 State의 emotionId값을 업데이트
    //Editor 컴포넌트를 리렌더 해도 함수 handleChangeEmotion을 다시 생성하지 않도록 메모이제이션 후 함수형 업데이트 사용
    const handleChangeEmotion = useCallback((emotionId) => {
        setState((state) => ({
            ...state,
            emotionId,
        }));
    }, []);

    return (
        <div className="Editor">
            <div className="editor_section">
                <h4>오늘의 날짜</h4>
                <div className="input_wrapper">
                    <input type="date" value={state.date}
                        onChange={handleChangeDate}/>
                </div>
            </div>
            <div className="editor_section">
                <h4>오늘의 감정</h4>
                <div className="input_wrapper emotion_list_wrapper">
                    {emotionList.map((it) => (
                        <EmotionItem
                            key={it.id}
                            {...it}
                            onClick={handleChangeEmotion}
                            isSelected={state.emotionId === it.id}
                        />
                    ))}
                </div>
            </div>
            <div className="editor_section">
                <h4>오늘의 일기</h4>
                <div className="input_wrapper">
                    <textarea 
                        placeholder="오늘은 어땠나요?"
                        value={state.content}
                        onChange={handleChangeContent}
                    />
                </div>
            </div>
            <div className="editor_section bottom_section">
                <Button text={"취소하기"} onClick={handleOnGoBack} />
                <Button text={"작성 완료"} type={"positive"} onClick={handleSubmit} />
            </div>
        </div>
    );
};
export default Editor;