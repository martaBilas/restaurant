import { React, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./CartItem.css";
import { useOrderDispatch } from "./OrderContext";
import {
  incrementMealAmount,
  decrementMealAmount,
  deleteMealFromOrder,
} from "../ApiCall";

const CartItem = (props) => {
  const [quantity, setQuantity] = useState(props?.amount || 0);
  const dispatch = useOrderDispatch();

  const handleIncrease = async () => {
    try {
      const data = await incrementMealAmount(props.id);
      setQuantity(data.amount);
    } catch (error) {
      console.error("Error in handleIncrease: ", error);
    }
  };

  const handleDecrease = async () => {
    try {
      const data = await decrementMealAmount(props.id);
      setQuantity(data.amount);
    } catch (error) {
      console.error("Error in handleDecrease: ", error);
    }
  };

  const handleMealDelete = async () => {
    try {
      const response = await deleteMealFromOrder(props.id);
      if (response.status === 200) {
        dispatch({ type: "delete", id: props.id });
      }
    } catch (error) {
      console.error("Error in handleDeleteMeal: ", error);
    }
  };

  return (
    <Row className="pb-4">
      <Col xs="4" className="d-flex justify-content-center align-items-center">
        <img src={props.imageUrl} alt="img" className="img-fluid cart-img" />
      </Col>
      <Col xs="4">
        <Row>
          {" "}
          <h6 className="p-0 m-0">{props.name}</h6>
        </Row>
        <Row className="text-muted">weight: {props.weight} g</Row>
        <Row className="fs-5 pt-2">{props.price} ₴</Row>
      </Col>
      <Col
        md="1"
        xs="1"
        className="d-flex justify-content-center align-items-center p-0"
      >
        <button className="fs-5 transparent_button " onClick={handleDecrease}>
          <i className="fa-solid fa-minus"></i>
        </button>
      </Col>
      <Col
        md="1"
        xs="1"
        className="d-flex justify-content-center align-items-center p-0"
      >
        <input
          type="text"
          className="cart-input text-center"
          value={quantity}
          readOnly
        />
      </Col>
      <Col
        md="1"
        xs="1"
        className="d-flex justify-content-center align-items-center p-0"
      >
        <button className="fs-5 transparent_button" onClick={handleIncrease}>
          <i className="fa-solid fa-plus"></i>
        </button>
      </Col>
      <Col
        xs="1"
        className="d-flex justify-content-center align-items-center p-0"
      >
        <button
          className="fs-5 transparent_button"
          onClick={handleMealDelete}
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </Col>
    </Row>
  );
};

export default CartItem;
