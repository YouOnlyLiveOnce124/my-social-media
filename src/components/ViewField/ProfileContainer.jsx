import React, { memo, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  getCurrentUserPage,
  getUserStatus,
  updateUserStatus,
} from "../../reducer/ProfilePageReducer";
import ViewField from "./ViewField";
import Loader from "../GeneralItems/Loader";

const ProfileContainer = memo(() => {
  const profile = useSelector((state) => state.profilePage?.profile);
  const status = useSelector((state) => state.profilePage?.status);
  const id = useSelector((state) => state.auth?.id);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const isMyProfile = Boolean(
    id && (!params.userId || params.userId === String(id))
  );

  const getCurrentUP = useCallback(
    (userId) => {
      dispatch(getCurrentUserPage(userId));
    },
    [dispatch]
  );

  const getStatusUser = useCallback(
    (userId) => {
      dispatch(getUserStatus(userId));
    },
    [dispatch]
  );

  const updateStatus = useCallback(
    (status) => {
      dispatch(updateUserStatus(status));
    },
    [dispatch]
  );

  useEffect(() => {
    let userId = params.userId;
    if (!userId) {
      userId = id;

      if (!userId) {
        navigate("/login");
        return;
      }
    }

    getCurrentUP(userId);
    getStatusUser(userId);
  }, [params.userId, id, getCurrentUP, getStatusUser, navigate]);

  console.log("ProfileContainer", params?.userId, id);

  if (!profile || !id) {
    return <Loader />;
  }

  return (
    <div className="main_field">
      <ViewField
        profile={profile}
        status={status}
        updateStatus={updateStatus}
        paramsId={params.userId}
        myProfileId={id}
        isMyProfile={isMyProfile}
      />
    </div>
  );
});

export default ProfileContainer;
