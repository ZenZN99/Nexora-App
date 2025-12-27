import express from "express";
import * as userController from "../controllers/user.controller";
import { isAuthenticate } from "../middlewares/isAuthenticate";
import { upload } from "../middlewares/multer";
import { isAdmin } from "../middlewares/isAdmin";

const userRouter = express.Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.get("/me", isAuthenticate, userController.me);
userRouter.put("/profile", isAuthenticate, upload.fields([
    {name: "avatar", maxCount: 1},
    {name: "cover", maxCount: 1},
]), userController.profileUser);
userRouter.put("/status", isAuthenticate, userController.editStatus);
userRouter.get("/users", isAuthenticate, userController.getAllUsers);
userRouter.get("/user/:id", isAuthenticate, userController.getUserById);
userRouter.delete("/user/:id", isAuthenticate, isAdmin , userController.deleteUser);
userRouter.delete("/block", isAuthenticate, isAdmin, userController.blockUser);

export default userRouter;
