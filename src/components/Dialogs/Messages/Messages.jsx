import m from "./Messages.module.css";

const Messages = (props) => {
  const messageClass = props.isMyMessage ? m.my_message : m.friend_message;

  return <div className={`${m.message} ${messageClass}`}>{props.message}</div>;
};

export default Messages;
