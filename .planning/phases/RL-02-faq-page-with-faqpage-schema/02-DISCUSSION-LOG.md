# Phase 2: FAQ Page with FAQPage Schema - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-27
**Phase:** 02-faq-page-with-faqpage-schema
**Areas discussed:** Homepage schema ownership, Homepage subset, /faq layout, Answer specificity

---

## Homepage FAQPage schema ownership

| Option | Description | Selected |
|--------|-------------|----------|
| Only /faq owns schema | Homepage FAQ becomes visual-only teaser (drop its JSON-LD); one canonical FAQPage sitewide | ✓ |
| Homepage keeps subset schema | Homepage emits FAQPage for its subset; /faq emits the full set; two FAQPage blocks sitewide | |

**User's choice:** Only /faq owns schema.
**Notes:** Removes the homepage `faqJsonLd` block from `FAQ.tsx`; avoids duplicate-FAQPage ambiguity.

---

## Homepage FAQ subset

| Option | Description | Selected |
|--------|-------------|----------|
| 3–4 conversion questions | walk-ins, kids' cuts, timing/pricing — light, call-focused, clearly a subset | ✓ |
| Keep ~5, reworded | Homepage keeps ~today's 5 items, reworded so not byte-identical | |
| Just 3 essentials | walk-ins, pricing, parking — leanest footprint | |

**User's choice:** 3–4 conversion questions.
**Notes:** Full 7-topic set lives only on /faq; exact 3–4 left to Claude within the conversion focus.

---

## /faq layout

| Option | Description | Selected |
|--------|-------------|----------|
| Static all-open, grouped | All answers visible, grouped by category — best for crawl + scanning | ✓ |
| Accordion, grouped | Reuse click-to-open accordion, organized into categories | |
| Accordion, flat list | Single accordion list like homepage today, no categories | |

**User's choice:** Static all-open, grouped by category.
**Notes:** Category names left to Claude (e.g. Visiting / Services / Kids).

---

## Answer specificity (pricing/timing)

| Option | Description | Selected |
|--------|-------------|----------|
| Exact, from config | Cite real prices + durations from SERVICES — always in sync | ✓ |
| Soft ranges | General ranges that rarely need updating, less precise | |

**User's choice:** Exact, from config.

---

## Final gate

Asked whether to add `/faq` to the header nav too or keep header unchanged. **User chose:** Ready for context (accept Claude's-discretion defaults — footer link + homepage "see all FAQs" link, header nav unchanged).

## Claude's Discretion

- Exact 3–4 homepage questions within the walk-ins / kids / timing-pricing focus.
- `/faq` category names and grouping.
- New `/faq` server component vs adapting `FAQ.tsx`; homepage teaser client accordion vs static.
- `metadata` title/description copy (respecting the `%s | Royal Look Barber Shop` template).
- FAQ_ITEMS data-model split (category + subset flag vs full + curated list).

## Deferred Ideas

- GBP services alignment + config service renames — Phase 3.
- Additional area landing pages — v2 / SEO-20.
- FAQ rich-result eligibility — not pursued (Google restricts to gov/health).
