
import "./ProductFilter.css";

function ProductFilter({ maxPrice, setMaxPrice }) {
  return (
    <div className="product-filter">
      <label htmlFor="price-filter">
        Filter by Maximum Price:
      </label>

      <select
        id="price-filter"
        value={maxPrice}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
      >
        <option value="10000">All Prices</option>
        <option value="1000">Under ₹1,000</option>
        <option value="2000">Under ₹2,000</option>
        <option value="3000">Under ₹3,000</option>
        <option value="5000">Under ₹5,000</option>
      </select>
    </div>
  );
}

export default ProductFilter;
