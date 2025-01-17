import mongoose from "mongoose";

const db = () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("the database are connected");
  } catch (error) {
    console.log("database error", error);
  }
};

export default db;
