import React, { useEffect } from "react";
import ParticipantsSection from "./ParticipantsSection/ParticipantsSection";
import VideoSection from "./VideoSection/VideoSection";
import ChatSection from "./ChatSection/ChatSection";
import Overlay from "./Overlay";
import { connect } from "react-redux";
import { setTwilioAccessToken } from "../store/actions";
import { getTokenFromTwilio } from "../utils/twilioUtils";
import { useNavigate } from "react-router-dom";

import "./RoomPage.css";

function RoomPage(props) {
  const { identity, roomId, setTwilioAccessTokenAction, showOverlay } = props;
  let navigate = useNavigate();

  // RoomPageに入ったときにはidentityは入力されている状態
  // RoomPageに遷移したタイミングでアクセストークンを取得する
  useEffect(() => {
    if (!identity || !roomId) {
      navigate("/");
    } else {
      getTokenFromTwilio(setTwilioAccessTokenAction, identity);
    }
  }, []);

  return (
    <div className="room_container">
      <ParticipantsSection />
      <VideoSection />
      <ChatSection />
      {showOverlay && <Overlay />}
    </div>
  );
}

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    setTwilioAccessTokenAction: (token) =>
      dispatch(setTwilioAccessToken(token)),
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(RoomPage);
