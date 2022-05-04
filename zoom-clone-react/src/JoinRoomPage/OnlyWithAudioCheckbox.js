import React from "react";
import CheckImg from "../resources/images/check.png";

function OnlyWithAudioCheckbox(props) {
  const { connectOnlyWithAudio, setConnectOnlyWithAudio } = props;

  const handleConnectionTypeChange = () => {
    setConnectOnlyWithAudio(!connectOnlyWithAudio);
  };

  return (
    <div className="checkbox_container">
      <div className="checkbox_connection" onClick={handleConnectionTypeChange}>
        {connectOnlyWithAudio && (
          // eslint-disable-next-line jsx-a11y/alt-text
          <img className="checkbox_image" src={CheckImg}></img>
        )}
      </div>
      <p className="checkbox_container_paragraph">Only audio</p>
    </div>
  );
}

export default OnlyWithAudioCheckbox;
