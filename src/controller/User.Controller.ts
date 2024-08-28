import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { userLoginDTO } from "../dto/userDTO/User.DTO";
import * as cache from "memory-cache";
import { encrypt } from "../auth/encrypt";
import { AdmUser } from "../entity/user/User.Entity";

export class UserController {
  static async signup(req: Request, res: Response) {
    const { email, password, active_status } = req.body;
    const encryptedPassword = await encrypt.encryptpass(password);
    const user = new AdmUser();
    user.user_email = email;
    user.user_password = encryptedPassword;
    user.active_status = active_status;
    user.created_by = "Admin";
    user.created_date = new Date();

    const userRepository = AppDataSource.getRepository(AdmUser);
    const userSave = await userRepository.save(user);

    const token = encrypt.generateToken({
      user_email: userSave.user_email,
      user_password: userSave.user_password,
    });

    return res
      .status(200)
      .json({ message: "User created successfully", token });
  }
}
