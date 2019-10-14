import React from "react"
import { Link } from "react-router-dom"

const Profile = props => {

    return (
        <>
            <section className="product">
                <Link className="nav-link" to={`./PaymentForm`}>
                    <h5>Add a Payment</h5>
                </Link>
                <Link className="nav-link" to={`./PaymentList`}>
                    <h5>Payment Options</h5>
                </Link>
            </section>
        </>
    )
}

export default Profile