import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/car-item.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGasPump, faCogs, faCar, faTruck, faMotorcycle } from "@fortawesome/free-solid-svg-icons";

const CarItem = (props) => {
  const { _id, productImage, productCategory, productName, productPrice,productType,productTransmission} = props;

  // Function to select appropriate FontAwesome icon based on vehicleType
  const getVehicleIcon = () => {
    switch (productCategory) {
      case "Sedan":
        return faCar;
      case "Truck":
        return faTruck;
      case "Motorcycle":
        return faMotorcycle;
      default:
        return faCar; // Default to car icon if no match
    }
  };

  return (
    <Col lg="4" md="4" sm="6" className="mb-4">
      <div className="car__item">
        <div className="car__img">
          <img src={`http://localhost:5000/products/${productImage}`} alt="" className="w-100" />
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{productName}</h4>
          <h6 className="rent__price text-center mt-2">
            NPR {productPrice} <span>/ Day</span>
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-3">
            <span className="d-flex align-items-center gap-1">
              <FontAwesomeIcon icon={getVehicleIcon()} /> {productCategory}
            </span>
            <span className="d-flex align-items-center gap-1">
              <FontAwesomeIcon icon={faCogs} />{productTransmission}
            </span>
            <span className="d-flex align-items-center gap-1">
              <FontAwesomeIcon icon={faGasPump} /> {productType}
            </span>
          </div>

          <div className="d-flex justify-content-between">
            <button className="w-50 car__item-btn car__btn-rent">
              <Link to={`/product/${_id}`}>Rent</Link>
            </button>

            <button className="w-50 car__item-btn car__btn-details">
              <Link to={`/product/${_id}`}>Details</Link>
            </button>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default CarItem;
