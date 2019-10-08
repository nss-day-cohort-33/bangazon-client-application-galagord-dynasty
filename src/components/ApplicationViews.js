import { Route } from "react-router-dom"
import React from "react"
import { withRouter } from "react-router-dom"
import Register from "./auth/Register"
import Login from "./auth/Login"
import ProductDetail from "./product/ProductDetail"
import ProductList from "./home/ProductList"

const ApplicationViews = () => {
    return (
        <React.Fragment>

            {/* {<Route
                exact path="/" render={props => {
                    return <HOME COMPONENT HERE />
                }}
            /> } */}

            <Route
                path="/register" render={props => {
                    return <Register {...props} />
                }}
            />

            <Route
                path="/login" render={props => {
                    return <Login {...props} />
                }}
            />
            <Route
                path="/productDetail/:productDetailId(\d+)" render={props => {
                    return <ProductDetail {...props} />
                }}
            />
            <Route
                path="/MyCart" render={props => {
                    return <ProductDetail {...props} />
                }}
            />
            <Route
                path="/products" render={props => {
                    return (
                        <>
                            <h1>PRODUCTS</h1>
                            <ProductList {...props}/>
                        </>
                    )
                }}
            />
        </React.Fragment>
    )
}

export default withRouter(ApplicationViews)