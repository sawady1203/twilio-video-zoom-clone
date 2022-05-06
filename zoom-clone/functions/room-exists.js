exports.handler = async function (context, event, callback) {
  const roomId = event.roomId;
  const response = new Twilio.Response();
  const HOST = context.HOST;
  const headers = {
    "Access-Control-Allow-Origin": `${HOST}`,
    "Access-Control-Allow-Method": "POST",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  response.setHeaders(headers);

  // const client = context.getTwilioClient();
  const client = require("twilio")(
    context.TWILIO_API_KEY,
    context.TWILIO_API_SECRET,
    {
      accountSid: context.TWILIO_ACCOUNT_SID,
    }
  );

  // roomリストを取得
  await client.video.rooms
    .list({
      uniqueName: roomId,
    })
    .then((room) => {
      //   console.log("rooms list:", rooms.length);
      if (room.length >= 1) {
        return response.setBody({
          roomExists: true,
          room,
        });
      } else if (room.length === 0) {
        return response.setBody({
          roomExists: false,
        });
      }
      return callback(null, response);
    })
    .catch((err) => {
      response.setBody({
        roomExists: false,
        err,
      });
    });

  return callback(null, response);
};
