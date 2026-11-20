
function ProductSort({ sortOption, setSortOption }) {
  return (
    <div className="product-sort">
      <label htmlFor="sort">Sort Products: </label>

      <select
        id="sort"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="default">Default</option>
        <option value="low-high">Price: Low to High</option>
        <option value="high-low">Price: High to Low</option>
        <option value="rating">Highest Rated</option>
        <option value="name">Name: A to Z</option>
      </select>
    </div>
  );
}

export default ProductSort;
