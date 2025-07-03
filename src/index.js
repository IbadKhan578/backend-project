import dotenv from 'dotenv';
dotenv.config(); // ← ✅ load from .env in root

import mongoose from "mongoose";
import { DB_name } from "./constants.js";
import { app } from './app.js';



(async () => {
  try {
    await mongoose.connect(`${process.env.mongoDbURI}/${DB_name}`);
    console.log("MongoDB connected successfully");
    // start listening only after db is connected
     const port = process.env.port || 8000;
    app.listen(port,()=>{
        console.log("server is running on port "+ port);
    })


  } catch (error) {
    console.error(` mongoDb connection Error: ${error}`);
    throw error;
  }
})();
