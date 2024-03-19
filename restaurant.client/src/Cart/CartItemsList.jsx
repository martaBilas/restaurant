import React from "react";
import { Row } from "react-bootstrap";
import CartItem from "./CartItem";
import { deleteMealFromOrder } from "../ApiCall";

const CartItemsList = (props) => {
  const meals = props.meals;

  const handleMealDelete = async (rowId) => {
    try {
      const result = await deleteMealFromOrder(rowId);
      const updatedMeals = meals.filter(item => item.rowId !== rowId);
      props.setMeals(updatedMeals);
    } catch (error) {
      console.error("Error in handleDelete: ", error);
    }
  };

  return (
    <Row>
      {meals.map((item) => (
        <div key={item.id}>
          <CartItem
            id={item.id}
            name={item.mealName}
            imageUrl={item.imageUrl}
            price={item.price}
            weight={item.weight}
            amount={item.amount}
            handleTotalUptade={props.handleTotalUptade}
            handleMealDelete={handleMealDelete}
          />
        </div>
      ))}
    </Row>
  );
};

export default CartItemsList;
