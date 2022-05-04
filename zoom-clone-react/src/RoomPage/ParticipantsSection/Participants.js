import React from "react";

function SingleParticipant({ identity, lastItem }) {
  const getParticipantName = (identity) => {
    return identity;
  };

  return (
    <>
      <p className="participants_paragraph">{getParticipantName(identity)}</p>
      {!lastItem && <span className="participants_separator_line"></span>}
    </>
  );
}

const participants = [
  { identity: "sawada" },
  { identity: "mabuchi" },
  { identity: "takagi" },
  { identity: "kuze" },
  { identity: "ohashi" },
];

function Participants() {
  return (
    <div className="participants_container">
      {participants.map((participant, index) => {
        return (
          <SingleParticipant
            key={participant.identity}
            identity={participant.identity}
            lastItem={participant.length === index + 1}
          />
        );
      })}
    </div>
  );
}

export default Participants;
