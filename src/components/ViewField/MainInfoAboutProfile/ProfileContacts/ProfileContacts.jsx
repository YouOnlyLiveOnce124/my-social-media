import React, { memo, useState, useEffect } from "react";
import m from "../MainInfoAboutProfile.module.css";
import {
  validateContactField,
  validateContactsForSave,
} from "../../../../validators/contactValidators";

const ContactItem = ({
  label,
  value,
  icon,
  isEditing,
  onChange,
  fieldName,
  error,
  onBlur,
}) => (
  <div className={m.contact_item}>
    <span className={m.contact_label}>
      {icon && <span className={m.contact_icon}>{icon}</span>}
      {label}:
    </span>
    {isEditing ? (
      <div className={m.input_container}>
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(fieldName, e.target.value)}
          onBlur={() => onBlur(fieldName, value)}
          className={`${m.contact_input} ${error ? m.input_error : ""}`}
          placeholder={`Enter ${label} URL`}
        />
        {error && <span className={m.error_text}>{error}</span>}
      </div>
    ) : value ? (
      <a
        href={value.startsWith("http") ? value : `https://${value}`}
        target="_blank"
        rel="noopener noreferrer"
        className={m.contact_link}
      >
        {value}
      </a>
    ) : (
      <span className={m.contact_value}>Not specified</span>
    )}
  </div>
);

const ProfileContacts = memo(({ contacts, isMyProfile, onContactsUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContacts, setEditedContacts] = useState({});
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});

  // Инициализируем состояние при получении contacts
  useEffect(() => {
    setEditedContacts(contacts || {});
    setErrors({});
    setTouchedFields({});
  }, [contacts]);

  const handleContactChange = (field, value) => {
    setEditedContacts((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Очищаем ошибку при изменении поля, только если оно было touched
    if (touchedFields[field] && errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleFieldBlur = (field, value) => {
    setTouchedFields((prev) => ({
      ...prev,
      [field]: true,
    }));

    const error = validateContactField(field, value);
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  const validateAllFields = () => {
    const newErrors = validateContactsForSave(editedContacts);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const hasErrors = () => {
    return Object.values(errors).some((error) => error !== undefined);
  };
  const handleSave = async () => {
    if (!validateAllFields()) {
      alert("Please fix validation errors before saving.");
      return;
    }

    setIsSaving(true);
    try {
      // Создаем объект без mainLink
      const contactsToSave = { ...editedContacts };
      delete contactsToSave.mainLink;

      await onContactsUpdate(contactsToSave);
      setIsEditing(false);
      setErrors({});
      setTouchedFields({});
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedContacts(contacts || {});
    setIsEditing(false);
    setErrors({});
    setTouchedFields({});
  };

  // Добавляем проверку на существование contacts
  if (!contacts) return null;

  // Исключаем mainLink из отображения
  const contactsToShow = { ...contacts };
  delete contactsToShow.mainLink;

  const editedContactsToShow = { ...editedContacts };
  delete editedContactsToShow.mainLink;

  return (
    <div className={m.contacts_section}>
      <div className={m.contacts_header}>
        <h3>Contacts</h3>
        {isMyProfile && (
          <div className={m.contacts_actions}>
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className={m.save_btn}
                  disabled={isSaving || hasErrors()}
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={handleCancel}
                  className={m.cancel_btn}
                  disabled={isSaving}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className={m.edit_btn}>
                Edit Contacts
              </button>
            )}
          </div>
        )}
      </div>

      <div className={m.contacts_grid}>
        <ContactItem
          label="GitHub"
          value={editedContacts.github}
          icon="🐱"
          isEditing={isEditing}
          onChange={handleContactChange}
          onBlur={handleFieldBlur}
          fieldName="github"
          error={errors.github}
        />
        <ContactItem
          label="VK"
          value={editedContacts.vk}
          icon="🔵"
          isEditing={isEditing}
          onChange={handleContactChange}
          onBlur={handleFieldBlur}
          fieldName="vk"
          error={errors.vk}
        />
        <ContactItem
          label="Facebook"
          value={editedContacts.facebook}
          icon="📘"
          isEditing={isEditing}
          onChange={handleContactChange}
          onBlur={handleFieldBlur}
          fieldName="facebook"
          error={errors.facebook}
        />
        <ContactItem
          label="Instagram"
          value={editedContacts.instagram}
          icon="📸"
          isEditing={isEditing}
          onChange={handleContactChange}
          onBlur={handleFieldBlur}
          fieldName="instagram"
          error={errors.instagram}
        />
        <ContactItem
          label="Twitter"
          value={editedContacts.twitter}
          icon="🐦"
          isEditing={isEditing}
          onChange={handleContactChange}
          onBlur={handleFieldBlur}
          fieldName="twitter"
          error={errors.twitter}
        />
        <ContactItem
          label="Website"
          value={editedContacts.website}
          icon="🌐"
          isEditing={isEditing}
          onChange={handleContactChange}
          onBlur={handleFieldBlur}
          fieldName="website"
          error={errors.website}
        />
        <ContactItem
          label="YouTube"
          value={editedContacts.youtube}
          icon="📺"
          isEditing={isEditing}
          onChange={handleContactChange}
          onBlur={handleFieldBlur}
          fieldName="youtube"
          error={errors.youtube}
        />
      </div>
    </div>
  );
});

export default ProfileContacts;
