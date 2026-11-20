
import { Link } from 'react-router-dom';
import './Wishlist.css';

function Wishlist({ wishlist, setWishlist, cart, setCart }) {

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    alert("Product added to cart!");
  };

  return (
    <div className="wishlist-page">

      <Link to="/" className="wishlist-back">
        ← Continue Shopping
      </Link>

      <h1>My Wishlist ❤️</h1>
      <p className="wishlist-subtitle">
        Your favourite products in one place
      </p>

      {wishlist.length === 0 ? (

        <div className="empty-wishlist">
          <h2>♡ Your wishlist is empty!</h2>
          <p>Save products you love and find them here.</p>
          <Link to="/">Explore Products</Link>
        </div>

      ) : (

        <div className="wishlist-grid">

          {wishlist.map(product => (

            <div className="wishlist-card" key={product.id}>

              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} />
              </Link>

              <div className="wishlist-card-info">

                <h3>{product.name}</h3>

                <p className="wishlist-price">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>

                <button
                  className="wishlist-add-cart"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>

                <button
                  className="wishlist-remove"
                  onClick={() => removeFromWishlist(product.id)}
                >
                  Remove ❤️
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Wishlist;
