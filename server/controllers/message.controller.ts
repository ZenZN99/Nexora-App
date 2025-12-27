import type { Request as Req, Response as Res } from "express";
import { uploadToCloudinary } from "../config/cloudinary";
import Message from "../models/Message";
import { Types } from "mongoose";


export async function createMessage(req: Req, res: Res) {
  try {
    const senderId = req.user._id;
    if (!senderId) {
      return res.status(401).json({ error: "غير مصرح بك" });
    }

    const { receiverId, content } = req.body;
    if (!receiverId) {
      return res.status(400).json({ error: "معرف المستلم مطلوب" });
    }

    if ((!content || content.trim() === "") && !req.file) {
      return res
        .status(400)
        .json({ error: "يجب إضافة نص أو صورة على الأقل للرسالة" });
    }

    let imageUrl = "";
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file, "messages");
      imageUrl = uploadResult.secure_url;
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      content: content || "",
      image: imageUrl,
       seen: false,
    });

    return res.status(201).json({
      success: "تم إرسال الرسالة بنجاح",
      message: newMessage,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "حدث خطأ اثناء ارسال الرسالة" });
  }
}

export async function getChatMessages(req: Req, res: Res) {
  try {
    const senderId = req.user._id;
    const { receiverId } = req.params;

    if (!senderId) {
      return res.status(401).json({ error: "غير مصرح بك" });
    }

    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 });

    return res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "حدث خطأ أثناء جلب المحادثة" });
  }
}


export async function deleteMessage(req: Req, res: Res) {
  try {
    const userId = req.user._id;
    const { messageId } = req.params;

    if (!messageId || !Types.ObjectId.isValid(messageId)) {
      return res.status(400).json({ error: "معرف الرسالة غير صالح" });
    }

    const deletedMessage = await Message.findOneAndDelete({
      _id: messageId,
      senderId: userId, 
    });

    if (!deletedMessage) {
      return res
        .status(404)
        .json({ error: "الرسالة غير موجودة أو غير مصرح بحذفها" });
    }

    return res.status(200).json({
      success: "تم حذف الرسالة بنجاح",
      message: deletedMessage,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "حدث خطأ اثناء حذف الرسالة" });
  }
}

export async function seen(req: Req, res: Res) {
  try {
    const userId = req.user._id;
    const { senderId } = req.params;

    if (!userId) {
      return res.status(401).json({ error: "غير مصرح بك" });
    }

    if (!senderId || !Types.ObjectId.isValid(senderId)) {
      return res.status(400).json({ error: "معرف المرسل غير صالح" });
    }

    const result = await Message.updateMany(
      {
        senderId: senderId,
        receiverId: userId,
        seen: false,
      },
      {
        $set: { seen: true },
      }
    );

    return res.status(200).json({
      success: true,
      message: "تم تعليم الرسائل كمقروءة",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "حدث خطأ أثناء تحديث حالة الرسائل" });
  }
}

