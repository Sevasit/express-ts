import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { encrypt } from "../auth/encrypt";
import { AdmUser } from "../entity/user/User.Entity";
import { userLoginDTO } from "../dto/userDTO/User.DTO";

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
    try {
      //find by id
      const id = req.params.id;
      console.log(`id: ${id}`);
      const userRepository = AppDataSource.getRepository(AdmUser);
      const userData = await userRepository.findOne({
        where: { user_id: id },
      });
      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }
      const { user_password, ...user } = userData;
      return res
        .status(200)
        .json({ data: { user }, message: "Success", active: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
