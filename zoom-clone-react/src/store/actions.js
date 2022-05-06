const Actions = {
  SET_IS_ROOM_HOST: "SET_IS_ROOM_HOST",
  SET_ROOM_ID: "SET_ROOM_ID",
  SET_IDENTITY: "SET_IDENTITY",
  SET_CONNECT_ONLY_WITH_AUDIO: "SET_CONNECT_ONLY_WITH_AUDIO",
  SET_TWILIO_ACCESS_TOKEN: "SET_TWILIO_ACCESS_TOKEN",
  SET_SHOW_OVERLAY: "SET_SHOW_OVERLAY",
  SET_PARTICIPANTS: "SET_PARTICIPANTS",
};

export const setIdentity = (identity) => {
  return {
    type: Actions.SET_IDENTITY,
    identity,
  };
};

export const setRoomId = (roomId) => {
  return {
    type: Actions.SET_ROOM_ID,
    roomId,
  };
};

export const setIsRoomHost = (isRoomHost) => {
  return {
    type: Actions.SET_IS_ROOM_HOST,
    isRoomHost: isRoomHost,
  };
};

export const setConnectOnlyWithAudio = (onlyWithAudio) => {
  return {
    type: Actions.SET_CONNECT_ONLY_WITH_AUDIO,
    connectOnlyWithAudio: onlyWithAudio,
  };
};

export const setTwilioAccessToken = (token) => {
  return {
    type: Actions.SET_TWILIO_ACCESS_TOKEN,
    token,
  };
};

export const setShowOverlay = (showOverlay) => {
  return {
    type: Actions.SET_SHOW_OVERLAY,
    showOverlay: showOverlay,
  };
};

export const setParticipants = (participants) => {
  return {
    type: Actions.SET_PARTICIPANTS,
    participants: participants,
  };
};

export default Actions;
