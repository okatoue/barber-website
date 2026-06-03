"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SHOP } from "@/lib/config";

const NAV_LINKS = [
  { label: "Menu", href: "/#menu" },
  { label: "Work", href: "/#work" },
  { label: "Team", href: "/barbers" },
  { label: "Find Us", href: "/#find" },
];

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
              src="/images/logo.png"
              alt={SHOP.name}
              width={2172}
              height={724}
              priority
            />
            <span className="crown">EST. VICTORIA</span>
          </Link>
          <div className="nav-links">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
