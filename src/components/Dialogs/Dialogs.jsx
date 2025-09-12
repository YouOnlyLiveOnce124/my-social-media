import m from "./Dialogs.module.css";
import DialogsWithFriend from "./Dialog/DialogsWithFriend";
import Messages from "./Messages/Messages";

import SendMessageContainer from "./SendMessage/SendMessageContainer";

import { useSelector } from "react-redux";

const Dialogs = () => {
  const state = useSelector((state) => state.dialogsPage);

  let processedArrDataFriend = state.friends.map((dialog) => (
    <DialogsWithFriend
      name={dialog.name}
      path={dialog.path}
      src={dialog.src}
      id={dialog.id}
      key={dialog.id}
    />
  ));

  let processedArrDataMessages = state.messages.map((m) => (
    <Messages message={m.message} id={m.id} key={m.id} isMyMessage={false} />
  ));

  let processedArrDataMyMessages = state.myMessage.map((m) => (
    <Messages message={m.message} id={m.id} key={m.id} isMyMessage={true} />
  ));

  return (
    <div className={m.dialogs}>
      <div className={m.dialogs_left_part}>
        <h3>Dialogs</h3>
        {processedArrDataFriend}
      </div>

      <div className={m.messages_right_part}>
        <div className={m.messages_container}>
          {processedArrDataMyMessages}
          {processedArrDataMessages}
        </div>
      </div>

      <div className={m.send_message}>
        <SendMessageContainer />
      </div>
    </div>
  );
};
export default Dialogs;
