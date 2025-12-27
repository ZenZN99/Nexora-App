import axios from "axios";
import { BACKEND_URL } from "../user/request";


export const createMessage = async (
  receiverId: string,
  image: File | null,
  content: string,
  token: string
) => {
  const formData = new FormData();

  formData.append("receiverId", receiverId);
  if (image) formData.append("image", image);
  if (content) formData.append("content", content);

  try {
    const res = await axios.post(
      `${BACKEND_URL}/api/message`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  } catch (error: any) {
    return {
      error:
        error?.response?.data?.error ||
        "حدث خطأ اثناء انشاء رسالة",
    };
  }
};
export const getChatMessages = async (receiverId: string, token: string) => {
  try {
    const res = await axios.get(`${BACKEND_URL}/api/message/${receiverId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error:any) {
    return { error: error?.response?.data?.error  || "حدث خطأ اثناء جلب رسائل" };
  }
};

export const seen = async (senderId: string, token: string) => {
  try {
    const res = await axios.put(
      `${BACKEND_URL}/api/message/seen/${senderId}`,
      {}, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error: any) {
    return { error: error?.response?.data?.error || "حدث خطأ اثناء تعليم رسالة" };
  }
};


export const deleteMessage = async (messageId: string, token: string) => {
  try {
    const res = await axios.delete(`${BACKEND_URL}/api/message/${messageId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error:any) {
    return { error: error?.response?.data?.error  || "حدث خطأ اثناء حذف رسالة" };
  }
};
