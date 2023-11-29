import banana from "../App.module.css"; 
import React, { useState,useEffect, useCallback } from "react";
import { collection, getDocs, where, query  } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import styled from "styled-components";
import search from "../public/image/searchicon.svg";
const Page = styled.div`
    width: 500px;
    background-color:#fef1f1;
    min-height:100vh;
    display:flex;
    flex-direction: column;
    align-items:center;
    margin : 0 auto;
    padding: 20px 0 60px;
`
const Team = styled.div`
    font-family: 'Beomsuk', sans-serif;
    font-size: 15px;
    color: #464040;
    display: flex;
    justify-content: center;
`
const Title = styled.div`
    font-family: 'Dia', sans-serif;
    font-weight: 400;
    font-size: 30px;
    color: #464040;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 0 14px;
`
const Data = styled.div`
    font-family: var(--font-Skybori);
    border-top: 4px dashed #464040;
    border-bottom: 4px dashed #464040;
    padding: 13px 122px; 
`
const BtnContainer = styled.div`
    padding: 20px 0;
`
const Button = styled.div`
    height: 50px;
    width: 360px;
    color: #fff;
    font-family: var(--font-Skybori);
    font-size: 18px;
    line-height: 40px;
    border:none;
    border-radius: 10px;
    background-color: #464040;
    cursor: pointer;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const SearchBoxWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 0.1rem;
    width: 325px;
    height: 100%;
    margin:30px 0;
    border: 2px solid #464040;
    border-radius:5px;
    position:relative;
`;

const SearchInput = styled.input`
    border: none;
    outline: none;
    height: 30px;
    width: 110%;
    background-color:transparent;
    font-size: 0.9rem;
    margin-left:5px;
    &:focus {
        border-color: #007bff; /* 클릭 시 변경할 색상 */
    }
`;

const SearchButton = styled.div`
    width: 25px;
    height: 30px;
    margin-right:4px;
    margin-top:2px;
    cursor: pointer;
    position: absolute;
    right:0;
    border-radius: 5px;

`;
const Btnbox = styled.div`
    display:flex;
    justify-content:center;
   
`
const Prebtn = styled.button`
    font-family: 'Suite', sans-serif;
    padding: 5px 10px;
    display: inline-block;
    background-color: #464040;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    outline: none;
    margin: 7px;
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

    
    //검색 기능    
    const [nameList, setNameList] = useState([]);
    const [inputNickname, setInputNickname] = useState('');
    const [existingNickname, setExistingNickname] = useState(null);
    const checkNickname = async () => {     //비동기 함수. Firestore의 "users" 컬렉션에서 주어진 닉네임이 존재하는지 확인
      // "users" 컬렉션에서 해당 닉네임이 있는지 확인하는 쿼리 생성
      const q = query(collection(db, 'tasks'), where('nickname', '==', inputNickname));
  
      try {
          // 쿼리 실행
          const querySnapshot = await getDocs(q);
  
          // 닉네임이 존재하면 출력
          if (querySnapshot.size > 0) {
            const userData = querySnapshot.docs[0].data();
        
            // 가져온 데이터에서 mbti 값 추출
            const mbtiValue = userData.mbti;
    
            // mbti 값을 상태에 설정
            setExistingNickname({
                nickname: inputNickname,
                mbti: mbtiValue,
            });
          } else {
              setExistingNickname(null);
          }
      } catch (error) {
        console.error('Error checking nickname:', error);
      }
    };

    const handleButtonClick = () => {          //버튼 클릭될 때 호출되는 함수. 입력된 닉네임이 비어 있지 않으면 checkNickname 함수를 호출
        if (inputNickname.trim() !== '') {
            checkNickname();
        }
    };

    useEffect(() => {                  //이 훅은 컴포넌트가 마운트될 때 데이터를 가져오기 위해 사용됨.
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                const names = querySnapshot.docs.map((doc) => doc.data().nickname);
                setNameList(names);    //가져온 데이터에서 각 문서의 닉네임을 배열로 추출하여 nameList 상태를 채움.
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchData();
    }, []);
    const [pageIndex, setPageIndex] = useState(0);
    const namesPerPage = 10; // 페이지당 표시할 이름 수
    const totalNames = tasks.length;

    const handleNextClick = () => {
        setPageIndex((prevIndex) => prevIndex + 1);
        console.log('전체',nameList)
        console.log('startindex', startIndex)
    };

    const handlePrevClick = () => {
        setPageIndex((prevIndex) => prevIndex - 1);
    };

    const startIndex = pageIndex * namesPerPage;
  


    return(
        <Page>
            <Team>MBTI TEAM PROJECT</Team>
            <Title>다른 사람들은 어떨까..?</Title>
            <SearchBoxWrapper>
                <SearchInput
                    type="text"
                    name="searchInput"
                    placeholder="친구를 검색해 보세요!"
                    value={inputNickname}
                    onChange={(e) => {
                        setExistingNickname(null); // 이 부분은 이벤트 핸들러 내부에서 무엇을 하고자 하는지에 따라서 다를 수 있습니다.
                        setInputNickname(e.target.value);}}
                />
                <SearchButton onClick={handleButtonClick} type="submit" >
                    <img src={search}/>
                </SearchButton>
                
            </SearchBoxWrapper>
            
            {existingNickname !== null && (
                <Data>
                    <div>{existingNickname.nickname} {existingNickname.mbti}</div>
                </Data>
            )}
            {inputNickname == '' && (
                <Data>
                   {tasks.slice(startIndex, startIndex + namesPerPage).map((task,index) => (
                            <tr key={index}>
                                <td>{task.name}</td>
                                <td>{task.mbti}</td>
                            </tr>
                        ))
                    }
                    <Btnbox>
                  {pageIndex > 0 && (
                    <Prebtn onClick={handlePrevClick}>이전</Prebtn>
                  )}
                  {startIndex + namesPerPage < totalNames && (
                    <Prebtn onClick={handleNextClick}>다음</Prebtn>
                  )}
                </Btnbox>
                </Data>
               )
            }
           
            <BtnContainer>
                <Link to="/mbti" style={{ textDecoration: "none", color: "inherit" }}><Button>다시 테스트하기</Button></Link>
                <Link to="/" style={{ textDecoration: "none", color: "inherit" }}><Button>메인페이지로 돌아가기</Button></Link>
            </BtnContainer>
        </Page>   
    )
}
export default Mdata;