import React, { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";

import "./Cart.css";
import OrderDetailsForm from "../Cart/OrderDetailsForm";
import Order from "../Cart/Order";
import ConfirmedOrder from "../Cart/ConfirmedOrder";
import EmptyCart from "../Cart/EmptyCart";
import { useOrder } from "../Cart/OrderContext";

const Cart = (props) => {
  const order = useOrder();
  const meals = order.meals;

  const [currentComponent, setCurrentComponent] = useState(0);

  const setCurrentComponentHandler = () => {
    if (meals.length === 0) {
      setCurrentComponent(0);
    } else {
      setCurrentComponent(1);
    }
  };

  useEffect(() => {
    setCurrentComponentHandler();
  }, [meals]);

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
        return <Order handleNextButtonClick={handleNextButtonClick} />;
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
