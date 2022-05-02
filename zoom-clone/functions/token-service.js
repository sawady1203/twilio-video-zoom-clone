exports.handler = function (context, event, callback) {
  // 環境変数のセット
  const TWILIO_ACCOUNT_SID = context.TWILIO_ACCOUNT_SID;
  const TWILIO_API_KEY = context.TWILIO_API_KEY;
  const TWILIO_API_SECRET = context.TWILIO_API_SECRET;

  // jwt claim
  const identity = event.identity;
  const room = event.room;

  const AccessToken = Twilio.jwt.AccessToken;
  const VideoGrant = AccessToken.VideoGrant;

  const videoGrant = new VideoGrant({
    room: room,
  });

  const token = new AccessToken(
    TWILIO_ACCOUNT_SID,
    TWILIO_API_KEY,
    TWILIO_API_SECRET,
    { identity: identity }
  );

  token.addGrant(videoGrant);

  const response = new Twilio.Response();
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Method": "POST",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  response.setHeaders(headers);
  response.setBody({
    accessToken: token.toJwt(),
  });

  return callback(null, response);
};
