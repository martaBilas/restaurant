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

export const getCategoryById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}Menu/getCategoryById/${id}`);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the meal: " + error.message);
  }
};

export const getMealById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}Menu/getMealById/${id}`);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the meal: " + error.message);
  }
};

export const deleteMealFromMenu = async (mealId) => {
  try {
    const response = await axios.delete(`${BASE_URL}Admin/deleteMealFromMenu/${mealId}`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error deleting meal:", error);
    throw error;
  }
};

export const addMealToMenu = async (meal) => {
  try {
    const formData = new FormData();

    formData.append("Name", meal.name);
    formData.append("CategoryId", meal.categoryId);
    formData.append("Price", meal.price);
    formData.append("Weight", meal.weight);
    formData.append("Description", meal.description);

    if (meal.image) {
      formData.append("Image", meal.image);
    }

    const response = await axios.post(`${BASE_URL}Admin/addMealToMenu`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    return response;
  } catch (error) {
    console.error("Error adding meal to menu:", error);
  }
};

export const updateMeal = async (meal) => {
  try {
    const formData = new FormData();

    formData.append("Id", meal.id);
    formData.append("Name", meal.name);
    formData.append("CategoryId", meal.categoryId);
    formData.append("Price", meal.price);
    formData.append("Weight", meal.weight);
    formData.append("Description", meal.description);

    if (meal.image) {
      formData.append("Image", meal.image);
    }

    const response = await axios.put(`${BASE_URL}Admin/updateMeal`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    return response;
  } catch (error) {
    console.error("Error adding meal to menu:", error);
  }
};

export const deleteCategoryFromMenu = async (categoryId) => {
  try {
    const response = await axios.delete(`${BASE_URL}Admin/deleteMealCategory`, {
      data: categoryId,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error("Error deleting category:", error.response?.data || error.message);
    throw error;
  }
};


export const addCategoryToMenu = async (category) => {
  try {
    const formData = new FormData();

    formData.append("Name", category.name);
    if (category.image) {
      formData.append("Image", category.image);
    }

    const response = await axios.post(`${BASE_URL}Admin/addMealCategory`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    return response;
  } catch (error) {
    console.error("Error adding category to menu:", error);
  }
};

export const updateCategory = async (category) => {
  try {
    const formData = new FormData();

    formData.append("Id", category.id);
    formData.append("Name", category.name);

    if (category.image) {
      formData.append("Image", category.image);
    }

    const response = await axios.put(`${BASE_URL}Admin/updateMealCategory`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    return response;
  } catch (error) {
    console.error("Error updating category to menu:", error);
  }
};

