import React from "react";

const dummyMessages = [
  { identity: "sawada", content: "test test", messageCreateByMe: true },
  { identity: "sawada", content: "test test", messageCreateByMe: true },
  { identity: "ohashi", content: "test test" },
  { identity: "ohashi", content: "test test" },
  { identity: "nakagawa", content: "test test" },
];

const Message = ({ author, content, sameAuthor, messageCreateByMe }) => {
  const alignClass = messageCreateByMe
    ? "message_align_right"
    : "message_align_left";
  const authorText = messageCreateByMe ? "You" : author;
  const contentAdditionalStyles = messageCreateByMe
    ? "message_right_styles"
    : "message_left_styles";

  return (
    <div className={`message_container ${alignClass}`}>
      {!sameAuthor && <p className="message_title">{authorText}</p>}
      <p className={`message_content ${contentAdditionalStyles}`}>{content}</p>
    </div>
  );
};

function Messages() {
  return (
    <div className="messages_container">
      {dummyMessages.map((message, index) => {
        const sameAuthor =
          index > 0 && message.identity === dummyMessages[index - 1].identity;
        return (
          <Message
            author={message.identity}
            content={message.content}
            sameAuthor={sameAuthor}
            messageCreateByMe={message.messageCreateByMe}
          />
        );
      })}
    </div>
  );
}

export default Messages;
