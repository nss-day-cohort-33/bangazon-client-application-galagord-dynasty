//Author: Misty M. DeRamus
//Purpose: Allow a user to get all the Bangazon products from the database.
//Methods: GET

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ProductList.css";
import { reverse } from "dns";

// a function to give you all your products. The products variable is the state and
// use setProducts to change the state of products the variable
const ProductList = props => {
  const [products, setProducts] = useState([]);
  //When evoked getProducts perform a fetch, server Django responds with
  // a json string, convert it to an object then send the data to setProducts. The products
  // state variable is now updated and the state of the component has been changed.

  const getProducts = () => {
    fetch(`http://localhost:8000/products`, {
      method: "GET",
      headers: {
        // gives you back the format you request data
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("bangazon_token")}`
      }
    })
      .then(response => response.json())
      .then(setProducts);
  };

  useEffect(getProducts, []);

  return (
    <>
      <main
        className="products"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around"
        }}
      >
          {products.slice(-20).map(product => {
            return (
              <div>
                <div class="card" style={{ margin: "2em", width: "22rem" }}>
                  <div class="card-body">
                    <h2 class="card-title">
                      <Link to={`/productDetail/${product.id}`}>
                        <strong>{product.name}</strong>
                      </Link>
                    </h2>
                      <div class="card-text">
                        <strong>Price:</strong> ${product.price}
                      </div>
                      <br/>
                    <p class="card-text">{product.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </main>
    </>
  );
};

export default ProductList;
