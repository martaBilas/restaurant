import React, { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";

import "./Cart.css";
import OrderDetailsForm from "../Cart/OrderDetailsForm";
import Order from "../Cart/Order";
import ConfirmedOrder from "../Cart/ConfirmedOrder";
import EmptyCart from "../Cart/EmptyCart";
import { fetchOrder, deleteMealFromOrder } from "../ApiCall";


const Cart = (props) => {
  console.log(props)
  const [currentComponent, setCurrentComponent] = useState(0);
  const [orderData, setOrder] = useState(null);
  const [meals, setMeals] = useState([]);
  const [total, setTotal] = useState(0);

  const setTotalHandler = (total) => {
    setTotal(total);
    console.log("I end set total handler.");
  };

  const setCurrentComponentHandler = () => {
    if (meals.length === 0) {
      setCurrentComponent(0);
    } else {
      setCurrentComponent(1);
    }
    console.log("I end set current component data handler.");
  };

  const handleMealDelete = async (rowId) => {
    console.log("i get in delete");
    try {
      await deleteMealFromOrder(rowId);
      await getOrder();
    } catch (error) {
      console.error("Error in handleDelete: ", error);
    }
  };

  const getOrder = async () => {
    try {
      const data = await fetchOrder();
      setOrder(data);
      console.log("Data from set order data: " + orderData);
      setMeals(data.orderRows);
      console.log("Data after set meals: " + meals);
      setTotalHandler(data.total);
      console.log("Total: " + total);
      setCurrentComponentHandler();
      console.log("We get order data: " + orderData);
    } catch (error) {
      console.error("Error fetching order data: ", error);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);


  const handleNextButtonClick = () => {
    setCurrentComponent((prevComponent) => prevComponent + 1);
  };

  const handleBackButtonClick = () => {
    setCurrentComponent(1);
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case 0:
        return <EmptyCart />;
      case 1:
        return (
          <Order
            meals={meals}
            total={total}
            handleNextButtonClick={handleNextButtonClick}
            refreshOrderData={getOrderData}
            handleMealDelete={handleMealDelete}
          />
        );
      case 2:
        return (
          <OrderDetailsForm handleNextButtonClick={handleNextButtonClick} />
        );
      case 3:
        return <ConfirmedOrder />;
      default:
        return null;
    }
  };

  const renderHeader = () => {
    switch (currentComponent) {
      case 1:
        return <Offcanvas.Title className="fs-3">Cart</Offcanvas.Title>;
      case 2:
        return (
          <button
            className="transparent_button fs-5"
            onClick={handleBackButtonClick}
          >
            <i class="fa-solid fa-chevron-left"></i> back
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <Offcanvas
      placement="end"
      show={props.showCart}
      onHide={props.closeCartHandler}
      className="custom-offcanvas d-flex flex-column justify-content-between"
      backdropClassName="custom-offcanvas-backdrop"
    >
      <Offcanvas.Header className="pb-0" closeButton>
        {renderHeader()}
      </Offcanvas.Header>
      <Offcanvas.Body>{renderComponent()}</Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;
