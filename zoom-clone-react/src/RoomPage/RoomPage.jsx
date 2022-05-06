import React, { useEffect } from "react";
import ParticipantsSection from "./ParticipantsSection/ParticipantsSection";
import VideoSection from "./VideoSection/VideoSection";
import ChatSection from "./ChatSection/ChatSection";
import Overlay from "./Overlay";
import { connect } from "react-redux";
import { setTwilioAccessToken } from "../store/actions";
import { getTokenFromTwilio } from "../utils/twilioUtils";

import "./RoomPage.css";

function RoomPage(props) {
  const { identity, setTwilioAccessTokenAction, showOverlay } = props;

  // RoomPageに入ったときにはidentityは入力されている状態
  // RoomPageに遷移したタイミングでアクセストークンを取得する
  useEffect(() => {
    getTokenFromTwilio(setTwilioAccessTokenAction, identity);
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
