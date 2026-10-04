import Link from "next/link";
import { SERVICE_COMBO } from "@/lib/config";

// href links a row to its dedicated service page. These rows render on the
// homepage and all nine landing pages, so they are what gives the service
// pages real internal links (before this, only /services linked to them).
type MenuItem = { name: string; price: number; href?: string };

const MENU_CUTS: MenuItem[] = [
  { name: "Skin Fade", price: 30, href: "/skin-fade-victoria" },
  { name: "Regular Hair Cut", price: 28 },
  { name: "Buzz Cut", price: 20 },
  { name: "Kids", price: 25, href: "/kids-haircut-victoria" },
  { name: "Senior", price: 25 },
];

const MENU_GROOMING: MenuItem[] = [
  { name: "Hot Shave", price: 35, href: "/hot-towel-shave-victoria" },
  { name: "Trim Beard", price: 20, href: "/beard-trim-saanich" },
  { name: "Hair Wash", price: 7 },
];

export default function Menu() {
  return (
    <section
      className="section"
      id="menu"
      style={{ paddingTop: 0 }}
    >
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow" />
            <h2 className="serif">
              Cuts, beards, <em>and the works.</em>
            </h2>
          </div>
        </div>

        <div className="menu-grid">
          <div className="menu-col">
            <h3 className="serif">Cuts</h3>
            <div className="col-sub">Clippers · scissors · the works</div>
            {MENU_CUTS.map((s) => (
              <div key={s.name} className="menu-row">
                <span className="nm">{s.href ? <Link href={s.href}>{s.name}</Link> : s.name}</span>
                <span className="pr serif">${s.price}</span>
              </div>
            ))}
          </div>
          <div className="menu-col">
            <h3 className="serif">Grooming</h3>
            <div className="col-sub">Beards · shaves · finishing</div>
            {MENU_GROOMING.map((s) => (
              <div key={s.name} className="menu-row">
                <span className="nm">{s.href ? <Link href={s.href}>{s.name}</Link> : s.name}</span>
                <span className="pr serif">${s.price}</span>
              </div>
            ))}
            <div
              className="menu-row"
              style={{
                marginTop: 24,
                borderTop: "1px solid var(--hairline-strong)",
                borderBottom: "none",
                paddingTop: 24,
              }}
            >
              <span className="nm">{SERVICE_COMBO.name}</span>
              <span className="pr serif">{SERVICE_COMBO.price}</span>
            </div>
          </div>
        </div>

        <div className="menu-foot">
          <p className="note">
            Cash, debit, Visa, Mastercard, Apple Pay. Tips appreciated, never
            expected.
          </p>
          {/* This section duplicates the whole priced menu that /services
              carries, and until now nothing on the site linked to /services
              except the header nav — which is why Google left it at
              "Discovered - currently not indexed" (GSC, Jul 2026) despite it
              earning 434 impressions. This is the strongest internal link
              available for it: same topic, immediately beside the duplicated
              content. Keep it in the flow of the page, not in a nav. */}
          <Link className="btn btn-ghost" href="/services">
            Full menu — times, and what each service includes{" "}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
