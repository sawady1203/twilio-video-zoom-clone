import React, { useState } from "react";
import VideoButtons from "./VideoButtons";
import Videos from "./Videos";

function VideoSection() {
  const [room, setRoom] = useState("");
  return (
    <div className="video_section_container">
      <Videos room={room} setRoom={setRoom} />
      <VideoButtons room={room} />
    </div>
  );
}

export default VideoSection;
