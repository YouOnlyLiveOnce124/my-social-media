import axios from "axios";

const initial = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "9bcfaabe-31f0-41dc-8d56-2b0428363e85",
  },
});

// For Pages Slide
export const getPagesFromAxios = async (currentPage, pageSize) => {
  try {
    const response = await initial.get(
      `users?page=${currentPage}&count=${pageSize}`
    );
    return response.data;
  } catch (error) {
    console.error("❌ getPagesFromAxios error:", error);
    throw error;
  }
};

// For Subscribe
export const subscription = async (userId, deleteOrPost) => {
  try {
    if (deleteOrPost === "delete") {
      const response = await initial.delete(`follow/${userId}`);
      return response;
    } else if (deleteOrPost === "post") {
      const response = await initial.post(`follow/${userId}`);
      return response;
    }
  } catch (error) {
    debugger; // ← теперь сработает!
    console.error("❌ subscription error:", error);
    throw error;
  }
};
// For Header + auth

export const getAxiosIdEmailLog = async () => {
  try {
    const response = await initial.get(`auth/me`);
    return response.data;
  } catch (error) {
    console.error("❌ getAxiosIdEmailLog error:", error);
    throw error;
  }
};

// For Auth / Post / Delete

export const postFormData = async (
  email,
  password,
  rememberMe = false,
  captcha = null
) => {
  try {
    const response = await initial.post(`auth/login`, {
      email,
      password,
      rememberMe,
      captcha,
    });
    return response.data;
  } catch (error) {
    console.error("❌ postFormData error:", error);
    throw error;
  }
};

export const logOut = async () => {
  try {
    const response = await initial.delete("auth/login");
    return response; // ← возвращаем полный response!
  } catch (error) {
    console.error("❌ logOut error:", error);
    throw error;
  }
};

// For Show UserCurrentPage

export const getUserCurrentPage = async (userId) => {
  let request = `profile/${userId}`;
  if (!userId) {
    console.warn("No userId provided, using fallback");
    request = `profile/32293`;
  }

  try {
    const response = await initial.get(request);
    console.log("📥 Received profile:", response.data);

    // Добавляем обязательные поля по умолчанию если их нет
    return {
      aboutMe: "Not specified",
      lookingForAJobDescription: "Not specified",
      lookingForAJob: false,
      contacts: {},
      ...response.data,
      contacts: response.data.contacts || {},
    };
  } catch (error) {
    console.error("❌ Error fetching profile:", error);
    throw error;
  }
};

// For Status

export const getStatusSelectedUser = async (userId) => {
  try {
    const response = await initial.get(`profile/status/${userId}`);
    return response;
  } catch (error) {
    console.error("❌ getStatusSelectedUser error:", error);
    throw error;
  }
};

export const updateStatusUser = async (status) => {
  try {
    const response = await initial.put(`profile/status`, { status: status });
    return response;
  } catch (error) {
    console.error("❌ updateStatusUser error:", error);
    throw error;
  }
};

// For Load IMG-Profile
export const savePhoto = async (photoFile) => {
  try {
    const formData = new FormData();
    formData.append("image", photoFile);

    const response = await initial.put("profile/photo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("❌ savePhoto error:", error);
    throw error;
  }
};

// For update data contacts

export const updateProfileData = async (profileData) => {
  try {
    const formatUrl = (url) => {
      if (!url || url.trim() === "" || url === "Not specified") return null;
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        return `https://${url}`;
      }
      return url;
    };

    const dataToSend = {
      userId: profileData.userId,
      lookingForAJob: profileData.lookingForAJob || false,
      lookingForAJobDescription:
        profileData.lookingForAJobDescription || "Not specified",
      aboutMe: profileData.aboutMe || "Not specified",
      fullName: profileData.fullName || "User",
      contacts: {
        github: formatUrl(profileData.contacts?.github),
        vk: formatUrl(profileData.contacts?.vk),
        facebook: formatUrl(profileData.contacts?.facebook),
        instagram: formatUrl(profileData.contacts?.instagram),
        twitter: formatUrl(profileData.contacts?.twitter),
        website: formatUrl(profileData.contacts?.website),
        youtube: formatUrl(profileData.contacts?.youtube),
        mainLink: formatUrl(profileData.contacts?.mainLink),
      },
    };

    const response = await initial.put("profile", dataToSend);
    return response;
  } catch (error) {
    console.error("❌ updateProfileData error:", error);
    throw error;
  }
};

//  добавляем функции для captcha
export const getCaptchaUrl = async () => {
  try {
    const response = await initial.get(`security/get-captcha-url`);
    return response.data;
  } catch (error) {
    console.error("❌ getCaptchaUrl error:", error);
    throw error;
  }
};

// Обновляем функцию входа с поддержкой captcha
