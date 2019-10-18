//Author: Karla Gallegos
//Purpose: Allows user to get customer profile and hyperlinks to add payment time and view payment types
//Methods: GET CUSTOMER

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";

const CustomerProfile = () => {
  //Create a state variable for customer - useState()
  //user is needed because the second obj is nested and react is looking for the nested
  // obj on the first render
  const [customer, setCustomerProfile] = useState({ user: {} });
  const { isAuthenticated } = useSimpleAuth();

  const getCustomer = () => {
    if (isAuthenticated())
      fetch(`http://localhost:8000/customers/one_customer`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Token ${localStorage.getItem("bangazon_token")}`
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setCustomerProfile(data);
        });
  };

  //Create useEffect()
  useEffect(getCustomer, []);

  //Create HTML representation with JSX

  return (
    <>
      <main>
        <div className="card">
          <div className="card-body">
          <h4 className="card-title">
            {"Name: "}
            {customer.user.first_name} {customer.user.last_name}
          </h4>
          <h4 className="card-text">
            {"Address: "}
            {customer.address}
          </h4>
          <h4 className="card-text">
            {"Phone Number: "}
            {customer.phone_number}
          </h4>
        <section className="product">
          <Link className="nav-link text-info" to={`./PaymentForm`}>
            <h5>Add New Payment</h5>
          </Link>
          <Link className="nav-link text-info" to={`./PaymentList`}>
            <h5>Payment Options</h5>
          </Link>
        </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default CustomerProfile;