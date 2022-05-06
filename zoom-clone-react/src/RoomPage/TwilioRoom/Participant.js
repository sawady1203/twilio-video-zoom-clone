import React, { useState, useEffect } from "react";
import AudioTrack from "./AudioTrack";
import VideoTrack from "./VideoTrack";

function Participant({ participant }) {
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);

  const trackpubsToTracks = (trackMap) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

  useEffect(() => {
    const _tracks = trackpubsToTracks(participant.videoTracks);
    console.log("_tracks:", _tracks);
    // setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setVideoTracks(_tracks);
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    const trackSubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => [...videoTracks, track]);
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
      }
    };

    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnsubscribed", trackUnsubscribed);

    console.log("audioTracks: ", audioTracks);
    console.log("vidioTracks: ", videoTracks);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  return (
    <div className="participant" id={participant.identity}>
      {audioTracks.map((track) => {
        return <AudioTrack key={track} track={track} />;
      })}
      {videoTracks.map((track) => {
        return <VideoTrack key={track} track={track} />;
      })}
    </div>
  );
}

export default Participant;
