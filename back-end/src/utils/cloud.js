import axios from 'axios';
import fs from 'fs';
import util from 'util';
import dotenv from 'dotenv';

dotenv.config();
const unlinkFile = util.promisify(fs.unlink);

const API_KEY = process.env.IMGBB_API_KEY; 

// Upload image on Imgbb
const uploadOnImgbb = async (localFilePath) => {
  console.log("Uploading to Imgbb:", localFilePath);
  try {
    if (!localFilePath) {
      return null;
    }

    const imageFile = fs.readFileSync(localFilePath, { encoding: 'base64' });
    
    const formData = new URLSearchParams();
    formData.append('image', imageFile);

    const response = await axios.post(`https://api.imgbb.com/1/upload?key=${API_KEY}`, formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log("File uploaded to Imgbb:", response.data.data.url);

    return response.data.data.url;
  } catch (error) {
    console.error("Error uploading to Imgbb:", error.message);
    return null;
  } finally {
    if (fs.existsSync(localFilePath)) {
      await unlinkFile(localFilePath); 
    }
  }
};

export { uploadOnImgbb };
