import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import createServer from "./server";
import { checkEnvVars } from "./utils";
import { requiredEnvVars } from "./config";

// initialize env vars
dotenv.config();

export const app = express();

// set app port
const port: number = parseInt(process.env.PORT) || 3000;

// Check all compulsory ENV vars are loaded
const erroredVars = checkEnvVars(requiredEnvVars);
if (erroredVars.length) {
  throw Error(`Missing ENV vars: ${erroredVars}`);
}

// Connect to database. If everything is fine then create routes and start the app
const mongoURL = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
if (process.env.NODE_ENV == "test") {
  createServer(app);
} else {
  mongoose
    .connect(mongoURL)
    .then(
      () => {
        createServer(app);
        console.log("Database connection established successfully");

        app.listen(port, () => {
          console.log(`App listening on port ${port}`);
        });
      },
      function (err) {
        console.error("Error connecting to database: " + err.stack);
      }
    )
    .catch((err) => console.error(err.stack));
}
