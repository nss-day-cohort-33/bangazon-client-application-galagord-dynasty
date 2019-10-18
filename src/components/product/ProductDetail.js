import React, { useState, useEffect } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";


// Author: Krystal Gates
// Purpose: Show product detail

const ProductDetail = props => {
    const [product, setProducts] = useState([]);
    const { isAuthenticated } = useSimpleAuth();
    const [confirmation, setConfirmation] = useState("");

    const getProduct = productDetailId => {
        fetch(`http://localhost:8000/products/${productDetailId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            }
        })
            .then(response => response.json())
            .then(product => {
                setProducts(product);
            });
    };

    useEffect(() => {
        getProduct(props.productDetailId);
    }, [props.productDetailId]);

    // Only need to send the product id to Django app. The rest of the process will be handled on the server side
    const addToOrder = () => {
        fetch(`http://localhost:8000/cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Token ${localStorage.getItem("bangazon_token")}`
            },
            body: JSON.stringify({ "product_id": product.id })
        }).then(() => {
            setConfirmation("Product added to cart");
            setTimeout(() => {
                setConfirmation("");
            }, 2000);
        });
    };

    return (
        <>
            <main className="productDetail">
                {console.log("Product", product)}
                <h1>{product.name}</h1>
                <h3>Price: {product.price}</h3>
                <h4>Quantity Available: {product.quantity}</h4>
                <p>Description: {product.description}</p>
                {isAuthenticated() ? (
                    <button onClick={addToOrder}>Add To Order</button>
                ) : null}
                <h4 className="orderConfirmation">{confirmation}</h4>
            </main>
        </>
    );
};

export default ProductDetail;