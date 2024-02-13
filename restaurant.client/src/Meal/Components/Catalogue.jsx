import  { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { RiArrowRightSLine, RiArrowLeftSLine } from "@remixicon/react";

import "swiper/css";
import "./Catalogue.css";
import "../../styles.css";

import CatalogueItem from "./CatalogueItem";
import Menu from "./Menu";


const Catalogue = () => {
    const [selectedCatalogueItem, setSelectedCatalogueItem] = useState(0);

    const handleCatalogItemClick = (itemId) => {
        setSelectedCatalogueItem(itemId);
    };

    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1000;

    const [categoryData, setCategoryData] = useState([]);
    useEffect(() => {
        fetch('https://localhost:7135/api/Menu/GetCategories')
            .then(response => {
                console.log(response);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((json) => {
                setCategoryData(json);
            })
            .catch(error => {
                console.log('There was a problem with the fetch operation: ' + error.message);
            });
    }, []);

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
                        slidesPerView={isMobile ? 3 : isTablet ? 4 : 5}
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
            <Row>
                <Menu catalogueItemId={selectedCatalogueItem} />
            </Row>
        </Container>
    );
};

export default Catalogue;
