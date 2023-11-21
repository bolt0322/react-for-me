import banana from "../App.module.css"; 
import styled from "styled-components";
import { useLocation,Link,useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, where, query } from "firebase/firestore";
import { useState,useEffect } from "react";


const Box = styled.div`
    display:flex;
    padding: 0 10px;
    justify-content:space-between;
`
const Check = styled.div`
    display:flex;
    margin: 0 0px 0 60px;
`
const Wrapper = styled.div`

`
const Btn = styled.button`
    width:100%;
    display:flex;
    border: none;
    background-color: transparent;
    margin-top:40px;
    justify-content:center;
`
const Selectbox = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    width:160px;
`
function Friend(){
    const location = useLocation();
    const nickname = location.state.nickname;
    const [userData, setUserData] = useState([]);    //질문자의 질문, 답안을 userData배열에 저장
    const [click, setClick] = useState([null, null, null, null, null]);
    const [score, setScore] = useState(0);
    const history = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const q = query(collection(db, "users"), where("nickname", "==", nickname));
                const querySnapshot = await getDocs(q);
                const userDataArray = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setUserData(userDataArray);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }       
        };

        fetchData();
    }, [nickname]); 

    const answerArray = userData.length > 0 ? [      //userData배열에 있는 첫번째 사용자의 각 answer값을 담고있는 배열
        userData[0]['answer1'],
        userData[0]['answer2'],
        userData[0]['answer3'],
        userData[0]['answer4'],
        userData[0]['answer5'],
    ] : [];
    console.log(answerArray);

    const calculatedScore = () => {    
        let num = 0;
   
        for (let i=0; i<answerArray.length; i++) {
            if (answerArray[i] === click[i]) {
                num += 20;
            }
        }
        setScore(num);
        console.log(score)      
        history( "/result",{
            
            state: {name:nickname, showscore: num },
          });
    };

    const handleCheckbox = (index, value) => {   
        const newClick = [...click];
        newClick[index] = value;
        setClick(newClick);
        console.log(newClick)
      };

    return(
        <div className={banana.page}>
                <div className={banana.friends}>"{nickname}"의 TEST!</div>
                <div className={banana.myPgContainer}>
                    
                    {userData.map((user) => (
                        <Wrapper>
                        <Box  key={user.id}>
                            <div>
                                <div className={banana.myPgText}>질문 : {user.question1}</div>
                            </div>
                            <Selectbox>
                            <input
                                type="checkbox"
                                onChange={() => handleCheckbox(0, true)}
                                checked={click[0] === true}
                            />
                            <div>그렇다</div>
                            <input
                                type="checkbox"
                                onChange={() => handleCheckbox(0, false)}
                                checked={click[0] === false} 
                            />
                            <div>아니다</div>
                            </Selectbox>

                        </Box>
                        <Box  key={user.id}>
                            <div>
                                <div className={banana.myPgText}>질문 : {user.question2}</div>
                            </div>
                            <Selectbox>
                                <input
                                    type="checkbox"
                                    onChange={() => handleCheckbox(1, true)}
                                    checked={click[1] === true}
                                />
                                <div>그렇다</div>
                                <input
                                    type="checkbox"
                                    onChange={() => handleCheckbox(1, false)}
                                    checked={click[1] === false}
                                />
                                <div>아니다</div>  
                            </Selectbox>                          
                        </Box>
                        <Box  key={user.id}>
                            <div>
                                <div className={banana.myPgText}>질문 : {user.question3}</div>
                            </div>
                            <Selectbox>
                                <input
                                    type="checkbox"
                                    onChange={() => handleCheckbox(2, true)}
                                    checked={click[2] === true}
                                />
                                <div>그렇다</div>
                                <input
                                    type="checkbox"
                                    onChange={() => handleCheckbox(2, false)}
                                    checked={click[2] === false}
                                />
                                <div>아니다</div>  
                            </Selectbox>                          
                        </Box>
                        <Box  key={user.id}>
                            <div>
                                <div className={banana.myPgText}>질문 : {user.question4}</div>
                            </div>  
                            <Selectbox>                          
                                <input
                                    type="checkbox"
                                    onChange={() => handleCheckbox(3, true)}
                                    checked={click[3] === true}
                                />
                                <div>그렇다</div>
                                <input
                                    type="checkbox"
                                    onChange={() => handleCheckbox(3, false)}
                                    checked={click[3] === false}
                                />
                                <div>아니다</div>     
                            </Selectbox>                       
                        </Box>
                        <Box  key={user.id}>
                            <div>
                                <div className={banana.myPgText}>질문 : {user.question5}</div>
                            </div> 
                            <Selectbox>                              
                                <input
                                    type="checkbox"
                                    onChange={() => handleCheckbox(4, true)}
                                    checked={click[4] === true}
                                />
                                <div>그렇다</div>
                                <input
                                    type="checkbox"
                                    onChange={() => handleCheckbox(4, false)}
                                    checked={click[4] === false}
                                />
                                <div>아니다</div>  
                            </Selectbox>                         
                        </Box>
                    </Wrapper>
                    ))}
                                  

                     <Btn onClick={calculatedScore}><div className={banana.myPgEnd}>결과보기</div></Btn>
            
                </div>
            </div>
    )
}
export default Friend;