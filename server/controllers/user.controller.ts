import { json, type Request as Req, type Response as Res } from "express";
import validator from "validator";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/token";
import cloudinary, {
  uploadToCloudinary,
} from "../config/cloudinary";
import { Types } from "mongoose";
export async function register(req: Req, res: Res) {
  try {
    const { fullname, email, password } = req.body;
    switch (true) {
      case !fullname || !email || !password:
        return res.status(400).json({ error: "جميع الحقول مطلوبة" });
      case !validator.isEmail(email):
        return res.status(400).json({ error: "البريد الالكتروني غير صالح" });
      case password.length < 8:
        return res
          .status(400)
          .json({ error: "كلمة المرور قصيرة جدًا (8 أحرف على الأقل)" });
    }

 

    const existEmail = await User.findOne({ email });
     if (existEmail) {

      return res.status(400).json({ error: "البريد الالكتروني مسجل بالفعل" });
    }
    const hashed = await bcrypt.hash(password, 12);
    const isAdmin =
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD;
    const newUser = await User.create({
      fullname,
      email,
      password: hashed,
      role: isAdmin ? "مسؤول" : "مستخدم",
      avatar:
        "https://res.cloudinary.com/dgagbheuj/image/upload/v1763194734/avatar-default-image_yc4xy4.jpg",
      cover:
        "https://res.cloudinary.com/dgagbheuj/image/upload/v1763194811/cover-default-image_uunwq6.jpg",
      status: "مرحباً، انا استعمل Nexora",
    });
    const token = generateToken({
      _id: newUser._id,
      role: newUser.role,
    });

    return res.status(201).json({
      success: "تم انشاء حساب بنجاح",
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        role: newUser.role,
        avatar: newUser.avatar,
        cover: newUser.cover,
        status: newUser.status,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "حدث خطأ اثناء انشاء حساب" });
  }
}

export async function login(req: Req, res: Res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "جميع الحقول مطلوبة" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "البريد الالكتروني غير مسجل" });
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "كلمة مرور خاطئة" });
    }

    const token = generateToken({
      _id: user._id,
      role: user.role,
    });

    return res.status(201).json({
      success: "تم تسجيل دخول بنجاح",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        cover: user.cover,
        status: user.status,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "حدث خطأ اثناء تسجيل الدخول" });
  }
}


export async function me(req: Req, res: Res) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: "غير مصرح بك" });
    }
    return res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      cover: user.cover,
      status: user.status,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "حدث خطأ اثناء جلب معلومات مستخدم" });
  }
}

export async function profileUser(req: Req, res: Res) {
  try {
    const user = req.user;
    if (!user) {
            return res.status(401).json({ error: "غير مصرح بك" });
    }

    const files = req.files as {
      avatar?: Express.Multer.File[];
      cover?: Express.Multer.File[];
    };

    const avatarFile = files?.avatar?.[0];
    const coverFile = files?.cover?.[0];

    const updatedData: any = {};

    const extractPublicId = (url: string) => {
      const parts = url.split("/");
      const file = parts.pop()!;
      return file.split(".")[0];
    };

   uploadToCloudinary

    if (avatarFile) {
      if (user.avatar && user.avatar.includes("res.cloudinary.com")) {
        const oldId = extractPublicId(user.avatar);
        await cloudinary.uploader.destroy(`users/avatars/${oldId}`);
      }

      const avatarUpload = await uploadToCloudinary(
        avatarFile,
        "users/avatars"
      );

      updatedData.avatar = avatarUpload.secure_url;
    }

    if (coverFile) {
      if (user.cover && user.cover.includes("res.cloudinary.com")) {
        const oldId = extractPublicId(user.cover);
        await cloudinary.uploader.destroy(`users/covers/${oldId}`);
      }

      const coverUpload = await uploadToCloudinary(coverFile, "users/covers");

      updatedData.cover = coverUpload.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(user._id, updatedData, {
      new: true,
    });

    return res.status(200).json({
      success: "تم تعديل الملف الشخصي بنجاح",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
     return res.status(500).json({
      error: "حدث خطأ أثناء تعديل الملف الشخصي",
    });
  }
}

export async function editStatus(req: Req, res: Res) {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(401).json({ error: "غير مصرح بك" });
    }
    const { status } = req.body;

    const userStatus = await User.findOneAndUpdate(
      { _id: userId },
      { status },
      { new: true }
    );

    return res.status(200).json({
      success: "تم تعديل الحالة بنجاح",
      status: userStatus?.status,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "حدث خطأ اثناء تعديل الحالة" });
  }
}

export async function getAllUsers(req: Req, res: Res) {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(401).json({ error: "غير مصرح بك" });
    }

    const users = await User.find({ _id: { $ne: userId } }).select("-password");
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "حدث خطأ اثناء جلب مستخدمين" });
  }
}

export async function getUserById(req: Req, res: Res) {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(401).json({ error: "غير مصرح بك" });
    }
    const { id } = req.params;
    if (!id || !Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "معرف غير صالح" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "المستخدم غير موجود" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "حدث خطأ اثناء جلب مستخدم" });
  }
}

export async function deleteUser(req: Req, res: Res) {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(401).json({ error: "غير مصرح بك" });
    }
    const { id } = req.params;
    if (!id || !Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "معرف غير صالح" });
    }

    const user = await User.findOneAndDelete({ _id: id });

    if (!user) {
      return res.status(404).json({ error: "المستخدم غير موجود" });
    }
    return res.status(200).json({ success: "تم حدف مستخدم" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "حدث خطأ اثناء حذف مستخدم" });
  }
}

export async function blockUser(req: Req, res: Res) {
  try {
    const { email } = req.body;

    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ error: "البريد الالكتروني غير صالح" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "المستخدم غير موجود" });
    }

    await User.deleteOne({ _id: user._id });

    return res.status(200).json({ success: "تم حظر وحذف المستخدم بنجاح" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "حدث خطأ أثناء حظر المستخدم" });
  }
}