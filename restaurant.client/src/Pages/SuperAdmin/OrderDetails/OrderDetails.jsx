import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Row, Col } from "react-bootstrap";
import { LoadPanel } from "devextreme-react";
import moment from "moment";
import OrderedItem from "./components/OrderedItem";
import OrderStatusUpdateItem from "./components/OrderStatusUpdateItem";
import { getFullOrderByIdAsync } from "../../../services/OrdersService";

const OrderDetails = () => {

  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      const result = await getFullOrderByIdAsync(orderId);
      setOrder(result.data);
    };

    fetchOrder();
  }, [orderId]);

  useEffect(()=>{
    if(order){
      setLoading(false);
    }
  },[order]);

  const orderedItems = [
    { name: "Item 1", amount: 2, price: 10 },
    { name: "Item 2", amount: 1, price: 15 },
    { name: "Item 3", amount: 3, price: 5 },
  ];

  const history = [
    {
      changedTime: moment().subtract(2, "hours").toISOString(),
      status: "Processing",
    },
    {
      changedTime: moment().subtract(1, "day").toISOString(),
      status: "Shipped",
    },
    {
      changedTime: moment().subtract(3, "days").toISOString(),
      status: "Delivered",
    },
    {
      changedTime: moment().subtract(10, "minutes").toISOString(),
      status: "Pending",
    },
  ];

  return (
    loading ? <LoadPanel visible /> :
    (<div className="container mt-4">
      <Row className="fs-6">
        <Col md={6}>
          <div className="mb-4">
            <div className="d-flex align-items-center">
              <h6 className="bg-success text-white px-3 py-1 rounded">
                GENERAL
              </h6>
            </div>
            <div className="mt-2 ms-3 text-start">
              <p>
                <strong>ID:</strong> {order.id}
              </p>
              <p>
                <strong>Order Date:</strong> {moment(order.orderDate).format("DD.MM.YYYY HH:mm")}
              </p>
              <p>
                <strong>Address:</strong> {order.customer.address}
              </p>
              <p>
                <strong>Customer:</strong> {order.customer.firstName + " " + order.customer.lastName }
              </p>
              <p>
                <strong>Phone:</strong> {order.customer.phoneNumber}
              </p>
              <p>
                <strong>Current Status:</strong> Internal User
              </p>
            </div>
          </div>
          <div className="mb-4">
            <div className="d-flex align-items-center">
              <h6 className="bg-success text-white px-3 py-1 rounded">
                HISTORY
              </h6>
            </div>
            <div className="container mt-3">
              {history.map((order, index) => (
                <OrderStatusUpdateItem
                  key={index}
                  changedTime={order.changedTime}
                  status={order.status}
                />
              ))}
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div className="mb-4">
            <div className="d-flex align-items-center">
              <h6 className="bg-success text-white px-3 py-1 rounded">
                DETAILS
              </h6>
            </div>
            <div className="mt-2 text-start ms-2">
              <p>
                <strong>Total:</strong> {order.total}
              </p>
              <p>
                <strong>Additional info:</strong> {order.additionalInfo}
              </p>
              {order.orderRows.map((item, index) => (
                <OrderedItem
                  key={index}
                  index={index}
                  name={item.mealName}
                  amount={item.amount}
                  price={item.price}
                />
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </div>)
  );
};

export default OrderDetails;
