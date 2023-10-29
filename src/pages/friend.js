import banana from "../App.module.css"; 
import styled from "styled-components";
import { useLocation,Link } from "react-router-dom";
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
function Friend(){
    const location = useLocation();
    const nickname = location.state.nickname;
    const [userData, setUserData] = useState([]);

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
    console.log(userData)
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
                            <Check >
                                <input
                                    type="checkbox"
                                    />
                                <div className={banana.myPgText}>그렇다</div>
                                <input
                                    type="checkbox"
                                    />
                                <div className={banana.myPgText}>아니다</div>
                            </Check>
                        </Box>
                        <Box  key={user.id}>
                            <div>
                                <div className={banana.myPgText}>질문 : {user.question2}</div>
                            </div>
                            <Check >
                                <input
                                    type="checkbox"
                                    />
                                <div className={banana.myPgText}>그렇다</div>
                                <input
                                    type="checkbox"
                                    />
                                <div className={banana.myPgText}>아니다</div>
                            </Check>
                        </Box>
                        <Box  key={user.id}>
                            <div>
                                <div className={banana.myPgText}>질문 : {user.question3}</div>
                            </div>
                            <Check >
                                <input
                                    type="checkbox"
                                    />
                                <div className={banana.myPgText}>그렇다</div>
                                <input
                                    type="checkbox"
                                    />
                                <div className={banana.myPgText}>아니다</div>
                            </Check>
                        </Box>
                        <Box  key={user.id}>
                            <div>
                                <div className={banana.myPgText}>질문 : {user.question4}</div>
                            </div>
                            <Check >
                                <input
                                    type="checkbox"
                                    />
                                <div className={banana.myPgText}>그렇다</div>
                                <input
                                    type="checkbox"
                                    />
                                <div className={banana.myPgText}>아니다</div>
                            </Check>
                        </Box>
                        <Box  key={user.id}>
                            <div>
                                <div className={banana.myPgText}>질문 : {user.question5}</div>
                            </div>
                            <Check >
                                <input
                                    type="checkbox"
                                    />
                                <div className={banana.myPgText}>그렇다</div>
                                <input
                                    type="checkbox"
                                    />
                                <div className={banana.myPgText}>아니다</div>
                            </Check>
                        </Box>
                    </Wrapper>
                        ))}
                     
              

                     <Btn ><div className={banana.myPgEnd}><Link to={"/result"} state= { {name: nickname} }  style={{ textDecoration: "none",color: "white"}}>결과 보기!</Link></div></Btn>
            
                </div>
            </div>
    )
}
export default Friend;