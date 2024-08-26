import { uploadOnImgbb } from "./cloud.js";

// handleImagUpload
export const handleImageUpload = async (imageFile) => {
    return imageFile ? await uploadOnImgbb(imageFile) : null;
  };