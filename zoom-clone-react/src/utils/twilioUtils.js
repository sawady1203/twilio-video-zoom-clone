import axios from "axios";
import { store } from "../store/store";
import { setShowOverlay } from "../store/actions";
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
      const audioTrack = new LocalAudioTrack(stream.getAudioTracks()[0]);

      let videoTrack;
      if (!onlyWithAudio) {
        videoTrack = new LocalVideoTrack(stream.getVideoTracks()[0]);
        tracks = [audioTrack, videoTrack];
      } else {
        tracks = [audioTrack];
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
