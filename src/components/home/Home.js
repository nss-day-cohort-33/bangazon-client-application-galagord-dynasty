import React, { useEffect, useState, useRef } from "react";
import ProductList from "./ProductList";
import "./ProductList.css"

const Home = props => {
    const [products, setProducts] = useState([])
    const searchBar = useRef()

    const getProducts = () => {
    fetch(`http://localhost:8000/products`, {
        method: "GET",
        headers: {
            // gives you back the format you request data
            "Accept": "application/json",
            }
        })
        .then(response => response.json())
        .then(setProducts)
    }

    const filterByLocation = (location) => {
    fetch(`http://localhost:8000/products?location=${location}`, {
        method: "Get",
        headers: {
        Accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(setProducts)
    }
    useEffect(getProducts, [])
    useEffect(() => filterByLocation, [])

    const SearchSubmitButton = event => {
        event.preventDefault()
        console.log("the button submitted")
        filterByLocation(searchBar.current.value)
    }

    return (
        <>
        <main className="explorer">
            <label name="location-of-product">Filter all products by location:</label>
            <br></br>
            <form onSubmit={SearchSubmitButton}>
                <input placeholder="Type in a city name..."
                autofocus
                name="location-of-product"
                defaultValue=""
                ref={searchBar}
                type="text">
                </input>
                <button type="submit">Submit</button>
            </form>
            <h5><ProductList {...props} products={products} /></h5>
        </main>
        </>
    )
}

export default Home