import React, { useState, useEffect } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

// Author: Krystal Gates
// Purpose: Show product detail

const ProductDetail = props => {
    const [product, setProducts] = useState([])
    const [order, setOrder] = useState([])
    const { isAuthenticated } = useSimpleAuth()


// set product and order to state
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

// get open order for current customer
    const getCurrentOrder = (props) => {
        return fetch(`http://localhost:8000/orders?customer=${localStorage.getItem("customer_id")}&payment=null`,{
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                 "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            }
        })
            .then(response => response.json())
            .then((data) => {
                setOrder(data[0])
            })
    }

// make new order for customer
    const makeNewOrder = (props) => {
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

// create orderproduct join table
    const addOrderProduct = (product) => {
        return fetch("http://localhost:8000/orderproducts", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
              },
              body: JSON.stringify(product)
            }).then(res => res.json());
    }

// checks if user is authenticated
// then checks if there is an open order
//     if there is an open order it creates join table with open order then takes you to MyCart
// if there is no open order then an order is created and a join table with the new order and product is created then takes you to MyCart

    const addProductToOrder = () => {
        if (isAuthenticated()) {
            if (order !== undefined){
                addOrderProduct({"order_id": order.id, "product_id": product.id, "quantity": 1})
                .then(() => {
                    props.history.push("/MyCart")
                })
            }
            else{
                makeNewOrder()
                .then(newOrder => {addOrderProduct({"order_id": newOrder.id, "product_id": product.id, "quantity": 1})})
                .then(() => {
                    props.history.push("/MyCart")
                })
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
                {isAuthenticated() ? <button onClick={addProductToOrder}>Add To Order</button> : null}
            </main>
        </>
    )
}

export default ProductDetail