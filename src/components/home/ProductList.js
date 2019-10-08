//Author: Misty M. DeRamus
//Purpose: Allow a user to get all the Bangazon products from the database.
//Methods: GET

import React, { useState, useEffect, useRef } from "react"
// import ProductList from "./ProductList"
import "./ProductList.css"

// a function to give you all your products. The products variable is the state and
// use setProducts to change the state of products the variable
const ProductList = props => {
  const [products, setProducts] = useState([])
  //When evoked getProducts perform a fetch, server Django responds with
  // a json string, convert it to an object then send the data to setProducts. The products
  // state variable is now updated and the state of the component has been changed.

  const getProducts = () => {
    fetch(`http://localhost:8000/products`, {
      method: "GET",
      headers: {
        // gives you back the format you request data
        Accept: "application/json",
      }
    })
      .then(response => response.json())
      .then(setProducts)
  }

  useEffect(getProducts, [])

  return (
    <>
      <main className="products">
      <ol>
      {products.map(product => {
            return<li><a href="url"
            onClick={() => props.getProducts(product.id)}>{product.name}</a></li>
          })}
        </ol>
      </main>
    </>
  )
}

export default ProductList
