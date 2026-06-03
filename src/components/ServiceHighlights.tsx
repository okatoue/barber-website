const MENU_CUTS = [
  { name: "Skin Fade", price: 30 },
  { name: "Regular Hair Cut", price: 28 },
  { name: "Buzz Cut", price: 20 },
  { name: "Kids", price: 25 },
  { name: "Senior", price: 25 },
];

const MENU_GROOMING = [
  { name: "Hot Shave", price: 35 },
  { name: "Trim Beard", price: 20 },
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
                <span className="nm">{s.name}</span>
                <span className="pr serif">${s.price}</span>
              </div>
            ))}
          </div>
          <div className="menu-col">
            <h3 className="serif">Grooming</h3>
            <div className="col-sub">Beards · shaves · finishing</div>
            {MENU_GROOMING.map((s) => (
              <div key={s.name} className="menu-row">
                <span className="nm">{s.name}</span>
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
              <span className="nm">Cut + Beard</span>
              <span className="pr serif">$48</span>
            </div>
          </div>
        </div>

        <div className="menu-foot">
          <p className="note">
            Cash, debit, Visa, Mastercard, Apple Pay. Tips appreciated, never
            expected.
          </p>
        </div>
      </div>
    </section>
  );
}
