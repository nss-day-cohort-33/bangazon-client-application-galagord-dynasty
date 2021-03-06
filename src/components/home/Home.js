import React, { useEffect, useState, useRef } from "react";
import ProductList from "./ProductList";
import "./ProductList.css"

//Author: Melanie
//Purpose: to render the search bar and all the products on the home page.

const Home = props => {
    const [products, setProducts] = useState([])
    const searchBar = useRef()

    const getProducts = () => {
    fetch(`http://localhost:8000/products?limit=20`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            }
        })
        .then(response => response.json())
        .then(setProducts)
    }

    const filterByLocation = (location) => {
    fetch(`http://localhost:8000/products?location=${location}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
      }
    })
      .then(response => response.json())
      .then(setProducts)
    }
    
    useEffect(() => {
        getProducts()
        filterByLocation() }, [])
        
    const SearchSubmitButton = event => {
        event.preventDefault()
        console.log("the button submitted")
        filterByLocation(searchBar.current.value.toLowerCase())
    }
    
    return (
        <>
        <main className="explorer">
        <h2><strong>Products</strong></h2>
            <div className="search-by-location">Search for Products by City:</div>
            <form className="search-by-location" onSubmit={SearchSubmitButton}>
                <input placeholder=""
                autofocus
                defaultValue=""
                ref={searchBar}
                type="text">
                </input>
                
            </form>
            <h5><ProductList {...props} products={products} /></h5>
        </main>
        </>
    )
}

export default Home