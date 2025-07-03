import mongoose from  "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

let videoSchema = new mongoose.Schema(
    {
        
            videoFile:{
                type:String,
                required:true

            },
                thumbnail:{
                type:String,

            },
                title:{
                type:String,
                required:true

            }, 
               description:{
                type:String,

            },
                duration:{
                type:Number,
                required:true

            },
                views:{
                type:Number,
                default:0

            },
                isPublished:{
                type:Number,
                default:true

            },
            owner:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"user"
            }
        

    },{timestamps:true})

    

export const video = mongoose.model("video",videoSchema);