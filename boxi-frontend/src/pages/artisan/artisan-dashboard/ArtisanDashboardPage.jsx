import React, { useEffect, useState } from "react";
import axios from "axios";
import { ProfilePictureUpload } from "./components/ProfilePictureUpload";
import { NameInput } from "./components/NameInput";
import { fetchArtisanDetails } from "../../../utils/api";

export const ArtisanDashboard = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchArtisanDetails(token)
      .then((artisan) => {
        setProfilePicture(artisan.profilePicture);
        setName(artisan.name);
        setBio(artisan.bio);
      })
      .catch((error) => {
        console.error("Failed to fetch artisan's details!", error);
      });
  }, []);

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
      console.log(response.data);
      alert("Name updated successfully");
    } catch (error) {
      console.error("Failed to update name:", error);
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
            Authorization: `Bearer ${token}`,
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
      <h1>Artisan Dashboard</h1>
      <ProfilePictureUpload
        onPictureChange={handlePictureChange}
        onSave={handleSaveProfilePicture}
      />
      <NameInput onNameChange={handleNameChange} onSave={handleSaveName} />

      <div className="artisan-details-container">
        <img src={profilePicture} alt="artisan-picture" />
        <h1>{name}</h1>
      </div>
    </div>
  );
};
