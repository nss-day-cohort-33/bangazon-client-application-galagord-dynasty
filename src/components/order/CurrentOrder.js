import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./Cart.css"

const Cart = props => {
  const [order, setOrder] = useState({products:[]})

  const getOpenOrder = () => {
    fetch(`http://localhost:8000/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("bangazon_token")}`
      }
    })
      .then(response => response.json())
      .then(setOrder)
  }

  const removeProductFromOrder = id => {
    fetch(`http://localhost:8000/cart/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("bangazon_token")}`
      }
    }).then(getOpenOrder)
  }

  useEffect(() => {
    getOpenOrder()
  }, [])

  return (
    <>
      <main className="cart">

        <header>
            <h2 className="cart__header">Your Current Order</h2>
        </header>

        <article className="cart__items">
          {order.products.map(item => {
              return (
                <section key={item.id} className="cart__lineitem">
                  <div className="card" style={{ margin: "2em", width: "22rem" }}>
                    <div className="card-body">
                      <h2 className="card-title">
                        <strong>{item.name}</strong>
                      </h2>
                      <div className="card-text">
                        <strong>Price:</strong> ${item.price}
                      </div>
                      <br />
                      <p className="card-text">{item.description}</p>
                      <div
                        style={{
                          margin: "1em .5em 0 .5em",
                          display: "flex",
                          justifyContent: "space-between"
                        }}
                      >
                        <button
                          className="btn btn--delete"
                          onClick={() => removeProductFromOrder(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              )
          })}
        </article>
        <Link className="nav-link" to="/orderform">
          {order.products.length > 0 ? (
            <button className="btn btn-primary">Complete Order >></button>
          ) : (
            <div className="alert alert-warning" role="alert" style={{textAlign: "center"}}>
              You currently have no open order!
            </div>
          )}
        </Link>
      </main>
    </>
  )
}

export default Cart
