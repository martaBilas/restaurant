import React from "react";
import { Row } from "react-bootstrap";
import CartItem from "./CartItem";

const order = [
  {
    Id: 0,
    Name: "Breakfast with sun-dried tomatoes and salmon",
    Price: 340,
    ImageUrl:
      "https://cdn-media.choiceqr.com/prod-eat-salalatpimonenka/menu/cyWDVwK-HbHMYFX-ElDYycd.jpeg",
    Weight: 340,
    Amount: 3
  },
  {
    Id: 1,
    Name: "Breakfast with salmon and poached egg",
    Price: 330,
    ImageUrl:
      "https://cdn-media.choiceqr.com/prod-eat-salalatpimonenka/menu/qGdnPXe-HzjdxTN-kkeTUXa.jpeg",
    Weight: 290,
    Amount: 2
  },
  {
    Id: 2,
    Name: "Breakfast designer",
    Price: 190,
    ImageUrl:
      "https://cdn-media.choiceqr.com/prod-eat-salalatpimonenka/menu/BwLfjlI-TFmougX-fSKKssc.jpeg",
    Weight: 300,
    Amount: 1
  },
  
];

const CartItemsList = (props) => {
  return (
    <Row>
      {order.map((item) => (
        <div key={item.id}>
          <CartItem
            id={item.Id}
            name={item.Name}
            imageUrl={item.ImageUrl}
            price={item.Price}
            weight={item.Weight}
            amount={item.Amount}
          />
        </div>
      ))}
    </Row>
  );
};

export default CartItemsList;