
import { useState } from "react";
import "./ProductReviews.css";

function ProductReviews({ productId }) {
  const storageKey = `reviews_${productId}`;

  const [reviews, setReviews] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || [];
    } catch {
      return [];
    }
  });

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((total, review) => total + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "No ratings yet";

  const submitReview = (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      alert("Please write a review.");
      return;
    }

    const newReview = {
      id: Date.now(),
      name: currentUser?.name || "Guest",
      rating: rating,
      comment: comment.trim(),
      date: new Date().toLocaleDateString()
    };

    const updatedReviews = [...reviews, newReview];

    setReviews(updatedReviews);

    localStorage.setItem(
      storageKey,
      JSON.stringify(updatedReviews)
    );

    setComment("");
    setRating(5);

    alert("Review submitted successfully!");
  };

  return (
    <div className="reviews-container">
      <h2>Customer Reviews</h2>

      <div className="average-rating">
        <h3>{averageRating}</h3>
        <p>⭐ Average Product Rating</p>
        <span>{reviews.length} Reviews</span>
      </div>

      {/* Review Form */}
      <form className="review-form" onSubmit={submitReview}>
        <h3>Write a Review</h3>

        <p>Select Your Rating</p>

        <div className="star-selection">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              className={star <= rating ? "selected-star" : ""}
              onClick={() => setRating(star)}
            >
              ★
            </button>
          ))}
        </div>

        <textarea
          placeholder="Write your product experience..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
        />

        <button type="submit" className="submit-review-btn">
          Submit Review
        </button>
      </form>

      {/* Display Reviews */}
      <div className="reviews-list">
        <h3>All Reviews</h3>

        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to review!</p>
        ) : (
          [...reviews].reverse().map((review) => (
            <div className="review-card" key={review.id}>
              <h4>{review.name}</h4>

              <div className="review-stars">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>

              <p>{review.comment}</p>

              <span>{review.date}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductReviews;
