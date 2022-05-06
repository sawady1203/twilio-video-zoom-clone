import axios from "axios";
import { store } from "../store/store";
import { setMessages, setShowOverlay } from "../store/actions";
import {
  connect,
  LocalAudioTrack,
  LocalDataTrack,
  LocalVideoTrack,
} from "twilio-video";

const URL = process.env.REACT_APP_TWILIO_URL;
const audioConstraints = {
  vide: false,
  audio: true,
};

const videoConstraints = {
  audio: true,
  video: {
    width: 640,
    height: 480,
  },
};

let dataChannel = null;

export const getTokenFromTwilio = async (setAccessToken, identity) => {
  const randomId = store.getState().roomId; // room名はランダムなもの
  console.log("roomId:", randomId);
  console.log("identity:", identity);
  const data = {
    identity: identity,
    room: randomId,
  };
  const response = await axios.post(URL + `/token-service`, data);

  const response_data = response.data;
  console.log(response_data);
  if (response_data.accessToken) {
    setAccessToken(response_data.accessToken);
  }
};

export const checkIfRoomExists = async (roomId) => {
  const response = await axios.post(URL + `/room-exists?roomId=${roomId}`);
  return response.data.roomExists;
};

export const connectToRoom = async (
  accessToken,
  roomId = "default",
  setRoom
) => {
  const onlyWithAudio = store.getState().connectOnlyWithAudio;
  const constraints = onlyWithAudio ? audioConstraints : videoConstraints;

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(async (stream) => {
      let tracks;

      // create data track for messages
      const dataTrack = new LocalDataTrack();
      dataChannel = dataTrack;

      // create audio track
      const audioTrack = new LocalAudioTrack(stream.getAudioTracks()[0]);

      // video trackの有無はconstrainsで決める
      // tracksに各trackをまとめて、roomへ渡す
      let videoTrack;
      if (!onlyWithAudio) {
        // create video track
        videoTrack = new LocalVideoTrack(stream.getVideoTracks()[0]);
        tracks = [audioTrack, videoTrack, dataTrack];
      } else {
        tracks = [audioTrack, dataTrack];
      }

      const room = await connect(accessToken, { name: roomId, tracks });

      console.log("successfully connect twilio room");
      console.log("room:", room);

      setRoom(room);

      store.dispatch(setShowOverlay(false));
    })
    .catch((err) => {
      console.log(
        "Error occured when trying to get an access to local devices"
      );
      console.log(err);
    });
};

export const sendMessageUsingDataChannel = (
  content,
  messageCreatedByMe = false
) => {
  const identity = store.getState().identity;
  const ownMessage = {
    identity,
    content,
    messageCreatedByMe,
  };

  addMessageToMessenger(ownMessage);

  const messageToSend = {
    identity,
    content,
  };

  const stringfiedMessage = JSON.stringify(messageToSend);
  dataChannel.send(stringfiedMessage);
};

export const addMessageToMessenger = (message) => {
  const messages = [...store.getState().messages];
  messages.push(message);
  store.dispatch(setMessages(messages));
};
