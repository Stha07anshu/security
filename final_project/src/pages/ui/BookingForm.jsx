import React, { useState } from "react";
import axios from "axios";
import { Form, FormGroup, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from "reactstrap";
import { toast } from 'react-toastify';
import "../styles/booking-form.css";

const BookingForm = ({productPrice}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    fromAddress: "",
    toAddress: "",
    persons: "1 Person",
    luggage: "1 luggage",
    journeyDate: "",
    journeyTime: "",
    notes: ""
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("esewa");

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://localhost:5000/api/reservations/create", formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      toast.success("Reservation created successfully!");
      console.log(response.data);

      // Reset form data after submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        fromAddress: "",
        toAddress: "",
        persons: "1 Person",
        luggage: "1 luggage",
        journeyDate: "",
        journeyTime: "",
        notes: ""
      });

      // Show payment options modal
      toggleModal();
    } catch (error) {
      toast.error("Failed to create reservation. Please try again.");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePayment = async () => {
    const payment_method = selectedPaymentMethod;
    const url = "http://localhost:5000/api/esewa/create";
    const data = {
      amount: productPrice,
      products: [{ product: "test", amount: 100, quantity: 1 }],
      payment_method,
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const responseData = await response.json();
        esewaCall(responseData.formData);
      } else {
        console.error("Failed to fetch:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  const esewaCall = (formData) => {
    var path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (var key in formData) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", formData[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div>
      <Form onSubmit={submitHandler}>
        <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <Input 
            type="text" 
            placeholder="First Name" 
            name="firstName" 
            value={formData.firstName} 
            onChange={handleChange} 
            required
          />
        </FormGroup>
        <FormGroup className="booking__form d-inline-block ms-1 mb-4">
          <Input 
            type="text" 
            placeholder="Last Name" 
            name="lastName" 
            value={formData.lastName} 
            onChange={handleChange} 
            required
          />
        </FormGroup>

        <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <Input 
            type="email" 
            placeholder="Email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required
          />
        </FormGroup>
        <FormGroup className="booking__form d-inline-block ms-1 mb-4">
          <Input 
            type="number" 
            placeholder="Phone Number" 
            name="phoneNumber" 
            value={formData.phoneNumber} 
            onChange={handleChange} 
            required
          />
        </FormGroup>

        <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <Input 
            type="text" 
            placeholder="From Address" 
            name="fromAddress" 
            value={formData.fromAddress} 
            onChange={handleChange} 
            required
          />
        </FormGroup>
        <FormGroup className="booking__form d-inline-block ms-1 mb-4">
          <Input 
            type="text" 
            placeholder="To Address" 
            name="toAddress" 
            value={formData.toAddress} 
            onChange={handleChange} 
            required
          />
        </FormGroup>

        <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <Input 
            type="select" 
            name="persons" 
            value={formData.persons} 
            onChange={handleChange}
            required
          >
            <option value="1 Person">1 Person</option>
            <option value="2 Person">2 Person</option>
            <option value="3 Person">3 Person</option>
            <option value="4 Person">4 Person</option>
            <option value="5+ Person">5+ Person</option>
          </Input>
        </FormGroup>
        <FormGroup className="booking__form d-inline-block ms-1 mb-4">
          <Input 
            type="select" 
            name="luggage" 
            value={formData.luggage} 
            onChange={handleChange}
            required
          >
            <option value="1 luggage">1 luggage</option>
            <option value="2 luggage">2 luggage</option>
            <option value="3 luggage">3 luggage</option>
            <option value="4 luggage">4 luggage</option>
            <option value="5+ luggage">5+ luggage</option>
          </Input>
        </FormGroup>

        <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <Input 
            type="date" 
            placeholder="Journey Date" 
            name="journeyDate" 
            value={formData.journeyDate} 
            onChange={handleChange} 
            required
          />
        </FormGroup>
        <FormGroup className="booking__form d-inline-block ms-1 mb-4">
          <Input
            type="time"
            placeholder="Journey Time"
            name="journeyTime"
            value={formData.journeyTime}
            onChange={handleChange}
            required
            className="time__picker"
          />
        </FormGroup>

        <FormGroup>
          <Input
            type="textarea"
            rows={5}
            className="textarea"
            placeholder="Write any notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </FormGroup>
        <div className="payment text-end mt-5">
        <Button type="submit">Reserve Now</Button>
      </div>
        {/* <Button type="submit">Submit</Button> */}
      </Form>

      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Select Payment Method</ModalHeader>
        <ModalBody>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="paymentMethod"
                value="esewa"
                checked={selectedPaymentMethod === "esewa"}
                onChange={() => setSelectedPaymentMethod("esewa")}
              />
              Pay via eSewa
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={selectedPaymentMethod === "cash"}
                onChange={() => setSelectedPaymentMethod("cash")}
              />
              Cash on Delivery
            </Label>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handlePayment}>
            Proceed to Pay
          </Button>{' '}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default BookingForm;
