import banana from "../App.module.css"; 
import Friend from "./friend";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function Main(){
    const [nameList, setNameList] = useState([]);
    
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
            <div className={banana.myPgBtn} ><Link  to="/create" style={{ textDecoration: "none",color: "black"}}>나의 테스트 만들기</Link></div>
            <div className={banana.friendsContainer}>
                {nameList.map((name, index) => (
                    <div className={banana.item} key={index}>
                        <div className={banana.itemContainer}><Link to={"/friend"} state= { {nickname: name} }  style={{ textDecoration: "none",color: "black "}}>"{name}"의 MBTI</Link></div>
                    </div>
              
                ))}
            </div>
           
        </div>
    )
}
export default Main;