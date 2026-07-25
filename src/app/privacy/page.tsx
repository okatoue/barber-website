import type { Metadata } from "next";
import { SHOP } from "@/lib/config";

const DESCRIPTION =
  "How Royal Look Barber Shop handles visitor information on royallook.ca — the analytics and advertising tools we use, what they collect, and how to opt out.";

// Bump this whenever the policy text changes. Deliberately static: a
// privacy notice's effective date should not move with the build.
const LAST_UPDATED = "July 25, 2026";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: DESCRIPTION,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: `Privacy Policy | ${SHOP.name}`,
    description: DESCRIPTION,
  },
};

const bodyStyle = {
  margin: "0 0 16px",
  color: "var(--muted)",
  fontSize: 15,
  lineHeight: 1.7,
  maxWidth: "70ch",
} as const;

function P({ children }: { children: React.ReactNode }) {
  return <p style={bodyStyle}>{children}</p>;
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2
        className="serif"
        style={{
          fontSize: 20,
          margin: "0 0 12px",
          lineHeight: 1.3,
          color: "var(--ink)",
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

function Link({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "var(--ink)", textDecoration: "underline" }}
    >
      {children}
    </a>
  );
}

export default function PrivacyPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">Last updated {LAST_UPDATED}</div>
            <h1 className="serif">
              Privacy <em>policy.</em>
            </h1>
          </div>
          <p className="lede">
            We run a barber shop, not a data business. This page explains the
            handful of tools that run on royallook.ca, what they see, and how to
            switch them off.
          </p>
        </div>

        <div style={{ maxWidth: "70ch" }}>
          <Block title="Who we are">
            <P>
              {SHOP.name}, {SHOP.address.full}. You can reach us at{" "}
              <Link href={`tel:${SHOP.phone.replace(/\D/g, "")}`}>
                {SHOP.phone}
              </Link>{" "}
              or <Link href={`mailto:${SHOP.email}`}>{SHOP.email}</Link>. This
              policy covers this website only — not our Google Business Profile,
              Instagram, Facebook, or TikTok pages, which are governed by those
              platforms&apos; own policies.
            </P>
          </Block>

          <Block title="What we collect directly">
            <P>
              Nothing. There are no accounts, no contact forms, and no online
              booking on this site. If you want an appointment you call us or
              walk in, and we don&apos;t store anything from your visit here to
              make that happen.
            </P>
            <P>
              What follows is about third-party tools embedded in the site,
              which do collect information about your visit.
            </P>
          </Block>

          <Block title="Analytics — Google Analytics 4">
            <P>
              We use Google Analytics to understand how people find and use the
              site: which pages get visited, which links get tapped (including
              taps on our phone number), roughly where visitors are located,
              and what device and browser they used. It also records a
              truncated version of your IP address.
            </P>
            <P>
              We look at this in aggregate to decide what to write and fix. We
              do not use it to identify individual people. See{" "}
              <Link href="https://policies.google.com/privacy">
                Google&apos;s privacy policy
              </Link>
              , or install the{" "}
              <Link href="https://tools.google.com/dlpage/gaoptout">
                Google Analytics opt-out browser add-on
              </Link>{" "}
              to exclude yourself entirely.
            </P>
          </Block>

          <Block title="Advertising — Meta Pixel">
            <P>
              We use the Meta Pixel so that advertising we run on Facebook and
              Instagram can be measured and targeted. It records that a browser
              visited a page on this site and whether the phone number was
              tapped, and reports that to Meta.
            </P>
            <P>
              Meta may use this to show you our ads later, to build audiences of
              people similar to our visitors, and to tell us how many people who
              saw an ad came to the site. See{" "}
              <Link href="https://www.facebook.com/privacy/policy/">
                Meta&apos;s privacy policy
              </Link>
              , and{" "}
              <Link href="https://www.facebook.com/adpreferences/ad_settings">
                Meta&apos;s ad settings
              </Link>{" "}
              to control how your activity off Meta is used for ads.
            </P>
          </Block>

          <Block title="Embedded Google Maps">
            <P>
              Several pages embed a Google Map so you can find the shop inside
              Broadmead Village. Loading that map connects your browser to
              Google and may set cookies, under Google&apos;s policy linked
              above.
            </P>
          </Block>

          <Block title="Cookies and how to turn this off">
            <P>
              The tools above set cookies in your browser. You can block or
              delete them in your browser settings, use private browsing, or use
              a content blocker — the site works normally either way. Nothing on
              royallook.ca requires a cookie to function.
            </P>
          </Block>

          <Block title="We don't sell your information">
            <P>
              We don&apos;t sell, rent, or trade visitor information, and we
              don&apos;t share it with anyone beyond the analytics and
              advertising providers named above.
            </P>
          </Block>

          <Block title="Your rights">
            <P>
              Under Canada&apos;s Personal Information Protection and Electronic
              Documents Act (PIPEDA) and British Columbia&apos;s Personal
              Information Protection Act (PIPA), you can ask what personal
              information we hold about you, ask us to correct it, and withdraw
              consent to its collection. Email{" "}
              <Link href={`mailto:${SHOP.email}`}>{SHOP.email}</Link> and
              we&apos;ll respond.
            </P>
            <P>
              If you aren&apos;t satisfied with our answer, you can complain to
              the{" "}
              <Link href="https://www.priv.gc.ca/">
                Office of the Privacy Commissioner of Canada
              </Link>{" "}
              or the{" "}
              <Link href="https://www.oipc.bc.ca/">
                Office of the Information and Privacy Commissioner for BC
              </Link>
              .
            </P>
          </Block>

          <Block title="Changes to this policy">
            <P>
              If we add or remove a tool that collects information, we&apos;ll
              update this page and change the date at the top.
            </P>
          </Block>
        </div>
      </div>
    </section>
  );
}
