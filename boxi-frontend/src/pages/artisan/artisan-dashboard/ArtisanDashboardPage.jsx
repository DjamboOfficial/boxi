import React, { useEffect, useState } from "react";
import axios from "axios";
import { NameInput } from "./components/NameInput";
import { fetchArtisanDetails } from "../../../utils/api";
import InsertProduct from "./components/InsertProduct";

export const ArtisanDashboard = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchArtisanDetails(token)
      .then((artisan) => {
        setProfilePicture(artisan.profilePicture);
        setName(artisan.name);
        setBio(artisan.bio);
        console.log(artisan.profilePicture);
      })
      .catch((error) => {
        console.error("Failed to fetch artisan's details!", error);
      });
  }, []);

  const handlePictureChange = (file) => {
    setProfilePicture(file);
    setProfilePictureSaved(false);
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

  const handleProductSubmission = (productData) => {
    // Logic to save the product data in the catalogue
    setProducts([...products, productData]);
  };

  return (
    <div className="artisan-dashboard-container">
      <h1>Artisan Dashboard</h1>

      <NameInput
        onNameChange={handleNameChange}
        onSave={handleSaveName}
        style={{ height: "1000px" }}
      />
      <InsertProduct onProductSubmit={handleProductSubmission} />
      {/* Pass the submission handler function as prop */}
      <div className="artisan-details-container">
        {profilePicture && (
          <img
            src={profilePicture}
            alt="artisan-picture"
            style={{ height: "200px" }}
          />
        )}
        <h1>{name}</h1>
      </div>
    </div>
  );
};
