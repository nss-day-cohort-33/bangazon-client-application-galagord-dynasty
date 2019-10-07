import { Route } from "react-router-dom"
import React from "react"
import { withRouter } from "react-router-dom"
import Register from "./auth/Register"
import Login from "./auth/Login"
import CategoryList from "./category/CategoryList"


const ApplicationViews = () => {
    return (
        <React.Fragment>

            {/* <Route
                exact path="/" render={props => {
                    return <HOME COMPONENT HERE />
                }}
            /> */}

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
                path="/categorylist" render={props => {
                    return <CategoryList {...props} />
                }}
            />
            <Route
                path="/login" render={props => {
                    return <Login {...props} />
                }}
            />

        </React.Fragment>
    )
}

export default withRouter(ApplicationViews)