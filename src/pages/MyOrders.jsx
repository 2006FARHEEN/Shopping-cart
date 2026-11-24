
import { Link } from "react-router-dom";
import "./MyOrders.css";

function MyOrders() {
  const orders = JSON.parse(
    localStorage.getItem("orders") || "[]"
  );

  return (
    <div className="my-orders-container">
      <h1>My Orders</h1>
      <p className="orders-subtitle">
        View and track your previous purchases.
      </p>

      {orders.length === 0 ? (
        <div className="no-orders">
          <h2>No Orders Yet!</h2>
          <p>You haven't placed any orders.</p>

          <Link to="/" className="shop-orders-btn">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {[...orders].reverse().map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-header">
                <div>
                  <h3>Order #{order.id}</h3>
                  <p>{order.date}</p>
                </div>

                <span className="order-status">
                  {order.status}
                </span>
              </div>

              <div className="order-products">
                {order.items.map((item) => (
                  <div
                    className="order-product"
                    key={item.id}
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>

                    <strong>
  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
</strong>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <p>
                  Payment: {order.payment}
                </p>

                <h3>
  Total: ₹{order.total.toLocaleString("en-IN")}
</h3>
              </div>

              <div className="order-address">
                <strong>Delivery Address:</strong>
                <p>{order.address.name}</p>
                <p>{order.address.phone}</p>
                <p>{order.address.house}</p>
                <p>
                  {order.address.city} - {order.address.pincode}
                </p>
              </div>

              <Link
                to="/order-success"
                className="view-order-btn"
                onClick={() =>
                  localStorage.setItem(
                    "lastOrder",
                    JSON.stringify(order)
                  )
                }
              >
                View Order Details
              </Link>
            </div>
          ))}
        </div>
      )}

      <Link to="/" className="back-shopping">
        ← Continue Shopping
      </Link>
    </div>
  );
}

export default MyOrders;
