import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import CommonSection from '../pages/ui/CommonSection';
import CarItem from '../pages/ui/CarItem';
import Helmet from './Helmet/Helmet';
import '../pages/styles/car-listing.css'; // Import the CSS file
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [noProductsFound, setNoProductsFound] = useState(false);

  // Get products from location state
  const location = useLocation();
  const { products: initialProducts } = location.state || { products: [] };

  useEffect(() => {
    setProducts(initialProducts);
    setSortedProducts(initialProducts);
  }, [initialProducts]);

  useEffect(() => {
    // Handle sorting whenever sortOption changes
    handleSort();
  }, [sortOption]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleSort = () => {
    let sorted = [...products];

    
  };

  return (
    <Helmet title="Search Results">
      <CommonSection title="Search Results" />

      <Container>
        <Row className="align-items-center mb-4">
          
          <Col lg="12" className="text-center mb-5">
            {noProductsFound ? (
              <p>No products found.</p>
            ) : (
              sortedProducts.map(product => (
                <CarItem
                  key={product._id}
                  _id={product._id}
                  productTransmission={product.productTransmission}
                  productType={product.productType}
                  productImage={product.productImage}
                  productName={product.productName}
                  productPrice={product.productPrice}
                  productCategory={product.productCategory}
                />
              ))
            )}
          </Col>
        </Row>
      </Container>
    </Helmet>
  );
};

export default SearchResults;
