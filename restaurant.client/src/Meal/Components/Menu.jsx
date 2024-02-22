import React,{useState} from "react";
import "./Menu.css";
import { Row } from "react-bootstrap";
import MenuItem from "./MenuItem";


const Menu = (props) => {
  const filteredMenuData = props.meals

    return (
    <Row>
      {filteredMenuData.map((item) => (
        <div key={item.id} className="col-md-4  mb-4">
          <MenuItem
            id={item.id}
            name={item.name}
            imageUrl={item.imageUrl}
            price={item.price}
            description={item.description}
            weight={item.weight}
            catalogueId={item.catalogueId}
          />
        </div>
      ))}
    </Row>
  );
};

export default Menu;