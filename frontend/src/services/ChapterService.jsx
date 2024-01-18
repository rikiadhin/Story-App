import secureLocalStorage from "react-secure-storage";
import axios from "../auth/AxiosConfig.jsx";

export const getAllChapter = async (url) => {
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${secureLocalStorage.getItem("acessToken")}`,
    },
  });
  return response.data.data;
};

export const deleteChapter = async (id) => {
  try {
    const response = await axios.delete(`/api/chapters/${id}`, {
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

export const inputChapter = async (data) => {
  try {
    const response = await axios.post("/api/chapters", data, {
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

export const updateChapter = async (id, data) => {
  try {
    const response = await axios.put(`/api/chapters/${id}`, data, {
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

export const getChapterById = async (id) => {
  try {
    const response = await axios.get(`/api/chapters/${id}`, {
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
