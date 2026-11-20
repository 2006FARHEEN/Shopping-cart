
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Checkout.css";

function Checkout({ cart, setCart }) {
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    house: "",
    city: "",
    pincode: ""
  });

  const [payment, setPayment] = useState("Cash on Delivery");

  // Calculate subtotal
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Calculate delivery fee
  const delivery = subtotal >= 999 ? 0 : 50;

  // Calculate final total
  const total = subtotal + delivery;

  // Handle address input changes
  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value
    });
  };

  // Place order
  const placeOrder = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Validate address
    if (
      !address.name.trim() ||
      !address.phone.trim() ||
      !address.house.trim() ||
      !address.city.trim() ||
      !address.pincode.trim()
    ) {
      alert("Please fill in all delivery details.");
      return;
    }

    // Validate phone number
    if (!/^\d{10}$/.test(address.phone)) {
      alert("Enter a valid 10-digit phone number.");
      return;
    }

    // Validate pincode
    if (!/^\d{6}$/.test(address.pincode)) {
      alert("Enter a valid 6-digit pincode.");
      return;
    }

    // Create order
    const order = {
      id: Date.now(),
      items: cart,
      address: address,
      payment: payment,
      subtotal: subtotal,
      delivery: delivery,
      total: total,
      date: new Date().toLocaleString(),
      status: "Order Placed"
    };

    // Get existing orders
    const existingOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    // Save new order
    localStorage.setItem(
      "orders",
      JSON.stringify([...existingOrders, order])
    );

    // Save latest order
    localStorage.setItem(
      "lastOrder",
      JSON.stringify(order)
    );

    // Clear cart after successful order
    setCart([]);

    // Navigate to confirmation page
    navigate("/order-success");
  };

  // Empty cart check
  if (cart.length === 0) {
    return (
      <div className="checkout-container">
        <h2>Your cart is empty!</h2>
        <Link to="/">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      <div className="checkout-layout">

        {/* Delivery Address */}
        <div className="checkout-form">
          <h2>Delivery Address</h2>

          <input
            name="name"
            placeholder="Full Name"
            value={address.name}
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="10-digit Phone Number"
            value={address.phone}
            onChange={handleChange}
            maxLength="10"
          />

          <textarea
            name="house"
            placeholder="House No. / Street Address"
            value={address.house}
            onChange={handleChange}
          />

          <input
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleChange}
          />

          <input
            name="pincode"
            placeholder="6-digit Pincode"
            value={address.pincode}
            onChange={handleChange}
            maxLength="6"
          />

          {/* Payment Method */}
          <h2>Payment Method</h2>

          <label className="payment-option">
            <input
              type="radio"
              value="Cash on Delivery"
              checked={payment === "Cash on Delivery"}
              onChange={(e) => setPayment(e.target.value)}
            />
            Cash on Delivery
          </label>

          <label className="payment-option">
            <input
              type="radio"
              value="UPI"
              checked={payment === "UPI"}
              onChange={(e) => setPayment(e.target.value)}
            />
            UPI (Demo Only)
          </label>

          <label className="payment-option">
            <input
              type="radio"
              value="Credit/Debit Card"
              checked={payment === "Credit/Debit Card"}
              onChange={(e) => setPayment(e.target.value)}
            />
            Credit/Debit Card (Demo Only)
          </label>
        </div>

        {/* Order Summary */}
        <div className="checkout-summary">
          <h2>Order Summary</h2>

          {cart.map((item) => (
            <p key={item.id}>
              {item.name} × {item.quantity}
              <span>
                ₹{item.price * item.quantity}
              </span>
            </p>
          ))}

          <hr />

          <p>
            Subtotal
            <span>₹{subtotal}</span>
          </p>

          <p>
            Delivery
            <span>
              {delivery === 0 ? "FREE" : `₹${delivery}`}
            </span>
          </p>

          <h3>
            Total
            <span>₹{total}</span>
          </h3>

          <button onClick={placeOrder}>
            Place Order
          </button>
        </div>

      </div>
    </div>
  );
}

export default Checkout;
