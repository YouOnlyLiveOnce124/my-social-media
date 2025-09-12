import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import Loader from "../../GeneralItems/Loader";
import ProfileStatus from "./ProfileStatus/ProfileStatus";

import ProfilePhotoUpload from "./ProfilePhotoLoader/ProfilePhotoUpload";
import {
  uploadPhoto,
  updateProfile,
} from "../../../reducer/ProfilePageReducer";
import m from "./MainInfoAboutProfile.module.css";
import lookingJob from "./../../../assets/imgs/free-icon-computer-9991882.png";
import notLookingJob from "./../../../assets/imgs/free-icon-work-time-3673355.png";
import iconAvatar from "./../../../assets/imgs/user-avatar-icon-doodle-style-png.webp";
import background from "./../../../assets/imgs/backForMyProfile.png";
import ProfileContacts from "./ProfileContacts/ProfileContacts";
import ProfileBasicInfo from "./ProfileBasicInfo/ProfileBasicInfo";

const MainInfoAboutProfile = memo((props) => {
  const { profile, status, updateStatus, myProfileId, isMyProfile } = props;
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePhotoChange = (photoData, file) => {
    dispatch(uploadPhoto(file, myProfileId));
  };

  const handleProfileUpdate = (updatedProfile) => {
    dispatch(updateProfile(updatedProfile));
  };

  const handleContactsUpdate = (updatedContacts) => {
    const updatedProfile = {
      ...profile,
      contacts: updatedContacts,
    };
    dispatch(updateProfile(updatedProfile));
  };

  const openModal = () => {
    if (profile?.photos?.large) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => setIsModalOpen(false);

  // Добавляем проверку на загрузку и существование profile
  if (!profile) {
    return <Loader />;
  }

  // Безопасное получение данных из profile
  const photos = profile.photos || {};
  const hasPhoto = photos.large !== null && photos.large !== undefined;
  const avatarSrc = hasPhoto ? `${photos.large}?${Date.now()}` : iconAvatar;

  return (
    <div className={m.container}>
      <div className={m.background}>
        <img
          src={background}
          alt="profile background"
          className={m.background_img}
        />
      </div>

      <div className={m.profile_content}>
        <div className={m.avatar_section}>
          <img
            src={avatarSrc}
            alt="user avatar"
            className={m.avatar}
            onClick={openModal}
            style={{ cursor: hasPhoto ? "pointer" : "default" }}
            key={photos.large} // Используем photos.large вместо profile.photos.large
          />

          <img
            src={profile.lookingForAJob ? lookingJob : notLookingJob}
            alt="employment status"
            className={m.job_status_icon}
          />
        </div>
      </div>

      <div>
        <ProfileStatus
          status={status}
          updateStatus={updateStatus}
          isMyProfile={isMyProfile}
          myProfileId={myProfileId}
        />
      </div>

      {/* Добавляем базовую информацию */}
      <ProfileBasicInfo
        profile={profile}
        isMyProfile={isMyProfile}
        onProfileUpdate={handleProfileUpdate}
      />

      {/* Добавляем секцию контактов */}
      <ProfileContacts
        contacts={profile.contacts || {}} // Добавляем fallback для contacts
        isMyProfile={isMyProfile}
        onContactsUpdate={handleContactsUpdate}
      />

      {isMyProfile && (
        <div>
          <ProfilePhotoUpload onPhotoChange={handlePhotoChange} />
        </div>
      )}

      {isModalOpen && (
        <div className={m.modalOverlay} onClick={closeModal}>
          <div className={m.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={m.closeButton} onClick={closeModal}>
              ×
            </button>
            <img
              src={photos.large} // Используем photos.large
              alt="Full size avatar"
              className={m.fullSizeAvatar}
            />
          </div>
        </div>
      )}
    </div>
  );
});

export default MainInfoAboutProfile;
