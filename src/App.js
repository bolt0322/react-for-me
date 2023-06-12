import banana from "./App.module.css"; 
import React, { useState,useEffect, useCallback } from "react";
import qdata from "../src/question.json";
import rdata from "../src/resultType.json";
import { collection, addDoc,getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { async } from "@firebase/util"; //eslint-disable-line no-unused-vars
//만약에 count가 12가 되면 page 를 result 바꿔준다
// setpage()  =   page = 13   / page= 'start'    => page ='question'
//setcount()
//setcount( count +1 )
//count = count +1
//i=2
//if(i==1){
//   이건 1이야
//} else{
//   일이 아닙니다.. 
//}
// 만약에 page가 start 라면 console.log('start') 아니고 만약 page가 question이라면 console.log('question') 아니라면 console.log('result')


function App() {
    const [page, setPage] = useState('start');
    const [count, setCount] = useState(0);
    const [data, setData] = useState([]);
    const [MBTI, setMBTI] = useState('');
    const [showAlert, setShowAlert] = useState(false); //'showAlert'는 알림창 표시할지 여부 나타내는 불리언 값
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

    // eei snn ttt pjj
    
    const UIDvalueChange = (e) => {
        const trimmedValue = e.target.value.replace(/^\s+/g, '');
        setUIDvalue(trimmedValue);
    };
    const [UIDvalue, setUIDvalue] = useState('');
    const [tasks, setTasks] = useState([]);
   
    const checkapply =() =>{
        const applydata = async () => {
            const docRef = await addDoc(collection(db, "tasks"), {
              mbti: MBTI,
              nickname: UIDvalue
            });
            console.log("Document written with ID: ", docRef.id);
        }
        applydata();
    }
   
    const fetchData = useCallback ( async() => {
        let tasksData = [];
        const docSnap = await getDocs(collection(db,"tasks"));
        docSnap.forEach((doc) => {
            tasksData.push({ mbti: doc.data().mbti, name: doc.data().nickname, id: doc.data().id});
        });
        setTasks(tasksData);
    },[]);
    useEffect(()=> {
        fetchData();
    },[fetchData])
        console.log(tasks);
    

    // function MyComponent=()=> {      //닉네임 저장할 때 뜨는 알림창 함수
    //     const handleClick=()=> {   //이 함수는 버튼 클릭 시 'setShowAlert' 호출해서 'showAlert'값을 'true'로 변경
    //         alert('저장되었습니다!');
    //         setShowAlert(true);
    //     };
    // }
    
    
    
    
    if(page==="start") {
        return (
            <div className={banana.page}> 
                <div className={banana.mbti}>mbti 테스트</div>
                <div className={banana.content}>
                    <div className={banana.title}>피크닉 버전으로 go!</div>
                    <div className={banana.middle}>나의 MBTI는..?</div>
                    <img className={banana.image} src="./img/mbti.jpg" alt=""/>
                    <div className={banana.btn} onClick={()=>{setPage('question')}}>시작하기</div>
                </div>
            </div>
        )
    } else if (page==="question"){
        return (
            <div className={banana.page}>
                <div className={banana.mbti}>MBTI 테스트</div>
                <div className={banana.titleBox}>
                    <div className={banana.title}>Picnic Version</div>
                    <div>{count+1}/12</div>
                </div>
                <img className={banana.image} src={qdata[count].img} alt=""/> 
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
                        <input 
                            value={UIDvalue}
                                onChange={UIDvalueChange}
                                type="text"
                                placeholder="닉네임을 입력해주세요"/>
                        
                            <button className={banana.NextBtn} onClick={()=>{checkapply(); alert('저장완료!')}}>저장하기</button>
                        
                    </div>
                   
                        <div className={banana.btn} onClick={()=>{setCount(0); setData([]); setPage('data'); fetchData()}}>다음 페이지</div>                
                        <div className={banana.btn} onClick={()=>{setCount(0); setData([]); setPage('start')}}>처음으로 돌아가기</div>
                   
                  
                </div>
                
            </div>
        )
    } else {
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
            </div>
        )
    }
}

export default App;