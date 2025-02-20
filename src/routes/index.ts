import { Router } from "express";
import { adminRoutes } from "./admin";
import { authRoutes } from "./auth";
import { commonRoutes } from "./common";
import { userRoutes } from "./user";

const routes = Router();
routes.use(`/auth`, authRoutes);
routes.use(`/common`, commonRoutes);
routes.use(`/admin`, adminRoutes);
routes.use(`/user`, userRoutes);
export { routes };
