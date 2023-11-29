import banana from "../App.module.css"; 
import styled from "styled-components";
import { db } from "../firebase";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";

const MyTest = styled.div`
    font-family: 'Neo', sans-serif;
    font-size: 40px;
    width: 100%; 
    padding-top: 40px;
    padding-bottom: 40px;
    text-align: center;
`
const Nickname = styled.div`
    text-align:center;
    margin: 20px 0 40px;
    font-family: 'SCDream', sans-serif;
    font-weight: 600;
`
const Questionbox = styled.div`
    display:flex;
    justify-content: space-between;
    padding: 0 px 30px;
    margin:20px;
`
const Question = styled.div`
    display:flex;
    align-items:center;
    font-family: 'SCDream', sans-serif;
    font-weight: 600;
`
const Input = styled.input`
    margin:0px 10px;
    width: 300px;
    padding:10px;
    background-color: #fef1f1;
    border: 2px solid #464040;
    border-radius: 5px;
    &:hover{
        border: 2px solid #ee9090;
    }
    &:focus {
        border: 2px solid #ee9090;
        outline: none; /* 포커스 아웃라인 제거 */
        
    }
`
const Checkbox = styled.input`
    margin: 0 10px;
`
const Page = styled.div`
    width: 800px;
    min-height:100vh;

    margin : 0 auto;
    padding: 20px;
    background-color:#fef1f1;

`
const Btn = styled.button`
    width:100%;
    display:flex;
    border: none;
    background-color: transparent;
    margin-top:40px;
    justify-content:center;
`
const BtnStyle = styled.div`
    font-family: 'Neo', sans-serif;
    font-size: 20px;
    color:white;
    width: 400px;
    height: 60px;
    background-color: #464040;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`

function Create(){
    const [name, setName] = useState("");
    const [adata, setAdata] = useState("");
    const [bdata, setBdata] = useState("");
    const [cdata, setCdata] = useState("");
    const [ddata, setDdata] = useState("");
    const [edata, setEdata] = useState("");
    const [fdata, setFdata] = useState("");
    const [gdata, setGdata] = useState("");
    const [hdata, setHdata] = useState("");
    const [idata, setIdata] = useState("");
    const [jdata, setJdata] = useState("");

    const [answer, setAnswer] = useState([null, null, null, null, null, null, null, null, null, null]);

  const handleCheckboxClick = (index, value) => {
    const newAnswer = [...answer];
    newAnswer[index] = value;
    setAnswer(newAnswer);
  };
    const handleSaveData = async () => {
        try {
            const docRef = await addDoc(collection(db, "users"), {
                nickname: name,
                question1: adata,
                question2: bdata,
                question3: cdata,
                question4: ddata,
                question5: edata,
                question6: fdata,
                question7: gdata,
                question8: hdata,
                question9: idata,
                question10: jdata,
                answer1: answer[0],      //테스트 낸 사람의 답안을 answer1에 저장      
                answer2: answer[1],
                answer3: answer[2],
                answer4: answer[3],
                answer5: answer[4],
                answer6: answer[5],
                answer7: answer[6],
                answer8: answer[7],
                answer9: answer[8],
                answer10: answer[9]
            });
            console.log("Document written with ID: ", docRef.id);

        } catch (error) {
            console.error("Error adding document: ", error);
        }
        alert("저장되었습니다!");

        window.location.href = "/main";
    };

    return(
        <Page >
                <MyTest>나의 테스트 만들기!</MyTest>
     
                <Nickname>
                    닉네임을 입력해주세요 : 
                    <Input 
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Nickname>
                <Questionbox >
                    <Question >
                        <div >질문 1 : </div>
                        <Input
                            type="text"
                            placeholder="입력하기"
                                
                            value={adata}
                            onChange={(e) => setAdata(e.target.value)}
                        />
                    </Question>
                    <Question>
                        <Checkbox
                            type="checkbox"
                            onChange={() => handleCheckboxClick(0, true)}
                            checked={answer[0] === true}
                        />
                        <div >그렇다</div>
                        <Checkbox
                            type="checkbox"
                            onChange={() => handleCheckboxClick(0, false)}
                            checked={answer[0] === false} 
                        />
                        <div>아니다</div>
                    </Question>
                </Questionbox>
                <Questionbox >
                    <Question >
                        <div >질문 2 : </div>
                        <Input
                            type="text"
                            placeholder="입력하기"
                                
                            value={bdata}
                            onChange={(e) => setBdata(e.target.value)}
                        />
                    </Question>
                    <Question>
                        <Checkbox
                            type="checkbox"
                            onChange={() => handleCheckboxClick(1, true)}
                            checked={answer[1] === true}
                        />
                        <div >그렇다</div>
                        <Checkbox
                            type="checkbox"
                            onChange={() => handleCheckboxClick(1, false)}
                            checked={answer[1] === false}
                        />
                        <div>아니다</div>
                    </Question>
                </Questionbox>
                <Questionbox >
                    <Question >
                        <div >질문 3 : </div>
                        <Input
                            type="text"
                            placeholder="입력하기"
                                
                            value={cdata}
                            onChange={(e) => setCdata(e.target.value)}
                        />
                    </Question>
                    <Question>
                        <Checkbox
                            type="checkbox"
                            onChange={() => handleCheckboxClick(2, true)}
                            checked={answer[2] === true}
                        />
                        <div >그렇다</div>
                        <Checkbox
                            type="checkbox"
                            onChange={() => handleCheckboxClick(2, false)}
                            checked={answer[2] === false}
                        />
                        <div>아니다</div>
                    </Question>
                </Questionbox>
                <Questionbox >
                    <Question >
                        <div >질문 4 : </div>
                        <Input
                            type="text"
                            placeholder="입력하기"
                                
                            value={ddata}
                            onChange={(e) => setDdata(e.target.value)}
                        />
                    </Question>
                    <Question>
                        <Checkbox
                            type="checkbox"
                            onChange={() => handleCheckboxClick(3, true)}
                            checked={answer[3] === true}
                        />
                        <div >그렇다</div>
                        <Checkbox
                            type="checkbox"
                            onChange={() => handleCheckboxClick(3, false)}
                            checked={answer[3] === false}
                        />
                        <div>아니다</div>
                    </Question>
                </Questionbox>
                <Questionbox >
                    <Question >
                        <div >질문 5 : </div>
                        <Input
                            type="text"
                            placeholder="입력하기"
                                
                            value={edata}
                            onChange={(e) => setEdata(e.target.value)}
                        />
                    </Question>
                    <Question>
                        <Checkbox
                            type="checkbox"
                            onChange={() => handleCheckboxClick(4, true)}
                            checked={answer[4] === true}
                        />
                        <div >그렇다</div>
                        <Checkbox
                            type="checkbox"
                            onChange={() => handleCheckboxClick(4, false)}
                            checked={answer[4] === false}
                        />
                        <div>아니다</div>
                    </Question>
                </Questionbox>
                <Questionbox >
                    <Question >
                        <div >질문 6 : </div>
                        <Input
                            type="text"
                            placeholder="입력하기"
                                
                            value={fdata}
                            onChange={(e) => setFdata(e.target.value)}
                        />
                    </Question>
                    <Question>
                        <Checkbox
                            type="checkbox"
                            onChange={() => handleCheckboxClick(5, true)}
                            checked={answer[5] === true}
                        />
                        <div >그렇다</div>
                        <Checkbox
                            type="checkbox"
                            onChange={() => handleCheckboxClick(5, false)}
                            checked={answer[5] === false}
                        />
                        <div>아니다</div>
                    </Question>
                </Questionbox>
                <Questionbox >
                    <Question >
                        <div >질문 7 : </div>
                        <Input
                            type="text"
                            placeholder="입력하기"
                                
                            value={gdata}
                            onChange={(e) => setGdata(e.target.value)}
                        />
                    </Question>
                    <Question>
                        <Checkbox
                            type="checkbox"
                            onChange={() => handleCheckboxClick(6, true)}
                            checked={answer[6] === true}
                        />
                        <div >그렇다</div>
                        <Checkbox
                            type="checkbox"
                            onChange={() => handleCheckboxClick(6, false)}
                            checked={answer[6] === false}
                        />
                        <div>아니다</div>
                    </Question>
                </Questionbox>
                <Questionbox >
                    <Question >
                        <div >질문 8 : </div>
                        <Input
                            type="text"
                            placeholder="입력하기"
                                
                            value={hdata}
                            onChange={(e) => setHdata(e.target.value)}
                        />
                    </Question>
                    <Question>
                        <Checkbox
                            type="checkbox"
                            onChange={() => handleCheckboxClick(7, true)}
                            checked={answer[7] === true}
                        />
                        <div >그렇다</div>
                        <Checkbox
                            type="checkbox"
                            onChange={() => handleCheckboxClick(7, false)}
                            checked={answer[7] === false}
                        />
                        <div>아니다</div>
                    </Question>
                </Questionbox>
                <Questionbox >
                    <Question >
                        <div >질문 9 : </div>
                        <Input
                            type="text"
                            placeholder="입력하기"
                                
                            value={idata}
                            onChange={(e) => setIdata(e.target.value)}
                        />
                    </Question>
                    <Question>
                        <Checkbox
                            type="checkbox"
                            onChange={() => handleCheckboxClick(8, true)}
                            checked={answer[8] === true}
                        />
                        <div >그렇다</div>
                        <Checkbox
                            type="checkbox"
                            onChange={() => handleCheckboxClick(8, false)}
                            checked={answer[8] === false}
                        />
                        <div>아니다</div>
                    </Question>
                </Questionbox>
                <Questionbox >
                    <Question >
                        <div >질문10: </div>
                        <Input
                            type="text"
                            placeholder="입력하기"
                                
                            value={jdata}
                            onChange={(e) => setJdata(e.target.value)}
                        />
                    </Question>
                    <Question>
                        <Checkbox
                            type="checkbox"
                            onChange={() => handleCheckboxClick(9, true)}
                            checked={answer[9] === true}
                        />
                        <div >그렇다</div>
                        <Checkbox
                            type="checkbox"
                            onChange={() => handleCheckboxClick(9, false)}
                            checked={answer[9] === false}
                        />
                        <div>아니다</div>
                    </Question>
                </Questionbox>
                
                <Btn onClick={handleSaveData} ><BtnStyle>저장 후 메인 페이지로 돌아가기</BtnStyle></Btn>
            </Page>
    )
}
export default Create;