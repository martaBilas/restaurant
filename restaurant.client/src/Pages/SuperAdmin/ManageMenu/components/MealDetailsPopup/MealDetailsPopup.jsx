import React from "react";
import Popup from "devextreme-react/popup";

import "./MealDetailsPopup.scss"

const MealDetailsPopup = (props) => {
  return (
    <Popup
      visible={props.isVisible}
      hideOnOutsideClick={true}
      showTitle={false}
      width={450}
      height="auto"
      onHiding={props.togglePopup}
      dragEnabled={false}
      position="center"
      className="meal-details-popup"
    >
    <div className="popup-content">
        <i
          className="fa-solid fa-xmark fa-xl close-button"
          onClick={props.closeCardHandler}
        ></i>
        <div className="text-center p-2">
          <img src={props.imageUrl} alt={props.name} className="img-fluid my-3" />
          <span className="mb-0 fs-5 d-block fw-bold pb-2">{props.name}</span>
          <p className="meal-description">{props.description}</p>
          <div className="d-flex justify-content-between px-2">
            <span className="text-muted fs-5">{props.weight} г</span>
            <span className="fw-bold fs-5">{props.price} ₴</span>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default MealDetailsPopup;
