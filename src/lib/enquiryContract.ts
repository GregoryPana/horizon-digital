export const ENQUIRY_PACKAGES = [
  "foundation",
  "starter",
  "growth",
  "custom",
  "not-sure",
] as const;

export const ENQUIRY_TIMELINES = [
  "asap",
  "2-4-weeks",
  "1-2-months",
  "2-3-months",
  "not-sure",
] as const;

export const ENQUIRY_FIELD_LIMITS = {
  businessName: 120,
  name: 120,
  email: 254,
  industry: 120,
  website: 2048,
  message: 4000,
  honeypot: 120,
  turnstileToken: 2048,
} as const;

export type EnquiryInput = {
  businessName: string;
  email: string;
  message: string;
  turnstileToken: string;
  name?: string;
  industry?: string;
  website?: string;
  packageInterest?: (typeof ENQUIRY_PACKAGES)[number];
  timeline?: (typeof ENQUIRY_TIMELINES)[number];
};

export type EnquiryParseResult =
  | { ok: true; value: EnquiryInput }
  | { ok: false };

const ALLOWED_KEYS = new Set([
  "businessName",
  "name",
  "email",
  "industry",
  "website",
  "packageInterest",
  "timeline",
  "message",
  "honeypot",
  "turnstileToken",
]);

const SINGLE_LINE_CONTROLS = /[\u0000-\u001f\u007f]/;
const MESSAGE_UNSAFE_CONTROLS = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/;
const EMAIL_LOCAL_PATTERN = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+$/;
const EMAIL_DOMAIN_LABEL_PATTERN = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?$/;

function requiredString(
  record: Record<string, unknown>,
  key: "businessName" | "email" | "message" | "turnstileToken",
): string | null {
  const raw = record[key];
  if (typeof raw !== "string") return null;
  if (key === "message" ? MESSAGE_UNSAFE_CONTROLS.test(raw) : SINGLE_LINE_CONTROLS.test(raw)) return null;
  const value = raw.trim();
  return value.length > 0 && value.length <= ENQUIRY_FIELD_LIMITS[key] ? value : null;
}

function optionalString(
  record: Record<string, unknown>,
  key: "name" | "industry" | "website",
): string | null | undefined {
  const raw = record[key];
  if (raw === undefined) return undefined;
  if (typeof raw !== "string" || SINGLE_LINE_CONTROLS.test(raw)) return null;
  const value = raw.trim();
  if (value === "") return undefined;
  return value.length <= ENQUIRY_FIELD_LIMITS[key] ? value : null;
}

function optionalEnum<T extends readonly string[]>(
  raw: unknown,
  values: T,
): T[number] | null | undefined {
  if (raw === undefined) return undefined;
  if (typeof raw !== "string") return null;
  const value = raw.trim();
  if (value === "") return undefined;
  return values.includes(value) ? value : null;
}

function validWebsite(value: string): boolean {
  try {
    const url = new URL(value);
    return (url.protocol === "http:" || url.protocol === "https:") && Boolean(url.hostname);
  } catch {
    return false;
  }
}

function validEmail(value: string): boolean {
  const separator = value.lastIndexOf("@");
  if (separator <= 0 || separator !== value.indexOf("@")) return false;
  const local = value.slice(0, separator);
  const domain = value.slice(separator + 1);
  if (
    local.length > 64
    || !EMAIL_LOCAL_PATTERN.test(local)
    || local.startsWith(".")
    || local.endsWith(".")
    || local.includes("..")
  ) return false;
  const labels = domain.split(".");
  return labels.length >= 2 && labels.every((label) => EMAIL_DOMAIN_LABEL_PATTERN.test(label));
}

export function parseEnquiry(input: unknown): EnquiryParseResult {
  if (!input || typeof input !== "object" || Array.isArray(input)) return { ok: false };
  const record = input as Record<string, unknown>;
  if (Object.keys(record).some((key) => !ALLOWED_KEYS.has(key))) return { ok: false };

  const businessName = requiredString(record, "businessName");
  const email = requiredString(record, "email");
  const message = requiredString(record, "message");
  const turnstileToken = requiredString(record, "turnstileToken");
  const name = optionalString(record, "name");
  const industry = optionalString(record, "industry");
  const website = optionalString(record, "website");
  const packageInterest = optionalEnum(record.packageInterest, ENQUIRY_PACKAGES);
  const timeline = optionalEnum(record.timeline, ENQUIRY_TIMELINES);

  const honeypot = record.honeypot;
  const honeypotValid = honeypot === undefined
    || (typeof honeypot === "string"
      && honeypot.length <= ENQUIRY_FIELD_LIMITS.honeypot
      && honeypot.trim() === "");

  if (
    businessName === null
    || email === null
    || message === null
    || turnstileToken === null
    || name === null
    || industry === null
    || website === null
    || packageInterest === null
    || timeline === null
    || !honeypotValid
    || !validEmail(email)
    || (website !== undefined && !validWebsite(website))
  ) return { ok: false };

  return {
    ok: true,
    value: {
      businessName,
      email: email.toLowerCase(),
      message,
      turnstileToken,
      ...(name === undefined ? {} : { name }),
      ...(industry === undefined ? {} : { industry }),
      ...(website === undefined ? {} : { website }),
      ...(packageInterest === undefined ? {} : { packageInterest }),
      ...(timeline === undefined ? {} : { timeline }),
    },
  };
}
