import React, { useRef, useState } from "react";
import m from "./ProfilePhotoUpload.module.css";

const ProfilePhotoUpload = ({ onPhotoChange, currentPhoto }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onPhotoChange(e.target.result, file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  return (
    <div className={m.photoUploadContainer}>
      <div
        className={`${m.uploadArea} ${isDragging ? m.dragging : ""}`}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {currentPhoto ? (
          <div className={m.previewContainer}>
            <img
              src={currentPhoto}
              alt="Profile preview"
              className={m.profilePreview}
            />
            <div className={m.overlay}>
              <span className={m.changeText}>🔄 Изменить фото</span>
            </div>
          </div>
        ) : (
          <div className={m.placeholder}>
            <div className={m.uploadIcon}>📷</div>
            <p className={m.uploadText}>Нажмите или перетащите фото сюда</p>
            <p className={m.uploadSubtext}>JPG, PNG до 5MB</p>
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className={m.fileInput}
        accept="image/jpeg,image/png,image/gif"
        onChange={(e) => handleFileSelect(e.target.files[0])}
      />

      <div className={m.uploadTips}>
        <span>✨ Совет: используйте яркое четкое фото</span>
      </div>
    </div>
  );
};

export default ProfilePhotoUpload;
