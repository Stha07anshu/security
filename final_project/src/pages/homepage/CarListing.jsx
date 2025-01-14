import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../ui/CommonSection";
import CarItem from "../ui/CarItem";
import Helmet from "../../components/Helmet/Helmet";
import "../styles/car-listing.css"; // Import the CSS file
import { getAllProducts } from "../../api/Api";

const CarListing = () => {
  const [cars, setCars] = useState([]);
  const [sortedCars, setSortedCars] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [vehicleTypeSort, setVehicleTypeSort] = useState("");
  const [city, setCity] = useState(""); // New state for city
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [noCarsFound, setNoCarsFound] = useState(false);

  useEffect(() => {
    // Fetch all products
    getAllProducts()
      .then((res) => {
        const fetchedCars = res.data.products;
        setCars(fetchedCars);
        setSortedCars(fetchedCars);

        // Extract and set unique vehicle types
        const uniqueVehicleTypes = [...new Set(fetchedCars.map((car) => car.productCategory))];
        setVehicleTypes(uniqueVehicleTypes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // Handle sorting and filtering whenever sortOption, vehicleTypeSort, or city changes
    handleSortAndFilter();
  }, [sortOption, vehicleTypeSort, city]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleVehicleTypeSortChange = (e) => {
    setVehicleTypeSort(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSortAndFilter = () => {
    let filteredCars = [...cars];

    // Filter by vehicle type
    if (vehicleTypeSort) {
      filteredCars = filteredCars.filter((car) => car.productCategory === vehicleTypeSort);
    }

    // Filter by city
    if (city) {
      const cityFilter = getCityFilter(city);
      filteredCars = filteredCars.filter((car) => cityFilter.includes(car.productCategory));
    }

    // Sort by price
    if (sortOption === "low") {
      filteredCars.sort((a, b) => a.productPrice - b.productPrice);
    } else if (sortOption === "high") {
      filteredCars.sort((a, b) => b.productPrice - a.productPrice);
    }

    setSortedCars(filteredCars);
    setNoCarsFound(filteredCars.length === 0); // Update noCarsFound state
  };

  const getCityFilter = (city) => {
    switch (city) {
      case "Kathmandu":
        return ["Hatchback", "Sedan"];
      case "Lalitpur":
        return ["SUV", "Hatchback", "Sedan"];
      case "Bhaktapur":
        return ["Hatchback"];
      case "Pokhara":
        return vehicleTypes; // Show all vehicle types
      default:
        return vehicleTypes; // Default to all vehicle types
    }
  };

  return (
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />

      <Container>
        <Row className="align-items-center mb-4">
          <Col lg="6" className="d-flex align-items-center mb-3 mb-lg-0">
            <span className="d-flex align-items-center gap-2 sort-by-text">
              <i className="ri-sort-asc"> Sort By Price:</i>
            </span>
            <select className="form-select" value={sortOption} onChange={handleSortChange}>
              <option value="">Select</option>
              <option value="low">Low to High</option>
              <option value="high">High to Low</option>
            </select>
          </Col>
          <Col lg="6" className="d-flex align-items-center">
            <span className="d-flex align-items-center gap-2 sort-by-text">
              <i className="ri-sort-asc"> Vehicle Type:</i>
            </span>
            <select className="form-select" value={vehicleTypeSort} onChange={handleVehicleTypeSortChange}>
              <option value="">Show All Vehicles</option>
              <option value="SUV">SUV</option>
              <option value="PickUpTruck">Pick Up Truck</option>
              <option value="4wd">4WD</option>
              <option value="Hatchback">HatchBack</option>
              <option value="Sedan">Sedan</option>
            </select>
          </Col>
          <Col lg="6" className="d-flex align-items-center mt-3">
            <span className="d-flex align-items-center gap-2 sort-by-text">
              <i className="ri-sort-asc"> City:</i>
            </span>
            <select className="form-select" value={city} onChange={handleCityChange}>
              <option value="">Select City</option>
              <option value="Kathmandu">Kathmandu</option>
              <option value="Lalitpur">Lalitpur</option>
              <option value="Bhaktapur">Bhaktapur</option>
              <option value="Pokhara">Pokhara</option>
            </select>
          </Col>
          <Col lg="12" className="text-center mb-5"></Col>
          {
            sortedCars.map(car => {
              return (
                <CarItem
                  key={car._id}
                  _id={car._id}
                  productTransmission={car.productTransmission}
                  productType={car.productType}
                  productImage={car.productImage}
                  productName={car.productName}
                  productPrice={car.productPrice}
                  productCategory={car.productCategory}
                />
              )
            })
          }

        </Row>

      </Container>
    </Helmet>
  );
};

export default CarListing;
