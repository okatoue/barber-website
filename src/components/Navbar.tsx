import Link from "next/link";
import Image from "next/image";
import { SHOP } from "@/lib/config";

const NAV_LINKS = [
  { label: "Menu", href: "#menu" },
  { label: "Work", href: "#work" },
  { label: "Find Us", href: "#find" },
];

export default function Navbar() {
  return (
    <>
      <nav className="nav">
        <div className="container">
          <Link href="/" className="nav-logo" aria-label={SHOP.name}>
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
