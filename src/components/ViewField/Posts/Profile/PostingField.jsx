import React from "react";
import { useForm } from "react-hook-form";
import s from "./Posting.module.css";
import {
  hookFormValidators,
  required,
  maxLength,
  minValue,
} from "../../../../validators/hookFormValidators";

const PostingField = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      posting: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data.posting);
    props.addPost(data.posting);
    reset(); // Очищаем форму после отправки
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={s.field_textarea_and_button}>
        <div className={s.textarea}>
          <textarea
            {...register("posting", {
              required: "Post is required",
              maxLength: {
                value: 30,
                message: "Must be 30 characters or less",
              },
              minLength: {
                value: 3,
                message: "Must be at least 3 characters",
              },
            })}
            placeholder="Write something for post"
            rows="4"
            style={{ resize: "vertical" }}
            className={errors.posting ? s.errorInput : ""}
          />
          {errors.posting && (
            <div className={s.errorMessage}>⚠️ {errors.posting.message}</div>
          )}
        </div>
        <div className={s.button}>
          <button type="submit" disabled={!isValid}>
            New Post
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostingField;
