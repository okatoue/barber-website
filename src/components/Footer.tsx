import { SHOP } from "@/lib/config";

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
              <a href={`tel:${SHOP.phone.replace(/\D/g, "")}`}>{SHOP.phone}</a>
            </li>
          </ul>
        </div>
        <div>
          <h4>Pages</h4>
          <ul>
            <li>
              <a href="/#menu">Menu</a>
            </li>
            <li>
              <a href="/barbers">Barbers</a>
            </li>
            <li>
              <a href="/#find">Location</a>
            </li>
          </ul>
        </div>
        <div>
          <h4>Areas Served</h4>
          <ul>
            {SHOP.areasServed.map((area) => (
              <li key={area}>
                <a>{area}</a>
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
