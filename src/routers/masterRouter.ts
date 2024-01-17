import { usersRouter } from "./usersRouter";

export const masterRouter = (app) => {
  app.use("/user", usersRouter);
};
