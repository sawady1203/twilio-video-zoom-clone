import React, { useState } from "react";
import SwitchImg from "../../resources/images/switchToScreenSharing.svg";

function SwitchToScreenSharingButton() {
  const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);

  const handleSwitchToScreenSharing = () => {
    setIsScreenSharingActive(!isScreenSharingActive);
  };

  return (
    <div className="video_button_container">
      <img
        className="video_button_image"
        src={SwitchImg}
        onClick={handleSwitchToScreenSharing}
        alt="share screen button"
      />
    </div>
  );
}

export default SwitchToScreenSharingButton;
