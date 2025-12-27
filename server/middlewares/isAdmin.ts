import type {
  Request as Req,
  Response as Res,
  NextFunction as NF,
} from "express";
import User from "../models/User";

export async function isAdmin(req: Req, res: Res, next: NF) {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(401).json({ error: "غير مصرح بك" });
    }

    const user = await User.findById(userId);
    if (!user || user.role !== "مسؤول") {
      return res.status(403).json({ error: "فقط للمسؤول" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "حدث خطأ في طرف خادم" });
  }
}
