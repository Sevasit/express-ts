import { AppDataSource } from "./data-source";
import * as express from "express";
import * as dotenv from "dotenv";
import "reflect-metadata";
import { errorHandler } from "./middlewares/Error.Middleware";
import { userRouter } from "./Routes/User.Routes";
dotenv.config();

const app = express();
app.use(express.json());
app.use(errorHandler);
const { SERVER_PORT = 3000 } = process.env;
app.use("/auth", userRouter);

AppDataSource.initialize()
  .then(async () => {
    app.listen(SERVER_PORT, () => {
      console.log(
        "Server is running on http://localhost:" + SERVER_PORT + " ✈️"
      );
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));
