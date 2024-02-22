import axios from 'axios';

const BASE_URL = 'https://localhost:7135/api/';

export const fetchMeals = async (itemId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}Menu/GetMeals?categoryId=${itemId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "There was an error with the fetch operation: " + error.message
    );
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}Menu/GetCategories`);
    return response.data;
  } catch (error) {
    console.error(
      "There was an error with the fetch operation: " + error.message
    );
  }
};
