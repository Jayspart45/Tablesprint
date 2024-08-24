import { v2 as cloudinary } from "cloudinary";

import fs from "fs";

import util from "util";

import dotenv from "dotenv";

dotenv.config();
const unlinkFile = util.promisify(fs.unlink);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a single file to Cloudinary.
 * @param {string} localFilePath - The path to the local file to be uploaded.
 * @returns {Promise<string|null>} - The URL of the uploaded file, or null if the upload failed.
 */
const uploadOnCloudinary = async (localFilePath) => {
  console.log("cloud", localFilePath);
  try {
    if (!localFilePath) {
      return null;
    }
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("File uploaded to Cloudinary:", response.url);

    return response.url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error.message);
    return null;
  } finally {
    if (fs.existsSync(localFilePath)) {
      await unlinkFile(localFilePath); // Remove the locally saved temporary file
    }
  }
};

export { uploadOnCloudinary };
