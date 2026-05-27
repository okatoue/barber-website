"use client";

import { useEffect, useState } from "react";
import { getShopStatus, type ShopStatus } from "@/lib/hours";

type Props = {
  /** "bar" = navbar utility strip, "pill" = Find Us status chip. */
  variant: "bar" | "pill";
};

export default function OpenStatus({ variant }: Props) {
  // Start null so the server render and first client render match (no
  // hydration mismatch); resolve to the real status right after mount.
  const [status, setStatus] = useState<ShopStatus | null>(null);

  useEffect(() => {
    const update = () => setStatus(getShopStatus(new Date()));
    update();
    // Re-check every minute so the dot flips at opening/closing time.
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  const isOpen = status?.isOpen ?? true;

  if (variant === "pill") {
    const text = status
      ? `${status.label}${status.detail ? ` · ${status.detail}` : ""}`.toUpperCase()
      : "";
    return (
      <div className="status">
        <span className={`pip ${isOpen ? "" : "closed"}`} />
        {text}
      </div>
    );
  }

  // variant === "bar"
  return (
    <>
      <span className={`dot ${isOpen ? "" : "closed"}`} />
      <b>{status?.label ?? ""}</b>
      {status?.detail && (
        <>
          <span className="sep">·</span>
          <span style={{ opacity: 0.75 }}>{status.detail}</span>
        </>
      )}
    </>
  );
}
