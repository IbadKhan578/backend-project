import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config(); // load .env

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Upload file to cloudinary
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("File is uploaded to Cloudinary:");

    // Remove the file from local storage after upload
    fs.unlinkSync(localFilePath);

    return result;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    fs.unlinkSync(localFilePath); // clean up local file
    return null;
  }
};

export { uploadOnCloudinary };
