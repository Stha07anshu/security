import React from 'react';

import HeroSlider from '../ui/HeroSlider'; // Assuming HeroSlider is imported
import Helmet from "../../components/Helmet/Helmet";
import { Container, Row, Col } from 'reactstrap';
import FindCarForm from '../ui/FindCarForm';
import AboutSection from '../ui/AboutSection';
import carData from '../../assets/data/carData';
import CarItem from '../ui/CarItem';
import CarListing from './CarListing';
import'../../components/Footer';
import Footer from '../../components/Footer';
import Testimonial from '../ui/Testimonial';



const Homepage = () => {
  return (
      <Helmet title="Home">
        {/* ============= hero section =========== */}
        <section className="p-0 hero__slider-section">
          <HeroSlider />
  
          <div className="hero__form">
            <Container>
              <Row className="form__row">
                <Col lg="4" md="4">
                  <div className="find__cars-left">
                    <h2>Find your best car here</h2>
                  </div>
                </Col>
  
                <Col lg="8" md="8" sm="12">
                  <FindCarForm />
                </Col>
              </Row>
            </Container>
          </div>
        </section>
        
        {/* Car offer cards */}
        <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h6 className="section__subtitle">Come with</h6>
              <h2 className="section__title">Hot Offers</h2>
            </Col>

            <CarListing/>
            
            
          </Row>
        </Container>
        {/* =========== testimonial section =========== */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-4 text-center">
              <h6 className="section__subtitle">Our clients says</h6>
              <h2 className="section__title">Testimonials</h2>
            </Col>

            <Testimonial/>
          </Row>
        </Container>
      </section>
        <Footer/>
      </section>
        </Helmet>
        
  );
}

export default Homepage;
