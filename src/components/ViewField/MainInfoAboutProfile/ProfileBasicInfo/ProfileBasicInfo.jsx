import React, { memo, useState, useEffect } from "react";
import m from "../MainInfoAboutProfile.module.css";

const ProfileBasicInfo = memo(({ profile, isMyProfile, onProfileUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});

  // Инициализируем состояние при получении profile
  useEffect(() => {
    setEditedProfile(profile || {});
  }, [profile]);

  const handleFieldChange = (field, value) => {
    setEditedProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onProfileUpdate(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile || {});
    setIsEditing(false);
  };

  // Добавляем проверку на существование profile
  if (!profile) return null;

  return (
    <div className={m.basic_info_section}>
      <h3>Basic Information</h3>

      <div className={m.basic_info_grid}>
        {/* Добавляем поле Full Name */}
        <div className={m.info_item}>
          <label>Full Name:</label>
          {isEditing ? (
            <input
              type="text"
              value={editedProfile.fullName || ""}
              onChange={(e) => handleFieldChange("fullName", e.target.value)}
              className={m.info_input}
              placeholder="Enter your full name"
            />
          ) : (
            <span className={m.info_value}>
              {profile.fullName || "Not specified"}
            </span>
          )}
        </div>

        <div className={m.info_item}>
          <label>About Me:</label>
          {isEditing ? (
            <textarea
              value={editedProfile.aboutMe || ""}
              onChange={(e) => handleFieldChange("aboutMe", e.target.value)}
              className={m.info_textarea}
              placeholder="Tell about yourself"
            />
          ) : (
            <span className={m.info_value}>
              {profile.aboutMe || "Not specified"}
            </span>
          )}
        </div>

        <div className={m.info_item}>
          <label>Looking for a job:</label>
          {isEditing ? (
            <div className={m.checkbox_container}>
              <input
                type="checkbox"
                id="lookingForJob"
                checked={editedProfile.lookingForAJob || false}
                onChange={(e) =>
                  handleFieldChange("lookingForAJob", e.target.checked)
                }
                className={m.info_checkbox}
              />
              <label htmlFor="lookingForJob" className={m.checkbox_label}>
                {editedProfile.lookingForAJob ? "Yes" : "No"}
              </label>
            </div>
          ) : (
            <span className={m.info_value}>
              {profile.lookingForAJob ? "Yes" : "No"}
            </span>
          )}
        </div>

        <div className={m.info_item}>
          <label>Job Description:</label>
          {isEditing ? (
            <textarea
              value={editedProfile.lookingForAJobDescription || ""}
              onChange={(e) =>
                handleFieldChange("lookingForAJobDescription", e.target.value)
              }
              className={m.info_textarea}
              placeholder="Describe what job you're looking for"
            />
          ) : (
            <span className={m.info_value}>
              {profile.lookingForAJobDescription || "Not specified"}
            </span>
          )}
        </div>
      </div>

      {isMyProfile && (
        <div className={m.basic_info_actions}>
          {isEditing ? (
            <>
              <button onClick={handleSave} className={m.save_btn}>
                Save
              </button>
              <button onClick={handleCancel} className={m.cancel_btn}>
                Cancel
              </button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)} className={m.edit_btn}>
              Edit Basic Info
            </button>
          )}
        </div>
      )}
    </div>
  );
});

export default ProfileBasicInfo;
