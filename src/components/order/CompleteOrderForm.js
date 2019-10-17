import React, { useState, useEffect, useRef } from "react";
import useModal from "../../hooks/ui/useModal";

const OrderForm = props => {
  const [open_order, setOrder] = useState([]);
  const [orderId, setOrderId] = useState("");
  const { toggleDialog, modalIsOpen } = useModal("#payment_alert");

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
    const handler = e => {
      if (e.keyCode === 27) {
        if (modalIsOpen) {
          toggleDialog(false);
        }
      }
    };

    window.addEventListener("keyup", handler);

    return () => window.removeEventListener("keyup", handler);
  }, []);

  console.log("orderId", orderId);

  return (
    <>
      {/* Complete Order Form */}
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
        {/* <form> */}
          <fieldset style={{ margin: "1em 2em 0 2em" }}>
            <label htmlFor="category"> Select Payment: </label>
            <select ref={payment_id}>
              <option value="">Select Payment</option>
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
                payment_id.current.value === ""
                  ? toggleDialog(true)
                  : completeOrder(open_order[0].id, {
                      payment_id: payment_id.current.value
                    })
              }
              className="btn btn-primary"
              style={{ margin: "1em 2em 0 2em" }}
            >
              Submit Order
            </button>
          </fieldset>
        {/* </form> */}
      </main>

      {/* Dialog Box */}
      <dialog id="payment_alert" className="payment_alert" style={{margin: "5em"}}>
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <p>Please Select a payment option for your order.</p>
          <button onClick={() => toggleDialog(false)}>Ok</button>
        </div>
        <button
          style={{
            position: "absolute",
            top: "0.25em",
            right: "0.25em"
          }}
          id="closeBtn"
          onClick={() => toggleDialog(false)}
        >
          X
        </button>
      </dialog>

    </>
  );
};

export default OrderForm;
