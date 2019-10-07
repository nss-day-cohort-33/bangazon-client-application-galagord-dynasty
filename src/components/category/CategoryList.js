import React, { useEffect, useState, useRef } from "react"


const CategoryList = props => {
    const [categoryList, setCategoryList] = useState([])
    const [currentCategory, setCurrentCategory] = useState({})

    const getCategories = () => {
        // Fetch the data from localhost:8000/categories
        fetch("http://localhost:8000/categories", {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                
            }
        })
            // Convert to JSON
            .then(response => response.json())

            // Store categories in state variable
            .then((allCategoryItems) => {
                setCategoryList(allCategoryItems)
            })
    }


    useEffect(() => {
        getCategories()
    }, [])

    return (
        <>
        {
            categoryList.map((item) => {
            return <div>
                    {item.name} 
                    </div>
                    })
        }
            
        </>
    )
}

export default CategoryList

