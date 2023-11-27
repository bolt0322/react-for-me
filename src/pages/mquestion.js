import banana from "../App.module.css"; 
import React, { useState,useEffect, useCallback } from "react";
import qdata from "./question.json";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Page = styled.div`
    background-color: #fef1f1;
    width: 33%;
    min-height: 95vh;
    justify-content: center;
    margin: 0 auto;
    padding: 20px 0 60px;
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
    padding-top: 10px; 
    padding-bottom: 20px;
    font-size: 40px;
    text-align: center;
    vertical-align: top;
    color: #464040;
    font-family: 'Dnf', sans-serif;
    text-shadow: 0 0 6px #ffffff, 0 0 8px #ffffff, 0 0 20px #f2555a;
`
const ImgBox = styled.div`
display: flex;
flex-direction: column;
align-items: center;
display: flex;
justify-content: center;
`
const Subtitle = styled.div`
font-size: 23px;
font-weight: 800;
color: #f9a5a5;
text-align: center;
margin: 5px 0px 8px 0px;
font-family: var(--font-SCDream);
`
const PageCount = styled.div`
    font-family: var(--font-SCDream);
    color: #f9a5a5;
    font-weight: bold;
`
const Img = styled.img`
    width: 70%;
    height: auto;
    padding-top: 30px;
    padding-bottom: 30px;
`
const Question = styled.div`
    margin-top: 30px;
    margin-bottom: 30px;
    font-family: var(--font-SCDream);
    font-weight: bold;
    font-size: 17px;
`
const QuestionBtn = styled.div`
height: 50px;
width: 330px;
color: #fff;
font-family: var(--font-Suite);
font-size: 16px;
line-height: 40px;
border:none;
border-radius: 12px;
background-color: #464040;
cursor: pointer;
margin-bottom: 10px;
display: flex;
align-items: center;
justify-content: center;
`
const BtnContainer = styled.div`
    height: 100px;
`

function Mquestion() {
    const navigate = useNavigate();

    const [page, setPage] = useState('mquestion');
    const [count, setCount] = useState(0);
    const [data, setData] = useState([]);
    const [MBTI, setMBTI] = useState('');
    const [tasks, setTasks] = useState([]);

    function add_count() {
        if( count === 11){
            setMBTI(checkmbti(MBTI));
            navigate('/mresult');
        } else {
            setCount(count+1);
        }
        
    }

    const mbtiarr = ['E','I', 'S', 'N', 'T', 'F', 'P', 'J'];
    function checkmbti(apple){
        for(let i =0; i<8; i += 2){
            const countone = data.filter((item) => item === mbtiarr[i]).length;
            const counttwo = data.filter((item) => item === mbtiarr[i+1]).length;
            if (counttwo >= countone) {
                apple += mbtiarr[i+1];
            }else{
                apple += mbtiarr[i];
            }
        }
        return apple;
    }

    const handleClick = (value) => {
        setData([...data, value]);
    }

   
    const fetchData = useCallback ( async() => {    //문서 불러오기 위한 작업
        let tasksData = [];       //taskData라는 빈 배열 만듦 
        const docSnap = await getDocs(collection(db,"tasks"));  //docSnap으로 "tasks"라는 문서 불러옴
        docSnap.forEach((doc) => {   //docSnap.forEach는 문서 쪼개서 빈 배열에 넣어주겠다는 뜻
            tasksData.push({ mbti: doc.data().mbti, name: doc.data().nickname, id: doc.data().id});
        });
        setTasks(tasksData);
    },[]);
    useEffect(()=> {       //useEffect함수는 fetchData일 때만 실행
        fetchData();
    },[fetchData])
        console.log(tasks);


    return(
        <Page>
            <MbtiTest>MBTI TEST</MbtiTest>
                <ImgBox>
                    <Subtitle>Picnic Version</Subtitle>
                    <Img src="./images/flower.png" alt="대체 텍스트"></Img>
                    <PageCount>{count+1}/12</PageCount>
                </ImgBox>
                <Question>{qdata[count].question}</Question>
                <BtnContainer>
                    <QuestionBtn onClick={()=>{add_count(); handleClick(qdata[count].answer1.result); console.log(data)}}>{qdata[count].answer1.text}</QuestionBtn>
                    <QuestionBtn onClick={()=>{add_count(); handleClick(qdata[count].answer2.result); console.log(data)}}>{qdata[count].answer2.text}</QuestionBtn>
                </BtnContainer> 
        </Page>
    )
}
export default Mquestion;