
import './Cart.css';

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

  // Calculate subtotal
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const delivery = subtotal === 0 || subtotal >= 999 ? 0 : 50;
  const total = subtotal + delivery;

  return (
    <div className="cart-page">

      <h1>My Shopping Cart 🛒</h1>

      {cart.length === 0 ? (

        <div className="empty-cart">
          <h2>Your cart is empty!</h2>
          <p>Looks like you haven't added anything yet.</p>
          <a href="/">Continue Shopping</a>
        </div>

      ) : (

        <div className="cart-layout">

          <div className="cart-items">

            {cart.map(item => (

              <div className="cart-item" key={item.id}>

                <img src={item.image} alt={item.name} />

                <div className="cart-details">

                  <h3>{item.name}</h3>

                  <p className="cart-price">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>

                  <div className="quantity-controls">

                    <button onClick={() => decreaseQuantity(item.id)}>
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => increaseQuantity(item.id)}>
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

                <h3>
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </h3>

              </div>

            ))}

          </div>

          <div className="cart-summary">

            <h2>Order Summary</h2>

            <div>
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>

            <div>
              <span>Delivery</span>
              <span>{delivery === 0 ? "FREE" : `₹${delivery}`}</span>
            </div>

            <hr />

            <div className="total">
              <strong>Total</strong>
              <strong>₹{total.toLocaleString("en-IN")}</strong>
            </div>

            <button
              className="checkout-button"
              onClick={() => alert("Checkout feature coming soon!")}
            >
              Proceed to Checkout
            </button>

            <a href="/" className="continue-shopping">
              Continue Shopping
            </a>

          </div>

        </div>

      )}

    </div>
  );
}

export default Cart;
