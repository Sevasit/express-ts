import * as express from "express";
import { authentification } from "../middlewares/auth.middleware";
import { UserController } from "../controller/User.Controller";
import { AuthController } from "../controller/Auth.controller";
const Router = express.Router();

Router.get("/profile", authentification, AuthController.getProfile);
Router.post("/signup", UserController.signup);
Router.post("/login", AuthController.login);

export { Router as userRouter };
