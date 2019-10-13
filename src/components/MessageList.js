import React from "react";
import Message from "./Message";

const MessageList = props => {
  const { messages } = props;
  return (
    <div className="message-list">
      {messages === []
        ? null
        : messages.map((message, index) => {
            return (
              <Message
                username={message.senderId}
                text={message.parts[0].payload.content}
                key={index}
              />
            );
          })}
    </div>
  );
};

export default MessageList;
