import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler.middleware.js";

const app = express();


const allowedOrigins = (process.env.ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim());

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, 
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import authRouter from "./routes/auth.route.js";

// Health check sever
app.get("/", (req, res) => {
  res.send("Api Running ....");
});

// Routes
app.use("/api/v1/auth", authRouter);

// Error Handler middleware
app.use(errorHandler);

export { app };
