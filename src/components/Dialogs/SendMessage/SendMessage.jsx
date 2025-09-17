import React from "react";
import m from "./SendMessage.module.css";
import SendMessageForm from "./SendMessageForm";

const SendMessage = (props) => {
  const sendMessage = (messageText) => {
    props.addMyMessage(messageText);
  };

  return (
    <div className={m.send_message}>
      <SendMessageForm onSubmit={sendMessage} />
    </div>
  );
};

export default SendMessage;
