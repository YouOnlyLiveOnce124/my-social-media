import React from "react";
import { useForm } from "react-hook-form";
import m from "./SendMessage.module.css";

const SendMessageForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      sendMessage: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data.sendMessage);
    props.onSubmit(data.sendMessage);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={m.send}>
        <div className={m.textarea}>
          <textarea
            {...register("sendMessage", {
              required: "Message is required",
              maxLength: {
                value: 30,
                message: "Must be 30 characters or less",
              },
              minLength: {
                value: 3,
                message: "Must be at least 3 characters",
              },
            })}
            placeholder="Write message for your friend"
            className={errors.sendMessage ? m.errorInput : ""}
          />
          {errors.sendMessage && (
            <div className={m.errorMessage}>
              ⚠️ {errors.sendMessage.message}
            </div>
          )}
        </div>
        <div className={m.div_button}>
          <button className={m.button} disabled={!isValid}>
            Send
          </button>
        </div>
      </div>
    </form>
  );
};

export default SendMessageForm;
