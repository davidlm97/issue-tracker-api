import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import createServer from "./app";

// initialize env vars
dotenv.config();

const app = express();

// set app port
const port: number = parseInt(process.env.PORT) || 3000;

// Connect to database. If everything is fine then create routes and start the app
const mongoURL = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
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
