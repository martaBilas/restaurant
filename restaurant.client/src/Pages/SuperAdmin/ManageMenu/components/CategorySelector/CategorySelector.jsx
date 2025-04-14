import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { RiArrowRightSLine, RiArrowLeftSLine } from "@remixicon/react";

import "swiper/css";

import EditableCategoryItem from "../EditableCategoryItem/EditableCategoryItem";

const CategorySelector = ({ categories, setSelectedCatalogueItem, onDeleteCategory }) => {

    const isMobile = window.innerWidth <= 991;

  return (
    <Container>
      <Row className="my-4">
        <Col
          xs="2"
          md="1"
          className="d-flex justify-content-center text-center "
        >
          <button className="swiper-button-prev transparent_button">
            <RiArrowLeftSLine />
          </button>
        </Col>
        <Col
          xs="8"
          md="10"
          className="d-flex justify-content-center text-center pt-4"
        >
          <Swiper
            modules={[Pagination, Navigation]}
            loop
            slidesPerView={isMobile ? 3 : 4}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
          >
            {categories.map((item) => (
              <SwiperSlide key={item.id}>
                <EditableCategoryItem
                  id={item.id}
                  name={item.name}
                  imageUrl={item.imageUrl}
                  onClick={setSelectedCatalogueItem}
                  onDeleteCategory={onDeleteCategory}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Col>
        <Col
          xs="2"
          md="1"
          className="d-flex justify-content-center text-center "
        >
          <button className="swiper-button-next transparent_button">
            <RiArrowRightSLine />
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default CategorySelector;
