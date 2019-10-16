

import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"


const PaymentForm = props => {
  const merchant_name = useRef();
  const account_number = useRef();
  const expiration_date = useRef();
  const { isAuthenticated } = useSimpleAuth();

  const createPayment = e => {
      e.preventDefault();
      const created = `${expiration_date.current.value}-01`
      if (isAuthenticated()) {
          fetch(`http://localhost:8000/payments`, {
              "method": "POST",
              "headers": {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
              },
              "body": JSON.stringify({
              "merchant_name": merchant_name.current.value,
              "account_number": account_number.current.value,
              "expiration_date": expiration_date.current.value

          })
          })
              .then(response => response.json())
              .then(() => {
              props.history.push("/profile")
              })

      }
  }


return (
  <>
    <h1>Create a Payment Option</h1>
    <form className="categoryList" onSubmit={
      createPayment
    }>
    <fieldset>
          <label htmlFor="merchant_name">Merchant Name:</label>
          <input type="text" ref={merchant_name} name="merchant_name" required></input>
        </fieldset>

        <fieldset>
          <label htmlFor="account_number">Account Number:</label>
          <input type="text" ref={account_number} name="account_number" required></input>
        </fieldset>

        <fieldset>
        <fieldset>
          <label htmlFor="expiration_date">Expiration Date:</label>
          <input type="date" ref={expiration_date} name="expiration_date" min={new Date()} required></input>
        </fieldset>
                </fieldset>
      <br/>


        <button type="submit">Add Payment</button>
      </form>
  </>

)
}

export default PaymentForm
