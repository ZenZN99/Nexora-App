import mongoose from "mongoose";

export interface IUser {
  _id: mongoose.Types.ObjectId;
  fullname: string;
  email:string;
  password: string;
  role: string;
  avatar: string;
  cover:string;
  status:string;
  isBlocked: boolean;
}

const userSchema = new mongoose.Schema<IUser>(
  {
      fullname: {
      type: String,
      required: true,
      lowerCase:true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowerCase:true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    role: {
      type: String,
      enum: ["مسؤول", "مستخدم"],
      default: "مستخدم",
    },
       avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dgagbheuj/image/upload/v1763194734/avatar-default-image_yc4xy4.jpg",
    },
    cover: {
      type: String,
      default:
        "https://res.cloudinary.com/dgagbheuj/image/upload/v1763194811/cover-default-image_uunwq6.jpg",
    },
    status: {
      type: String,
      default: "مرحباً، انا استعمل Nexora"
    },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;