import React, { useState } from "react";
import SendMessageButton from "../../resources/images/sendMessgeButton.png";
import { sendMessageUsingDataChannel } from "../../utils/twilioUtils";

function NewMessage() {
  const [message, setMessage] = useState("");

  const handleTextChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = () => {
    //   send message to other user
    sendMessageUsingDataChannel(message, true);
    setMessage("");
  };

  const handleKeyPressed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      //   sendMessage to other user
      sendMessage();
    }
  };

  return (
    <div className="new_message_container">
      <input
        className="new_message_input"
        value={message}
        onChange={handleTextChange}
        placeholder="Type your message..."
        type="text"
        onKeyDown={handleKeyPressed}
      />
      <img
        className="new_message_button"
        src={SendMessageButton}
        onClick={sendMessage}
        alt="new message button"
      />
    </div>
  );
}

export default NewMessage;
