import "reflect-metadata";
import { DataSource } from "typeorm";
import { AdmUser } from "./entity/user/User.Entity";
import * as dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as any,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [AdmUser],
  migrations: [],
  subscribers: [],
});
