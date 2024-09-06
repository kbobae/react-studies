import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DiaryList.css";
import Button from "./Button";
import DiaryItem from "./DiaryItem";

//정렬 옵션
const sortOptionList = [
    {value: "latest", name: "최신순"},
    {value: "oldest", name: "오래된 순"}
];

const DiaryList = ({data}) => {
    const [sortType, setSortType] = useState("latest");
    const [sortedData, setSortedData] = useState([]);
    
    //정렬 기준 변경 시 새 기준으로 sortType을 업데이트할 이벤트 핸들러
    const onChangeSortType = (e) => {
        setSortType(e.target.value);
    };
    
    //페이지 이동
    const navigate = useNavigate();

    const onClickNew = () => {
        navigate("/New");
    };

    //Props로 받은 data를 선택한 sortType에 따라 정렬하고, 정렬된 일기 리스트를 렌더링
    //data나 sortType이 변할 때마다 sortedData를 업데이트해야 함
    useEffect(() => {
        const compare = (a, b) => {
            if (sortType === "latest") {
                return Number(b.date) - Number(a.date);
            } else {
                return Number(a.date) - Number(b.date);
            }
        };
        const copyList = JSON.parse(JSON.stringify(data));
        copyList.sort(compare);
        setSortedData(copyList);
    }, [data, sortType]);

    return (
        <div className="DiaryList">
            <div className="menu_wrapper">
                <div className="left_col">
                    <select value={sortType} onChange={onChangeSortType}>
                        {sortOptionList.map((it, idx) => (
                            <option key={idx} value={it.value}>
                                {it.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="right_col">
                    <Button 
                        type={"positive"} 
                        text={"새 일기 쓰기"}
                        onClick={onClickNew} 
                    />
                </div>
            </div>
            <div className="list_wrapper">
                {sortedData.map((it) => (
                    <DiaryItem key={it.id} {...it} />
                ))}
            </div>
        </div>
    );
};
export default DiaryList;