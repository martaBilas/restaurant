import axios from "axios";

const BASE_URL = "https://localhost:7135/api/";

export const fetchMeals = async (itemId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}Menu/GetMeals?categoryId=${itemId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "There was an error with the fetch meals operation: " + error.message
    );
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}Menu/GetCategories`);
    return response.data;
  } catch (error) {
    console.error(
      "There was an error with the fetch categories operation: " + error.message
    );
  }
};

export const addMealToCart = async (addModel) => {
  axios
    .post(`${BASE_URL}Order/addMealToOrder`, addModel, {
      withCredentials: true,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error adding to cart:", error);
    });
};

export const fetchOrder = async () => {
  try {
    const response = await axios.get(`${BASE_URL}Order/GetOrder`, {
      withCredentials: true});
    return response.data;
  } catch (error) {
    console.error(
      "There was an error with the fetch order operation: " + error.message
    );
  }
};
