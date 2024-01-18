import secureLocalStorage from "react-secure-storage";
import axios from "../auth/AxiosConfig.jsx";

export const getAllStory = async (url) => {
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${secureLocalStorage.getItem("acessToken")}`,
    },
  });
  return response.data.data;
};

export const deleteStory = async (id) => {
  try {
    const response = await axios.delete(`/api/story/${id}`, {
      headers: {
        Authorization: `Bearer ${secureLocalStorage.getItem("acessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    const errorData = JSON.parse(error.request.response);
    throw new Error(errorData.error ? errorData.error : error.message);
  }
};

export const inputStory = async (data) => {
  try {
    const response = await axios.post("/api/story", data, {
      headers: {
        Authorization: `Bearer ${secureLocalStorage.getItem("acessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    const errorData = JSON.parse(error.request.response);
    throw new Error(errorData.error ? errorData.error : error.message);
  }
};

export const updateStory = async (id, data) => {
  try {
    const response = await axios.put(`/api/story/${id}`, data, {
      headers: {
        Authorization: `Bearer ${secureLocalStorage.getItem("acessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    const errorData = JSON.parse(error.request.response);
    throw new Error(errorData.error ? errorData.error : error.message);
  }
};

export const getStoryById = async (id) => {
  try {
    const response = await axios.get(`/api/story/${id}`, {
      headers: {
        Authorization: `Bearer ${secureLocalStorage.getItem("acessToken")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    const errorData = JSON.parse(error.request.response);
    throw new Error(errorData.error ? errorData.error : error.message);
  }
};
