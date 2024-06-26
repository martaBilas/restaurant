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
  try {
    const response = await axios.delete(`${BASE_URL}Order/deleteOrderRow`, {
      data: JSON.stringify(mealId),
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error deleting meal:", error);
  }
};

export const placeOrder = async (placeOrderModel) => {
  try {
    const response = await axios.post(
      `${BASE_URL}Order/placeOrder`,
      placeOrderModel,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.error("Error place order:" + error);
  }
};

export const signIn = async (logInModel) => {
  try {
    const response = await axios.post(
      `${BASE_URL}User/signIn`,
      JSON.stringify(logInModel),
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    if (error.response) {
      console.error("Error during sign in:", error.response.data.message);
    } else if (error.request) {
      console.error("No response received:", error.message);
    } else {
      console.error("Error", error.message);
    }
  }
};
export const signUp = async (createUserModel) => {
  try {
    const response = await axios.post(
      `${BASE_URL}User/signUp`,
      JSON.stringify(createUserModel),
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.error("Error during sign up:", error);
  }
};

export const logOut = async () => {
  try {
    const response = await axios.get(`${BASE_URL}User/logOut`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error during log out:", error);
  }
};

export const getUserOrdersByEmail = async (userEmail) => {
  try {
    const response = await axios.get(`${BASE_URL}User/${userEmail}`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error during fetching user orders:", error);
  }
};

export const updateUserInfo = async (newInfo) => {
  try {
    const response = await axios.put(`${BASE_URL}User/UpdateUserInfo`, newInfo );
    return response.data;
  } catch (error) {
    console.error(`Error updating user info: ${error}`);
    throw error;
  }
};

export const updateUserPassword = async (newInfo) => {
  try {
    const response = await axios.put(`${BASE_URL}User/UpdateUserPassword`, newInfo );
    return response.data;
  } catch (error) {
    console.error(`Error updating user password: ${error}`);
    throw error;
  }
};
