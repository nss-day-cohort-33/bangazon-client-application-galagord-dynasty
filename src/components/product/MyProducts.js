

import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";




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
      <main className="products">
      <ol>
      {products.map(product => {
          return<><Link
          to={`/productDetail/${product.id
          }`}
          ><li>{product.name} </li></Link>
          <ul>
          <li>Current Inventory: {(product.quantity)-(product.total_sold)}</li>
          <li>Number Sold: {product.total_sold}</li>
          </ul>
          <br />
          
        <button onClick={() => {deleteMyProducts(product.id)}}>Delete</button></>
        })}
        </ol>
      </main>
    </>
  )
}

export default MyProductsList
