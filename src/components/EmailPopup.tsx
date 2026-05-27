"use client";

import { useState, useEffect, useCallback } from "react";

const POPUP_KEY = "email_popup_last_shown";
const POPUP_COOLDOWN_DAYS = 14;
const POPUP_DELAY_MS = 10_000;
const SCROLL_THRESHOLD = 0.5;

export default function EmailPopup() {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const shouldShow = useCallback(() => {
    if (typeof window === "undefined") return false;
    // Don't show on booking-related pages
    if (window.location.pathname.includes("book")) return false;
    const last = localStorage.getItem(POPUP_KEY);
    if (!last) return true;
    const daysSince =
      (Date.now() - parseInt(last, 10)) / (1000 * 60 * 60 * 24);
    return daysSince >= POPUP_COOLDOWN_DAYS;
  }, []);

  const show = useCallback(() => {
    if (shouldShow()) setVisible(true);
  }, [shouldShow]);

  const dismiss = useCallback(() => {
    setVisible(false);
    localStorage.setItem(POPUP_KEY, Date.now().toString());
  }, []);

  useEffect(() => {
    // Timer trigger
    const timer = setTimeout(show, POPUP_DELAY_MS);

    // Scroll trigger
    const handleScroll = () => {
      const scrollPercent =
        window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPercent >= SCROLL_THRESHOLD) {
        show();
        window.removeEventListener("scroll", handleScroll);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [show]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to Mailchimp / Klaviyo / ConvertKit
    // POST email to your email service provider here
    console.log("Email signup:", email);
    setSubmitted(true);
    localStorage.setItem(POPUP_KEY, Date.now().toString());
    setTimeout(dismiss, 3000);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={dismiss}
      />

      {/* Modal */}
      <div className="relative bg-surface border border-border rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl">
        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-text-muted hover:text-text transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">You&apos;re in!</h3>
            <p className="text-text-muted text-sm">
              Check your email for your 10% discount code.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-xl md:text-2xl font-bold mb-2">
              Get <span className="text-gold">10% off</span> your first product
              purchase
            </h3>
            <p className="text-text-muted text-sm mb-6">
              Join our list for last-minute openings &amp; holiday specials.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                required
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-gold transition-colors"
              />
              <input
                type="text"
                placeholder="First name (optional)"
                className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-gold transition-colors"
              />
              <button type="submit" className="btn-primary w-full py-3">
                Get My 10% Code
              </button>
            </form>

            <p className="text-xs text-text-muted mt-4 text-center">
              By subscribing you agree to receive emails. Unsubscribe anytime.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
