import React, { useState, useEffect, createRef } from "react"
import { Link } from "react-router-dom";
import "./ProductList.css"

const ProductSearch = props => {
    const searchBar = createRef()
    const [products, setProducts] = useState([])

    const focusSearchInput = () => searchBar.current.focus()

    const getProducts = () => {
        fetch(`http://localhost:8000/products`, {
        method: "GET",
        headers: {
            // gives you back the format you request data
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
        }
        })
        .then(response => response.json())
        .then(setProducts)
    }

    useEffect(getProducts, [])

    return (
        <>
        <main>
        <ol>
            <form className="searchBar">
                <fieldset>
                    <label htmlFor="searchBar"> Search </label>
                <input ref={searchBar} type="text" name="searchBar" className="form-control" placeholder="Products by City..." autofocus/>
                </fieldset>
            </form>
            <div>
                {products.filter(them => {
                    if (them.location === searchBar)
                    return them })
                    .slice(-20)
                    .map(each => {
                        return<Link
                        to={`/productDetail/${each.id}`}>
                            <li>{each.name} in {each.location}</li></Link>
                    })
                }
            </div>
            </ol>
            <fieldset>
                <button onClick={focusSearchInput}>Search</button>
            </fieldset>
        </main>
        </>
    )

    }

export default ProductSearch