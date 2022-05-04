import React from "react";

function RoomNotFoundMessage(props) {
  const { showRoomNotFoundMessage } = props;
  return (
    <div className="room_not_found_container">
      {showRoomNotFoundMessage && (
        <p className="room_not_found_paragraph">
          Room has not found. Please try again.
        </p>
      )}
    </div>
  );
}

export default RoomNotFoundMessage;
