//useParams : 브라우저에서 URL 입력 시 이 경로에 포함된 URL 파라미터를 객체 형태로 반환 
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import Button from "../component/Button";
import Header from "../component/Header";
import { getFormattedDate, setPageTitle } from "../util";
import Viewer from "../component/Viewer";

const Diary = () => {
    //useParams가 반환하는 URL 파라미터 객체에서 id 프로퍼티 값을 구조 분해 할당
    const {id} = useParams(); 
    const data = useDiary(id);
    // console.log(data); //처음에는 undefined였다가 시간이 지난 뒤 일기 데이터로 업데이트됨 -> 예외처리

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    const goEdit = () => {
        navigate(`/edit/${id}`);
    };

    useEffect(() => {
        setPageTitle(`${id}번 일기`);
    }, []);

    if (!data) {
        return <div>일기를 불러오고 있습니다...</div>;
    } else {
        const {date, emotionId, content} = data;
        const title = `${getFormattedDate(new Date(Number(date)))} 기록`;
        return (
            <div>
                <Header 
                    title={title}
                    leftChild={<Button text={"뒤로 가기"} onClick={goBack} />}
                    rightChild={<Button text={"수정하기"} onClick={goEdit} />}
                />
                <Viewer content={content} emotionId={emotionId} />
            </div>
        );
    }
};
export default Diary;