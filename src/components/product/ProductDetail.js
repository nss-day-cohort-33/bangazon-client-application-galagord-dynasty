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
                console.log("Here is the data", data[0])
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

    const addProductToOrder = (props) => {
        console.log("hello")
        if (isAuthenticated()) {
            if (order !== null){
                console.log("order is open")
                console.log("This is the order id", order.id)
                console.log("product id", product.id)
                addOrderProduct({"order_id": order.id, "product_id": product.id, "quantity": 1})
                // .then(() => {
                //     props.history.push({
                //         pathname: "/MyCart",
                //       });
                // })
                
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
                {isAuthenticated() ? <button onClick={addProductToOrder}>Add To Order</button> : null}
            </main>
        </>
    )
}

export default ProductDetail