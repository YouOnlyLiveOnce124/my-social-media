export const required = (value) => (value ? undefined : "Required");

export const maxLength = (max) => (value) =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const minValue = (min) => (value) =>
  value && value.length < min ? `Must be at least ${min}` : undefined;

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
