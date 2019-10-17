//Author: Karla Gallegos
//Purpose: Allows get and view all payment options posted
//Methods: GET PAYMENT OPTIONS

import React, { useEffect, useState } from "react";
import DeletePayment from "./DeletePayment";

const PaymentOptions = props => {
  const [paymenttypes, setPaymenttypes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/payments", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("bangazon_token")}`
      }
    })
      .then(res => res.json())
      .then(setPaymenttypes);
  }, []);

  return (
    <>
      <main className="explorer">
        <section className="product">
          {paymenttypes.map(payment => (
            <DeletePayment key={payment.id} payment={payment} {...props} />
          ))}
        </section>
      </main>
    </>
  );
};

export default PaymentOptions;
