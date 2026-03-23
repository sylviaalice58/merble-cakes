import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { useLocation, useNavigate } from 'react-router-dom';
import CarouselComponent from './Carousel';
import "../css/Getproduct.css";


const Getproduct = () => {

  // 2.Initialize hook to help you manage the state of your product
  const[products,setProducts]=useState([]);
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState("");

  // declare the navigate hook 
  const navigate =useNavigate();
  const location = useLocation();

  // Bellow we specify the image base url
  const img_url = "https://slyney2248.alwaysdata.net/static/images/"

  // 3.create a function to help you fetch the products from ur API
  const fetchProducts =async()=>{
    try{
      //4. Update the loading hook
      setLoading(true)
        //5.interact with you end point for fetching the products
      const response =await axios.get("https://slyney2248.alwaysdata.net/api/get_products")

      // 6.update the product hook with the response given in the API
      setProducts(response.data)

      // 7.set the loading hook back to default
      setLoading(false)

    }
    catch(error){
      // if there is an error we need to
      // set the loading hook back to default
      setLoading(false)

      // update the error hook with a message
      setError(error.message)
    
    }
  }

  // We shall use the useEffect hook that automatically re-render new features in case of any changes.
  useEffect(() => {
    fetchProducts();
  }, []);

  // console.log(products)

  // get search term from navbar URL
 const queryParams = new URLSearchParams(location.search);
const searchTerm = queryParams.get("search") || "";

  // filter products
  const filteredProducts = searchTerm
  ? products.filter((product) =>
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : products;


  return (
    <div className="container">
  <CarouselComponent />

    <div className='row'>

      <h1 className="available-cakes">Available Cakes</h1>

        {loading && <Loader/>}
        <h4 className="text-danger">{error}</h4>

         {!loading && filteredProducts.length === 0 && (
          <div className="col-12">
            <h5 className="text-center">No products found</h5>
          </div>
        )}


        {/* map the products fetched from the API to the user  interface */}

       {filteredProducts.map((product) => (
  <div 
  className="col-sm-6 col-md-4 col-lg-3 mb-4 d-flex" 
  key={product.product_id || product.id}>

    <div className="card shadow w-100 h-100">
      <img
        src={img_url + product.product_photo}
        alt={product.product_name}
        className="product_img card-img-top"
      />

      <div className="card-body d-flex flex-column">
        <h5 className="text-primary">{product.product_name}</h5>

        <p className="text-dark flex-grow-1">
          {product.product_description.slice(0, 100)}...
        </p>

        <h4 className="text-danger">KES {product.product_cost}</h4>

        <button
          className="btn btn-outline-primary mt-auto"
          onClick={() => navigate("/makepayment", { state: { product } })}
        >
          Purchase Now
        </button>
      </div>
    </div>
  </div>
))}
        
    </div>
    </div>
  )
}

export default Getproduct;