import banana from "../App.module.css"; 
import React, { useState,useEffect, useCallback } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
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

function Mdata() {  
    const handleReload = () => {
        window.location.reload();
    };
    // eei snn ttt pjj
    
    const [tasks, setTasks] = useState([]);

    // const [userInput, setUserInput] = useState(''); //친구테스트 질문 입력하기
   
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
             <div className={banana.page}>
                 <div className={banana.mbti}>mbti 테스트 결과 </div>
                 <div className={banana.resultContent}>
                     {tasks.map((task) => {
                         return(
                         <tr key={task.id}>
                             <td>{task.name}</td>
                             <td>{task.mbti}</td>
                         </tr>
                     )})
                     }
                 </div>
                
                
                <div className={banana.btn} onClick={handleReload}>다시 테스트하기</div>
                 <Link to="/" style={{ textDecoration: "none", color: "inherit" }}><div className={banana.btn} >메인페이지로 돌아가기</div></Link>
             </div>
         
        </Page>   
    )
}
export default Mdata;