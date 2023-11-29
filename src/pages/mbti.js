import banana from "../App.module.css"; 
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Page = styled.div`
    background-color: #fef1f1;
    width: 33%;
    min-height: 100vh;
    justify-content: center;
    margin: 0 auto;
    padding: 20px 0 60px;
    
`
const Wrapper = styled.div`
    align-items:center;
    flex-direction: column;
    display:flex;       
`
const Team = styled.div`
    font-family: 'Beomsuk', sans-serif;
    font-size: 15px;
    display: flex;
    justify-content: center;
`
const MbtiTest = styled.div`
    padding-top: 80px; 
    padding-bottom: 10px;
    font-size: 40px;
    text-align: center;
    vertical-align: top;
    color: #464040;
    font-family: 'Dnf', sans-serif;
    text-shadow: 0 0 6px #ffffff, 0 0 8px #ffffff, 0 0 20px #f2555a;
`
const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    display: flex;
    justify-content: center;
`
const Subtitle = styled.div`
    width: 340px;
    text-align:center;
    padding: 10px 0;
    margin: 30px;
    font-weight:400;
    font-family: 'Gmarket', sans-serif;
    border-top: 4px dashed #464040;
    border-bottom: 4px dashed  #464040;
    color: #464040;
`
const Img = styled.img`
    width: 40%;
    height: auto;
    margin: 0 auto;
    margin-bottom: 82px;
`
const Sub = styled.div`
    font-size: 15px;
    font-weight: 800;
    color: #f9a5a5;
    text-align: center;
    margin-bottom: 10px;
    font-family: var(--font-SCDream);
`
const StartBtn = styled.div`
    font-family: 'Gmarket', sans-serif;
    font-size: 26px;
    color: #fff;
    background-color: #464040;
    width: 340px;
    height: 60px;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
`

function Mbti() {
    const [page, setPage] = useState('start');
    

    return(
        <Page>
            <Wrapper>
                <Team>MBTI TEAM PROJECT</Team>
                <Subtitle>피크닉 버전으로 go!</Subtitle>
                    <Content>
                        <MbtiTest>MBTI TEST</MbtiTest>
                        <Img src="./images/micon.jpg" alt="대체 텍스트"></Img>
                        <Sub>나의 MBTI는...?</Sub>
                        <Link to="/mquestion" style={{ textDecoration: "none", color: "inherit" }}><StartBtn>시작하기</StartBtn></Link>
                    </Content>
            </Wrapper>
        </Page>
    )
}
export default Mbti;