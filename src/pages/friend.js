import banana from "../App.module.css"; 
import styled from "styled-components";
import { useLocation,Link,useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, where, query } from "firebase/firestore";
import { useState,useEffect } from "react";

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
const FriendTest = styled.div`
    font-family: 'Neo', sans-serif;
    font-size: 40px;
    width: 100%; 
    padding-top: 40px;
    padding-bottom: 40px;
    text-align: center;
`
const Container = styled.div`
    margin: 0px 0px 0px 0px;
    padding: 10px 10px;
    width:600px;
    align-items: center;
    justify-content: center;
}
`
const Box = styled.div`
    display:flex;
    padding: 0 10px;
    justify-content:space-between;
`
const Check = styled.div`
    display:flex;
    margin: 0 0px 0 60px;
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
const Wrapper = styled.div`

`
const Question = styled.div`
    font-family: 'SCDream', sans-serif;
    font-weight: bold;
    margin: 10px 0px;
`
const ResultBtn = styled.div`
    font-family: 'Neo', sans-serif;
    font-size: 20px;
    color:white;
    width: 400px;
    height: 60px;
    background-color: #464040;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

function Friend(){
    const location = useLocation();
    const nickname = location.state.nickname;
    const [userData, setUserData] = useState([]);    //질문자의 질문, 답안을 userData배열에 저장
    const [click, setClick] = useState([null, null, null, null, null, null, null, null, null, null]);
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
        userData[0]['answer6'],
        userData[0]['answer7'],
        userData[0]['answer8'],
        userData[0]['answer9'],
        userData[0]['answer10']
    ] : [];
    console.log(answerArray);

    const calculatedScore = () => {    
        let num = 0;
   
        for (let i=0; i<answerArray.length; i++) {
            if (answerArray[i] === click[i]) {
                num += 10;
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
        <Page>
                <FriendTest>"{nickname}"의 테스트!</FriendTest>
                <Container>
                    
                    {userData.map((user) => (
                        <Wrapper>
                        <Box  key={user.id}>
                            <Question>질문 1 : {user.question1}</Question>
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
                            <Question>질문 2 : {user.question2}</Question>
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
                            <Question>질문 3 : {user.question3}</Question>
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
                            <Question>질문 4 : {user.question4}</Question>  
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
                            <Question>질문 5 : {user.question5}</Question>
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
                        <Box  key={user.id}>
                            <Question>질문 6 : {user.question6}</Question>
                            <Selectbox>                              
                                <input
                                    type="checkbox"
                                    onChange={() => handleCheckbox(5, true)}
                                    checked={click[5] === true}
                                />
                                <div>그렇다</div>
                                <input
                                    type="checkbox"
                                    onChange={() => handleCheckbox(5, false)}
                                    checked={click[5] === false}
                                />
                                <div>아니다</div>  
                            </Selectbox>                         
                        </Box>
                        <Box  key={user.id}>
                            <Question>질문 7 : {user.question7}</Question>
                            <Selectbox>                              
                                <input
                                    type="checkbox"
                                    onChange={() => handleCheckbox(6, true)}
                                    checked={click[6] === true}
                                />
                                <div>그렇다</div>
                                <input
                                    type="checkbox"
                                    onChange={() => handleCheckbox(6, false)}
                                    checked={click[6] === false}
                                />
                                <div>아니다</div>  
                            </Selectbox>                         
                        </Box>
                        <Box  key={user.id}>
                            <Question>질문 8 : {user.question8}</Question>
                            <Selectbox>                              
                                <input
                                    type="checkbox"
                                    onChange={() => handleCheckbox(7, true)}
                                    checked={click[7] === true}
                                />
                                <div>그렇다</div>
                                <input
                                    type="checkbox"
                                    onChange={() => handleCheckbox(7, false)}
                                    checked={click[7] === false}
                                />
                                <div>아니다</div>  
                            </Selectbox>                         
                        </Box>
                        <Box  key={user.id}>
                            <Question>질문 9 : {user.question9}</Question>
                            <Selectbox>                              
                                <input
                                    type="checkbox"
                                    onChange={() => handleCheckbox(8, true)}
                                    checked={click[8] === true}
                                />
                                <div>그렇다</div>
                                <input
                                    type="checkbox"
                                    onChange={() => handleCheckbox(8, false)}
                                    checked={click[8] === false}
                                />
                                <div>아니다</div>  
                            </Selectbox>                         
                        </Box>
                        <Box  key={user.id}>
                            <Question>질문10: {user.question10}</Question>
                            <Selectbox>                              
                                <input
                                    type="checkbox"
                                    onChange={() => handleCheckbox(9, true)}
                                    checked={click[9] === true}
                                />
                                <div>그렇다</div>
                                <input
                                    type="checkbox"
                                    onChange={() => handleCheckbox(9, false)}
                                    checked={click[9] === false}
                                />
                                <div>아니다</div>  
                            </Selectbox>                         
                        </Box>
                    </Wrapper>
                    ))}
                                  
                    <Btn onClick={calculatedScore}><ResultBtn>점수 확인하기!</ResultBtn></Btn>
                </Container>
            </Page>
    )
}
export default Friend;