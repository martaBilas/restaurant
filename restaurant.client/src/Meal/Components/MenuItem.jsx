import React, { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { RiShoppingBasketLine } from "@remixicon/react";

import "./MenuItem.css";
import "../../styles.css";
const MenuItem = (props) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <div>
      <Card className="menuItem_card p-4">
        <div>
          <Card.Img className="menuItem_img" src={props.imageUrl} alt="" />
        </div>
        <Card.Title className="pt-3">{props.name}</Card.Title>
        <Row className="pt-2">
          <Col
            md="4"
            className="d-flex justify-content-center align-items-center fs-4 menuItem_price"
          >
            {props.price} ₴
          </Col>
          <Col
            md="2"
            className="d-flex justify-content-center align-items-center"
          >
            <button
              className="fs-4 transparent_button"
              onClick={handleDecrease}
            >
              <i className="fa-solid fa-minus"></i>
            </button>
          </Col>
          <Col
            md="2"
            className="d-flex justify-content-center align-items-center"
          >
            <input
              type="text"
              className="menuItem_input text-center"
              value={quantity}
              readOnly
            />
          </Col>
          <Col
            md="2"
            className="d-flex justify-content-center align-items-center"
          >
            <button
              className="fs-4 transparent_button"
              onClick={handleIncrease}
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </Col>
          <Col
            md="2"
            className="d-flex justify-content-center align-items-center"
          >
            <button
              className="fs-4 transparent_button">
              <i className="fa-solid fa-basket-shopping"></i>
            </button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default MenuItem;
