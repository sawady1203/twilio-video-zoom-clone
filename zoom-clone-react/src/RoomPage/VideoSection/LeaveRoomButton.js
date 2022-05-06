import React from "react";

function LeaveRoomButton({ room }) {
  const handleRoomDisconnection = () => {
    // handle disconnection with room
    room.disconnect();
    const siteUrl = window.location.origin;
    window.location.href = siteUrl;
  };

  return (
    <div className="video_button_container">
      <button className="video_button_end" onClick={handleRoomDisconnection}>
        Leave Room
      </button>
    </div>
  );
}

export default LeaveRoomButton;
