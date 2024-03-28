import axios from "axios";

axios.defaults.withCredentials = true;

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
  try {
    const response = await axios.post(
      `${BASE_URL}Order/addMealToOrder`,
      addModel,
      {
        withCredentials: true,
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};

export const fetchOrder = async () => {
  try {
    const response = await axios.get(`${BASE_URL}Order/GetOrder`, {
      withCredentials: true,
    });
    console.log("it is fetch response" + response.data);
    return response.data;
  } catch (error) {
    console.error(
      "There was an error with the fetch order operation: " + error.message
    );
  }
};

export const decrementMealAmount = async (mealId) => {
  try {
    const response = await axios.put(
      `${BASE_URL}Order/DecrementAmount`,
      mealId,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.error(
      "here was an error with the fetch decrement meal amount operation: " +
        error.message
    );
  }
};

export const incrementMealAmount = async (mealId) => {
  try {
    const response = await axios.put(
      `${BASE_URL}Order/IncrementAmount`,
      mealId,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.error(
      "here was an error with the fetch increment meal amount operation: " +
        error.message
    );
  }
};

export const deleteMealFromOrder = async (mealId) => {
  try{
  const response = await axios.delete(`${BASE_URL}Order/deleteOrderRow`, {
      data: JSON.stringify(mealId),
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })

      console.log(response);
      console.log("delete end");
      return response;
  }
    catch(error){
      console.error("Error deleting meal:", error);
    };
};