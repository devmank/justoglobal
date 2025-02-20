import authMiddleware from "../../middleware/authMiddleware";
import controller from "../../controller";
import express from "express";

const routes = express.Router();

routes.get("/getTime", [authMiddleware], controller.common.getTime);

export { routes as commonRoutes };
