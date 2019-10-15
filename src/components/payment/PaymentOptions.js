
import React, { useEffect, useState } from "react";
import DeletePayment from "./DeletePayment"


const PaymentOptions = props => {
  const [paymenttypes, setPaymenttypes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/payments", {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(setPaymenttypes);
  }, []);


  return (
    <>
      <main className="explorer">

      <section className="product">
                {
                    paymenttypes.map(payment =>
                        <DeletePayment key={payment.id}
                            payment={payment} {...props} />)
                }
      </section>

      </main>
    </>
  );
};

export default PaymentOptions
