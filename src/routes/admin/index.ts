import authMiddleware from "../../middleware/authMiddleware";
import controller from "../../controller";
import express from "express";

const routes = express.Router();

routes.post("/kickOutUser", [authMiddleware], controller.admin.kickoutUser);

export { routes as adminRoutes };
