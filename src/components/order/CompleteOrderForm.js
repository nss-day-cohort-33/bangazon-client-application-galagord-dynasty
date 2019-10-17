import React, { useState, useEffect, useRef } from "react";

const OrderForm = props => {
  const [open_order, setOrder] = useState([]);
  const [orderId, setOrderId] = useState("");

  const [paymentList, setPaymentList] = useState([]);

  const payment_id = useRef();

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
        setOrder(order);
      });
  };

  const getPayments = () => {
    // Fetch the data from localhost:8000/categories
    fetch("http://localhost:8000/payments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("bangazon_token")}`
      }
    })
      .then(response => response.json())
      .then(allPayments => {
        setPaymentList(allPayments);
      });
  };

  const completeOrder = (id, newdata) => {
    fetch(`http://localhost:8000/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("bangazon_token")}`
      },
      body: JSON.stringify(newdata)
    }).then(() => {
      props.history.push({
        pathname: "/MyCart"
      });
    });
  };

  useEffect(() => {
    getOpenOrder();
    getPayments();
  }, []);

  console.log("orderId", orderId);

  return (
    <>
      <main className="order-items">
        <h2>Order Summary</h2>
        <div className="card" style={{ margin: "2em", width: "40rem" }}>
          <div className="card-body">
            <div className="card-title">
              <h4>Order Items</h4>
            </div>
            <ul>
              <div className="card-text">
                {open_order.map(item => {
                  return item.line_items.map(item => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between"
                        }}
                      >
                        <h5>{item.name}</h5>
                        <div>...............${item.price}</div>
                      </div>
                    );
                  });
                })}
              </div>
            </ul>
          </div>
        </div>
        <form>
          <fieldset style={{ margin: "1em 2em 0 2em" }}>
            <label htmlFor="category"> Select Payment: </label>
            <select ref={payment_id}>
              <option value="">Select Category</option>
              {paymentList.map(payment => {
                return (
                  <option value={payment.id}>{payment.merchant_name}</option>
                );
              })}
            </select>
          </fieldset>
          <fieldset>
            <button
              onClick={() =>
                completeOrder(open_order[0].id, { payment_id: payment_id.current.value })
              }
              className="btn btn-primary"
              style={{ margin: "1em 2em 0 2em" }}
            >
              Submit Order
            </button>
          </fieldset>
        </form>
      </main>
    </>
  );
};

export default OrderForm;
