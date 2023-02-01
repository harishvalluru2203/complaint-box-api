import { complaintRouter } from "./complaintRouter";
import { superAdminRouter } from "./superAdminRouter";

export const masterRouter = (app) => {
  app.use("/superAdmins", superAdminRouter);
  app.use("/complaints", complaintRouter);
};
