import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const PaymentHistory = () => {
  const [paymentList, setPaymentList] = useState([]);

  useEffect(() => {
    getPaymentHistory();
  }, []);

  const getPaymentHistory = () => {
    axios
      .get("http://localhost:4200/fee/payment-history/", {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setPaymentList(res.data.PaymentHistory.reverse());
      })
      .catch((err) => {
        console.log(err);
        toast.error("something is wrong...");
      });
  };

  return (
    <div className="payment-history-wrapper">
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
              <td>{payment.createdAt}</td>
              <td>{payment.amount}</td>
              <td>{payment.remark}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
