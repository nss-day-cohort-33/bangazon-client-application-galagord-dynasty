import React, { useState, useEffect } from "react";

const Cart = props => {
  const [open_order, setOrder] = useState([]);

  const getOpenOrder = () => {
    fetch(`http://localhost:8000/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("bangazon_token")}`
      }
    })
      .then(response => response.json())
      .then(order => {
        console.log("order", order)
        setOrder(order);
      });
  };

  const removeProductFromOrder = (id) => {
    fetch(`http://localhost:8000/orderproducts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
      }
    }).then(() => getOpenOrder);
  };

  useEffect(getOpenOrder, []);

  return (
    <>
      <main className="order-items">
        <h2>My Cart</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around"
          }}
        >
          {open_order.map(item => {
            return item.line_items.map(item => {
              return (
                <div>
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
                        <button class="btn btn-danger" onClick={() => removeProductFromOrder()}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            });
          })}
        </div>
        <button>Add Payment to complete order</button>
      </main>
    </>
  );
};

export default Cart;
