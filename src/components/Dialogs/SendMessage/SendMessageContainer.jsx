import React from "react";

import {
  addMyMessage,
  getSymbolForAddMyMessage,
} from "../../../reducer/MessagePageReducer";
import SendMessage from "./SendMessage";
import { useDispatch, useSelector } from "react-redux";

const SendMessageContainer = () => {
  let state = useSelector((state) => state.dialogsPage);
  let dispatch = useDispatch();

  let addMessage = (sendMessage) => {
    dispatch(addMyMessage(sendMessage));
  };

  let get = (target) => {
    dispatch(getSymbolForAddMyMessage(target));
  };

  return (
    <SendMessage
      addMyMessage={addMessage}
      get={get}
      sendMessage={state.sendMessage}
    />
  );
};

export default SendMessageContainer;
