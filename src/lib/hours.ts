import { SHOP } from "./config";

// Day index (0 = Sunday) → day name, matching SHOP.hours[].day
const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

// Timezone the shop physically operates in. Status is always computed in
// this zone so a visitor in another timezone still sees correct hours.
const SHOP_TIMEZONE = "America/Vancouver";

export type ShopStatus = {
  isOpen: boolean;
  /** Short headline, e.g. "Open now" or "Closed". */
  label: string;
  /** Supporting detail, e.g. "Closes 7:00 PM" or "Opens 9:00 AM". */
  detail: string;
};

// Parse a display time like "9:00 AM" into minutes since midnight.
function parseTime(time: string): number | null {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  let hour = parseInt(match[1], 10);
  const minute = parseInt(match[2], 10);
  const meridiem = match[3].toUpperCase();
  if (meridiem === "PM" && hour !== 12) hour += 12;
  if (meridiem === "AM" && hour === 12) hour = 0;
  return hour * 60 + minute;
}

// Current day index + minutes-since-midnight in the shop's timezone.
function getShopNow(now: Date): { dayIndex: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: SHOP_TIMEZONE,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const get = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? "";

  const dayIndex = DAY_NAMES.indexOf(
    get("weekday") as (typeof DAY_NAMES)[number]
  );
  // Intl can emit "24" for midnight under hour12:false — normalize to 0.
  const hour = parseInt(get("hour"), 10) % 24;
  const minute = parseInt(get("minute"), 10);
  return { dayIndex, minutes: hour * 60 + minute };
}

function hoursFor(dayIndex: number) {
  const dayName = DAY_NAMES[((dayIndex % 7) + 7) % 7];
  return SHOP.hours.find((h) => h.day === dayName);
}

/**
 * Compute the shop's open/closed status for a given moment.
 * Pass `new Date()` from the client so it stays live.
 */
export function getShopStatus(now: Date = new Date()): ShopStatus {
  const { dayIndex, minutes } = getShopNow(now);

  if (dayIndex >= 0) {
    const today = hoursFor(dayIndex);
    const open = today?.open ? parseTime(today.open) : null;
    const close = today?.close ? parseTime(today.close) : null;

    if (open !== null && close !== null && minutes >= open && minutes < close) {
      return {
        isOpen: true,
        label: "Open now",
        detail: `Closes ${today!.close}`,
      };
    }
  }

  // Closed — find the next opening within the coming week.
  for (let offset = 0; offset < 8; offset++) {
    const day = hoursFor(dayIndex + offset);
    const open = day?.open ? parseTime(day.open) : null;
    if (open === null) continue;
    // Today only counts if we haven't reached opening time yet.
    if (offset === 0 && minutes >= open) continue;

    let when = "";
    if (offset === 1) when = "tomorrow ";
    else if (offset > 1) when = `${day!.day} `;

    return {
      isOpen: false,
      label: "Closed",
      detail: `Opens ${when}${day!.open}`,
    };
  }

  return { isOpen: false, label: "Closed", detail: "" };
}
