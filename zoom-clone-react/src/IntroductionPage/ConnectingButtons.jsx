import React from "react";
import ConnectingButton from "./ConnectingButton";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";

function ConnectingButtons() {
  let navigate = useNavigate();
  const { instance } = useMsal();

  const pushToJoinRoomPage = () => {
    navigate("/join-room");
  };

  const pushToJoinRoomPageAsHost = () => {
    navigate("/join-room?host=true");
  };

  const handleLogout = (instance) => {
    instance.logoutRedirect();
    console.log("Log out");
  };

  return (
    <div className="connecting_buttons_container">
      <ConnectingButton
        buttonText="Join a meeting"
        onClickHandler={pushToJoinRoomPage}
        buttonClass="join_room_button"
      />
      <ConnectingButton
        buttonText="Host a meeting"
        createRoomButton
        onClickHandler={pushToJoinRoomPageAsHost}
        buttonClass="create_room_button"
      />
      <ConnectingButton
        buttonText="Log Out"
        onClickHandler={() => handleLogout(instance)}
        buttonClass="logout_button"
      />
    </div>
  );
}

export default ConnectingButtons;
