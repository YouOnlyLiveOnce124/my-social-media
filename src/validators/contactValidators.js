import { required, maxLength } from "./hookFormValidators";

// Валидаторы для разных типов контактов
export const contactValidators = {
  github: (value) => {
    if (!value || value.trim() === "") return undefined; // Пустое поле - не ошибка
    if (!/^https?:\/\/github\.com\/[a-zA-Z0-9_-]+$/.test(value)) {
      return "Must be a valid GitHub URL (https://github.com/username)";
    }
    return undefined;
  },

  vk: (value) => {
    if (!value || value.trim() === "") return undefined;
    if (!/^https?:\/\/vk\.com\/[a-zA-Z0-9_.]+$/.test(value)) {
      return "Must be a valid VK URL (https://vk.com/username)";
    }
    return undefined;
  },

  facebook: (value) => {
    if (!value || value.trim() === "") return undefined;
    if (!/^https?:\/\/www\.facebook\.com\/[a-zA-Z0-9.]+$/.test(value)) {
      return "Must be a valid Facebook URL (https://www.facebook.com/username)";
    }
    return undefined;
  },

  instagram: (value) => {
    if (!value || value.trim() === "") return undefined;
    if (!/^https?:\/\/www\.instagram\.com\/[a-zA-Z0-9_.]+\/?$/.test(value)) {
      return "Must be a valid Instagram URL (https://www.instagram.com/username)";
    }
    return undefined;
  },

  twitter: (value) => {
    if (!value || value.trim() === "") return undefined;
    if (!/^https?:\/\/twitter\.com\/[a-zA-Z0-9_]+$/.test(value)) {
      return "Must be a valid Twitter URL (https://twitter.com/username)";
    }
    return undefined;
  },

  website: (value) => {
    if (!value || value.trim() === "") return undefined;
    if (!/^https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
      return "Must be a valid website URL (https://example.com)";
    }
    return undefined;
  },

  youtube: (value) => {
    if (!value || value.trim() === "") return undefined;
    if (
      !/^https?:\/\/(www\.)?youtube\.com\/(channel\/|user\/)?[a-zA-Z0-9_-]+$/.test(
        value
      )
    ) {
      return "Must be a valid YouTube URL";
    }
    return undefined;
  },
};

// Функция для проверки всех контактов при сохранении
export const validateContactsForSave = (contacts) => {
  const errors = {};

  Object.keys(contacts).forEach((field) => {
    if (contactValidators[field]) {
      const error = contactValidators[field](contacts[field]);
      if (error) {
        errors[field] = error;
      }
    }
  });

  return errors;
};

// Функция для проверки одного поля при blur
export const validateContactField = (field, value) => {
  // Не валидируем пустые поля при blur
  if (!value || value.trim() === "") return undefined;
  return contactValidators[field] ? contactValidators[field](value) : undefined;
};
