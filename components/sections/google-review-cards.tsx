import { Star } from "lucide-react";
import googleBusiness from "@/data/google-business.json";

export function GoogleReviewCards() {
  return (
    <div className="google-review-grid">
      {googleBusiness.reviewSnapshot.featured.map((review) => (
        <article className="google-review" key={review.author}>
          <div className="google-review-author">
            <strong>{review.author}</strong>
          </div>
          <div
            className="google-review-stars"
            aria-label={`${review.rating} van 5 sterren`}
          >
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                size={16}
                aria-hidden="true"
                fill={index < review.rating ? "currentColor" : "none"}
              />
            ))}
          </div>
          <blockquote lang="nl">{review.text}</blockquote>
        </article>
      ))}
    </div>
  );
}