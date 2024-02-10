import { authRouter } from "./authRouter";
import { userRouter } from "./userRouter";

export const masterRouter = (app) => {
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
};
