import React, { useState } from "react";
import s from "./Captcha.module.css";

export const Captcha = ({ captchaUrl, onRefreshCaptcha, register, errors }) => {
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
          onClick={handleRefresh}
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

      {/* Заменяем Field на input с register */}
      <input
        {...register("captcha", {
          required: "Captcha is required",
        })}
        type="text"
        placeholder="Enter captcha text"
        className={s.captchaInput}
      />

      {/* Вывод ошибок captcha */}
      {errors.captcha && (
        <div className={s.errorMessage}>⚠️ {errors.captcha.message}</div>
      )}
    </div>
  );
};
