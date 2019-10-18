import React, { useEffect, useState, useRef } from "react";
import useModal from "../../hooks/ui/useModal";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import "./Product.css"

const ProductForm = props => {
  const name = useRef();
  const description = useRef();
  const quantity = useRef();
  const price = useRef();
  const location = useRef();
  const category_id = useRef();

  // Create a state variable for itinerary items - useState()
  const [categoryList, setCategoryList] = useState([]);
  const { isAuthenticated } = useSimpleAuth()
  const { toggleDialog, modalIsOpen } = useModal("#category_alert");

  const handleCreate = e => {
    e.preventDefault();

    const newProduct = {
      name: name.current.value,
      description: description.current.value,
      quantity: quantity.current.value,
      price: price.current.value,
      location: location.current.value,
      category_type_id: category_id.current.value,
    };
    if (category_id.current.value === "") {
      toggleDialog(true);
    }

    if (price.current.value > 10000){
      alert("Price can not be more than $10,000")
    }

     else {
      createProduct(newProduct).then(() => {
        props.history.push({
          pathname: "/"
        });
      });
    }
  };

  const getCategories = () => {
    // Fetch the data from localhost:8000/categories
    fetch("http://localhost:8000/categories?limit=false", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
      }
    })
      //   Convert to JSON
      .then(response => response.json())
      //   Store itinerary items in state variable
      .then(allCategories => {
        setCategoryList(allCategories);
      });
  };

  const createProduct = newProduct => {
    return fetch("http://localhost:8000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
      },
      body: JSON.stringify(newProduct)
    }).then(res => res.json());
  };

  //   Create useEffect()
  useEffect(() => {

    if (isAuthenticated()){
      getCategories();
  }

    const handler = e => {
      if (e.keyCode === 27) {
        if (modalIsOpen) {
          toggleDialog(false);
        }
      }
    };

    window.addEventListener("keyup", handler);

    return () => window.removeEventListener("keyup", handler);
  }, []);

  // Create HTML representation with JSX
  return (
    <>
      {/* Dialog Box */}
      <dialog id="category_alert" className="category_alert">
        <br />
        <div >
        <p>Please Select a Category for the Product.</p>
        <button onClick={() => toggleDialog(false)}>Ok</button>
        </div>
        <button
          id="closeBtn"
          onClick={() => toggleDialog(false)}
        >
          X
        </button>
      </dialog>
      {/* Add Product Form */}
      <main style={{ textAlign: "center" }}>
        {/* { !isAuthenticated() ? <div class="alert alert-warning" role="alert">You are not logged in. Please Login to add to a Product.</div> : */}
        <form className="form--login" onSubmit={handleCreate}>
          <div className="card">
            <div className="card-body">
          <h1 className="card-title h3 mb-3 font-weight-normal">Create a New Product</h1>
          <fieldset>
            <label className="card-text" htmlFor="name"> Product Name </label>
            <input
              ref={name}
              type="text"
              name="name"
              className="form-control"
              placeholder="Product Name"
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            <label className="card-text" htmlFor="description"> Description </label>
            <br />
            <textarea
              ref={description}
              placeholder="Product Description"
            ></textarea>
          </fieldset>
          <fieldset>
            <label className="card-text" htmlFor="quantity"> Quantity </label>
            <input
              ref={quantity}
              type="number"
              name="quantity"
              className="form-control"
              placeholder="Quantity Available"
              required
            />
          </fieldset>
          <fieldset>
            <label className="card-text" htmlFor="price"> Price </label>
            <input
              ref={price}
              type="number"
              name="price"
              step=".01"
              className="form-control"
              placeholder="Product Price"
              required
            />
          </fieldset>
          <fieldset>
            <label className="card-text" htmlFor="location"> Location </label>
            <input
              ref={location}
              type="text"
              name="location"
              className="form-control"
              placeholder="City"
              required
            />
          </fieldset>
          <fieldset>
            <label className="card-text" htmlFor="category"> Category: </label>
            <select ref={category_id}>
              <option value="">Select Category</option>
              {categoryList.map(category => {
                return <option value={category.id}>{category.name}</option>;
              })}
            </select>
          </fieldset>
          <fieldset>
            <button type="submit">submit</button>
          </fieldset>
          </div>
          </div>
        </form>
      </main>
    </>
  );
};

export default ProductForm;