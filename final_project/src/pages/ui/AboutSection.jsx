import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../styles/about-section.css";
import aboutImg from "../../assets/product-images/swift.png";

const AboutSection = ({ aboutClass }) => {
  return (
    <section
      className="about__section"
      style={
        aboutClass === "aboutPage"
          ? { marginTop: "0px" }
          : { marginTop: "280px" }
      }
    >
      <Container>
        <Row>
          <Col lg="6" md="6" className="order-lg-2">
            <div className="about__img">
              <img src={aboutImg} alt="About Gadikaa" className="w-100" />
            </div>
          </Col>
          <Col lg="6" md="6" className="order-lg-1">
            <div className="about__section-content">
              <h4 className="section__subtitle">About Us</h4>
              <h2 className="section__title">Welcome to Car Rent Service</h2>
              <p className="section__description">
                Designed specifically for Nepal's colorful surroundings, Carmart! is the best software
                 for renting a car in the country. It provides a dependable and trouble-free service,
                  appealing to both residents and visitors who are looking for easy ways to get throughout
                   the varied landscape of the country. Thanks to its intuitive design, Carmart! makes booking 
                   a breeze and provides a wide range of vehicles to meet every requirement. The software is 
                   changing the game for tourists in Nepal by making their trips more convenient and secure.
              </p>

              
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
