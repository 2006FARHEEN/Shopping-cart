
import { Link } from "react-router-dom";
import "./OrderSuccess.css";

function OrderSuccess() {
  const order = JSON.parse(
    localStorage.getItem("lastOrder") || "null"
  );

  if (!order) {
    return (
      <div className="success-container">
        <h2>No order found!</h2>
        <Link to="/">Go to Shopping</Link>
      </div>
    );
  }

  return (
    <div className="success-container">
      <div className="success-card">

        <div className="success-icon">✅</div>

        <h1>Order Placed Successfully!</h1>

        <p className="success-message">
          Thank you for shopping with ShopEase.
        </p>

        <div className="order-info">
          <p>
            <strong>Order ID:</strong> #{order.id}
          </p>

          <p>
            <strong>Order Date:</strong> {order.date}
          </p>

          <p>
            <strong>Order Status:</strong> {order.status}
          </p>
        </div>

        <h2>Ordered Products</h2>

        <div className="ordered-products">
          {order.items.map((item) => (
            <div className="ordered-item" key={item.id}>
              <span>
                {item.name} × {item.quantity}
              </span>

              <strong>
                ₹{item.price * item.quantity}
              </strong>
            </div>
          ))}
        </div>

        <h2>Delivery Address</h2>

        <div className="delivery-info">
          <p>{order.address.name}</p>
          <p>{order.address.phone}</p>
          <p>{order.address.house}</p>
          <p>
            {order.address.city} - {order.address.pincode}
          </p>
        </div>

        <div className="payment-info">
          <p>
            <strong>Payment Method:</strong> {order.payment}
          </p>

          <h2>Total Amount: ₹{order.total}</h2>
        </div>

        <Link to="/" className="continue-btn">
          Continue Shopping
        </Link>

      </div>
    </div>
  );
}

export default OrderSuccess;
