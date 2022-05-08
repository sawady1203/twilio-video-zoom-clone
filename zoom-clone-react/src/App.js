import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import JoinRoomPage from "./JoinRoomPage/JoinRoomPage";
import RoomPage from "./RoomPage/RoomPage";
import IntroductionPage from "./IntroductionPage/IntroductionPage";

import { MsalProvider } from "@azure/msal-react";

function App({ pca }) {
  return (
    <>
      <MsalProvider instance={pca}>
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<IntroductionPage />} />
            <Route path="join-room" element={<JoinRoomPage />} />
            <Route path="room" element={<RoomPage />} />
          </Routes>
        </BrowserRouter>
      </MsalProvider>
    </>
  );
}

export default App;
