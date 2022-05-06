import React, { useState } from "react";
import MicButtonImg from "../../resources/images/micOff.svg";
import MicButtonImgOff from "../../resources/images/mic.svg";

function MicButton({ room }) {
  const [isMicMuted, setIsMicMuted] = useState(false);

  const unmute = () => {
    // turn on mic back
    room.localParticipant.audioTracks.forEach((localAudioTrackPublication) => {
      localAudioTrackPublication.track.enable();
    });
  };

  const mute = () => {
    // mute our microphone so other users will be not able to hear us
    room.localParticipant.audioTracks.forEach((localAudioTrackPublication) => {
      localAudioTrackPublication.track.disable();
    });
  };

  const handleMicButtonPressed = () => {
    isMicMuted ? unmute() : mute();
    setIsMicMuted(!isMicMuted);
    console.log("Mic mute:", isMicMuted);
  };

  return (
    <div className="video_button_container">
      <img
        src={isMicMuted ? MicButtonImgOff : MicButtonImg}
        onClick={handleMicButtonPressed}
        alt="mic mute or unmute"
        className="video_button_image"
      />
    </div>
  );
}

export default MicButton;
