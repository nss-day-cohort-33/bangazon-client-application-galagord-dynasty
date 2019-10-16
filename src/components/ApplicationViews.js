import { Route } from "react-router-dom"
import React from "react"
import { withRouter } from "react-router-dom"
import Register from "./auth/Register"
import Login from "./auth/Login"
import ProductDetail from "./product/ProductDetail"
import ProductForm from "./product/ProductForm"
import CategoryList from "./category/CategoryList"
import ProductList from "./home/ProductList"
import ProductSearch from "./home/ProductSearch"
import CurrentOrder from "./order/CurrentOrder"
import CategoryDetail from "./category/CategoryDetail"
import CustomerProfile from "./payment/CustomerProfile"
import PaymentForm from "./payment/PaymentForm"
import useSimpleAuth from "../hooks/ui/useSimpleAuth"


const ApplicationViews = () => {
    const { isAuthenticated } = useSimpleAuth();
    return (
        <React.Fragment>

            {<Route
                exact path="/" render={props => {
                    return (
                        <>
                            <h2>Products</h2>
                            <ProductSearch {...props}/>
                        </>
                    )
                }}
            /> }
            {isAuthenticated() ? (
            <Route
                path="/sell_product" render={props => {
                    return <ProductForm {...props} />
                }}
            />
            ) : null}
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
                    const productId = +props.match.params.productDetailId
                    return <ProductDetail {...props} productDetailId={productId} />
                }}
            />

            <Route
                path="/categoryDetail/:categoryDetailId(\d+)" render={props => {
                    const categoryId = +props.match.params.categoryDetailId
                    return <CategoryDetail {...props} categoryDetailId={categoryId} />
                }}
            />
            {isAuthenticated() ? (
            <Route
                path="/MyCart" render={props => {
                    return <CurrentOrder {...props} />
                }}
            />
            ) : null }
            <Route
                path="/categorylist" render={props => {
                    return <CategoryList {...props} />
                }}
            />
            {isAuthenticated() ? (
            <Route
                path="/profile" render={props => {
                    return <CustomerProfile {...props} />
                }}
            />
            ) : null}
            {isAuthenticated() ? (
            <Route
                path="/paymentform" render={props => {
                    return <PaymentForm {...props} />
                }}
            />
            ) : null}

        </React.Fragment>
    )
}

export default withRouter(ApplicationViews)