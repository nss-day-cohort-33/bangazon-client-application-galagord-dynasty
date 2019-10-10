import React, { useState, useEffect } from "react"

const Cart = props => {
  const [open_order, setOrder] = useState({line_items: []})

  const getOpenOrder = () => {
    fetch(`http://localhost:8000/orders?cart=true`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
      }
    })
    .then(response => {
      console.log('response', response );
      return response.json()
    })
    .then(setOrder)
  }

  useEffect(getOpenOrder, [])

  return (
    <>
      <main className="order-items">
        <h2>My Cart</h2>
        <ul>
          {
            open_order.line_items.map(item => {
                return (<li key={item.id}>{item.name}: {item.price}</li>)
              })
          }
        </ul>
        <button>Add Payment to complete order</button>
      </main>
    </>
  )
}

export default Cart
