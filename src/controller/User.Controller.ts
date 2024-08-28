import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { encrypt } from "../auth/encrypt";
import { AdmUser } from "../entity/user/User.Entity";

export class UserController {
  static async signup(req: Request, res: Response) {
    try {
      const { email, password, active_status } = req.body;
      if (!email || !password || !active_status) {
        return res
          .status(200)
          .json({ message: "email, password and active_status required" });
      }

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
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
