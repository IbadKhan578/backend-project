import express from 'express';
import cors from "cors";
import cookieParser  from 'cookie-parser';
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// routes  import
import userRouter from './routes/user.routes.js';

// router declarattion
app.use("/users",userRouter)

export {app};