import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";

const NavBar = props => {
  const { isAuthenticated, logout } = useSimpleAuth();
  const [order, setOrder] = useState([]);

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
        {isAuthenticated() ? (
        <li>
          <Link className="nav-link" to="/profile">
            Profile
          </Link>
        </li>
        ) : null }
        {isAuthenticated() ? (
        <li className="nav-item">
          <Link className="nav-link" to="/sell_product">
            Sell Product
          </Link>
        </li>
        ) : null }
        {isAuthenticated() ? (
        <li className="nav-item">
          <Link className="nav-link" to="/MyCart">
              My Cart
          </Link>
        </li>
        ) : null}
        {isAuthenticated() ? (
          <li className="nav-item">
            <Link className="nav-link"
            onClick={() => localStorage.clear()} to="/">
              Logout
            </Link>
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
