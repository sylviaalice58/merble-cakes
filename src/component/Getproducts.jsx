import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import CarouselComponent from "./Carousel";
import "../css/Getproduct.css";
import { FaSearch } from "react-icons/fa";

const Getproduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();
  const searchRef = useRef(null);

  const img_url = "https://slyney2248.alwaysdata.net/static/images/";

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://slyney2248.alwaysdata.net/api/get_products"
      );
      setProducts(response.data);
      setFilteredProducts(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products);
      setShowSuggestions(false);
    } else {
      const matches = products.filter((product) =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(matches);
      setShowSuggestions(true);
    }
  }, [searchTerm, products]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchTerm.trim() === "") {
      setFilteredProducts(products);
      setShowSuggestions(false);
      return;
    }

    const matches = products.filter((product) =>
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(matches);
    setShowSuggestions(false);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setFilteredProducts(products);
    setShowSuggestions(false);
  };

  const handleSelectProduct = (product) => {
    setSearchTerm(product.product_name);
    setFilteredProducts([product]);
    setShowSuggestions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="container">
      <CarouselComponent />

      <div className="row">
        <h1 className="available-cakes">Available Cakes</h1>

        {/* Search Bar */}
        <div className="col-12 mb-4" ref={searchRef}>
          <form className="d-flex gap-2 position-relative" onSubmit={handleSearch}>
            <div className="position-relative w-100">
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "12px",
                  transform: "translateY(-50%)",
                  zIndex: 2,
                  color: "#888",
                }}
              >
                <FaSearch />
              </span>

              <input
                type="text"
                className="form-control ps-5"
                placeholder="Search Cakes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => {
                  if (searchTerm.trim() !== "") {
                    setShowSuggestions(true);
                  }
                }}
              />

              {showSuggestions && filteredProducts.length > 0 && (
                <div
                  className="bg-white border rounded shadow position-absolute w-100 mt-1"
                  style={{ zIndex: 1000, maxHeight: "220px", overflowY: "auto" }}
                >
                  {filteredProducts.slice(0, 6).map((product) => (
                    <div
                      key={product.product_id || product.id}
                      className="p-2 suggestion-item"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleSelectProduct(product)}
                    >
                      {product.product_name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-primary">
              Search
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClearSearch}
            >
              Clear
            </button>
          </form>
        </div>

        {loading && <Loader />}
        <h4 className="text-danger">{error}</h4>

        {!loading && filteredProducts.length === 0 && (
          <div className="col-12">
            <h5 className="text-center">No products found</h5>
          </div>
        )}

        {filteredProducts.map((product) => (
          <div
            className="col-sm-6 col-md-4 col-lg-3 mb-4 d-flex"
            key={product.product_id || product.id}
          >
            <div className="card shadow w-100 h-100">
              <img
                src={img_url + product.product_photo}
                alt={product.product_name}
                className="product_img card-img-top"
              />

              <div className="card-body d-flex flex-column">
                <h5 className="text-primary">{product.product_name}</h5>

                <p className="text-white flex-grow-1">
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
  );
};

export default Getproduct;