import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";

const NavBar = props => {
  const { isAuthenticated, logout } = useSimpleAuth();
  const [order, setOrder] = useState([]);

  useEffect(() => {
      if (isAuthenticated()){
          getCurrentOrder();
      }
  }, []);

  const getCurrentOrder = props => {
    return fetch(`http://localhost:8000/orderproducts`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("bangazon_token")}`
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
      });
  };

  return (
    <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
      <div style={{ fontSize: "2em", marginLeft: "1em" }}>
        <strong>Welcome To Bangazon</strong>
      </div>
      <ul className="nav nav-pills nav-fill">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/categorylist">
            Category List
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/">
            Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/sell_product">
            Sell Product
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/myproducts">
            My Products
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/MyCart">
            <div style={{ display: "flex" }}>
              <div>My Cart</div>
              <div
                style={{
                  color: "white",
                  background: "blue",
                  borderRadius: "100%",
                  marginLeft: ".5em",
                  padding: ".1em .7em .1em .7em"
                }}
              >
                <strong>
                {order.length}
                </strong>
              </div>
            </div>
          </Link>
        </li>
        {isAuthenticated() ? (
          <li className="nav-item">
            <button
              className="nav-link fakeLink"
              onClick={() => {
                logout();
                props.history.push({
                  pathname: "/"
                });
              }}
            >
              Logout
            </button>
          </li>
        ) : (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
