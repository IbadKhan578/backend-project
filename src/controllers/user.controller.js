import {user} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js";


const  userRegister=async(req,res)=>{
    // steps


    // get data from the frontend
    const {username,email,fullname,password}= req.body;
    console.log("username: ", username);
    console.log("email: " , email)


    // validate the data - not empty
    if(username===""){
        throw new Error("username can not be empty");
        // instead of adding if else on each and every field we can use array map to check all fields in one go
        
    }

  if([username,email,fullname,password].some((field)=>
     field?.trim==="")){
        throw new Error("field can not be empty")
     }



    // check if user already exists: username  check 
   const existedUser= user.findOne({username});

   if(existedUser){
    throw new Error(" User Already Exist");
   }


    // check for image  , check for avatar

   const avatarLocalPath= req.files?.avatar[0]?.path ;
   const coverImageLocalPath= req.files?.coverImage[0]?.path ;

   if(!avatarLocalPath){
    throw new Error("Avatar is required");
   }

    //  upload them on cloudinary, avatar check
  const avatar=  await uploadOnCloudinary(avatarLocalPath);
  const  coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if(!avatar){
    throw new Error("Avatar file is required")
  }


    // create user object  - create entry in db
   const newUser = await user.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage._construct.url || "",
        email,
        password,
        username:username.toLowerCase()


    })


        // remove password and refresh token field from response
   const createdUser=  user.findById(newUser._id).select(
        "-password -refreshToken"
    )

    // check for user creation

    if(!createdUser){
        throw new Error(" somethinf went wrong while registering the user");
    }


    // return response

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User Registerd Sucessfully")
    )

}

export {userRegister};