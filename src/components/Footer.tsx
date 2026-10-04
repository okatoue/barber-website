import { SHOP, AREA_LINK_LIST } from "@/lib/config";

// Column labels are styled divs, not <h4>s: as headings they put "Visit",
// "Pages" and "Areas Served" into every page's outline and broke the
// H1 → H2 → H3 hierarchy sitewide.
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div>
          <div className="ft-logo serif">{SHOP.name}</div>
          <div className="ft-tag">
            Barber shop in Broadmead Village, Saanich &mdash; {SHOP.address.city},{" "}
            {SHOP.address.province}. Modern
            fades, classic cuts, hot shaves and beards.
          </div>
        </div>
        <div>
          <div className="ft-head">Visit</div>
          <ul>
            <li>
              <a>{SHOP.address.street}</a>
            </li>
            <li>
              <a>
                {SHOP.address.city}, {SHOP.address.province} {SHOP.address.postal}
              </a>
            </li>
            <li>
              <a href={`tel:${SHOP.phone.replace(/\D/g, "")}`} data-call-location="footer">{SHOP.phone}</a>
            </li>
            <li>
              <a
                href={SHOP.directionsUrl}
                target="_blank"
                rel="noopener"
                data-directions-location="footer"
              >
                Get directions
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="ft-head">Pages</div>
          {/* Real routes, not homepage anchors — same rule NAV_LINKS follows in
              config.ts. "/#menu" and "/#find" sent every footer link on every
              page back to the homepage and passed no signal to /services or
              /location, which is part of why /services sat unindexed. */}
          <ul>
            <li>
              <a href="/services">Menu</a>
            </li>
            <li>
              <a href="/gallery">Work</a>
            </li>
            <li>
              <a href="/barbers">Barbers</a>
            </li>
            <li>
              <a href="/location">Location</a>
            </li>
            <li>
              <a href="/faq">FAQ</a>
            </li>
            <li>
              <a href="/privacy">Privacy</a>
            </li>
          </ul>
        </div>
        <div>
          <div className="ft-head">Services</div>
          {/* Sitewide links to the service pages, which otherwise had a single
              inbound link each (from /services) — the same weak-linking
              pattern that left /services "Discovered – currently not indexed". */}
          <ul>
            <li>
              <a href="/skin-fade-victoria">Skin fades</a>
            </li>
            <li>
              <a href="/beard-trim-saanich">Beard trims</a>
            </li>
            <li>
              <a href="/hot-towel-shave-victoria">Hot towel shaves</a>
            </li>
            <li>
              <a href="/kids-haircut-victoria">Kids&rsquo; haircuts</a>
            </li>
          </ul>
        </div>
        <div>
          <div className="ft-head">Areas Served</div>
          <ul>
            {AREA_LINK_LIST.map(({ area, href }) => (
              <li key={area}>
                <a href={href}>{area}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="ft-bottom">
          <span>
            © {SHOP.name} · {SHOP.address.city}, {SHOP.address.province} ·{" "}
            {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}
