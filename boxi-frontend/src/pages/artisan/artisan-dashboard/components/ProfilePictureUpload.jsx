import React, { useState } from "react";

export const ProfilePictureUpload = ({ onPictureChange, onSave }) => {
  const [previewUrl, setPreviewUrl] = useState("");
  const [file, setFile] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(imageUrl);
      setFile(selectedFile);
      onPictureChange(selectedFile);
    }
  };
  return (
    <>
      <div className="profile-picture-upload">
        <label htmlFor="profile-picture">Profile Pic</label>
        <input
          type="file"
          id="profile-picture"
          accept="image/*"
          onChange={handleFileChange}
        />
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Profile-Preview"
            style={{ maxWidth: "400px" }}
          />
        )}
        {file && <button onClick={onSave}>Save Picture</button>}
      </div>
    </>
  );
};
