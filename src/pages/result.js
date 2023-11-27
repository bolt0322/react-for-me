import banana from "../App.module.css"; 
import styled from "styled-components";
import { useLocation,Link,useHistory  } from "react-router-dom";

const Page = styled.div`
width: 600px;
min-height:100vh;
display:flex;
flex-direction: column;
align-items:center;
margin : 0 auto;
padding: 20px;
background-color:#fef1f1;
`
const ResultText = styled.div`
    font-family: 'Neo', sans-serif;
    font-size: 30px;
    width: 100%; 
    padding-top: 80px;
    padding-bottom: 30px;
    text-align: center;
`
const TestScore = styled.div`
    font-family: 'Dnf', sans-serif;
    font-size: 85px;
    padding-top: 70px;
    padding-bottom: 70px;
    text-shadow: 0 0 6px #ffffff, 0 0 8px #ffffff, 0 0 20px #f2555a;
`
const Btn = styled.button`
    font-family: 'Neo', sans-serif;
    font-size: 20px;
    color:white;
    width: 400px;
    height: 60px;
    background-color: #464040;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-top: 80px;
`
function Result(){
    const location = useLocation();
    const nickname = location.state.name;
    const score = location.state.showscore;
    return(
        <Page>
                <ResultText>"{nickname}"에 대한 나의 점수는??</ResultText>
                <TestScore>{score}점!!</TestScore>
                <Btn ><Link to={"/"}  style={{ textDecoration: "none",color: "white"}}>메뉴로 돌아가기</Link></Btn>
            
        </Page>
    )
}
export default Result;