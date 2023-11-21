import banana from "../App.module.css"; 
import Friend from "./friend";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import styled from "styled-components";
import { FacebookShareButton, FacebookIcon, TwitterIcon, TwitterShareButton } from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useScript } from "./hooks";  //카카오톡 공유 기능

const FlexContainer = styled.div`  //제목과 버튼을 감싸는 컨테이너
    display: flex;
    flex-direction: column;
    align-items: center;
`
const GridContainer = styled.div`  //버튼을 배치시키는 컨테이너
    display: grid;
    grid-template-columns: repeat(4,48px);
    grid-column-gap: 8px;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
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

function Main(){
    const [nameList, setNameList] = useState([]);
    const currentUrl = window.location.href;        //window 객체에서 현재 url 가져오기
    const status = useScript("https://developers.kakao.com/sdk/js/kakao.js"); //kakao SDK import 하기
    
    //카카오톡 공유하기 버튼
    const handleKakaoButton = () => {
        window.Kakao.Link.sendScrap({
            requesetUrl: currentUrl,
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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const names = querySnapshot.docs.map((doc) => doc.data().nickname);
        setNameList(names);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

    return(
        <div className={banana.page}>
            <div className={banana.friends}>TEST ABOUT MY FRIENDS!</div>
            <FlexContainer>
              <div>공유하기</div>
              <GridContainer>
                  <FacebookShareButton url={currentUrl}>
                      <FacebookIcon size={48} round={true} borderRadius={24}></FacebookIcon>      
                  </FacebookShareButton>
                  <TwitterShareButton>
                      <TwitterIcon size={48} round={true} borderRadius={24}></TwitterIcon>
                  </TwitterShareButton>
                  <CopyToClipboard text={currentUrl}>
                      <URLShareButton>URL</URLShareButton>
                  </CopyToClipboard>
                  <button onClick={handleKakaoButton}>4</button>
              </GridContainer>
            </FlexContainer>
            <div className={banana.myPgBtn} ><Link  to="/create" style={{ textDecoration: "none",color: "black"}}>나의 테스트 만들기</Link></div>
            <div className={banana.friendsContainer}>
                {nameList.map((name, index) => (
                    <div className={banana.item} key={index}>
                        <div className={banana.itemContainer}><Link to={"/friend"} state= { {nickname: name} }  style={{ textDecoration: "none",color: "black "}}>"{name}"의 테스트</Link></div>
                    </div>
              
                ))}
            </div>
           
        </div>
    )
}
export default Main;