import React, { useRef, useEffect } from "react";
import reactDOM from "react-dom";

function VideoTrack({ track }) {
  const trackRef = useRef();

  useEffect(() => {
    const child = track.attach();
    trackRef.current.classList.add(track.kind);
    trackRef.current.append(child);

    const videosPortal = document.getElementById("videos_portal");

    if (!videosPortal.classList.contains("videos_portal_styles")) {
      videosPortal.classList.add("videos_portal_styles");
    }
  }, []);

  const content = (
    <div className="video_track_container">
      <div ref={trackRef}></div>
    </div>
  );

  return reactDOM.createPortal(
    content,
    document.getElementById("videos_portal")
  );
}

export default VideoTrack;
