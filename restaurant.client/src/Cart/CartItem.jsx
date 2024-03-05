import { React, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./CartItem.css";

const CartItem = (props) => {
  const [quantity, setQuantity] = useState(props.amount);

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  return (
    <Row className="pb-4">
      <Col xs="4" className="d-flex justify-content-center align-items-center">
        <img src={props.imageUrl} alt="img" className="img-fluid cart-img" />
      </Col>
      <Col xs="4" >
        <Row> <h6 className="p-0 m-0">{props.name}</h6></Row>
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
        <button className="fs-5 transparent_button">
          <i className="fa-solid fa-trash"></i>
        </button>
      </Col>
    </Row>
  );
};

export default CartItem;
