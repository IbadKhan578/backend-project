import mongoose  from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

let userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            index:true
            
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true
            
        },
        fullname:{
            type:String,
            required:true,
            lowercase:true
            
        },
        avatar:{
            type:String, // claudnary url
            required:true
        
            
        },
        coverImage:{
            type:String, // claudnary url
        
        },
        watchHistory:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"video"
            }
        ],
        password:{
            type:String,
            required:[true,"password is required"]
        },
        refreshToken:{
            type:String
        }

    },{timestamps:true})

    userSchema.pre("save", async function(next){
        if(!this.isModified("password")) return next();
        this.password = bcrypt.hash(this.password,10);
        next
    })

    userSchema.methods.isPasswordCorrect = async  function (password){
    return  await  bcrypt.compare(password,this.password);
 }

 userSchema.methods.generateAccessToken = function (){
   return jwt.sign(
        {
            _id : this._id,
            username:this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:ACCESS_TOKEN_EXPIRY

        }
    )
 };
 userSchema.methods.generateRefreshToken =  function (){
     return jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:REFRESH_TOKEN_EXPIRY

        }
    )

 };

export const user = mongoose.model("user",userSchema)