import express from 'express';
import * as messageController from '../controllers/message.controller';
import { isAuthenticate } from '../middlewares/isAuthenticate';
import { upload } from '../middlewares/multer'; 

const messageRouter = express.Router();

messageRouter.post(
  "/",
  isAuthenticate,
  upload.single("image"), 
  messageController.createMessage
);

messageRouter.get("/:receiverId", isAuthenticate, messageController.getChatMessages);
messageRouter.put("/seen/:senderId", isAuthenticate, messageController.seen);
messageRouter.delete("/:messageId", isAuthenticate, messageController.deleteMessage);

export default messageRouter;
