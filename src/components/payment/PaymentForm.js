import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"

const PaymentForm = () => {
  const merchant_name = useRef();
  const account_number = useRef();
  const expiration_date = useRef();



  return (
    <fieldset>
      {/* <input type="button" value="Add New Card" /><br/> */}
      <label htmlFor="secure">Secure Payment Info</label><br/>
      <input type="radio" name="creditCard" id="creditCard"/>
      Mastercard Visa AMEX Discover
      <input type="radio" name="paypal" id="paypal" />
      Paypal<br/>
      <label htmlFor="cardNumber">Card Number(no dashes or spaces)</label><br/>
      <input type="string" name="cardNumber" id="cardNumber" /><br/>
      <label>Expiration Date</label><br/>
                <select>
                    <option value="01">January</option>
                    <option value="02">February </option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
                <select>
                    <option value="16"> 2019</option>
                    <option value="17"> 2020</option>
                    <option value="18"> 2021</option>
                    <option value="19"> 2022</option>
                    <option value="20"> 2023</option>
                    <option value="21"> 2024</option>
                </select>
      <br/>
      <input type="submit" value="Submit" />
    </fieldset>
  )
}

export default PaymentForm
