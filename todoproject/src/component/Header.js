import React from "react";
import "./Header.css";

 const Header = () => {
        // console.log("Header 업데이트");
     return <div className="Header">
             <h3>오늘은 📆</h3>
             <h1>{new Date().toDateString()}</h1>
         </div>
 };
 export default React.memo(Header);
 //마운트할 때를 제외하고는 Header 컴포넌트를 불필요하게 렌더링하지 않도록 최적화
 //복잡한 연산을 하지 않거나 큰 기능이 없는 컴포넌트는 최적화 대상이 아님