import React, { useState } from "react";

const InsertProduct = ({ onProductSubmit }) => {
  const [showForm, setShowForm] = useState(false);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic validation
    if (!productName || !description || !price) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    // Logic to handle form submission (e.g., sending data to server)
    const newProduct = {
      productName,
      description,
      price,
      image,
    };
    console.log(newProduct);

    // Clear form fields
    setProductName("");
    setDescription("");
    setPrice("");
    setImage("");
    setErrorMessage(""); // Clear error message

    // Pass new product data to parent component
    onProductSubmit(newProduct);

    // Hide the form after submission
    setShowForm(false);
  };

  return (
    <div>
      <button onClick={() => setShowForm(true)}>
        Add Product to Your Catalogue
      </button>
      {showForm && (
        <div>
          <h2>Add a New Product</h2>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="productName">Product Name:</label>
              <input
                type="text"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            {/* Add file input for image upload if needed */}
            {/* <div>
              <label htmlFor="image">Image:</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div> */}
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default InsertProduct;
