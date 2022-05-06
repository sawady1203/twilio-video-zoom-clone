import React, { useState, useEffect } from "react";
import { setParticipants } from "../../store/actions";
import { store } from "../../store/store";
import Participant from "./Participant";

function TwilioRoom({ room }) {
  const [RemoteParticipants, setRemoteParticipants] = useState([]);

  useEffect(() => {
    const participantConnected = (participant) => {
      console.log(`${participant.identity} has joined this room`);
      setRemoteParticipants((prevParticipants) => [
        ...prevParticipants,
        participant,
      ]);
      addParticipantToStore(participant);
    };

    const participantDisconnected = (participant) => {
      console.log(`${participant.identity} has removed this room`);
      setRemoteParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
      removeParticipantFromStore(participant);
    };

    room.on("participantConnected", participantConnected);
    room.on("participantDisconnected", participantDisconnected);
    room.participants.forEach(participantConnected);
    return () => {
      room.off("participantConnected", participantConnected);
      room.off("participantDisconnected", participantDisconnected);
    };
  }, [room]);

  const addParticipantToStore = (participant) => {
    const BeforeParticipants = store.getState().participants;

    if (BeforeParticipants.find((p) => p.identity === participant.identity)) {
      return;
    } else {
      const newParticipants = [...BeforeParticipants];
      newParticipants.push({ identity: participant.identity });
      store.dispatch(setParticipants(newParticipants));
    }
  };

  const removeParticipantFromStore = (participant) => {
    const participants = store
      .getState()
      .participants.filter((p) => p.identity !== participant.identity);
    store.dispatch(setParticipants(participants));
  };

  return (
    <div className="room">
      <div className="participants">
        <Participant
          key={room.localParticipant.identity}
          localParticipant
          participant={room.localParticipant}
        />
        {RemoteParticipants.map((participant) => {
          return (
            <Participant key={participant.identity} participant={participant} />
          );
        })}
      </div>
    </div>
  );
}

export default TwilioRoom;
