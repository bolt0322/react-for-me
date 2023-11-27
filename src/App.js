
import React, { useState,useEffect, useCallback, useId } from "react";
import Main from "./pages/main";
import Friend from "./pages/friend";
import Create from "./pages/create";
import Result from "./pages/result";
import Question from "./pages/question"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mbti from "./pages/mbti";
import AllPage from "./pages/all";
import Mquestion from "./pages/mquestion";
import Mresult from "./pages/mresult";
import Mdata from "./pages/mdata";

function App() {
       return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AllPage />} />
                <Route path="/main" element={<Main />} />
                <Route path="/mbti" element={<Mbti />} />
                <Route path="/mquestion" element={<Mquestion />} />
                <Route path="/mresult" element={<Mresult />} />
                <Route path="/mdata" element={<Mdata />} />
                <Route path="/question" element={<Question />} />
                <Route path="/friend" element={<Friend />} />
                <Route path="/create" element={<Create />} />
                <Route path="/result" element={<Result />} />
            </Routes>
        </BrowserRouter>
  
    )
   
}

export default App;