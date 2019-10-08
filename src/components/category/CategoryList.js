import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const CategoryList = props => {
  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({});

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


  useEffect(() => {getCategories();}, []);
  console.log(categoryList)

  return (
    <>
      {categoryList.filter(item => item.products.map(item => {
              return (
                <div>
                  {item.name}

                </div>
              )
            }).length  >= 1 ).map(item => {
        return (
          <div>
            <h3>{item.name} ({item.products.map(item => {
              return (
                <div>
                  {item.name}

                </div>
              )
            }).length})</h3>
            {item.products.slice(0, 3).map(item => {
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
