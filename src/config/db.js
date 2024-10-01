import mongoose from "mongoose";

const dbConfig = async (DB_URL) => {
  await mongoose
    .connect(DB_URL, {})
    .then(() => {
      console.log("MongoDB Connected Successfully");
    })
    .catch((err) => {
      console.log("err", err);
    });
};

export default dbConfig;
