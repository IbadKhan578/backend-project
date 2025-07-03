import dotenv from 'dotenv';
dotenv.config(); // ← ✅ load from .env in root

import mongoose from "mongoose";
import { DB_name } from "./constants.js";



(async () => {
  try {
    await mongoose.connect(`${process.env.mongoDbURI}/${DB_name}`);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(` mongoDb connection Error: ${error}`);
    throw error;
  }
})();
