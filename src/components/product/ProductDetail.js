import React, { useState, useEffect } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

// Author: Krystal Gates
// Purpose: Show product detail

const ProductDetail = props => {
    const [product, setProducts] = useState([])
    const [order, setOrder] = useState([])
    const { isAuthenticated } = useSimpleAuth()



    const setProductAndOrder = (productDetailId) => {
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
            getCurrentOrder()
    }

    const getCurrentOrder = (props) => {
        fetch(`http://localhost:8000/orders?customer=${localStorage.getItem("customer_id")}&payment_id=null`,{
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                 "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            }
        })
            .then(response => response.json())
            .then((data) => {
                setOrder(data)
                console.log("data", data)
            })
    }

    const makeNewOrder = (props) => {
        console.log("make new order")
        return fetch("http://localhost:8000/orders", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
              },
              body: JSON.stringify({"customer_id": `${localStorage.getItem(`customer_id`)}`})
            }).then(res => res.json());

    }

    const addOrderProduct = (props) => {
        return fetch("http://localhost:8000/orderproducts", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
              },
              body: JSON.stringify({"customer_id": `${localStorage.getItem(`customer_id`)}`})
            }).then(res => res.json());
    }

    const addProductToOrder = (props) => {
        console.log("hello")
        if (isAuthenticated()) {
            if (order !== null){
                console.log("order is open")
                console.log("order id", order)
                console.log("product id", product.id)
                addOrderProduct({"order": `${order.id}`, "product": `${product.id}`, "quantity": 1})
            }
            else{
                console.log("no order")
                // makeNewOrder()
                // .then(addOrderProduct())
            }
        }
        else{
            alert("You are not logged in!")
        }
    }

    useEffect(() => {setProductAndOrder(props.productDetailId)}, [])

    return(
        <>
            <main className='productDetail'>
                <h1>{product.name}</h1>
                <h3>Price: {product.price}</h3>
                <h4>Quantity Available: {product.quantity}</h4>
                <p>Description: {product.description}</p>
                <button onClick={addProductToOrder}>Add To Order</button>
            </main>
        </>
    )
}

export default ProductDetail