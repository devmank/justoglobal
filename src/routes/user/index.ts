import authMiddleware from "../../middleware/authMiddleware";
import controller from "../../controller";
import express from "express";

const routes = express.Router();

routes.get("/", [authMiddleware], controller.user.getUsers);

export { routes as userRoutes };
