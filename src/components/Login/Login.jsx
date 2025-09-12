import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { thunkAuthPostUser, updateCaptcha } from "../../reducer/AuthReducer"; // ИМПОРТИРУЙ updateCaptcha
import { aol, email, required } from "../../validators/required";
import { FieldValidator } from "../../validators/FieldValidators";
import { Navigate } from "react-router-dom";
import { Captcha } from "./Captcha";
import s from "./Login.module.css";

const LogForm = (props) => {
  const {
    pristine,
    reset,
    submitting,
    captchaUrl,
    onRefreshCaptcha,
    handleSubmit,
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  return (
    <form onSubmit={handleSubmit} className={s.loginForm}>
      <div className={s.formGroup}>
        <Field
          name="email"
          component={FieldValidator}
          type="email"
          placeholder="Enter your email"
          validate={[required, email]}
          typeComponent="input"
          warn={aol}
          className={s.inputField}
        />
      </div>
      <div className={s.formGroup}>
        <div className={s.passwordContainer}>
          <Field
            name="password"
            component={FieldValidator}
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            validate={[required]}
            typeComponent="input"
            className={s.inputField}
          />
          <button
            type="button"
            className={s.passwordToggle}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
      </div>
      <div className={s.checkboxGroup}>
        <Field
          name="rememberMe"
          component="input"
          type="checkbox"
          className={s.checkbox}
        />
        <label className={s.checkboxLabel}>Remember me</label>
      </div>
      {/* Добавляем Captcha компонент */}
      <Captcha captchaUrl={captchaUrl} onRefreshCaptcha={onRefreshCaptcha} />
      {props.error && <div className={s.errorMessage}>⚠️ {props.error}</div>}
      <div className={s.buttonsGroup}>
        <button type="submit" disabled={submitting} className={s.submitButton}>
          {submitting ? "Logging in..." : "Login"}
        </button>

        <button
          type="button"
          disabled={pristine || submitting}
          onClick={reset}
          className={s.clearButton}
        >
          Clear
        </button>
      </div>
    </form>
  );
};

const LogReduxForm = reduxForm({
  form: "login",
})(LogForm);

export const LoginField = () => {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Добавляем функцию обновления captcha
  const handleRefreshCaptcha = () => {
    dispatch(updateCaptcha());
  };

  const onSubmit = (formData) => {
    const { email, password, rememberMe = false, captcha } = formData;
    dispatch(thunkAuthPostUser(email, password, rememberMe, captcha));
  };

  const isAuth = state.isAuth;
  if (isAuth) {
    return <Navigate to={"/profile"} />;
  }

  return (
    <div className={s.loginContainer}>
      <h1 className={s.loginTitle}>Login</h1>
      <LogReduxForm
        onSubmit={onSubmit}
        captchaUrl={state.captchaUrl}
        onRefreshCaptcha={handleRefreshCaptcha}
      />
    </div>
  );
};

export default LoginField;
