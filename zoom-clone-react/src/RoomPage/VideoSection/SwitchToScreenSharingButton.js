import React, { useState } from "react";
import { LocalVideoTrack } from "twilio-video";
import SwitchImg from "../../resources/images/switchToScreenSharing.svg";
import LocalScreenSharingPreview from "./LocalScreenSharingPreview";

function SwitchToScreenSharingButton({ room }) {
  const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);
  const [screenShareTrack, setScreenShareTrack] = useState(null);
  const [screenShareStream, setScreenShareStream] = useState(null);

  const handleSwitchToScreenSharing = () => {
    if (!isScreenSharingActive) {
      navigator.mediaDevices
        .getDisplayMedia()
        .then((stream) => {
          setScreenShareStream(stream);
          setIsScreenSharingActive(true);
          const screenTrack = new LocalVideoTrack(stream.getVideoTracks()[0], {
            name: "screen-share-track",
          });

          room.localParticipant.publishTrack(screenTrack);
          setScreenShareTrack(screenTrack);
          stream.getVideoTracks()[0].onended = () => {
            room.localParticipant.unpublishTrack(screenTrack);
            setScreenShareTrack(null);
            setIsScreenSharingActive(false);
          };
        })
        .catch((err) => {
          console.error("cound not get an access to share screen", err);
        });
    } else {
      screenShareTrack.stop();
      room.localParticipant.unpublishTrack(screenShareTrack);
      setScreenShareTrack(null);
      setIsScreenSharingActive(false);
    }
  };

  return (
    <>
      <div className="video_button_container">
        <img
          className="video_button_image"
          src={SwitchImg}
          onClick={handleSwitchToScreenSharing}
          alt="share screen button"
        />
      </div>
      {isScreenSharingActive && (
        <LocalScreenSharingPreview stream={screenShareStream} />
      )}
    </>
  );
}

export default SwitchToScreenSharingButton;
