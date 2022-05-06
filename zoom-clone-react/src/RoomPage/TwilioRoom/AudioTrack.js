import React, { useRef, useEffect } from "react";

function AudioTrack({ track }) {
  const trackRef = useRef();

  useEffect(() => {
    const child = track.attach();
    trackRef.current.classList.add(track.kind);
    trackRef.current.append(child);
  }, []);

  return <div className="track" ref={trackRef}></div>;
}

export default AudioTrack;
