import banana from "../App.module.css"; 
import styled from "styled-components";
import { useLocation,Link } from "react-router-dom";
const Btn = styled.button`
    width:100%;
    display:flex;
    border: none;
    background-color: transparent;
    margin-top:40px;
    justify-content:center;
`
function Result(){
    const location = useLocation();
    const nickname = location.state.name;
    return(
        <div className={banana.page}>
                <div className={banana.testResult}>"{nickname}" 에 대한 나의 점수는?</div>
                <div className={banana.testScore}>80점!</div>
                <Btn ><div className={banana.myPgEnd}><Link to={"/"}  style={{ textDecoration: "none",color: "white"}}>메뉴로 돌아가기</Link></div></Btn>
            
        </div>
    )
}
export default Result;