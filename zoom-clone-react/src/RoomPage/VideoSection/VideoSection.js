import React, { useState } from "react";
import VideoButtons from "./VideoButtons";

function VideoSection() {
  const [room, setRoom] = useState("");
  return (
    <div className="video_section_container">
      <VideoButtons room={room} />
    </div>
  );
}

export default VideoSection;
