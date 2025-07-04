import { v2 as cloudinary } from 'cloudinary';
import { response } from 'express';
import fs from 'fs';

/// uploading file on cloudinary 

cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY ,
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });
    
    const uploadOnCloudinary = async (localFilePath)=>{
        try{
            if(!localFilePath) return null; 
            // upload file on cloudinary
            cloudinary.uploader.upload(localFilePath,{
                resource_type: 'auto'
            })
            // file has been uploaded
            console.log("file is uploaded on cloudinary " )
            return response
        }
        catch(error){
            fs.unlink(localFilePath) // remove the locally saved file from the local server
            return null;
            

        }
    }



        // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )


       export {uploadOnCloudinary};