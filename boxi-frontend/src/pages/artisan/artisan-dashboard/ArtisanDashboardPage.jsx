import React, { useState } from "react";
import axios from "axios";
import { ProfilePictureUpload } from "./components/ProfilePictureUpload";
import { NameInput } from "./components/NameInput";

export const ArtisanDashboard = () => {
  const [profilePicture, setProfilePicture] = useState(null); // Changed initial state to null
  const [name, setName] = useState("");

  const handlePictureChange = (file) => {
    setProfilePicture(file);
  };

  const handleNameChange = (newName) => {
    setName(newName);
  };

  const handleSaveName = async () => {
    try {
      if (!name) {
        console.error("No name given");
        return;
      }
      console.log(name);
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:3000/artisan/update-name",
        { name: name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data); // Log the response for debugging
      alert("Name updated successfully"); // Provide feedback to the user
    } catch (error) {
      console.error("Failed to update name:", error);
      // Handle errors here, e.g., show an error message to the user
    }
  };

  const handleSaveProfilePicture = async () => {
    try {
      if (!profilePicture) {
        console.error("No profile picture selected");
        return;
      }

      const formData = new FormData();
      formData.append("profilePicture", profilePicture);

      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/artisan/save-profile-picture",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Fixed typo here
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="artisan-dashboard-container">
      {" "}
      {/* Removed unnecessary fragment */}
      <h1>Artisan Dashboard</h1>
      <ProfilePictureUpload
        onPictureChange={handlePictureChange}
        onSave={handleSaveProfilePicture}
      />
      <NameInput onNameChange={handleNameChange} onSave={handleSaveName} />
    </div>
  );
};
