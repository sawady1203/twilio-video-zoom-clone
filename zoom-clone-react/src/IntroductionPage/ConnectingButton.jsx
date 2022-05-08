import React from "react";

function ConnectingButton({
  createRoomButton = false,
  buttonText,
  onClickHandler,
  buttonClass,
}) {
  return (
    <button className={buttonClass} onClick={onClickHandler}>
      {buttonText}
    </button>
  );
}

export default ConnectingButton;
