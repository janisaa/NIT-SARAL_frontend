import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PaymentHistory = () => {
  const [paymentList, setPaymentList] = useState([]);

  useEffect(() => {
    getPaymentHistory();
  }, []);

  const getPaymentHistory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4200/fee/payment-history/",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      console.log("API Response:", response.data);

      // Check if response contains PaymentHistory and it's an array
      if (
        response.data.PaymentHistory &&
        Array.isArray(response.data.PaymentHistory)
      ) {
        setPaymentList(response.data.PaymentHistory.reverse());
      } else {
        setPaymentList([]); // Set empty array if undefined
        console.warn("PaymentHistory not found in response.");
      }
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);

      if (error.response?.status === 401) {
        toast.error("Unauthorized! Please log in again.");
      } else if (error.response?.status === 404) {
        toast.error("Payment history not found.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="payment-history-wrapper">
      <h2>Payment History</h2>
      {paymentList.length === 0 ? (
        <p>No payment history available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Student's Name</th>
              <th>Date and Time</th>
              <th>Amount</th>
              <th>Remark</th>
            </tr>
          </thead>
          <tbody>
            {paymentList.map((payment) => (
              <tr key={payment._id}>
                <td>{payment.fullName}</td>
                <td>{new Date(payment.createdAt).toLocaleString()}</td>
                <td>{payment.amount}</td>
                <td>{payment.remark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentHistory;
