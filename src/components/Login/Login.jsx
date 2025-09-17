import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { thunkAuthPostUser, updateCaptcha } from "../../reducer/AuthReducer";
import { Navigate } from "react-router-dom";
import { Captcha } from "./Captcha";
import s from "./Login.module.css";
import {
  hookFormValidators,
  email,
  aol,
  minLength,
} from "../../validators/hookFormValidators";

// ИСПРАВЛЕНО: убраны фигурные скобки вокруг имени компонента
export const LoginField = () => {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setError,
    reset,
    watch,
    trigger,
    clearErrors,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
      captcha: "",
    },
  });

  const handleRefreshCaptcha = () => {
    dispatch(updateCaptcha());
  };

  const onSubmit = async (formData) => {
    const { email, password, rememberMe = false, captcha } = formData;

    const result = await dispatch(
      thunkAuthPostUser(email, password, rememberMe, captcha)
    );

    if (result.success) {
      // ✅ Успешная авторизация - редирект произойдет автоматически
      console.log("Login successful!");
    } else {
      // ❌ Ошибка авторизации
      if (result.resultCode === 10) {
        // Captcha required
        handleRefreshCaptcha();
        setError("root", {
          type: "manual",
          message: result.error,
        });
      } else {
        setError("root", {
          type: "manual",
          message: result.error,
        });
      }
    }
  };

  const isAuth = state.isAuth;
  if (isAuth) {
    return <Navigate to={"/profile"} />;
  }

  const handleClearForm = () => {
    reset();
  };

  const handleInputChange = async (fieldName) => {
    clearErrors();
    await trigger(fieldName);
  };

  const emailValue = watch("email");
  const passwordValue = watch("password");

  return (
    <div className={s.loginContainer}>
      <h1 className={s.loginTitle}>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={s.loginForm}>
        {/* Email Field */}
        <div className={s.formGroup}>
          <input
            {...register("email", {
              ...hookFormValidators.required("Email is required"),
              ...hookFormValidators.email(),
              validate: (value) => {
                const emailError = email(value);
                const aolError = aol(value);
                return emailError || aolError;
              },
            })}
            type="email"
            placeholder="Enter your email"
            className={s.inputField}
            onChange={(e) => {
              register("email").onChange(e);
              handleInputChange("email");
            }}
          />
          {errors.email && (
            <div className={s.errorMessage}>⚠️ {errors.email.message}</div>
          )}
        </div>

        {/* Password Field */}
        <div className={s.formGroup}>
          <div className={s.passwordContainer}>
            <input
              {...register("password", {
                ...hookFormValidators.required("Password is required"),
                ...hookFormValidators.minLength(
                  4,
                  "Password must be at least 4 characters"
                ),
              })}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className={s.inputField}
              onChange={(e) => {
                register("password").onChange(e);
                handleInputChange("password");
              }}
            />
            <button
              type="button"
              className={s.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {errors.password && (
            <div className={s.errorMessage}>⚠️ {errors.password.message}</div>
          )}
        </div>

        {/* Remember Me Checkbox */}
        <div className={s.checkboxGroup}>
          <input
            {...register("rememberMe")}
            type="checkbox"
            className={s.checkbox}
          />
          <label className={s.checkboxLabel}>Remember me</label>
        </div>

        {/* Captcha Component */}
        <Captcha
          captchaUrl={state.captchaUrl}
          onRefreshCaptcha={handleRefreshCaptcha}
          register={register}
          errors={errors}
        />

        {/* Global Form Error */}
        {errors.root && (
          <div className={s.errorMessage}>⚠️ {errors.root.message}</div>
        )}

        <div className={s.buttonsGroup}>
          <button
            type="submit"
            disabled={isSubmitting}
            className={s.submitButton}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <button
            type="button"
            disabled={!emailValue && !passwordValue}
            onClick={handleClearForm}
            className={s.clearButton}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};
