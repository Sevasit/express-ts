import * as express from "express";
import { UserController } from "../controller/User.Controller";
import { authentification } from "../middlewares/Auth.Middleware";
import { AuthController } from "../controller/Auth.Controller";
const Router = express.Router();

Router.get("/profile/:id", authentification, AuthController.getProfile);
Router.post("/signup", UserController.signup);
Router.post("/login", AuthController.login);

export { Router as userRouter };
