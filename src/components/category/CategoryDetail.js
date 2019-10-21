import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import ProductDetail from "../product/ProductDetail";

// Author: Adam Knowles
// Purpose: Show the category detail. This includes information(name, price, quantity) about each product the category contains.


const CategoryDetail = props => {
    const [category, setCategory] = useState([])
    const [categoryList, setCategoryList] = useState([{ product: {} }]);

const getCategory = (categoryDetailId) => {
    fetch(`http://localhost:8000/categories/${categoryDetailId}`, {
        "method": "GET",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
        }


    })
    .then(response => response.json())
    .then((category) => {
        setCategory(category)
    })
}


const getCategories = () => {
    // Fetch the data from localhost:8000/categories
    fetch("http://localhost:8000/categories?limit=true", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
      }
    })
      // Convert to JSON
      .then(response => response.json())

      // Store categories in state variable
      .then(allCategoryItems => {
        setCategoryList(allCategoryItems);
      });
  };
useEffect(() => {getCategory(props.categoryDetailId)}, [])
useEffect(() => {getCategories();}, []);

    //If the category ID matches the categoryDetail ID, show all products and information associated with that category


    return(
        <>
        {categoryList.filter(item => item.id === +props.match.params.categoryDetailId).map(item => {
        
            return(
                    
                <div>
                   <h3>{item.name}</h3>
                   <br></br>
                    {
                        item.products.map(item => {
                            let itemId = +item.url.split("s/")[1]
                            return (
                                <div>
                                    
                                    <p>Name: <Link
                                    to={`/productDetail/${itemId
                                    }`}
                                    >{item.name}</Link></p>
                                    
                                    <p>Quantity: {item.quantity}</p>
                                    
                                    <p>Price: {item.price}</p>
                                    <br></br>


                                </div>
                            )
                        })
                    }



                </div>



            )
        })






        }
            
        </>
    )









}

export default CategoryDetail