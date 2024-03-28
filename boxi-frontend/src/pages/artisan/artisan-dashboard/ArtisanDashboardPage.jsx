import React, { useEffect, useState } from "react";
import axios from "axios";
import { NameInput } from "./components/NameInput";
import { ArtisanProducts } from "./components/ArtisanProducts";
import { fetchArtisanDetails } from "../../../utils/api";
import { Header } from "../../../components/header/Header";
import InsertProduct from "./components/InsertProduct";
import "./artisan-dashboard.css";

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
        console.log(artisan.profilePicture);
      })
      .catch((error) => {
        console.error("Failed to fetch artisan's details!", error);
      });
  }, []);

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

  const handleProductSubmission = async (newProduct) => {
    try {
      if (!newProduct) {
        console.error("No new product!");
        return;
      }
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/artisan/insert-product",
        { product: newProduct }, // Pass new product as an object
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data); // Log response data after request
    } catch (error) {
      console.error("Error submitting product:", error);
      // Handle error
    }
  };

  return (
    <>
      <Header />
      <div className="artisan-dashboard-page-container">
        <div className="artisan-dashboard-container">
          <h1>Artisan Dashboard</h1>
          <div className="artisan-dashboard">
            <div className="artisan-products-container">
              <ArtisanProducts />
            </div>
            <div className="insert-products-container">
              <InsertProduct onProductSubmit={handleProductSubmission} />
              {/* Pass the submission handler function as prop */}
            </div>
          </div>
          <div className="artisan-details-container">
            <div className="artisan-details-container-top">
              {profilePicture && (
                <img
                  className="artisan-image"
                  src={profilePicture}
                  alt="artisan-picture"
                />
              )}
            </div>
            <div className="artisan-details-container-bottom">
              <div className="artisan-name-section">
                <h1>{name}</h1>
                <NameInput
                  onNameChange={handleNameChange}
                  onSave={handleSaveName}
                />
              </div>
              <p className="artisan-bio">{bio}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
