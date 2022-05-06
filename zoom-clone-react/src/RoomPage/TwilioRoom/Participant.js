import React, { useState, useEffect } from "react";
import AudioTrack from "./AudioTrack";
import VideoTrack from "./VideoTrack";
import { addMessageToMessenger } from "../../utils/twilioUtils";

function Participant({ participant }) {
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  const [dataTracks, setDataTracks] = useState([]);

  const trackpubsToTracks = (trackMap) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

  useEffect(() => {
    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));
    setDataTracks(trackpubsToTracks(participant.dataTracks));

    const trackSubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => [...videoTracks, track]);
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => [...audioTracks, track]);
      } else if (track.kind === "data") {
        setDataTracks((track) => [...dataTracks, track]);
        track.on("message", (data) => {
          addMessageToMessenger(JSON.parse(data));
        });
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
