import axios from "axios";

export const BASE_URL = "http://localhost:8080";

const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    token: localStorage.getItem("LOGIN_USER"),
  },
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);
  return data;
};

// get danh sách video
export const getVideoApi = async () => {
  const { data } = await axios.get(`${BASE_URL}/video/get-video`, options);
  return data.data;
};

// get danh sách video type
export const getVideoTypeApi = async () => {
  const { data } = await axios.get(`${BASE_URL}/video/get-video-type`, options);
  return data.data;
};

// get danh sách video by type
export const getVideoByTypeApi = async (typeId) => {
  const { data } = await axios.get(
    `${BASE_URL}/video/get-video-by-type/${typeId}`,
    options
  );
  return data.data;
};

// get danh sách video by page
export const getVideoByPageApi = async (page) => {
  const { data } = await axios.get(
    `${BASE_URL}/video/get-video-by-page/${page}`,
    options
  );
  return data.data;
};

// get video detail
export const getVideoDetailApi = async (videoId) => {
  const { data } = await axios.get(
    `${BASE_URL}/video/get-video-detail/${videoId}`,
    options
  );
  return data.data;
};

// signup
export const signupApi = async (model) => {
  const { data } = await axios.post(`${BASE_URL}/auth/signup`, model, options);
  return data.message;
};

// login
export const loginApi = async (model) => {
  const { data } = await axios.post(`${BASE_URL}/auth/login`, model, options);
  return data.data;
};

// login facebook
export const loginFacebookApi = async (model) => {
  const { data } = await axios.post(
    `${BASE_URL}/auth/login-facebook`,
    model,
    options
  );
  return data.data;
};

// check email
export const checkEmailApi = async (email) => {
  const { data } = await axios.post(
    `${BASE_URL}/auth/check-email/${email}`,
    "",
    options
  );
  return data.data;
};

// check code
export const checkCodeApi = async (code) => {
  const { data } = await axios.post(
    `${BASE_URL}/auth/check-code/${code}`,
    "",
    options
  );
  return data.data;
};

// refresh token
export const refreshTokenApi = async () => {
  const { data } = await axios.post(
    `${BASE_URL}/auth/refresh-token`,
    "",
    options
  );
  return data.data;
};

// get comment video
export const getCommentApi = async (videoId) => {
  const { data } = await axios.get(
    `${BASE_URL}/video/get-comment-video/${videoId}`,
    options
  );
  return data.data;
};

// comment video
export const commentApi = async (model) => {
  const { data } = await axios.post(
    `${BASE_URL}/video/comment-video`,
    model,
    options
  );
  return data.data;
};

// upload image
export const uploadCloudApi = async (formData) => {
  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/dlzdryqq0/upload`,
    formData
  );
  return data;
};

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.data.message.name == "TokenExpiredError") {
      // gọi API refresh token
      refreshTokenApi()
        .then((result) => {
          localStorage.setItem("LOGIN_USER", result);
          window.location.reload();
        })
        .catch((error) => {
          localStorage.removeItem("LOGIN_USER");
          window.location.reload();
        });
    }
    return Promise.reject(error);
  }
);
