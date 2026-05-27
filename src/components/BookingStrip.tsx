import { SHOP } from "@/lib/config";

const steps = [
  {
    number: "1",
    title: "Choose Service",
    description: "Pick your cut or combo",
  },
  {
    number: "2",
    title: "Choose Barber",
    description: "Select your preferred pro",
  },
  {
    number: "3",
    title: "Choose Time",
    description: "Find a slot that works",
  },
  {
    number: "4",
    title: "Done",
    description: "You\u2019re all set",
  },
];

export default function BookingStrip() {
  return (
    <section className="bg-gold/5 border-y border-gold/20">
      <div className="section py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          Book in <span className="text-gold">30 Seconds</span>
        </h2>
        <p className="text-text-muted text-center mb-10">
          Quick, easy, available 24/7 through Fresha.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {steps.map((step, i) => (
            <div key={step.number} className="text-center relative">
              <div className="w-12 h-12 rounded-full bg-gold text-bg font-bold text-lg flex items-center justify-center mx-auto mb-3">
                {step.number}
              </div>
              <h3 className="font-semibold text-sm md:text-base mb-1">
                {step.title}
              </h3>
              <p className="text-xs md:text-sm text-text-muted">
                {step.description}
              </p>
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[calc(50%+32px)] w-[calc(100%-64px)] h-px bg-gold/30" />
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href={SHOP.booking.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-10 py-4 text-base"
          >
            Book Now
          </a>
        </div>
      </div>
    </section>
  );
}
