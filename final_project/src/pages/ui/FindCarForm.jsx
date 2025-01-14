import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/find-car-form.css';
import { Form, FormGroup, Navbar } from 'reactstrap';
import { bookCar } from '../../api/Api'; // Assuming your API functions are in ../api/Api.js

const BookCarForm = () => {
  const [formData, setFormData] = useState({
    fromAddress: '',
    toAddress: '',
    journeyDate: '',
    journeyTime: '',
    carType: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await bookCar(formData);
      console.log('Success:', data);
      toast.success('Booking successful!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to book car. Please try again.');
    }
  };

  return (
    <>
      <ToastContainer />
      <Form className="form" onSubmit={handleSubmit}>
        <Navbar />
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <FormGroup className="form__group">
            <input
              type="text"
              name="fromAddress"
              placeholder="From address"
              required
              value={formData.fromAddress}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup className="form__group">
            <input
              type="text"
              name="toAddress"
              placeholder="To address"
              required
              value={formData.toAddress}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup className="form__group">
            <input
              type="date"
              name="journeyDate"
              placeholder="Journey date"
              required
              value={formData.journeyDate}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup className="form__group">
            <input
              className="journey__time"
              type="time"
              name="journeyTime"
              placeholder="Journey time"
              required
              value={formData.journeyTime}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup className="select__group">
            <select
              name="carType"
              required
              value={formData.carType}
              onChange={handleChange}
            >
              <option value="" disabled>
                --Select--
              </option>
              <option value="suv">SUV</option>
              <option value="pickUpTruck">Pick Up Truck</option>
              <option value="4wd">4WD</option>
              <option value="hatchback">HatchBack</option>
              <option value="sedan">Sedan</option>
            </select>
          </FormGroup>

          <FormGroup className="form__group">
            <button type="submit" className="btn book__car-btn">
              Book Now
            </button>
          </FormGroup>
        </div>
      </Form>
    </>
  );
};

export default BookCarForm;