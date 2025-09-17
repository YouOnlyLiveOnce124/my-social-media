export const required = (value) => (value ? undefined : "Required");

export const maxLength = (max) => (value) =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const minLength = (min) => (value) =>
  value && value.length < min
    ? `Must be at least ${min} characters`
    : undefined;

export const minValue = (min) => (value) =>
  value && value.length < min
    ? `Must be at least ${min} characters`
    : undefined;

export const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;

export const aol = (value) =>
  value && /.+@aol\.com/.test(value)
    ? "Really? You still use AOL for your email?"
    : undefined;

export const captchaRequired = (value) => {
  return value ? undefined : "Captcha is required";
};

// Валидаторы для react-hook-form
export const hookFormValidators = {
  required: (message = "Required") => ({
    required: message,
    validate: (value) => required(value),
  }),

  maxLength: (max, message) => ({
    validate: (value) => maxLength(max)(value),
    ...(message && { message }),
  }),

  minValue: (min, message) => ({
    validate: (value) => minValue(min)(value),
    ...(message && {
      message: message || `Must be at least ${min} characters`,
    }),
  }),
  minLength: (min, message) => ({
    minLength: {
      value: min,
      message: message || `Must be at least ${min} characters`,
    },
    validate: (value) => minLength(min)(value),
  }),

  email: () => ({
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: "Invalid email address",
    },
    validate: (value) => email(value),
  }),

  aol: () => ({
    validate: (value) => aol(value),
  }),

  captchaRequired: () => ({
    required: "Captcha is required",
    validate: (value) => captchaRequired(value),
  }),
};
