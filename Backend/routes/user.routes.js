import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middlewares.js";
import {
	loginUser,
	logoutUser,
	registerUser,
} from "../controllers/auth.controller.js";

const userRouter = Router();

userRouter.route("/signup").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").get(verifyJWT, logoutUser);

export { userRouter };
