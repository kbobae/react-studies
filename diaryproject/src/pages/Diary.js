//useParams : 브라우저에서 URL 입력 시 이 경로에 포함된 URL 파라미터를 객체 형태로 반환 
import { useParams } from "react-router-dom";

const Diary = () => {
    //useParams가 반환하는 URL 파라미터 객체에서 id 프로퍼티 값을 구조 분해 할당
    const {id} = useParams(); 

    return (
        <div>
            <div>{id}번 일기</div>
            <div>Diary 페이지입니다.</div>
        </div>
    );
};
export default Diary;