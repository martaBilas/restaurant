import React from "react";
import { Row } from "react-bootstrap";
import CartItem from "./CartItem";

const CartItemsList = (props) => {
  const meals = props.meals;
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
          />
        </div>
      ))}
    </Row>
  );
};

export default CartItemsList;
