import React from "react";
import m from "./SendMessage.module.css";
import { Field, reduxForm } from "redux-form";
import { FieldValidator } from "../../../validators/FieldValidators";
import { maxLength, minValue, required } from "../../../validators/required";

const SendMessageForm = (props) => {
  const maxLength30 = maxLength(30);

  const minLength3 = minValue(3);

  return (
    <form onSubmit={props.handleSubmit}>
      <div className={m.send}>
        <div className={m.textarea}>
          <Field
            name="sendMessage"
            component={FieldValidator}
            type="text"
            placeholder="Write message for your friend"
            validate={[required, maxLength30, minLength3]}
            typeComponent="textarea"
          />
        </div>
        <div className={m.div_button}>
          <button className={m.button}>Send</button>
        </div>
      </div>
    </form>
  );
};

const SendMessageFormRedux = reduxForm({
  form: "sendMessageForFriend",
})(SendMessageForm);

export default SendMessageFormRedux;
