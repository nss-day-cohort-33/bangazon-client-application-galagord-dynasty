//Author: Karla Gallegos
//Purpose: Allows user to view and delete the payment types added
//Methods: Delete (SOFT DELETE)

import React from "react";
import { Link } from "react-router-dom";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";

const Payment = props => {
  const { isAuthenticated } = useSimpleAuth();

  const deleteItem = paymentOption => {
    if (isAuthenticated())
      fetch(`http://localhost:8000/payments/${paymentOption}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("bangazon_token")}`
        }
      }).then(() => {
        props.history.push("/profile");
      });
  };

  return (
    <>
      <section className="payment">
        <h4>{props.payment.merchant_name}</h4>
        <button
          onClick={() => {
            deleteItem(props.payment.id);
          }}
        >
          Delete
        </button>
      </section>
    </>
  );
};

export default Payment;
