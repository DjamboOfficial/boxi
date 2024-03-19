import axios from "axios";

export const fetchArtisanDetails = async (token) => {
  try {
    const response = await axios.get("http://localhost:3000/artisan/details", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.artisan;
  } catch (error) {
    console.error("Failed to fetch data: ", error);
    throw error;
  }
};
