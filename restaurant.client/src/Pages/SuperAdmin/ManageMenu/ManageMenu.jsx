import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import CategorySelector from "./components/CategorySelector/CategorySelector";
import MealList from "./components/MealList/MealList";

import { fetchMeals } from "../../../services/MenuService";
import { fetchCategories } from "../../../services/MenuService";
import { deleteMealFromMenu } from "../../../services/MenuService";
import { deleteCategoryFromMenu } from "../../../services/MenuService";

const ManageMenu = () => {
  const [selectedCatalogueItem, setSelectedCatalogueItem] = useState(1);
  const [categoryItems, setCategoryItems] = useState([]);
  const [meals, setMeals] = useState([]);

  const fetchMealsData = async () => {
    try {
      const mealsData = await fetchMeals(selectedCatalogueItem);
      setMeals(mealsData);
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  const fetchInitialData = async () => {
    try {
      const categories = await fetchCategories();
      setCategoryItems(categories);

      const initialMeals = await fetchMeals(selectedCatalogueItem);
      setMeals(initialMeals);
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };

  const handleDeleteMeal = async (mealId) => {
    try {
      await deleteMealFromMenu(mealId);
      setMeals((prevMeals) => prevMeals.filter((meal) => meal.id !== mealId));
    } catch (error) {
      console.error("Failed to delete meal:", error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategoryFromMenu(categoryId);
      setCategoryItems((prevCategoryData) => prevCategoryData.filter((category) => category.id !== categoryId));
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  useEffect(() => {
    fetchMealsData();
  }, [selectedCatalogueItem]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    <Container>
      <Row className="py-4">
        <Col md="12">
          <img src="src\assets\img\pic.jpeg" alt="img" className="img-fluid" />
        </Col>
      </Row>
      <Row className="d-flex align-items-center">
        <Col md="8" className="d-flex justify-content-start ps-5">
          <h3 className="text-left">Manage Menu</h3>
        </Col>
        <Col md="4" className="d-flex justify-content-end">
          <Link to="/meal/new" className="btn btn-primary mx-2">
            Add New Meal
          </Link>
          <Link to="/category/new" className="btn btn-secondary">
            Add New Category
          </Link>
        </Col>
      </Row>
      <Row>
        <CategorySelector
          setSelectedCatalogueItem={setSelectedCatalogueItem}
          categories={categoryItems}
          onDeleteCategory={handleDeleteCategory}
        />
      </Row>
      <MealList meals={meals} onDeleteMeal={handleDeleteMeal}/>
    </Container>
  );
};

export default ManageMenu;
