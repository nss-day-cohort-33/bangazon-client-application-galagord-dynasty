import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Cart = props => {
  const [open_order, setOrder] = useState([]);

  const cancelOrder = id => {
    fetch(`http://localhost:8000/orders/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("bangazon_token")}`
      }
    })
    .then(()=> {
      getOpenOrder()
    })
  };

  const getOpenOrder = () => {
    fetch(`http://localhost:8000/orders?payment=none`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("bangazon_token")}`
      }
    })
      .then(response => response.json())
      .then(order => {
        console.log("order", order);
        setOrder(order);
      });
  };

  const removeProductFromOrder = id => {
    fetch(`http://localhost:8000/orderproducts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("bangazon_token")}`
      }
    }).then(() => getOpenOrder);
  };

  useEffect(() => {
    getOpenOrder()
    cancelOrder()
  }, []);

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
                      <div class="card-text">
                        <strong>Price:</strong> ${item.price}
                      </div>
                      <br />
                      <p class="card-text">{item.description}</p>
                      <div
                        style={{
                          margin: "1em .5em 0 .5em",
                          display: "flex",
                          justifyContent: "space-between"
                        }}
                      >
                        <button
                          class="btn btn-danger"
                          onClick={() => removeProductFromOrder()}
                        >
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
        {/* <div style={{ display: "flex" }}> */}
          <Link className="nav-link" to="/orderform">
            {open_order.length > 0 ? (
              <button className="btn btn-primary">Complete Order >></button>
            ) : (
              <div
                className="alert alert-warning"
                role="alert"
                style={{ textAlign: "center" }}
              >
                You currently have no open order!
              </div>
            )}
          </Link>
          {open_order.length > 0 ? (
            <button
              className="btn btn-danger"
              style={{marginLeft: "1em"}}
              onClick={() => cancelOrder(open_order[0].id)}
            >
              Cancel Order
            </button>
          ) : null}
        {/* </div> */}
      </main>
    </>
  );
};

export default Cart;
