import React from "react";
import { connect } from "react-redux";
import MicButton from "./MicButton";
import CameraButton from "./CameraButton";
import LeaveRoomButton from "./LeaveRoomButton";
import SwitchToScreenSharingButton from "./SwitchToScreenSharingButton";

function VideoButtons(props) {
  const { room, connectOnlyVideoWithAudio } = props;

  return (
    <div className="video_buttons_container">
      <MicButton room={room} />
      {!connectOnlyVideoWithAudio && <CameraButton room={room} />}
      <LeaveRoomButton room={room} />
      <SwitchToScreenSharingButton room={room} />
    </div>
  );
}

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStoreStateToProps)(VideoButtons);
