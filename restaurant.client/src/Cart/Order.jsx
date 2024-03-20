import { React, useState, useEffect } from "react";
import CartItemsList from "./CartItemsList";
import { Row, Col, Button } from "react-bootstrap";
import { deleteMealFromOrder } from "../ApiCall";

const Order = (props) => {
  const [meals, setMeals] = useState(props.orderData?.orderRows || []);
  const [total, setTotal] = useState(props.orderData?.total || 0);

  const handleTotalUptade = (newTotal) => {
    setTotal(newTotal);
  };
  const handleMealDelete = async (rowId) => {
    try {
      const result = await deleteMealFromOrder(rowId);
      props.refreshOrderData();
    } catch (error) {
      console.error("Error in handleDelete: ", error);
    }
  };
  
  return (
    <>
      <p className="fs-4">Your order:</p>
      {props.orderData?.orderRows && (
        <CartItemsList
          meals={meals}
          handleTotalUptade={handleTotalUptade}
          handleMealDelete={handleMealDelete}
        />
      )}
      <hr />
      <Row className="offset-md-8 row-cols-1">
        <Col>
          <h4>Total: {total} ₴</h4>
        </Col>
      </Row>
      <Row className=" pt-3">
        <Col className="d-flex justify-content-end">
          <Button
            className="cartNext-but"
            size="md"
            onClick={props.handleNextButtonClick}
          >
            next
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Order;
