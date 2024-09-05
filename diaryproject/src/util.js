import emotion1 from "./img/emotion1.png";
import emotion2 from "./img/emotion2.png";
import emotion3 from "./img/emotion3.png";
import emotion4 from "./img/emotion4.png";
import emotion5 from "./img/emotion5.png";

//감정 이미지를 반환하는 함수
export const getEmotionImgById = (emotionId) => {
    const targetEmotionId = String(emotionId);
    switch (targetEmotionId) {
        case "1":
            return emotion1;
        case "2":
            return emotion2;
        case "3":
            return emotion3;
        case "4":
            return emotion4;
        case "5":
            return emotion5;
        default:
            return null;
    }
};

//날짜 입력 폼의 초깃값을 자동으로 yyyy-mm-dd 형식으로
export const getFormattedDate = (targetDate) => {
    let year = targetDate.getFullYear();
    let month = targetDate.getMonth() + 1;
    let date = targetDate.getDate();
    if(month < 10){
        month = `0${month}`;
    }
    if(date < 10){
        date = `0${date}`;
    }
    return `${year}-${month}-${date}`;
};

//감정 이미지 리스트를 데이터 형태로 만들기
//화살표 함수는 호이스팅 대상이 아님 -> getEmotionImgById보다 뒤에 작성해야 함
export const emotionList = [
    {
        id:1,
        name: "완전 좋음",
        img: getEmotionImgById(1),
    },
    {
        id:2,
        name: "좋음",
        img: getEmotionImgById(2),
    },
    {
        id:3,
        name: "그럭저럭",
        img: getEmotionImgById(3),
    },
    {
        id:4,
        name: "나쁨",
        img: getEmotionImgById(4),
    },
    {
        id:5,
        name: "끔찍함",
        img: getEmotionImgById(5),
    },
];