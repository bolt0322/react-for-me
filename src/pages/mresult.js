import React, { useState,useEffect, useCallback } from "react";
import rdata from "./resultType.json";
import { collection, addDoc,getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Page = styled.div`
    width: 500px;
    background-color:#fef1f1;
    min-height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin : 0 auto;
    padding: 20px 0 60px;
`
const Team = styled.div`
    font-family: 'Beomsuk', sans-serif;
    font-size: 15px;
    color: #464040;
    display: flex;
    justify-content: center;
`
const Title = styled.div`
    font-family: var(--font-SCDream);
    font-weight: 700;
    font-size: 37px;
    color: #464040;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0 15px;
`
const ResultContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-top: 4px dashed #464040;
    border-bottom: 4px dashed #464040;
    color: #464040;
    height: 100%;
    margin: 0 70px;
    padding: 17px 0;
`
const Sub = styled.div`
    font-family: var(--font-SCDream);
    font-size: 14px;
    font-weight: bold;
    color: #464040;
`
const Result = styled.div`
    font-family: 'Dnf', sans-serif;
    font-size: 40px;
    text-shadow: 0 0 6px #ffffff, 0 0 8px #ffffff, 0 0 20px #f2555a;
    margin: 10px 0 30px;
    color: #464040;
`
const Ex01 = styled.div`
    font-family: 'Dov', sans-serif;
    font-size: 22px;
    margin-bottom: 10px;
    color: #464040;
`
const Ex02 = styled.div`
    font-family: var(--font-Suite);
    font-size: 16px;
    color: #464040;
`
const BtnContainer = styled.div`
    padding: 0 70px;
`
const InputBtn = styled.div`
    height: 40px;
    width: 350px;
    display: flex;
    justify-content: space-between;
    padding: 5px 5px;
    background-color: #fadbdb;
    border-radius: 10px;
    margin: 20px 0 10px;
    background-color: #464040;
`
const Button = styled.div`
    height: 50px;
    width: 360px;
    color: #fff;
    font-family: var(--font-Suite);
    font-size: 16px;
    line-height: 40px;
    border:none;
    border-radius: 10px;
    background-color: #464040;
    cursor: pointer;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const SaveBtn = styled.div`
    font-family: var(--font-Suite);
    font-size: 13px;
    padding: 0 5px;
    line-height: 40px;
    color: #464040;
    background-color: #fef1f1;    
    border:none;
    border-radius: 12px;    
    cursor: pointer;
    
`

function Mresult() {
    const navigate = useNavigate();

    const location = useLocation();
    const hi = location.state && location.state.MBTI ? location.state.MBTI : [];
    const [UIDvalue, setUIDvalue] = useState('');
   
    const handleReload = () => {
        window.location.href = "/";
    };
    // eei snn ttt pjj
    
    const UIDvalueChange = (e) => {      //UIDvalue 바뀔 때마다 저장해주는 함수
        const trimmedValue = e.target.value.replace(/^\s+/g, '');  //띄어쓰기 무시하기
        setUIDvalue(trimmedValue);
    };

    // const [userInput, setUserInput] = useState(''); //친구테스트 질문 입력하기
   
    const checkapply =() =>{     //닉네임 저장하기 버튼 누르면 실행되는 함수
        const applydata = async () => {
            const docRef = await addDoc(collection(db, "tasks"), {  
              mbti: hi,
              nickname: UIDvalue
            });
            console.log("Document written with ID: ", docRef.id);
        }
        applydata();
    }
   
  

    return(
        <Page>
            <Team>MBTI TEAM PROJECT</Team>
            <Title>MBTI 테스트 결과</Title>
                <ResultContent>
                    <Sub>과연 나의 유형은...?</Sub>
                    <Result>🌷{hi}🌷</Result>
                    <Ex01>{rdata[hi].summary}</Ex01>
                    <Ex02>{rdata[hi].text1}</Ex02>
                    <Ex02>{rdata[hi].text2}</Ex02>
                </ResultContent>
                <BtnContainer>
                    <InputBtn>                     
                        <input     //닉네임 적는 칸
                            value={UIDvalue}
                            onChange={UIDvalueChange}   //onChange는 값이 변할 때마다 이 함수 불러옴
                            type="text"
                            placeholder="닉네임을 입력해주세요"/> 
                        <SaveBtn onClick={()=>{checkapply(); alert('저장완료!')}}>저장하기</SaveBtn>
                    </InputBtn>
                    <Button onClick={()=>{navigate('/mdata')}}>다음 페이지</Button>                
                    <Button onClick={handleReload}>처음으로 돌아가기</Button>                
                </BtnContainer>
        </Page>
    )
}
export default Mresult;