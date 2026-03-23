import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import cake from "../image/download.png";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://slyney2248.alwaysdata.net/api/get_products"
      );
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts([]);
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

  const trimmedSearch = searchTerm.trim();

  if (trimmedSearch) {
    navigate(`/?search=${encodeURIComponent(trimmedSearch)}`);
    setShowSuggestions(false);
    setSearchTerm(""); // clears the search bar after searching
  } else {
    navigate("/");
  }
};

const handleClearSearch = () => {
  setSearchTerm("");
  setFilteredProducts([]);
  setShowSuggestions(false);
  navigate("/");
};

const handleSelectProduct = (product) => {
    setSearchTerm("");
    setShowSuggestions(false);
    navigate("/makepayment", { state: { product } });
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
    <nav className="cake-navbar navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand brand-logo" to="/">
          <img src={cake} alt="" width="50px" height="50px" /> Merble Cakes
        </Link>

        <button
          className="navbar-toggler custom-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#cakeNavbar"
          aria-controls="cakeNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="cakeNavbar">

           {/* Search Bar */}
          <div className="navbar-search-wrapper mx-auto" ref={searchRef}>

            <form className="navbar-search" onSubmit={handleSearch}>
              <div className="search-input-wrapper">
                <span className="search-icon">
                  <FaSearch />
                </span>

                <input
                  type="text"
                  className="form-control search-input"
                  placeholder="Search Cakes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => {
                    if (filteredProducts.length > 0) {
                      setShowSuggestions(true);
                    }
                  }}
                />
  </div>

            <button type="submit" className="btn search-btn">
              Search
            </button>

            <button
              type="button"
              className="btn clear-btn"
              onClick={handleClearSearch}
            >
              Clear
            </button>
          </form>

                   {showSuggestions && filteredProducts.length > 0 && (
              <div className="suggestions-dropdown">
                {filteredProducts.slice(0, 6).map((product) => (
                  <div
                    key={product.product_id || product.id}
                    className="suggestion-item"
                    onClick={() => handleSelectProduct(product)}
                  >
                    {product.product_name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                      
            <li className="nav-item">
              <Link className="nav-link cake-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link cake-link" to="/about">
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link cake-link" to="/contact">
                Contact
              </Link>
            </li>

           
            {user && user.is_admin === 1 && (
              <li className="nav-item">
                <Link className="nav-link cake-link" to="/addcakes">
                  Add Cakes
                </Link>
              </li>
            )}

             {/* Show username if logged in */}
            {user && (
              <li className="nav-item">
                <span className="nav-link username-label">
                  Hello, {user.username} {/* Only username */}
                </span>
              </li>
            )}

            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link cake-link" to="/signin">
                    Sign in
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link order-btn" to="/signup">
                    Sign up
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="nav-link logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;