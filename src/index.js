import express from "express";
import dotenv from "dotenv";
import dbConfig from "./config/db.js";
// import router from "./routes";
import { todoRoute, userRoute } from "./routes/index.js";

const app = express();

dotenv.config();
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
app.use(express.json());

/***********DB Connect**********/
dbConfig(DB_URL);

/***Routes*****/
app.use("/api", todoRoute);
app.use("/api", userRoute);
// router(app);

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
