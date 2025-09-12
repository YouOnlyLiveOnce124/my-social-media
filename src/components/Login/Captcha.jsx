import React, { useState } from "react";
import s from "./Captcha.module.css";
import { Field } from "redux-form";
import { FieldValidator } from "../../validators/FieldValidators";
import { required } from "../../validators/required";

export const Captcha = ({ captchaUrl, onRefreshCaptcha }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (!captchaUrl) return null;

  const handleRefresh = () => {
    setIsRefreshing(true);
    onRefreshCaptcha();

    // Сбрасываем состояние анимации через короткое время
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <div className={s.captchaContainer}>
      <div className={s.captchaHeader}>
        <span className={s.captchaLabel}>Captcha</span>
        <button
          type="button"
          onClick={onRefreshCaptcha}
          className={`${s.refreshButton} ${isRefreshing ? s.refreshing : ""}`}
          title="Refresh captcha"
          disabled={isRefreshing}
        >
          {isRefreshing ? "⏳" : "🔄"}
        </button>
      </div>

      <img
        src={captchaUrl}
        alt="captcha"
        className={`${s.captchaImage} ${isRefreshing ? s.fadeOut : ""}`}
      />

      <Field
        name="captcha"
        component={FieldValidator}
        type="text"
        placeholder="Enter captcha text"
        validate={[required]}
        typeComponent="input"
        className={s.captchaInput}
      />
    </div>
  );
};
