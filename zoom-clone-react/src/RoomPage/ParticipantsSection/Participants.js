import React from "react";
import { store } from "../../store/store";
import { connect } from "react-redux";

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

function Participants(props) {
  const { participants } = props;
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

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStoreStateToProps, null)(Participants);
