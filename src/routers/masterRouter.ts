import { authRouter } from "./authRouter";
import { usersRouter } from "./usersRouter";

export const masterRouter = (app) => {
  app.use("/auth", authRouter);
  app.use("/users", usersRouter);
};
