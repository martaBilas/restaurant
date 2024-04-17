import React from "react";
import Accordion from "react-bootstrap/Accordion";

import UserOrder from "./UserOrder";

const orders = [
  {
    id: 35,
    order_date: "2024-04-13",
    meals: [
      {
        Id: 32,
        Name: "Breakfast with sun-dried tomatoes and salmon",
        Amount: 3,
        ImageUrl:
          "https://cdn-media.choiceqr.com/prod-eat-salalatpimonenka/menu/cyWDVwK-HbHMYFX-ElDYycd.jpeg",
        Weight: 340,
      },
      {
        Id: 33,
        Name: "Cheesecakes with cherries and mascarpone cream",
        Amount: 2,
        ImageUrl:
          "https://cdn-media.choiceqr.com/prod-eat-salalatpimonenka/menu/kDRmqnS-CCVmOqg-XUohCqF.jpeg",
        Weight: 300,
      },
      {
        Id: 35,
        Name: "Cheesecakes with cherries and mascarpone cream",
        Amount: 1,
        ImageUrl:
          "https://cdn-media.choiceqr.com/prod-eat-salalatpimonenka/menu/kDRmqnS-CCVmOqg-XUohCqF.jpeg",
        Weight: 300,
      },
    ],
  },
  {
    id: 32,
    order_date: "2021-04-23",
    meals: [
      {
        Id: 23,
        Name: "Breakfast with sun-dried tomatoes and salmon",
        Amount: 3,
        ImageUrl:
          "https://cdn-media.choiceqr.com/prod-eat-salalatpimonenka/menu/cyWDVwK-HbHMYFX-ElDYycd.jpeg",
        Weight: 340,
      },
      {
        Id: 24,
        Name: "Cheesecakes with cherries and mascarpone cream",
        Amount: 2,
        ImageUrl:
          "https://cdn-media.choiceqr.com/prod-eat-salalatpimonenka/menu/kDRmqnS-CCVmOqg-XUohCqF.jpeg",
        Weight: 300,
      },
      {
        Id: 25,
        Name: "Cheesecakes with cherries and mascarpone cream",
        Amount: 5,
        ImageUrl:
          "https://cdn-media.choiceqr.com/prod-eat-salalatpimonenka/menu/kDRmqnS-CCVmOqg-XUohCqF.jpeg",
        Weight: 300,
      },
    ],
  },
];

const UserOrdersList = () => {
  return (
    <Accordion className="pb-3">
      {orders.map((order) => (
        <Accordion.Item eventKey={order.id}>
          <Accordion.Header>Order #{order.id}</Accordion.Header>
          <Accordion.Body>
            <UserOrder order={order}/>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default UserOrdersList;
