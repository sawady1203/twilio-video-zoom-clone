import React, { useState } from "react";
import CameraButtonImg from "../../resources/images/camera.svg";
import CameraButtonImgOff from "../../resources/images/cameraOff.svg";

function CameraButton() {
  const [isLocalVideoTrackDisabled, setIsLocalVideoTrackDisabled] =
    useState(false);

  const handleCameraButtonPressed = () => {
    isLocalVideoTrackDisabled ? startVideo() : stopVideo();
    setIsLocalVideoTrackDisabled(!isLocalVideoTrackDisabled);
  };

  const startVideo = () => {};

  const stopVideo = () => {};

  return (
    <div className="video_button_container">
      <img
        src={isLocalVideoTrackDisabled ? CameraButtonImgOff : CameraButtonImg}
        className="video_button_image"
        onClick={handleCameraButtonPressed}
        alt="camera off or on"
      />
    </div>
  );
}

export default CameraButton;
