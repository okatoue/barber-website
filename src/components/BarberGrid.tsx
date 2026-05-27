import { BARBERS } from "@/lib/config";

export default function BarberFeature() {
  return (
    <section className="section" id="barbers" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow" />
            <h2 className="serif">
              Our <em>barbers</em>
            </h2>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 24 }}>
        <div className="barber-feature">
          {BARBERS.map((b, i) => (
            <div key={b.name} className="barber-card">
              <div className="portrait">
                <div className="stripe" />
                <div className="center">
                  <div className="mono">portrait — {b.name.toLowerCase()}</div>
                </div>
              </div>
              <div className="meta">
                <div className="name serif">{b.name}</div>
                <div className="yrs">{b.years} on the chair</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
