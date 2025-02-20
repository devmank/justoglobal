import { Router } from "express";
import { adminRoutes } from "./admin";
import { authRoutes } from "./auth";
import { commonRoutes } from "./common";

const routes = Router();
routes.use(`/auth`, authRoutes);
routes.use(`/common`, commonRoutes);
routes.use(`/admin`, adminRoutes);
export { routes };
