"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SHOP, NAV_LINKS } from "@/lib/config";

export default function Navbar() {
  const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Already on the homepage: Next.js won't re-navigate, so scroll up manually.
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // From any other page, the Link navigates to "/" and lands at the top.
  };

  return (
    <>
      <nav className="nav">
        <div className="container">
          <Link
            href="/"
            className="nav-logo"
            aria-label={SHOP.name}
            onClick={handleLogoClick}
          >
            <Image
              className="nav-logo-img"
              src="/images/logo.webp"
              alt={SHOP.name}
              width={240}
              height={80}
              priority
            />
            <span className="crown">EST. {SHOP.foundedYear}</span>
          </Link>
          <div className="nav-links">
            {NAV_LINKS.map((link) =>
              // Hash targets stay plain anchors; real routes go through Link
              // so they client-navigate and prefetch.
              link.href.startsWith("/#") ? (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
