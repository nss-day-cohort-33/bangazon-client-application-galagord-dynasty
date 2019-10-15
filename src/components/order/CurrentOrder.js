import React, { useState, useEffect } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";

const Cart = props => {
  const [open_order, setOrder] = useState([]);
  const { isAuthenticated } = useSimpleAuth();

  const getOpenOrder = productDetailId => {
    fetch(
      `http://localhost:8000/orders?customer=${localStorage.getItem(
        "customer_id"
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Token ${localStorage.getItem("bangazon_token")}`
        }
      }
    )
      .then(response => response.json())
      .then(order => {
        console.log("order", order);
        setOrder(order);
      });
  };

  // const getOpenOrder = () => {
  //   fetch(
  //     `http://localhost:8000/orders?customer=${localStorage.getItem(
  //       "customer_id"
  //     )}`,
  //     {
  //       method: "GET",
  //       headers: {
  // "Content-Type": "application/json",
  // Accept: "application/json",
  // Authorization: `Token ${localStorage.getItem("bangazon_token")}`
  //       }
  //     }
  //   )
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(setOrder);
  // };
  console.log("StateOrder", open_order);

  useEffect(getOpenOrder, []);

  return (
    <>
      <main className="order-items">
        <h2>My Cart</h2>
          {open_order.map(item => {
            return item.line_items.map(item => {
              return (
                <div style={{display: "flex",flexDirection:"row", justifyContent: "space-between"}}>
                <div class="card" style={{ margin: "2em", width: "22rem" }}>
                  <div class="card-body">
                    <h2 class="card-title">
                      <strong>{item.name}</strong>
                    </h2>
                    <div
                      style={{
                        marginBottom: ".5em",
                        fontSize: "1.25em",
                        display: "flex",
                        justifyContent: "space-around"
                      }}
                    >
                      <div class="card-text">
                        <strong>Price:</strong> ${item.price}
                      </div>
                    </div>

                    <p class="card-text">{item.description}</p>
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
                    </div>
                  </div>
                </div>
                </div>
              );
            });
          })}
        <button>Add Payment to complete order</button>
      </main>
    </>
  );
};

export default Cart;
