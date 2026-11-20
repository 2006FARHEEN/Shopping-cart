
import { useParams, Link } from "react-router-dom";
import ProductReviews from "./ProductReviews";
import "./ProductDetails.css";

function ProductDetails({ products, cart, setCart }) {
  const { id } = useParams();

  // Find the selected product
  const product = products.find(
    (item) => item.id === Number(id)
  );

  // Add product to cart
  const addToCart = () => {
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
      setCart([
        ...cart,
        { ...product, quantity: 1 }
      ]);
    }

    alert("Product added to cart!");
  };

  // Product not found
  if (!product) {
    return (
      <div className="product-details-container">
        <h2>Product Not Found!</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <>
      <div className="product-details-container">
        <Link to="/" className="back-link">
          ← Back to Shopping
        </Link>

        <div className="product-details-card">

          {/* Product Image */}
          <div className="product-details-image">
            <img
              src={product.image}
              alt={product.name}
            />
          </div>

          {/* Product Information */}
          <div className="product-details-info">
            <p className="product-category">
              {product.category}
            </p>

            <h1>{product.name}</h1>

            <p className="product-rating">
              ⭐ {product.rating} / 5
            </p>

            <h2 className="product-price">
              ₹{product.price}
            </h2>

            <del>₹{product.oldPrice}</del>

            <p className="product-description">
              Experience quality and convenience with our{" "}
              {product.name}. This product is designed to
              provide excellent value and a great shopping
              experience.
            </p>

            <p className="stock-status">
              <span>In Stock</span>
            </p>

            <button
              className="add-cart-btn"
              onClick={addToCart}
            >
              🛒 Add to Cart
            </button>

            <Link to="/cart" className="view-cart-link">
              View Cart
            </Link>
          </div>
        </div>
      </div>

      {/* Product Reviews */}
      <ProductReviews productId={product.id} />
    </>
  );
}

export default ProductDetails;
