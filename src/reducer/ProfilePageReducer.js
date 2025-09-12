import {
  getStatusSelectedUser,
  getUserCurrentPage,
  savePhoto,
  updateProfileData,
  updateStatusUser,
} from "../api/api";

const add_post = "ADD-POST";
const get_symbol = "GET-SYMBOL";
const set_user_profile = "SET-USER-PROFILE";
const set_user_status = "SET-USER-STATUS";
const SET_FETCHING_PROFILE = "SET-FETCHING-PROFILE";
const SET_FETCHING_STATUS = "SET-FETCHING-STATUS";
const SET_PROFILE_PHOTOS = "SET_PROFILE_PHOTOS";
const UPDATE_PROFILE_CONTACTS = "UPDATE_PROFILE_CONTACTS";

let initialState = {
  profile: null, // Оставляем null, но добавляем проверки в компонентах
  posts: [
    { id: 1, message: "Hi, how are you", likes: "99" },
    { id: 2, message: "Post 2", likes: "22" },
    { id: 3, message: "Post 3", likes: "13" },
  ],
  status: "",
  isFetchingProfile: false,
  isFetchingStatus: false,
};
let profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case add_post:
      return {
        ...state,
        posts: [
          ...state.posts,
          {
            id: state.posts.length + 1,
            message: action.postingMessage,
            likes: 0,
          },
        ],
      };
    case get_symbol:
      return {
        ...state,
        resArrSymbl: action.newText,
      };
    case set_user_profile:
      return {
        ...state,
        profile: action.profile,
      };
    case set_user_status:
      return {
        ...state,
        status: action.status,
      };
    case SET_FETCHING_PROFILE:
      return {
        ...state,
        isFetchingProfile: action.isFetching,
      };
    case SET_FETCHING_STATUS:
      return {
        ...state,
        isFetchingStatus: action.isFetching,
      };
    case SET_PROFILE_PHOTOS:
      return {
        ...state,
        profile: {
          ...state.profile,
          photos: action.photos,
        },
      };
    case UPDATE_PROFILE_CONTACTS:
      return {
        ...state,
        profile: {
          ...state.profile,
          contacts: {
            ...state.profile.contacts,
            ...action.contacts,
          },
        },
      };
    default:
      return state;
  }
};

export const addPost = (postingMessage) => ({ type: add_post, postingMessage });
export const getSybol = (text) => ({ type: get_symbol, newText: text });

const setUserProfile = (profile) => ({
  type: set_user_profile,
  profile,
});

const setUserProfileStatus = (status) => ({
  type: set_user_status,
  status,
});

// Новые экшены для отслеживания загрузки
const setFetchingProfile = (isFetching) => ({
  type: SET_FETCHING_PROFILE,
  isFetching,
});
export const setProfilePhotos = (photos) => ({
  type: SET_PROFILE_PHOTOS,
  photos, // { small: string, large: string }
});

const setFetchingStatus = (isFetching) => ({
  type: SET_FETCHING_STATUS,
  isFetching,
});

export const updateProfileContacts = (contacts) => ({
  type: UPDATE_PROFILE_CONTACTS,
  contacts,
});
export const getCurrentUserPage = (userId) => {
  return (dispatch, getState) => {
    const state = getState().profilePage;

    // Защита от дублирования запросов
    if (state.isFetchingProfile) {
      return;
    }

    dispatch(setFetchingProfile(true));

    getUserCurrentPage(userId)
      .then((data) => {
        dispatch(setUserProfile(data));
        // get data profile
        dispatch(setFetchingProfile(false));
      })
      .catch((error) => {
        console.error("Failed to fetch profile:", error);
        dispatch(setFetchingProfile(false));
      });
  };
};

export const getUserStatus = (userId) => {
  return (dispatch, getState) => {
    const state = getState().profilePage;

    // Защита от дублирования запросов
    if (state.isFetchingStatus) {
      return;
    }

    dispatch(setFetchingStatus(true));

    getStatusSelectedUser(userId)
      .then((response) => {
        dispatch(setUserProfileStatus(response.data));
        dispatch(setFetchingStatus(false));
      })
      .catch((error) => {
        console.error("Failed to fetch status:", error);
        dispatch(setFetchingStatus(false));
      });
  };
};

export const uploadPhoto = (file) => {
  return async (dispatch) => {
    try {
      const response = await savePhoto(file);
      if (response.data.resultCode === 0) {
        // 1. Обновляем фото в state
        dispatch(setProfilePhotos(response.data.data));

        // 2. Перезагружаем весь профиль чтобы обновить все данные
        dispatch(getCurrentUserPage()); // без параметра - возьмет текущий ID
      }
    } catch (error) {
      console.error("Ошибка загрузки:", error);
    }
  };
};

export const updateUserStatus = (status) => {
  return (dispatch) => {
    updateStatusUser(status).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(setUserProfileStatus(status));
      }
    });
  };
};

export const updateProfile = (profileData) => {
  return async (dispatch, getState) => {
    try {
      console.log("🔄 Starting profile update...");

      const response = await updateProfileData(profileData);

      if (response.data.resultCode === 0) {
        console.log("✅ Profile updated on server");

        // Обновляем локальный state
        dispatch(setUserProfile(profileData));

        // Также обновляем контакты отдельно для надежности
        if (profileData.contacts) {
          dispatch(updateProfileContacts(profileData.contacts));
        }

        // Показываем уведомление пользователю
      } else {
        console.error("❌ Server error:", response.data.messages);
      }
    } catch (error) {
      console.error("❌ Network error:", error);
    }
  };
};

export default profileReducer;
