import banana from "../App.module.css"; 
import React, { useState,useEffect, useCallback } from "react";
import rdata from "./resultType.json";
import { collection, addDoc,getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

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

function Mresult() {
    const navigate = useNavigate();

    const [page, setPage] = useState('mresult');
    const [MBTI, setMBTI] = useState('');
    const [UIDvalue, setUIDvalue] = useState('');
    const [tasks, setTasks] = useState([]);
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);

    const resultData = rdata[MBTI];

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

    const handleReload = () => {
        window.location.reload();
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
              mbti: MBTI,
              nickname: UIDvalue
            });
            console.log("Document written with ID: ", docRef.id);
        }
        applydata();
    }
   
    const fetchData = useCallback ( async() => {    //문서 불러오기 위한 작업
       try {
        const tasksData = [];       //taskData라는 빈 배열 만듦 
        const docSnap = await getDocs(collection(db,"tasks"));  //docSnap으로 "tasks"라는 문서 불러옴
        docSnap.forEach((doc) => {   //docSnap.forEach는 문서 쪼개서 빈 배열에 넣어주겠다는 뜻
            tasksData.push({ mbti: doc.data().mbti, name: doc.data().nickname, id: doc.data().id});
        });
        setTasks(tasksData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    },[]);

    useEffect(()=> {       //useEffect함수는 fetchData일 때만 실행
        fetchData();
    },[fetchData]);

    const [inputValue, setInputValue] = useState(''); //입력상자의 값을 관리할 상태
    const handleInputChange = (event) => {   //입력값이 변경될 때 호출되는 함수
        setInputValue(event.target.value);
    };


    return(
        <Page>
            return(
            
                         <div className={banana.page}>
                       
                             <div className={banana.mbti}>MBTI 테스트 결과</div>
                             <div className={banana.resultContent}>
                                 <div className={banana.middle}>나의 유형은..?</div>
                                <div className={banana.resultTitle}>🌷{MBTI}🌷</div>
                                 <div className={banana.ex01}>{rdata[MBTI].summary}</div>
                                 <div className={banana.ex02}>{rdata[MBTI].text1}</div>
                                 <div className={banana.ex03}>{rdata[MBTI].text2[0]}</div>
                                 <div className={banana.inputBtn}>
                                     <input     //닉네임 적는 칸
                                         value={UIDvalue}
                                         onChange={UIDvalueChange}   //onChange는 값이 변할 때마다 이 함수 불러옴
                                         type="text"
                                         placeholder="닉네임을 입력해주세요"/> 
                                    <button className={banana.NextBtn} onClick={()=>{checkapply(); alert('저장완료!')}}>저장하기</button>
                                    
                                </div>
                               
                                    <div className={banana.btn} onClick={()=>{setCount(0); setData([]); setPage('data'); fetchData()}}>다음 페이지</div>                
                                     <div className={banana.btn} onClick={handleReload}>처음으로 돌아가기</div>
                               
                              
                             </div>
                            
                         </div>
                     )
        </Page>
    )
}
export default Mresult;