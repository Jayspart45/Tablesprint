import React, { useRef } from "react";
import "./CustomFileInput.css";
import { ImagePlayIcon } from "lucide-react";

interface CustomFileInputProps {
  onFileChange: (file: File | null) => void;
  imageUrl?: string;
}

const CustomFileInput: React.FC<CustomFileInputProps> = ({
  onFileChange,
  imageUrl,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      onFileChange(files[0]);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="custom-file-input-container">
      <ImagePlayIcon size={50} />
      <button
        type="button"
        className="custom-file-button"
        onClick={handleButtonClick}
      >
        Upload maximum allowed
        <br />
        <span>file size is 10mb</span>
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="custom-file-input"
      />
      {imageUrl && (
        <img src={imageUrl} alt="Preview" className="custom-file-preview" />
      )}
    </div>
  );
};

export default CustomFileInput;
