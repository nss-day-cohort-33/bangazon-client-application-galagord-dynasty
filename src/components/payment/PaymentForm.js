

import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"


const PaymentForm = props => {
  const merchant_name = useRef();
  const account_number = useRef();
  const exp_date = useRef();
  const created_at = useRef();
  const { isAuthenticated } = useSimpleAuth();

  const createPayment = e => {
      e.preventDefault();
      const created = `${exp_date.current.value}-01`
      if (isAuthenticated()) {
          fetch(`http://localhost:8000/paymenttypes`, {
              "method": "POST",
              "headers": {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
              },
              "body": JSON.stringify({
              "merchant_name": merchant_name.current.value,
              "account_number": account_number.current.value,
              "exp_date": exp_date.current.value,
              "created_at": created

          })
          })
              .then(response => response.json())
              .then(() => {
              props.history.push("/mysettings")
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
        <label htmlFor="exp_date">Expiration Date:</label>
        <input type="date" ref={exp_date} name="exp_date" min={new Date()} required></input>
      </fieldset>
      <input type="date" ref={created_at} name="exp_date" defaultValue={new Date()} hidden></input>
      <button type="submit">Add Payment</button>
    </form>
  </>
)
}

export default PaymentForm




//Misty's code below

// const PaymentForm = () => {
//   const merchant_name = useRef();
//   const account_number = useRef();
//   const expiration_date = useRef();


//   return (
//     <fieldset>
//       {/* <input type="button" value="Add New Card" /><br/> */}
//       <label htmlFor="secure">Secure Payment Info</label><br/>
//       <input type="radio" name="creditCard" id="creditCard"/>
//       Mastercard Visa AMEX Discover
//       <input type="radio" name="paypal" id="paypal" />
//       Paypal<br/>
//       <label htmlFor="cardNumber">Card Number(no dashes or spaces)</label><br/>
//       <input type="string" name="cardNumber" id="cardNumber" /><br/>
//       <label>Expiration Date</label><br/>
//                 <select>
//                     <option value="01">January</option>
//                     <option value="02">February </option>
//                     <option value="03">March</option>
//                     <option value="04">April</option>
//                     <option value="05">May</option>
//                     <option value="06">June</option>
//                     <option value="07">July</option>
//                     <option value="08">August</option>
//                     <option value="09">September</option>
//                     <option value="10">October</option>
//                     <option value="11">November</option>
//                     <option value="12">December</option>
//                 </select>
//                 <select>
//                     <option value="16"> 2019</option>
//                     <option value="17"> 2020</option>
//                     <option value="18"> 2021</option>
//                     <option value="19"> 2022</option>
//                     <option value="20"> 2023</option>
//                     <option value="21"> 2024</option>
//                 </select>
//       <br/>
//       <input type="submit" value="Submit" />
//     </fieldset>
//   )
// }


