import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import CategoryDetail from "./CategoryDetail"

// Author: Adam Knowles
// Purpose: Show Categories that have more than one product, and show associated products to those categories. Category and product have a hyperlink that takes you to their respective detail pages. 

const CategoryList = props => {
  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({});

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


  useEffect(() => {getCategories();}, []);
  console.log(categoryList)

  return (
    <>
    {/* Maps through categories, if more than one product in category, it shows the category */}
      {categoryList.filter(item => item.products.map(item => {
              return (
                <div>{item.name}</div>
              )
            }).length  >= 1 ).map(item => {
        return (
          <div>
                           {/* Maps through products and get the number of products in each category */}
            <h3><Link
            to={`/categoryDetail/${item.id
            }`}
          >{item.name}</Link> ({item.products.map(item => {
              return (
                <div>
                  {item.name}

                </div>
              )
            }).length})</h3>
            {/* Only shows the first three products in each category */}
            {item.products.map(item => {
              let itemId = +item.url.split("s/")[1]
              return (
                <div>
                  <Link
            to={`/productDetail/${itemId
            }`}
          >{item.name}</Link>

                </div>
              )
            })}
          </div>
        );
      })}
    </>
  );
};

export default CategoryList;
