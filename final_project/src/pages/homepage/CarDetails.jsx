import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from "reactstrap";
import Helmet from "../../components/Helmet/Helmet";
import { getSingleProduct, bookCar } from '../../api/Api'; // Adjust the import path as necessary
import '../styles/car-detail.css'; // Import your CSS file
import BookingForm from '../ui/BookingForm';

const ProductDetails = () => {
  const { id } = useParams();  // Fetching the id from URL parameters
  console.log('Product ID:', id);  // Debugging statement

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError('Invalid product ID');
        setLoading(false);
        return;
      }

      try {
        const response = await getSingleProduct(id);
        console.log('Product Response:', response.data); // Log the response data
        if (response.data.success) {
          setProduct(response.data.product);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        console.log('Error fetching product:', err); // Log the error
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleReserve = async () => {
    try {
      if (!product || !product._id) {
        setError('Product not available for reservation');
        return;
      }
      await bookCar({ productId: product._id });
      alert('Vehicle Reserved!');
    } catch (err) {
      alert('Failed to reserve vehicle: ' + err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Helmet title={product.productName}>
      <section className="product-details-section">
        <Container>
          <Row>
            <Col lg="6">
              <img
                src={`https://localhost:5000/products/${product.productImage}`} // Adjust the path as needed
                alt={product.productName}
                className="w-100"
              />
            </Col>

            <Col lg="6">
              <div className="car__info">
                <h2 className="section__title">{product.productName}</h2>

                <div className="d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">
                    NRS {product.productPrice}.0/ Day
                  </h6>

                  <span className="d-flex align-items-center gap-2">
                    <span style={{ color: "#f9a826" }}>
                      {[...Array(product.productRating)].map((_, i) => (
                        <i key={i} className="ri-star-s-fill"></i>
                      ))}
                    </span>
                    ({product.productRating} Ratings)
                  </span>
                </div>

                <p className="section__description">
                  {product.productDescription}
                </p>

                <div
                  className="d-flex align-items-center mt-3"
                  style={{ columnGap: "4rem" }}
                >

                  <span className="d-flex align-items-center gap-1 section__description">
                    <i className="ri-gas-station-line" style={{ color: "#f9a826" }}></i>{" "}
                    {product.productType} {/* Fuel type */}
                  </span>

                  <span className="d-flex align-items-center gap-1 section__description">
                    <i className="ri-settings-2-line" style={{ color: "#f9a826" }}></i>{" "}
                    {product.productTransmission} {/* Transmission type */}
                  </span>

                  <span className="d-flex align-items-center gap-1 section__description">
                    <i className="ri-speed-line" style={{ color: "#f9a826" }}></i>{" "}
                    {product.productMph} MPH
                  </span>
                </div>
              </div>
            </Col>

            <Col lg="7" className="mt-5">
              <div className="booking-info mt-5">
                <h5 className="mb-4 fw-bold">Booking Information</h5>
                <BookingForm productPrice={product.productPrice} />
              </div>
            </Col>

            
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
