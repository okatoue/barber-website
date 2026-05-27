"use client";

import Image from "next/image";
import {
  useState,
  useRef,
  useCallback,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { SHOP } from "@/lib/config";

const WORK = [
  {
    id: 1,
    title: "The Skin Fade",
    by: "By Zak",
    before: "/images/before-1.png",
    after: "/images/after-1.png",
  },
  {
    id: 2,
    title: "Beard Reshape + Lineup",
    by: "By Aymen",
    before: "/images/before-2.png",
    after: "/images/after-2.png",
  },
  {
    id: 3,
    title: "Textured Crop Fade",
    by: "By Zak",
    before: "/images/before-3.png",
    after: "/images/after-3.png",
  },
];

function BASlider({
  title,
  by,
  before,
  after,
}: {
  title: string;
  by: string;
  before: string;
  after: string;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - r.left, r.width));
    setPos((x / r.width) * 100);
  }, []);

  const onPointerDown = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      dragging.current = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      update(e.clientX);
    },
    [update]
  );

  const onPointerMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (!dragging.current) return;
      update(e.clientX);
    },
    [update]
  );

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  const onKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      setPos((p) => Math.max(0, p - 5));
    }
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      setPos((p) => Math.min(100, p + 5));
    }
    if (e.key === "Home") {
      e.preventDefault();
      setPos(0);
    }
    if (e.key === "End") {
      e.preventDefault();
      setPos(100);
    }
  }, []);

  return (
    <div className="work-card">
      <div
        ref={ref}
        className="ba-frame"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
        role="slider"
        aria-label={`Before and after: ${title}`}
        aria-valuenow={Math.round(pos)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
      >
        <Image
          src={after}
          alt={`${title} after`}
          fill
          sizes="(min-width: 980px) 33vw, 100vw"
          style={{ objectFit: "cover" }}
        />
        <div className="clip" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image
            src={before}
            alt={`${title} before`}
            fill
            sizes="(min-width: 980px) 33vw, 100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <span className="tag left">Before</span>
        <span className="tag right">After</span>
        <div className="divider-line" style={{ left: `${pos}%` }}>
          <div className="handle">⇆</div>
        </div>
      </div>
      <div className="cap">
        <span className="ttl serif">{title}</span>
        <span className="by">{by}</span>
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <section className="section section-warm" id="work" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow" />
            <h2 className="serif">
              Before, and <em>after.</em>
            </h2>
          </div>
        </div>
        <div className="work-grid">
          {WORK.map((w) => (
            <BASlider key={w.id} {...w} />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 56 }}>
          <a
            href={SHOP.social.instagram}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
          >
            More on Instagram ↗
          </a>
        </div>
      </div>
    </section>
  );
}
