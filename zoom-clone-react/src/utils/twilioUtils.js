import axios from "axios";
import { v4 as uuid } from "uuid";

const URL = process.env.REACT_APP_TWILIO_URL;

export const getTokenFromTwilio = async (setAccessToken, identity) => {
  const randomId = uuid(); // room名はランダムなもの
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
