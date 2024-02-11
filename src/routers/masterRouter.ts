import { adminRouter } from "./adminRouter";
import { userRouter } from "./userRouter";

export const masterRouter = (app) => {
  app.use("/admin", adminRouter);
  app.use("/user", userRouter);
};
