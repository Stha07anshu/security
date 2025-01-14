import React from "react";
import CommonSection from "../ui/CommonSection";
import Helmet from "../../components/Helmet/Helmet";
import AboutSection from "../ui/AboutSection";
import { Container, Row, Col } from "reactstrap";
import driveImg from "../../assets/images/drive.jpg";
import "../styles/about.css";

const About = () => {
  return (
    <Helmet title="About">
      
      <CommonSection title="About Us" />
      <AboutSection aboutClass="aboutPage" />

      <section className="about__page-section">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12">
              <div className="about__page-img">
                <img src={driveImg} alt="" className="w-100 rounded-3" />
              </div>
            </Col>

            <Col lg="6" md="6" sm="12" className="mt-4 mt-md-0">
              <div className="about__page-content">
                <h2 className="section__title">
                  We Are Committed To Provide Safe Ride Solutions
                </h2>

                <p className="section__description">
                  At Carmart!, we prioritize your safety above all else. Our
                  fleet of vehicles undergoes rigorous maintenance checks and
                  is equipped with the latest safety features to ensure a
                  secure journey for all our customers. Each car is thoroughly
                  sanitized and inspected before and after every rental to
                  maintain the highest standards of cleanliness and
                  reliability. Our commitment to safety extends beyond just
                  our vehicles; our customer support team is available 24/7 to
                  assist you in case of any emergencies or queries, ensuring
                  that help is always just a phone call away.
                </p>

                <p className="section__description">
                  We understand that a safe ride requires both a car and a
                  driver. That’s why we offer professional driver services
                  where each driver is vetted, trained, and skilled in
                  providing safe and courteous service. Whether you’re
                  navigating the hectic streets of Kathmandu or visiting the
                  calm vistas of Pokhara, Carmart! promises a smooth and secure
                  journey. Trust us to be your partner in travel, committed to
                  offering safe and dependable ride solutions adapted to your
                  needs.
                </p>

                <div className="d-flex align-items-center gap-3 mt-4">
                  <span className="fs-4">
                    <i className="ri-phone-line"></i>
                  </span>

                  <div>
                    <h6 className="section__subtitle">Need Any Help?</h6>
                    <h4>+97701-4482757</h4>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default About;
