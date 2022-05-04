import Actions from "./actions";

const initalState = {
  identity: "",
  roomId: null,
  isRoomHost: false,
  connectOnlyWithAudio: false,
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case Actions.SET_IDENTITY:
      return {
        ...state,
        identity: action.identity,
      };
    case Actions.SET_ROOM_ID:
      return {
        ...state,
        roomId: action.roomId,
      };
    case Actions.SET_IS_ROOM_HOST:
      return {
        ...state,
        isRoomHost: action.isRoomHost,
      };
    case Actions.SET_CONNECT_ONLY_WITH_AUDIO:
      return {
        ...state,
        connectOnlyWithAudio: action.connectOnlyWithAudio,
      };
    default:
      return state;
  }
};

export default reducer;
