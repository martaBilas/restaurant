import React, { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";

import "./Cart.css";
import OrderDetailsForm from "../Cart/OrderDetailsForm";
import Order from "../Cart/Order";
import ConfirmedOrder from "../Cart/ConfirmedOrder";
import EmptyCart from "../Cart/EmptyCart";
import { fetchOrder,deleteMealFromOrder } from "../ApiCall";

const Cart = (props) => {
  const [currentComponent, setCurrentComponent] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [meals, setMeals] = useState([]);
  const [total, setTotal] = useState(0);

  const setCurrentComponentHandler = () => {
    if (!meals) {
      setCurrentComponent(0);
    }
    else {
      setCurrentComponent(1);
    }
  };

  const handleMealDelete = async (rowId) => {
    console.log("i get in delete")
    try {
      const result = await deleteMealFromOrder(rowId);
      await getOrderData();
    } catch (error) {
      console.error("Error in handleDelete: ", error);
    }
    
  };

  const getOrderData = async () => {
    try {
      const data = await fetchOrder();
      setOrderData(data);
      setMeals(data.orderRows);
      setTotal(data.total);
      console.log("Updated meals:", meals);
      setCurrentComponentHandler();
    } catch (error) {
      console.error("Error fetching order data: ", error);
    }
  };

  useEffect(() => {
    getOrderData();
  }, []);

  const handleNextButtonClick = () => {
    setCurrentComponent(prevComponent => prevComponent + 1);
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
