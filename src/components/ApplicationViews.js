import { Route } from "react-router-dom"
import React from "react"
import { withRouter } from "react-router-dom"
import Register from "./auth/Register"
import Login from "./auth/Login"
import ProductDetail from "./product/ProductDetail"
import ProductForm from "./product/ProductForm"
import CategoryList from "./category/CategoryList"
import ProductList from "./home/ProductList"
import CustomerProfile from "./payment/CustomerProfile"
import PaymentForm from "./payment/PaymentForm"
import CurrentOrder from "./order/CurrentOrder"
import CategoryDetail from "./category/CategoryDetail"

const ApplicationViews = () => {
    return (
        <React.Fragment>

            {<Route
                exact path="/" render={props => {
                    return (
                        <>
                            <h2>Products</h2>
                            <ProductList {...props}/>
                        </>
                    )
                }}
            /> }

            <Route
                path="/sell_product" render={props => {
                    return <ProductForm {...props} />
                }}
            />

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
            <Route
                path="/MyCart" render={props => {
                    return <CurrentOrder {...props} />
                }}
            />
            <Route
                path="/categorylist" render={props => {
                    return <CategoryList {...props} />
                }}
            />
            {<Route
                path="/profile" render={props => {
                    return (
                        <>
                            <h2>Customer Profile</h2>
                            <CustomerProfile {...props}/>
                        </>
                    )
                }}
            /> }
            {<Route
                path="/PaymentForm" render={props => {
                    return (
                        <>
                            <h3>Payment Form</h3>
                            <PaymentForm {...props}/>
                        </>
                    )
                }}
            /> }
        </React.Fragment>
    )
}

export default withRouter(ApplicationViews)