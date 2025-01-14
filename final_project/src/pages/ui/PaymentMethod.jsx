import React, { useState } from "react";
import khalti from "../../assets/icons/khalti.png";
import eSewa from "../../assets/icons/eSewa.png";
import "../styles/payment-method.css";

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    const url = "http://localhost:5000/api/orders/create";
    const data = {
      amount: 100, // Example amount, update as needed
      products: [{ product: "test", amount: 100, quantity: 1 }],
      payment_method: paymentMethod,
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
        console.log(responseData);
        if (responseData.payment_method === "esewa") {
          esewaCall(responseData.formData);
        } else if (responseData.payment_method === "khalti") {
          khaltiCall(responseData.formData);
        }
      } else {
        console.error("Failed to fetch:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  const khaltiCall = (data) => {
    window.location.href = data.payment_url;
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
    <>
      <div className="payment">
        <label htmlFor="" className="d-flex align-items-center gap-2">
          <input
            type="radio"
            name="paymentMethod"
            value="bank"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />{" "}
          Direct Bank Transfer
        </label>
      </div>

      <div className="payment mt-3">
        <label htmlFor="" className="d-flex align-items-center gap-2">
          <input
            type="radio"
            name="paymentMethod"
            value="cash"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />{" "}
          Cash on Delivery
        </label>
      </div>

      <div className="payment mt-3 d-flex align-items-center justify-content-between">
        <label htmlFor="" className="d-flex align-items-center gap-2">
          <input
            type="radio"
            name="paymentMethod"
            value="esewa"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />{" "}
          eSewa
        </label>

        <img src={eSewa} alt="eSewa" className="payment-icon" />
      </div>

      <div className="payment mt-3 d-flex align-items-center justify-content-between">
        <label htmlFor="" className="d-flex align-items-center gap-2">
          <input
            type="radio"
            name="paymentMethod"
            value="khalti"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />{" "}
          Khalti
        </label>

        <img src={khalti} alt="Khalti" className="payment-icon" />
      </div>
      <div className="payment text-end mt-5">
        <button onClick={handlePayment}>Reserve Now</button>
      </div>
    </>
  );
};

export default PaymentMethod;
