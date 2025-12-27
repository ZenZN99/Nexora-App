import type {
  Request as Req,
  Response as Res,
  NextFunction as NF,
} from "express";
import { verifyToken, type TokenPayload } from "../config/token";
import User, { type IUser } from "../models/User";

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}

export async function isAuthenticate(req: Req, res: Res, next: NF) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "غير مصرح بك" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token as string) as TokenPayload

    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(404).json({ error: "المستخدم غير موجود" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "حدث خطأ في طرف خادم" });
  }
}
