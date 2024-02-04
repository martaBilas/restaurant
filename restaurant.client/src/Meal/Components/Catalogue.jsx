import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination, Navigation } from "swiper/modules";

import "./Catalogue.css"
import "../../styles.css"
import { RiArrowRightSLine, RiArrowLeftSLine } from "@remixicon/react";
import CatalogueItem from "./CatalogueItem";
import pasta from "../../assets/img/pasta.png";
import Menu from "./Menu";

const categoryData = [
  {
    id: 0,
    name: "all",
    imageUrl: pasta,
  },
  {
    id: 1,
    name: "breakfasts",
    imageUrl: pasta,
  },
  {
    id: 2,
    name: "bowls",
    imageUrl: pasta,
  },
  {
    id: 3,
    name: "pizza",
    imageUrl: pasta,
  },
  {
    id: 4,
    name: "combo",
    imageUrl: pasta,
  },
  {
    id: 5,
    name: "salads",
    imageUrl: pasta,
  },
  {
    id: 6,
    name: "pasta",
    imageUrl: pasta,
  },
  {
    id: 7,
    name: "soup",
    imageUrl: pasta,
  },
  {
    id: 8,
    name: "desserts",
    imageUrl: pasta,
  },
  {
    id: 9,
    name: "beverages",
    imageUrl: pasta,
  },
];

const Catalogue = () => {
  const [selectedCatalogueItem, setSelectedCatalogueItem] = useState(0);

  const handleCatalogItemClick = (itemId) => {
    setSelectedCatalogueItem(itemId);
  };

  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1000;

  return (
    <Container>
      <Row className="my-4">
        <Col xs="2" md="1" className="d-flex justify-content-center text-center "> 
            <button className="swiper-button-prev transparent_button">
              <RiArrowLeftSLine />
            </button>
        </Col>
        <Col xs="8" md="10" className="d-flex justify-content-center text-center pt-4">
          <Swiper
            modules={[Pagination, Navigation]}
            loop
            slidesPerView={isMobile ? 3 : (isTablet ? 4 : 5)}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
          >
            {categoryData.map((item) => (
              <SwiperSlide key={item.id}>
                <CatalogueItem 
                  id={item.id}
                  name={item.name}
                  imageUrl={item.imageUrl}
                  onClick={handleCatalogItemClick}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Col>
        <Col xs="2" md="1" className="d-flex justify-content-center text-center ">
            <button className="swiper-button-next transparent_button">
              <RiArrowRightSLine />
            </button>
        </Col>
      </Row>
      <Row>
        <Menu catalogueItemId={selectedCatalogueItem} />
      </Row>
    </Container>
  );
};

export default Catalogue;
