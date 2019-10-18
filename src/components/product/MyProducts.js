import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";

// Author: Adam Knowles
// Purpose: Show all products and related information that a user has shown for sale
// Methods: GET, DELETE

const MyProductsList = props => {
  const [products, setMyProducts] = useState([])
  

  const getMyProducts = () => {
    fetch(`http://localhost:8000/products/myproducts`, {
      method: "GET",
      headers: {
        
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
      }
    })
      .then(response => response.json())
      .then(setMyProducts)
  }

  const deleteMyProducts = (id) => {
    fetch(`http://localhost:8000/products/${id}`, {
        "method": "DELETE",
        "headers": {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            
        }
    })
        .then(getMyProducts)
}

  useEffect(getMyProducts, [])

  return (
    <>
      <h2><strong>My Products to Sell</strong></h2>
      <main className="products">
        <div className="card">
          <div className="card-body">
         {products.map(product => {
          return<>
          <Link className="card-title text-info"
          to={`/productDetail/${product.id}`}>
          <h3 className="card-text">{product.name} </h3></Link>
          <div>Inventory: {(product.quantity)-(product.total_sold)}</div>
          <div>Sold: {product.total_sold}</div>
        <button className="btn btn-danger" onClick={() => {deleteMyProducts(product.id)}}>Delete</button></>
        })}
          </div>
        </div>
      </main>
    </>
  )
}

export default MyProductsList
