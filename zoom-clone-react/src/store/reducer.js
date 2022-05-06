import Actions from "./actions";

const initalState = {
  identity: "",
  roomId: null,
  isRoomHost: false,
  connectOnlyWithAudio: false,
  twilioAccessToken: null,
  showOverlay: true,
  participants: [],
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
    case Actions.SET_TWILIO_ACCESS_TOKEN:
      return {
        ...state,
        twilioAccessToken: action.token,
      };
    case Actions.SET_SHOW_OVERLAY:
      return {
        ...state,
        showOverlay: action.showOverlay,
      };
    case Actions.SET_PARTICIPANTS:
      return {
        ...state,
        participants: action.participants,
      };
    default:
      return state;
  }
};

export default reducer;
