import React from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

const NavBar = props => {
    const { isAuthenticated, logout } = useSimpleAuth()

    return (
        <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
            <div style={{fontSize: "2em", marginLeft: "1em"}}><strong>Welcome To Bangazon</strong></div>
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/categorylist">Category List</Link>
                </li>
                <li>
                    <Link className="nav-link" to="/">Profile</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/sell_product">Sell Product</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/MyCart">My Cart</Link>
                </li>
                {
                    isAuthenticated() ?
                        <li className="nav-item">
                            <button className="nav-link fakeLink"
                                onClick={() => {
                                    logout()
                                    props.history.push({
                                        pathname: "/"
                                    })
                                }
                                }
                            >Logout</button>
                        </li> :
                        <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                        </>
                }
            </ul>
        </nav>
    )
}

export default NavBar
