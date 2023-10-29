import banana from "../App.module.css"; 
import styled from "styled-components";
import { db } from "../firebase";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
const Nickname = styled.div`
    text-align:center;
    margin: 20px 0 40px;
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
`
const Input = styled.input`
    margin:0px 10px;
    width: 300px;
    padding:10px;
    background-color: transparant;
    border: 1px solid black;
    border-radius: 5px;
    &:hover{
        border: 1px solid #80cee1;
    }
    &:focus {
        border: 1px solid #80cee1;
        outline: none; /* 포커스 아웃라인 제거 */
        
    }
`
const Checkbox = styled.input`
    margin: 0 10px;
`
const Page = styled.div`
    width: 800px;
    margin : 0 auto;
    padding: 20px;
    border: 2px solid #dcdada;
`
const Btn = styled.button`
    width:100%;
    display:flex;
    border: none;
    background-color: transparent;
    margin-top:40px;
    justify-content:center;
`
function Create(){
    const [adata, setAdata] = useState("");
    const [bdata, setBdata] = useState("");
    const [cdata, setCdata] = useState("");
    const [ddata, setDdata] = useState("");
    const [edata, setEdata] = useState("");
    const [name, setName] = useState("");
    const handleSaveData = async () => {
      try {
        // Firestore에 데이터 추가
        const docRef = await addDoc(collection(db, "users"), {
          // your_collection_name에 데이터를 추가할 수 있습니다.
          nickname: name,
          question1: adata,
          question2: bdata,
          question3: cdata,
          question4: ddata,
          question5: edata,
        });
  
        console.log("Document written with ID: ", docRef.id);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
      alert("저장되었습니다!");

    // 확인 버튼을 누르면 메인 페이지로 이동
    window.location.href = "/";
    };

    return(
        <Page >
                <div className={banana.friends}>나의 테스트 만들기!</div>
     
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
                            <div >질문 : </div>
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
                                />
                            <div >그렇다</div>
                            <Checkbox
                                type="checkbox"
                                />
                            <div>아니다</div>
                        </Question>
                    </Questionbox>
                    <Questionbox >
                       
                        <Question >
                            <div >질문 : </div>
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
                                />
                            <div >그렇다</div>
                            <Checkbox
                                type="checkbox"
                                />
                            <div>아니다</div>
                        </Question>
                    </Questionbox>
                    <Questionbox >
                       
                        <Question >
                            <div >질문 : </div>
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
                                />
                            <div >그렇다</div>
                            <Checkbox
                                type="checkbox"
                                />
                            <div>아니다</div>
                        </Question>
                    </Questionbox>
                    <Questionbox >
                       
                        <Question >
                            <div >질문 : </div>
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
                                />
                            <div >그렇다</div>
                            <Checkbox
                                type="checkbox"
                                />
                            <div>아니다</div>
                        </Question>
                    </Questionbox>
                    <Questionbox >
                       
                        <Question >
                            <div >질문 : </div>
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
                                />
                            <div >그렇다</div>
                            <Checkbox
                                type="checkbox"
                                />
                            <div>아니다</div>
                        </Question>
                    </Questionbox>
                    <Btn onClick={handleSaveData} ><div className={banana.myPgEnd} >저장 후 메인 페이지로 돌아가기</div></Btn>
                    
                    
               
            </Page>
    )
}
export default Create;