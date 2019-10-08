import React, { useState, useEffect } from "react"

const ProductDetail = props => {
    const [product, setProducts] = useState([])



    const getProduct = (productDetailId) => {
        fetch(`http://localhost:8000/products/${productDetailId}`, {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
            }
        })
            .then(response => response.json())
            .then((product) => {
                setProducts(product)
            })
    }

    const getCurrentOrder = (props) => {
        fetch(`http://localhost:8000/orders/1`,{
            "method": "GET",
            "headers": {
                "Accept": "application/json",
            }
        })
    }

    useEffect(() => {getProduct(props.productDetailId)}, [])
  
    return(
        <>
            <main className='productDetail'>
                <h1>{product.name}</h1>
                <h3>Price: {product.price}</h3>
                <h4>Quantity Available: {product.quantity}</h4>
                <p>Description: {product.description}</p>
                <button>Add To Order</button>
            </main>
        </>
    )
}

export default ProductDetail