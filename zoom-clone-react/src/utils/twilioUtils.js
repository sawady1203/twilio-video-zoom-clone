import axios from "axios";

const URL = process.env.REACT_APP_TWILIO_URL;

export const checkIfRoomExists = async (roomId) => {
  const response = await axios.post(URL + `/room-exists?roomId=${roomId}`);

  return response.data.roomExists;
};
