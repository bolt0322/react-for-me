import banana from "../App.module.css"; 
import Friend from "./friend";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, where, query  } from "firebase/firestore";
import styled from "styled-components";
import { FacebookShareButton, FacebookIcon, TwitterIcon, TwitterShareButton } from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useScript } from "./hooks";  //카카오톡 공유 기능
import kakaoLogo from "../img/kakaoLogo.webp";
import search from "../public/image/searchicon.svg"

const FlexContainer = styled.div`  //제목과 버튼을 감싸는 컨테이너
    display: flex;
    flex-direction: column;
    align-items: center;
`
const GridContainer = styled.div`  //버튼을 배치시키는 컨테이너
    display: grid;
    grid-template-columns: repeat(2,48px);
    grid-column-gap: 8px;
    justify-content: center;
    align-items: center;

`
const URLShareButton = styled.button`
    width: 48px;
    height: 48px;
    color: white;
    border-radius: 24px;
    border: 0px;
    font-weight: 800;
    font-size: 18px;
    cursor: pointer;
    background-color: #7362ff;
    &:hover {
      background-color: #a99fee;
    }
`
const KakaoShareButton = styled.a`
    cursor: pointer;
`
const KakaoIcon = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 24px;
`
const Page = styled.div`
    background-color: #fef1f1;
    width: 33%;
    min-height: 100vh;
    justify-content:center;
    margin: 0 auto;
    padding: 20px 0 60px;
    align-items:center;
    flex-direction: column;
    display:flex;
    
`
  const Team = styled.div`
      font-family: 'Beomsuk', sans-serif;
      font-size: 15px;
      display: flex;
      justify-content: center;

  `
const TitleBox = styled.div`
    margin-left:160px;
    display:flex;
    flex-direction: column;
    width:100%;
`
const TitleInText = styled.div`

`
const Title = styled.div`
    font-family: 'Dos', sans-serif;
    font-size: 40px;
    font-weight: bold;
    text-align: left;
    color: #464040;
    text-shadow: 0 0 6px #ffffff, 0 0 8px #ffffff, 0 0 20px #f2555a;
`
const TitleUnderBox = styled.div`
    width: 340px;
    text-align:center;
    padding: 10px 0;
    margin: 25px;
    font-weight:400;
    font-family: 'Gmarket', sans-serif;
    border-top: 4px dashed #464040;
    border-bottom: 4px dashed  #464040;
    color: #464040;
`
const MyBtn = styled.button`
    font-family: 'Neo', sans-serif;
    font-size: 1.2rem;
    font-weight: lighter;
    margin: 25px 0 18px;
    display: inline-block;
    width: 340px;
    height: 50px;
    background-color: #464040;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    outline: none;
`
const Share = styled.p`
    &.share{
        font-size:16px;
        font-weight:600;
        font-family: 'Suite', sans-serif;
        margin-bottom:10px;
        margin-top:0;
        color:#464040;
    }
`
const SearchBoxWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 0.1rem;
    width: 325px;
    height: 100%;
    margin: 18px 0 15px;
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
const Friends = styled.div`
    border-radius: 7px;
    padding: 16px;
    height:40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #464040;
`
const FriendBox = styled.button`
    text-align: center;
    font-size: 15px;
    font-family: 'Neo', sans-serif;
    cursor: pointer;
    background-color: #464040;
    color: #fff;
    padding: 22px 20px;
    border-radius: 5px;
`




function Main(){
    const [nameList, setNameList] = useState([]);
    const currentUrl = window.location.href;        //window 객체에서 현재 url 가져오기
    const status = useScript("https://developers.kakao.com/sdk/js/kakao.js"); //kakao SDK import 하기
    
    //카카오톡 공유하기 버튼
    const handleKakaoButton = () => {
        window.Kakao.Link.sendScrap({
            requestUrl: currentUrl,
        });
    };

    //kakao SDK 초기화, status 변경될 때마다 실행, status가 ready일 때 초기화
    useEffect(() => {
        if (status === "ready" && window.Kakao) {
            if (!window.Kakao.isInitialized()) {               //중복 initialization 방지
                window.Kakao.init("1949dce6591e8157bf41b78d89e7ee2c");
            }
        }
    }, [status]);

    const [inputNickname, setInputNickname] = useState('');
    const [existingNickname, setExistingNickname] = useState(null);
    const checkNickname = async () => {     //비동기 함수. Firestore의 "users" 컬렉션에서 주어진 닉네임이 존재하는지 확인
      // "users" 컬렉션에서 해당 닉네임이 있는지 확인하는 쿼리 생성
      const q = query(collection(db, 'users'), where('nickname', '==', inputNickname));
  
      try {
          // 쿼리 실행
          const querySnapshot = await getDocs(q);
  
          // 닉네임이 존재하면 출력
          if (querySnapshot.size > 0) {
              setExistingNickname(inputNickname);
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
    const namesPerPage = 4; // 페이지당 표시할 이름 수
    const totalNames = nameList.length;

    const handleNextClick = () => {
        setPageIndex((prevIndex) => prevIndex + 1);
    };

    const handlePrevClick = () => {
        setPageIndex((prevIndex) => prevIndex - 1);
    };

    const startIndex = pageIndex * namesPerPage;
  
    return(

        <Page>
            <Team>MBTI TEAM PROJECT</Team>
            <TitleUnderBox>친밀도 확인하기!</TitleUnderBox>
            <TitleBox>
                <Title>TEST</Title>
                <Title>ABOUT</Title>
                <Title>YOUR</Title>
                <Title>FRIENDS!!</Title>
            </TitleBox>
            
            <Link to="/create" style={{ textDecoration: "none", color: "inherit" }}><MyBtn>나의 테스트 만들기 </MyBtn></Link>
           
            <FlexContainer>
                <Share className="share">공유하기</Share>
                <GridContainer>
                    
                    <CopyToClipboard text={currentUrl}>
                        <URLShareButton>URL</URLShareButton>
                    </CopyToClipboard>
                    <KakaoShareButton onClick={handleKakaoButton}>
                        <KakaoIcon src={kakaoLogo}></KakaoIcon>
                    </KakaoShareButton>
                </GridContainer>
            </FlexContainer>
            <SearchBoxWrapper>
                <SearchInput
                    type="text"
                    name="searchInput"
                    placeholder="친구를 검색해 보세요!"
                    value={inputNickname}
                    onChange={(e) => {
                      setInputNickname(e.target.value);
                      setExistingNickname(null);
                    }}
                />
                <SearchButton onClick={handleButtonClick} type="submit" >
                    <img src={search}/>
                </SearchButton>
                
            </SearchBoxWrapper>

            {existingNickname !== null && (
                <Link to={"/friend"} state= { {nickname: existingNickname} }  style={{ textDecoration: "none",color: "white"}}><FriendBox>"{existingNickname}"의 테스트</FriendBox></Link>
            )}
            
            {inputNickname == '' && (<div>
                <div className={banana.friendsContainer}>
                  {nameList.slice(startIndex, startIndex + namesPerPage).map((name, index) => (
                    <div className={banana.item} key={index}>
                      <div className={banana.itemContainer}>
                        <Link to={"/friend"} state={{ nickname: name }} style={{ textDecoration: "none", color: "white" }}>
                          "{name}"의 테스트
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                <Btnbox>
                  {pageIndex > 0 && (
                    <Prebtn onClick={handlePrevClick}>이전</Prebtn>
                  )}
                  {startIndex + namesPerPage < totalNames && (
                    <Prebtn onClick={handleNextClick}>다음</Prebtn>
                  )}
                </Btnbox>
            </div>)}
               
           
            
        </Page>
    )
}
export default Main;