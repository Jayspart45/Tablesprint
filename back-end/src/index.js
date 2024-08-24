import { app } from "./app.js";
import connectDB from "./db/db.js";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.log("Error occur in Server", err);
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(
        `Server Listening on http://${process.env.HOST_NAME}:${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log("Error Connecting to Mongo DB", err);
  });

export default app;
