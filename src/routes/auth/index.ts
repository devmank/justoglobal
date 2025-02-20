import controller from "../../controller";
import express from "express";

const routes = express.Router();

routes.post("/login", [], controller.auth.login);
routes.post("/generate-link", [], controller.auth.generateLink);
routes.get("/verifyToken/:token", [], controller.auth.verifyToken);

export { routes as authRoutes };
