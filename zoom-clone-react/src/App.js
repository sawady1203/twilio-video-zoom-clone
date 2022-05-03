import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import JoinRoomPage from "./JoinRoomPage/JoinRoomPage";
import RoomPage from "./RoomPage/RoomPage";
import IntroductionPage from "./IntroductionPage/IntroductionPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<IntroductionPage />} />
        <Route path="join-room" element={<JoinRoomPage />} />
        <Route path="room" element={<RoomPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
