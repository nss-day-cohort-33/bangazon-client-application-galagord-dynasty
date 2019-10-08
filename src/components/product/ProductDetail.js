import React, { useState, useEffect } from "react"

const ProductDetail = props => {
    const [products, setProducts] = useState([])

    const productDetailId = this.props.match.params.productId

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

    useEffect(getProduct(productDetailId), [])
    console.log(products)
    return(
        <>
            <main className='productDetail'>
                <h1>{products.name}</h1>
                <h3>Price: {products.price}</h3>
                <h4>Quantity Available: {products.quantity}</h4>
                <p>Description: {products.description}</p>
                <button>Add To Order</button>
            </main>
        </>
    )
}

export default ProductDetail