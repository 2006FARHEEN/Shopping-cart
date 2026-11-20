
import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import "./App.css";

import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import Auth from "./pages/Auth";
import MyAccount from "./pages/MyAccount";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";

import ProductSort from "./components/ProductSort";
import ProductFilter from "./components/ProductFilter";

// Product details
const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    price: 1499,
    oldPrice: 2499,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
  },
  {
    id: 2,
    name: "Premium Running Sneakers",
    category: "Fashion",
    price: 1999,
    oldPrice: 2999,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
  },
  {
    id: 3,
    name: "Smart Fitness Watch",
    category: "Electronics",
    price: 2499,
    oldPrice: 3999,
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
  },
  {
    id: 4,
    name: "Classic Ladies Handbag",
    category: "Fashion",
    price: 1799,
    oldPrice: 2599,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500"
  }
];

const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Beauty",
  "Home & Living",
  "Accessories"
];

// Homepage
function Home({
  cart,
  setCart,
  wishlist,
  setWishlist
}) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Sorting state
  const [sortOption, setSortOption] = useState("default");

  // Price filter state
  const [maxPrice, setMaxPrice] = useState(10000);

  // Add product to cart
  const addToCart = (product) => {
    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    alert("Product added to cart!");
  };

  // Add or remove wishlist
  const toggleWishlist = (product) => {
    const alreadyExists = wishlist.some(
      (item) => item.id === product.id
    );

    if (alreadyExists) {
      setWishlist(
        wishlist.filter((item) => item.id !== product.id)
      );
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  // Search, category and price filtering
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    const matchesPrice = product.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "low-high") {
      return a.price - b.price;
    }

    if (sortOption === "high-low") {
      return b.price - a.price;
    }

    if (sortOption === "rating") {
      return b.rating - a.rating;
    }

    if (sortOption === "name") {
      return a.name.localeCompare(b.name);
    }

    return 0;
  });

  // Cart item count
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

  return (
    <div>
      {/* Header */}
      <header className="header">
        <Link to="/" className="logo">
          ShopEase
        </Link>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button>Search</button>
        </div>

        <div className="header-links">
          <Link
            to={currentUser ? "/account" : "/login"}
            className="cart-link"
          >
            👤 Account
          </Link>

          <Link to="/wishlist" className="cart-link">
            ❤️ Wishlist ({wishlist.length})
          </Link>

          <Link to="/cart" className="cart-link">
            🛒 Cart ({cartCount})
          </Link>
        </div>
      </header>

      {/* Navigation */}
      <nav className="navbar">
        <a href="#home">Home</a>
        <a href="#categories">Categories</a>
        <a href="#products">Products</a>
        <a href="#deals">Today's Deals</a>
        <a href="#contact">Contact</a>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div>
          <h1>Discover Amazing Products!</h1>
          <p>
            Shop your favourite products at the best prices.
          </p>

          <a href="#products" className="shop-now">
            Shop Now
          </a>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section" id="categories">
        <h2>Shop by Category</h2>

        <div className="category-buttons">
          {categories.map((category) => (
            <button
              key={category}
              className={
                selectedCategory === category ? "active" : ""
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="products-section" id="products">
        <h2>Featured Products</h2>

        {/* Sorting and Filtering */}
        <div className="product-controls">
          <ProductFilter
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />

          <ProductSort
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
        </div>

        <p className="product-count">
          Showing {sortedProducts.length} products
        </p>

        <div className="product-grid">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => {
              const isWishlisted = wishlist.some(
                (item) => item.id === product.id
              );

              return (
                <div className="product-card" key={product.id}>
                  <div className="product-image">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                      />
                    </Link>

                    <button
                      className="wishlist-heart"
                      onClick={() => toggleWishlist(product)}
                      aria-label="Toggle wishlist"
                    >
                      {isWishlisted ? "❤️" : "🤍"}
                    </button>
                  </div>

                  <div className="product-info">
                    <p>{product.category}</p>

                    <Link
                      to={`/product/${product.id}`}
                      className="product-name"
                    >
                      <h3>{product.name}</h3>
                    </Link>

                    <p>⭐ {product.rating}</p>

                    <h3>₹{product.price}</h3>

                    <del>₹{product.oldPrice}</del>

                    <button
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No products found. Try changing your filters.</p>
          )}
        </div>
      </section>

      {/* Offers */}
      <section className="offer-section" id="deals">
        <h2>Special Offers!</h2>
        <p>Get amazing deals on your favourite products.</p>

        <a href="#products" className="shop-now">
          Explore Deals
        </a>
      </section>

      {/* Footer */}
      <footer id="contact">
        <h2>ShopEase</h2>
        <p>Your one-stop destination for online shopping.</p>
        <p>© 2026 ShopEase. All rights reserved.</p>
      </footer>
    </div>
  );
}

// Main App
function App() {
  // Cart state
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("wishlist")) || [];
    } catch {
      return [];
    }
  });

  // Save cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Save wishlist
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Homepage */}
        <Route
          path="/"
          element={
            <Home
              cart={cart}
              setCart={setCart}
              wishlist={wishlist}
              setWishlist={setWishlist}
            />
          }
        />

        {/* Cart */}
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              setCart={setCart}
            />
          }
        />

        {/* Product Details */}
        <Route
          path="/product/:id"
          element={
            <ProductDetails
              products={products}
              cart={cart}
              setCart={setCart}
            />
          }
        />

        {/* Wishlist */}
        <Route
          path="/wishlist"
          element={
            <Wishlist
              wishlist={wishlist}
              setWishlist={setWishlist}
              cart={cart}
              setCart={setCart}
            />
          }
        />

        {/* Login and Signup */}
        <Route
          path="/login"
          element={<Auth />}
        />

        {/* My Account */}
        <Route
          path="/account"
          element={<MyAccount />}
        />

        {/* Checkout */}
        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              setCart={setCart}
            />
          }
        />

        {/* Order Confirmation */}
        <Route
          path="/order-success"
          element={<OrderSuccess />}
        />

        {/* My Orders */}
        <Route
          path="/orders"
          element={<MyOrders />}
        />

        {/* Unknown page */}
        <Route
          path="*"
          element={
            <div style={{ textAlign: "center", padding: "50px" }}>
              <h2>404 - Page Not Found</h2>
              <Link to="/">Back to Home</Link>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
