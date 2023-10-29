
import React, { useState,useEffect, useCallback, useId } from "react";
import Main from "./pages/main";
import Friend from "./pages/friend";
import Create from "./pages/create";
import Result from "./pages/result";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/friend" element={<Friend />} />
                <Route path="/create" element={<Create />} />
                <Route path="/result" element={<Result />} />
            </Routes>
        </BrowserRouter>
  
    )
   
}

export default App;