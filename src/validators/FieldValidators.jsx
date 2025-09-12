import React from "react";
import s from "./FieldValidators.module.css";

export const FieldValidator = ({ input, meta, typeComponent, ...props }) => {
  const hasError = meta.touched && meta.error;
  return (
    <div className={s.fieldInput}>
      {React.createElement(typeComponent, {
        ...input,
        ...props,
        className: `${props.className || ""} ${hasError ? s.error : ""}`,
      })}
      {hasError && <span className={s.error}>{meta.error}</span>}
    </div>
  );
};
