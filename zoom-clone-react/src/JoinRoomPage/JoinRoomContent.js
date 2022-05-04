import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import {
  setConnectOnlyWithAudio,
  setIdentity,
  setRoomId,
} from "../store/actions";

import { checkIfRoomExists } from "../utils/twilioUtils";
import JoinRoomInputs from "./JoinRoomInputs";
import OnlyWithAudioCheckbox from "./OnlyWithAudioCheckbox";
import RoomNotFoundMessage from "./RoomNotFoundMessage";
import JoinRoomButtons from "./JoinRoomButtons";

function JoinRoomContent(props) {
  const {
    isRoomHost,
    connectOnlyWithAudio,
    setConnectOnlyWithAudioAction,
    setIdentityAction,
    setRoomIdAction,
    setShowLoadingOverlay,
  } = props;

  const [roomIdValue, setRoomIdValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [showRoomNotFoundMessage, setShowRoomNotFoundMessage] = useState(false);

  let navigate = useNavigate();

  const handleJoinToRoom = async () => {
    // login to join the room
    setIdentityAction(nameValue);
    if (!isRoomHost) {
      setShowLoadingOverlay(true);
      // check if room exists and if yes join
      const roomExists = await checkIfRoomExists(roomIdValue);
      console.log("roomExists:", roomExists);
      setShowLoadingOverlay(false);
      if (roomExists) {
        // setRoomIdAction(roomIdValue); // これいらんのかな？
        navigate("/room");
      } else {
        setShowRoomNotFoundMessage(true);
      }
    } else {
      setRoomIdAction(uuidv4());
      navigate("/room");
    }
  };

  return (
    <>
      <JoinRoomInputs
        roomIdValue={roomIdValue}
        setRoomIdValue={setRoomIdValue}
        nameValue={nameValue}
        setNameValue={setNameValue}
        isRoomHost={isRoomHost}
      />
      {/* Audioだけかどうかのスイッチ */}
      <OnlyWithAudioCheckbox
        setConnectOnlyWithAudio={setConnectOnlyWithAudioAction}
        connectOnlyWithAudio={connectOnlyWithAudio}
      />
      <RoomNotFoundMessage showRoomNotFoundMessage={showRoomNotFoundMessage} />
      <JoinRoomButtons
        isRoomHost={isRoomHost}
        handleJoinToRoom={handleJoinToRoom}
      />
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setConnectOnlyWithAudioAction: (onlyWithAudio) =>
      dispatch(setConnectOnlyWithAudio(onlyWithAudio)),
    setIdentityAction: (identity) => {
      dispatch(setIdentity(identity));
    },
    setRoomIdAction: (roomId) => dispatch(setRoomId(roomId)),
  };
};

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(
  mapStoreStateToProps,
  mapDispatchToProps
)(JoinRoomContent);
