import React from "react";
import "./trending-products.css";

export const Trendingproducts = () => {
  const mockTrendingItem1 = {
    name: "A random cup",
    price: 100,
    description: "As said, a random cup",
    category: "furniture",
    artisan: "Sofia Rodriguez",
    clickCount: 100,
    imageUrl:
      "https://res.cloudinary.com/dgwvbd9ki/image/upload/v1710180353/boxi/Sofia%20Rodriguez/djambo1990_51954_a_handcrafted_ceramic_mug_with_intricate_Andal_2ea33c57-4772-42e6-a9ff-6ff1264e884a_vbutwj.png",
  };

  const mockTrendingItem2 = {
    name: "A random cup",
    price: 100,
    description: "As said, a random cup",
    category: "furniture",
    artisan: "Sofia Rodriguez",
    clickCount: 100,
    imageUrl:
      "https://res.cloudinary.com/dgwvbd9ki/image/upload/v1710180353/boxi/Sofia%20Rodriguez/djambo1990_51954_a_handcrafted_ceramic_mug_with_intricate_Andal_2ea33c57-4772-42e6-a9ff-6ff1264e884a_vbutwj.png",
  };
  const mockTrendingItem3 = {
    name: "A random cup",
    price: 100,
    description: "As said, a random cup",
    category: "furniture",
    artisan: "Sofia Rodriguez",
    clickCount: 100,
    imageUrl:
      "https://res.cloudinary.com/dgwvbd9ki/image/upload/v1710180353/boxi/Sofia%20Rodriguez/djambo1990_51954_a_handcrafted_ceramic_mug_with_intricate_Andal_2ea33c57-4772-42e6-a9ff-6ff1264e884a_vbutwj.png",
  };
  const mockTrendingItem4 = {
    name: "A random cup",
    price: 100,
    description: "As said, a random cup",
    category: "furniture",
    artisan: "Sofia Rodriguez",
    clickCount: 100,
    imageUrl:
      "https://res.cloudinary.com/dgwvbd9ki/image/upload/v1710180353/boxi/Sofia%20Rodriguez/djambo1990_51954_a_handcrafted_ceramic_mug_with_intricate_Andal_2ea33c57-4772-42e6-a9ff-6ff1264e884a_vbutwj.png",
  };
  const mockTrendingItem5 = {
    name: "A random cup",
    price: 100,
    description: "As said, a random cup",
    category: "furniture",
    artisan: "Sofia Rodriguez",
    clickCount: 100,
    imageUrl:
      "https://res.cloudinary.com/dgwvbd9ki/image/upload/v1710180353/boxi/Sofia%20Rodriguez/djambo1990_51954_a_handcrafted_ceramic_mug_with_intricate_Andal_2ea33c57-4772-42e6-a9ff-6ff1264e884a_vbutwj.png",
  };

  return (
    <>
      <div className="trending-items-container">
        <div className="trending-item-card">
          <img src={mockTrendingItem1.imageUrl} alt="product-image" />
          <h1>{mockTrendingItem1.name}</h1>
          <h2>{mockTrendingItem1.price}</h2>
          <h3>{mockTrendingItem1.description}</h3>
          <h4>{mockTrendingItem1.artisan}</h4>
        </div>
        <div className="trending-item-card">
          <img src={mockTrendingItem2.imageUrl} alt="product-image" />
          <h1>{mockTrendingItem2.name}</h1>
          <h2>{mockTrendingItem2.price}</h2>
          <h3>{mockTrendingItem2.description}</h3>
          <h4>{mockTrendingItem2.artisan}</h4>
        </div>
        <div className="trending-item-card">
          <img src={mockTrendingItem3.imageUrl} alt="product-image" />
          <h1>{mockTrendingItem3.name}</h1>
          <h2>{mockTrendingItem3.price}</h2>
          <h3>{mockTrendingItem3.description}</h3>
          <h4>{mockTrendingItem3.artisan}</h4>
        </div>
        <div className="trending-item-card">
          <img src={mockTrendingItem4.imageUrl} alt="product-image" />
          <h1>{mockTrendingItem4.name}</h1>
          <h2>{mockTrendingItem4.price}</h2>
          <h3>{mockTrendingItem4.description}</h3>
          <h4>{mockTrendingItem4.artisan}</h4>
        </div>
        <div className="trending-item-card">
          <img src={mockTrendingItem5.imageUrl} alt="product-image" />
          <h1>{mockTrendingItem5.name}</h1>
          <h2>{mockTrendingItem5.price}</h2>
          <h3>{mockTrendingItem5.description}</h3>
          <h4>{mockTrendingItem5.artisan}</h4>
        </div>
      </div>
    </>
  );
};
