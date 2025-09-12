import React from "react";
import m from "./SendMessage.module.css";

import SendMessageFormRedux from "./SendMessageForm";

const SendMessage = (props) => {
  // let text = React.createRef(); здесь без рефок

  // let addMessage = () => {
  //   props.addMyMessage();
  //   // props.dispatch(addMyMessage());
  // };

  // let onGetSymbol = (e) => {
  //   let target = e.target.value;
  //   props.get(target);
  //props.dispatch(getSymbolForAddMyMessage(target));

  const sendMessage = (values) => {
    console.log(values.sendMessage);
    props.addMyMessage(values.sendMessage);
    values.sendMessage = "";
  };

  return (
    <div className={m.send_message}>
      <SendMessageFormRedux onSubmit={sendMessage} />
    </div>
  );
};

export default SendMessage;
