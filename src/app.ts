import express from "express";
const router = express.Router();
import path from "path";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import { errorHandler, methodNotAllowedErrorHandler, notFoundErrorHandler } from "./middleware/error_middleware";

// Import controllers
import resource from "./routes/resource";
import projects from "./routes/projects_resource";

const createServer = (app) => {
  // Enable all cors requests
  app.use(cors());
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));

  // Set routes
  app.use("/index", resource, router.all("/", methodNotAllowedErrorHandler));
  app.use("/projects", projects, router.all("/", methodNotAllowedErrorHandler));

  // Middleware error handlers
  app.use(notFoundErrorHandler);
  app.use(errorHandler);
};

export default createServer;
