import { SHOP, AREA_LINKS, SERVICE_LINKS } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div>
          <div className="ft-logo serif">{SHOP.name}</div>
          <div className="ft-tag">
            Barber shop in {SHOP.address.city}, {SHOP.address.province}. Modern
            fades, classic cuts, hot shaves and beards.
          </div>
        </div>
        <div>
          <h4>Visit</h4>
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
          </ul>
        </div>
        <div>
          <h4>Pages</h4>
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
          <h4>Services</h4>
          <ul>
            {SERVICE_LINKS.map((service) => (
              <li key={service.href}>
                <a href={service.href}>{service.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Areas Served</h4>
          <ul>
            {SHOP.areasServed.map((area) => {
              const href = AREA_LINKS[area];
              return (
                <li key={area}>
                  <a href={href}>{area}</a>
                </li>
              );
            })}
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
