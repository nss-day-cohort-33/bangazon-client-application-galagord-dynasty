import React from "react"



const Product = props => {

    return (
        <>
            <section className="products">
                <ul className="products">
                    <li>
                    {props.product.name}
                    </li>
                </ul>
            </section>

        </>
    )
}

export default Product


