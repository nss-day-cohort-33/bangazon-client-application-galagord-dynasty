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
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
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
    <>
    <main>
      <div>
        <h4>{"Name: "}{customer.user.first_name} {customer.user.last_name}</h4>
        <h4>{"Address: "}{customer.address}</h4>
        <h4>{"Phone Number: "}{customer.phone_number}</h4>
      </div>
      <section className="product">
                <Link className="nav-link" to={`./PaymentForm`}>
                    <h5>Add a Payment</h5>
                </Link>
                <Link className="nav-link" to={`./PaymentList`}>
                    <h5>Payment Options</h5>
                </Link>
            </section>
    </main>
    </>
  )
}

export default CustomerProfile
