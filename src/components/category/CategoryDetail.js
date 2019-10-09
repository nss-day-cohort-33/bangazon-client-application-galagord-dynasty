import React, { useState, useEffect } from "react"

// Author: Adam Knowles
// Purpose: Show the category detail. This includes information(name, price, quantity) about each product the category contains.


const CategoryDetail = props => {
    const [category, setCategory] = useState([])
    const [categoryList, setCategoryList] = useState([]);

const getCategory = (categoryDetailId) => {
    fetch(`http://localhost:8000/categories/${categoryDetailId}`, {
        "method": "GET",
        "headers": {
            "Accept": "application/json",
        }


    })
    .then(response => response.json())
    .then((category) => {
        setCategory(category)
    })
}


const getCategories = () => {
    // Fetch the data from localhost:8000/categories
    fetch("http://localhost:8000/categories", {
      method: "GET",
      headers: {
        Accept: "application/json"
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
                            return (
                                <div>
                                    
                                    <p>Name: {item.name}</p>
                                    
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