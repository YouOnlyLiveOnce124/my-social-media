import React from "react";
import s from "./Posting.module.css";
import { reduxForm, Field } from "redux-form";
import { maxLength, minValue, required } from "../../../../validators/required";
import { FieldValidator } from "../../../../validators/FieldValidators";

const PostingField = (props) => {
  const maxLength30 = maxLength(30);

  const minLength3 = minValue(3);
  return (
    <form onSubmit={props.handleSubmit}>
      <div className={s.field_textarea_and_button}>
        <div className={s.textarea}>
          <Field
            name="posting"
            component={FieldValidator}
            type="text"
            placeholder="Write something for post"
            validate={[required, maxLength30, minLength3]}
            typeComponent="textarea"
            rows="4" // Добавляем фиксированное количество строк
            style={{ resize: "vertical" }} // Ограничиваем ресайз
          />
        </div>
        <div className={s.button}>
          <button>New Post</button>
        </div>
      </div>
    </form>
  );
};

const PostingReduxField = reduxForm({
  form: "posting",
})(PostingField);

export default PostingReduxField;
