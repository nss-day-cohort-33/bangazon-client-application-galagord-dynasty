//Author: Adam Knowels and Melanie Bond
//Purpose: Allow a user to get all the Bangazon products from the database.
//Methods: GET

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ProductList.css";

// a function to give you all your products. The products variable is the state and
// use setProducts to change the state of products the variable
const ProductList = props => {
  // const [products, setProducts] = useState([]);
  //When evoked getProducts perform a fetch, server Django responds with
  // a json string, convert it to an object then send the data to setProducts. The products
  // state variable is now updated and the state of the component has been changed.

  return (
    <>
      <main
        className="products">
          {props.products.map(product => {
            return (
              <div>
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">
                      <Link className="text-info" to={`/productDetail/${product.id}`}>
                        <strong>{product.name}</strong>
                      </Link>
                    </h3>
                      <div className="card-text">
                        <strong>Price:</strong> ${product.price}
                      </div>
                      <br/>
                    <p className="card-text">{product.description}</p>
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
