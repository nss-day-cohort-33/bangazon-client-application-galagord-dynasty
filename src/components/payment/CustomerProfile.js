import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"

const CustomerProfile = () => {
  //Create a state variable for customer - useState()
  //user is needed because the second obj is nested and react is looking for the nested
  // obj on the first render
  const [customer, setCustomerProfile] = useState({ user: {} })

  const getCustomer = () => {
    fetch(
      `http://localhost:8000/customers/${localStorage.getItem("customer_id")}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        console.log("this is my data", data)
        setCustomerProfile(data)
      })
  }

  //Create useEffect()
  useEffect(getCustomer, [])

  //Create HTML representation with JSX

  return (
    <main>
      <div>
        <h3>{"Name: "}{customer.user.first_name} {customer.user.last_name}</h3>
        <h3>{"Address: "}{customer.address}</h3>
        <h3>{"Phone Number: "}{customer.phone_number}</h3>
      </div>
      <div>
        <a href="./PaymentForm">Add New Card</a>
      </div>
    </main>
  )
}

export default CustomerProfile
