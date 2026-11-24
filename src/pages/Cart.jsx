
import { Link } from "react-router-dom";
import "./Cart.css";

function Cart({ cart, setCart }) {

  // Increase quantity
  const increaseQuantity = (id) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
        : item
    ));
  };

  // Remove product
  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Calculate total
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const delivery = subtotal === 0 || subtotal >= 999 ? 0 : 50;
  const total = subtotal + delivery;

  return (
    <div className="cart-page">

      {/* Header */}
      <div className="cart-header">
        <Link to="/" className="cart-logo">ShopEase</Link>
        <Link to="/" className="back-shopping">← Continue Shopping</Link>
      </div>

      <div className="cart-container">

        <div className="cart-title">
          <div>
            <h1>Shopping Cart</h1>
            <p>Review your items before checkout.</p>
          </div>

          <span>{cart.length} Items</span>
        </div>

        {cart.length === 0 ? (

          <div className="empty-cart">
            <div className="empty-cart-icon">🛍️</div>
            <h2>Your cart is waiting!</h2>
            <p>You haven't added any products yet.</p>

            <Link to="/" className="continue-shopping-btn">
              Start Shopping
            </Link>
          </div>

        ) : (

          <div className="cart-layout">

            {/* Cart Products */}
            <div className="cart-items">

              <div className="cart-section-heading">
                <h2>Your Items</h2>
                <span>{cart.length} products</span>
              </div>

              {cart.map(item => (

                <div className="cart-item" key={item.id}>

                  <div className="cart-product-image">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="cart-details">

                    <p className="cart-category">
                      {item.category}
                    </p>

                    <h3>{item.name}</h3>

                    <p className="cart-price">
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>

                    <div className="cart-actions">

                      <div className="quantity-controls">

                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() => increaseQuantity(item.id)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>

                      </div>

                      <button
                        className="remove-button"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                  <div className="cart-item-total">
                    <span>Item Total</span>
                    <strong>
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </strong>
                  </div>

                </div>

              ))}

            </div>

            {/* Order Summary */}
            <div className="cart-summary">

              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              <div className="summary-row">
                <span>Delivery Charges</span>
                <span className="free-delivery">
                  {delivery === 0 ? "FREE" : `₹${delivery}`}
                </span>
              </div>

              {subtotal > 0 && subtotal < 999 && (
                <p className="delivery-message">
                  Add ₹{(999 - subtotal).toLocaleString("en-IN")} more for free delivery!
                </p>
              )}

              <div className="summary-divider"></div>

              <div className="summary-total">
                <strong>Total Amount</strong>
                <strong>₹{total.toLocaleString("en-IN")}</strong>
              </div>

              <Link to="/checkout" className="checkout-button">
                Proceed to Checkout →
              </Link>

              <p className="secure-message">
                🔒 Secure demo checkout
              </p>

            </div>

          </div>

        )}

      </div>

      <footer className="cart-footer">
        © 2026 ShopEase. Happy Shopping!
      </footer>

    </div>
  );
}

export default Cart;
