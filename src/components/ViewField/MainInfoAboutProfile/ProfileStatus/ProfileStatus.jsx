import React, { memo, useState, useEffect } from "react";
import m from "./ProfileStatus.module.css";

const ProfileStatus = memo((props) => {
  const [editMode, setEditMode] = useState(false);
  const [localStatus, setLocalStatus] = useState(props.status);

  // Обновляем localStatus когда приходит новый status из пропсов
  useEffect(() => {
    setLocalStatus(props.status);
  }, [props.status]);

  const onChange = (e) => {
    setLocalStatus(e.target.value);
  };

  const activateEditMode = () => {
    // Проверяем можно ли редактировать (это наш профиль)
    console.log(props.isMyProfile, props.myProfileId);
    if (props.isMyProfile) {
      setEditMode(true);
    }
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    // Отправляем новый статус только если он изменился
    if (localStatus !== props.status) {
      props.updateStatus(localStatus);
    }
  };

  // Если нажали Enter в поле ввода
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      deactivateEditMode();
    }
  };

  return (
    <div>
      {!editMode ? (
        <div>
          <span
            onDoubleClick={props.isMyProfile ? activateEditMode : undefined}
          >
            {!props.status ? "Create your status here" : props.status}
          </span>
        </div>
      ) : undefined}
      {editMode ? (
        <div>
          <input
            onChange={onChange}
            onBlur={deactivateEditMode}
            onKeyPress={onKeyPress}
            autoFocus
            type="text"
            value={localStatus}
          />
        </div>
      ) : undefined}
    </div>
  );
});

export default ProfileStatus;
