 import banana from "./App.module.css"; 
import React, { useState,useEffect, useCallback } from "react";
import qdata from "../src/question.json";
import rdata from "../src/resultType.json";
import { collection, addDoc,getDocs } from "firebase/firestore";
import { db } from "./firebase";
import mbti from "./public/image/mbti.jpg";
import img from "./public/image/img02.jpg"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Mbtiapp() {
    const [page, setPage] = useState('start');
    const [count, setCount] = useState(0);
    const [data, setData] = useState([]);
    const [MBTI, setMBTI] = useState('');
    function add_count() {
        if( count === 11){
            setMBTI(checkmbti(MBTI));
            setPage('result');
        } else {
            setCount(count+1);
        }
        
    }


    // const changeHandler = (id) => {
    //     setCheckedInputs([...checkedInputs, id]);
    // };
    // const countE = checkedInputs.filter(item => item ==='E').length;
    // const countI = checkedInputs.filter(item => item ==='I').length;
    // const countN = checkedInputs.filter(item => item ==='N').length;
    // const countS = checkedInputs.filter(item => item ==='S').length;
    // const countF = checkedInputs.filter(item => item ==='F').length;
    // const countT = checkedInputs.filter(item => item ==='T').length;
    // const countP = checkedInputs.filter(item => item ==='P').length;
    // const countJ = checkedInputs.filter(item => item ==='J').length;
    // let lastMBTI = "";
    // if (count === 11){
    //     countE>countI ? lastMBTI += 'E' : lastMBTI += 'I' ;
    //     countN>countS ? lastMBTI += 'N' : lastMBTI += 'S' ;
    //     countF>countT ? lastMBTI += 'F' : lastMBTI += 'T' ;
    //     countP>countJ ? lastMBTI += 'P' : lastMBTI += 'J' ;   
    //     console.log(lastMBTI);
    // }



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
    const [UIDvalue, setUIDvalue] = useState('');
    const [tasks, setTasks] = useState([]);


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


    
    // function MyComponent=()=> {      //닉네임 저장할 때 뜨는 알림창 함수
    //     const handleClick=()=> {   //이 함수는 버튼 클릭 시 'setShowAlert' 호출해서 'showAlert'값을 'true'로 변경
    //         alert('저장되었습니다!');
    //         setShowAlert(true);
    //     };
    // }

    // function UserInputPage() {
    //     const [userInput, setUserInput] = useState('');

    //     const handleInputChange = (event) => {
    //         setUserInput(event.target.value);
    //     };

    //     const handleSubmit = (event) => {
    //         event.preventDefault();
    //         console.log('사용자의 입력 : ', userInput);
    //     }
    // } //여기까지가 친구테스트에서 질문 작성해넣는 함수


    const [inputValue, setInputValue] = useState(''); //입력상자의 값을 관리할 상태
    const handleInputChange = (event) => {   //입력값이 변경될 때 호출되는 함수
        setInputValue(event.target.value);
    };
    
    
    
    
    
    if(page==="start") {
        return (
            <div className={banana.page}> 
                <div className={banana.team}>MBTI TEAM PROJECT</div>
                <div className={banana.mbti}>MBTI TEST</div>
                <div className={banana.content}>
                    <div className={banana.title}>피크닉 버전으로 go!</div>
                    <div className={banana.middle}>나의 MBTI는..?</div>
                    <img className={banana.image} src={mbti} alt=""/>
                    <div className={banana.btn} onClick={()=>{setPage('question')}}>시작하기</div>
 
                </div>
            </div>
        )
    } else if (page==="question"){
        return (
            <div className={banana.page}>
                <div className={banana.team}>MBTI TEAM PROJECT</div>
                <div className={banana.mbti}>MBTI Test</div>
                <div className={banana.titleBox}>
                    <div className={banana.title}>Picnic Version</div>
                    <div>{count+1}/12</div>
                </div>
                <img className={banana.image} src={img} alt=""/> 
                {console.log(qdata[count].img)}
                <div className={banana.ques}>{qdata[count].question}</div>
                <div className={banana.btn} onClick={()=>{add_count(); handleClick(qdata[count].answer1.result); console.log(data)}}>{qdata[count].answer1.text}</div>
                <div className={banana.btn} onClick={()=>{add_count(); handleClick(qdata[count].answer2.result); console.log(data)}}>{qdata[count].answer2.text}</div>
            </div>
        )
    } else if (page==="result"){
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
    } else if (page==="data"){
        return(
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
        )
    }
}

export default Mbtiapp;