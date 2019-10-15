import React, { useState, useEffect } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";

// Author: Krystal Gates
// Purpose: Show product detail

const CurrentOrder = props => {
  const [order, setOrder] = useState([]);
  const { isAuthenticated } = useSimpleAuth()

  const getCurrentOrder = props => {
    return fetch(`http://localhost:8000/orderproducts`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
      }
    })
      .then(response => response.json())
      .then(data => {
        const currentOrder = data.filter(
          filterOrder =>
            filterOrder.order.payment === null &&
            filterOrder.order.customer.url ===
              `http://localhost:8000/customers/${localStorage.getItem(
                "customer_id"
              )}`
        );
        setOrder(currentOrder);
        console.log("Here is the data", currentOrder);
      });
  };

  useEffect(() => {
    if (isAuthenticated()){
        getCurrentOrder();
    }
}, []);

  return (
    <>
      <main className="shoppingCart">
        <h1 style={{ margin: "1em 0 1em 1em" }}><strong>My Shopping Cart</strong></h1>
        {
            !isAuthenticated() ? <div class="alert alert-warning" role="alert" style={{ textAlign: "center" }}>You are not logged in. Please Login to add to your cart.</div> : null
        }
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly"
          }}
        >
          {order.map(orderitem => {
            return (
              <div class="card" style={{ margin: "2em", width: "22rem" }}>
                <div class="card-body">
                  <h2 class="card-title"><strong>{orderitem.product.name}</strong></h2>
                  <div
                    style={{
                      marginBottom: ".5em",
                      fontSize: "1.25em",
                      display: "flex",
                      justifyContent: "space-around"
                    }}
                  >
                    <div class="card-text">
                      <strong>Price:</strong> ${orderitem.product.price}
                    </div>
                    <div class="card-text">
                      <strong>QTY:</strong> {orderitem.quantity}
                    </div>
                  </div>

                  <p class="card-text">
                    {orderitem.product.description}
                  </p>
                  <div
                    style={{
                      margin: "1em .5em 0 .5em",
                      display: "flex",
                      justifyContent: "space-between"
                    }}
                  >
                    <a href="#" class="btn btn-danger">
                      Remove All
                    </a>
                    <a href="#" class="btn btn-primary">
                      Remove Single
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default CurrentOrder;
