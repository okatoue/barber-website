"use client";

import { SHOP } from "@/lib/config";

// Placeholder reviews — replace with a real Google Reviews widget (e.g., Elfsight)
// To integrate: replace this component's content with the Elfsight embed code
const placeholderReviews = [
  {
    name: "Alex M.",
    rating: 5,
    text: "Best barbershop in Victoria. Marcus always gives me a perfect fade. The vibe is great and booking through Fresha is so easy.",
    time: "2 weeks ago",
  },
  {
    name: "Chris T.",
    rating: 5,
    text: "Finally found a barber who actually listens. James took his time and nailed the scissor cut. Will definitely be back.",
    time: "1 month ago",
  },
  {
    name: "Ryan K.",
    rating: 5,
    text: "Kai is an artist with the clippers. Got a skin fade and beard trim — walked out feeling like a million bucks.",
    time: "3 weeks ago",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? "fill-gold text-gold" : "fill-border text-border"}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section id="reviews" className="section bg-surface/50">
      <h2 className="section-heading">What Our Clients Say</h2>
      <p className="section-subheading">
        Rated {SHOP.googleRating} stars from {SHOP.googleReviewCount}+ reviews
        on Google.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {placeholderReviews.map((review) => (
          <div key={review.name} className="card">
            <Stars count={review.rating} />
            <p className="text-sm text-text-muted mt-3 mb-4 leading-relaxed">
              &ldquo;{review.text}&rdquo;
            </p>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm">{review.name}</span>
              <span className="text-xs text-text-muted">{review.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href={SHOP.googleReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          Read More on Google
        </a>
        <a
          href={SHOP.googleReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          Leave a Review
        </a>
      </div>
    </section>
  );
}
