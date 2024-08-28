import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { encrypt } from "../auth/encrypt";
import { AdmUser } from "../entity/user/User.Entity";

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      console.log(`email: ${email}, password: ${password}`);
      if (!email || !password) {
        return res
          .status(500)
          .json({ message: " email and password required" });
      }

      const userRepository = AppDataSource.getRepository(AdmUser);
      const user = await userRepository.findOne({
        where: { user_email: email },
      });

      const isPasswordValid = encrypt.comparepassword(
        user.user_password,
        password
      );
      if (!user || !isPasswordValid) {
        return res.status(404).json({ message: "User not found" });
      }
      const token = encrypt.generateToken({
        user_email: user.user_email,
        user_password: user.user_password,
      });

      return res
        .status(200)
        .json({ message: "Login successful", token: token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getProfile(req: Request, res: Response) {
    if (!req[" currentUser"]) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userRepository = AppDataSource.getRepository(AdmUser);
    const user = await userRepository.findOne({
      where: { user_id: req[" currentUser"].id },
    });
    const { user_password, ...userData } = user;
    return res
      .status(200)
      .json({ data: { userData }, message: "Success", active: true });
  }
}
