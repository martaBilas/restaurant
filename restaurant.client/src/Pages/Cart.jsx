import React, { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";

import "./Cart.css";
import OrderDetailsForm from "../Cart/OrderDetailsForm";
import Order from "../Cart/Order";
import ConfirmedOrder from "../Cart/ConfirmedOrder";
import EmptyCart from "../Cart/EmptyCart";
import { fetchOrder } from "../ApiCall";

const Cart = (props) => {
  const [currentComponent, setCurrentComponent] = useState(1);
  const [orderData, setOrderData] = useState(null);

  const getOrderData = async () => {
    try {
      const data = await fetchOrder();
      setOrderData(data);
    } catch (error) {
      console.error("Error fetching order data: ", error);
    }
  };

  useEffect(() => {
    getOrderData();
  }, [orderData]);

  const renderComponent = () => {
    if (orderData===null) {
      return <EmptyCart />;
    }
    switch (currentComponent) {
      case 1:
        return (
          <Order
            orderData={orderData}
            handleNextButtonClick={handleNextButtonClick}
            refreshOrderData={getOrderData}
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

  const handleNextButtonClick = () => {
    setCurrentComponent(currentComponent + 1);
  };

  const handleBackButtonClick = () => {
    setCurrentComponent(1);
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
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default Cart;
