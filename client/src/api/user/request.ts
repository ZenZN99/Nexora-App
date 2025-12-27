import axios from "axios";

export const BACKEND_URL = "http://localhost:5000";

export const register = async (
  fullname: string,
  email: string,
  password: string
) => {
  try {
    const res = await axios.post(
      `${BACKEND_URL}/api/auth/register`,
      {
        fullname,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error:any) {
    return { error: error?.response?.data?.error  || "حدث خطأ اثناء انشاء حساب" };
  }
};

export const login = async (email: string, password: string) => {
  try {
    const res = await axios.post(
      `${BACKEND_URL}/api/auth/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error:any) {
    return { error: error?.response?.data?.error  || "حدث خطأ اثناء  تسجيل الدخول" };
  }
};

export const me = async (token:string) => {
  try {
    const res = await axios.get(`${BACKEND_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error:any) {
     return { error: error?.response?.data?.error  || "حدث خطأ اثناء جلب  بياناتك" };
  }
}

export const profile = async (token: string, avatar: File, cover: File) => {
  const formData = new FormData();
  if (avatar) formData.append("avatar", avatar);
  if (cover) formData.append("cover", cover);
  try {
    const res = await axios.put(`${BACKEND_URL}/api/auth/profile`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error:any) {
    return { error: error?.response?.data?.error  || "حدث خطأ اثناء تعديل ملف شخصي" };
  }
};

export const editStatus = async (token: string, status: string) => {
  try {
    const res = await axios.put(
      `${BACKEND_URL}/api/auth/status`,
      {
        status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error:any) {
    return { error: error?.response?.data?.error  || "حدث خطأ اثناء تعديل الحالة" };
  }
};

export const getAllUsers = async (token: string) => {
  try {
    const res = await axios.get(`${BACKEND_URL}/api/auth/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error:any) {
    return { error: error?.response?.data?.error  || "حدث خطأ اثناء جلب مستخدمين" };
  }
};

export const getUserById = async (token: string, id: string) => {
  try {
    const res = await axios.get(`${BACKEND_URL}/api/auth/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error:any) {
    return { error: error?.response?.data?.error  || "حدث خطأ اثناء جلب مستخدم" };
  }
};

export const deleteUser = async (token: string, id: string) => {
  try {
    const res = await axios.delete(`${BACKEND_URL}/api/auth/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error:any) {
    return { error: error?.response?.data?.error  || "حدث خطأ اثناء حذف مستخدم" };
  }
};

export const blockUser = async (token: string, email: string) => {
  try {
    const res = await axios.delete(`${BACKEND_URL}/api/auth/block`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: { email },
    });

    return res.data;
  } catch (error: any) {
    return {
      error: error?.response?.data?.error || "حدث خطأ اثناء حظر مستخدم",
    };
  }
};
