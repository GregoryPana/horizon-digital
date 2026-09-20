import { describe, expect, it } from "vitest";
import {
  ENQUIRY_FIELD_LIMITS,
  parseEnquiry,
  type EnquiryInput,
} from "./enquiryContract";

const completePayload = (): Record<string, unknown> => ({
  businessName: "  Island Studio  ",
  name: "  Ava Smith  ",
  email: "  AVA@Example.com  ",
  industry: "  Hospitality  ",
  website: "  https://example.com/work  ",
  packageInterest: "starter",
  timeline: "1-2-months",
  message: "  We need a clearer booking journey.  ",
  honeypot: "   ",
  turnstileToken: "  verified-token  ",
});

function expectInvalid(payload: Record<string, unknown>) {
  expect(parseEnquiry(payload)).toEqual({ ok: false });
}

describe("parseEnquiry", () => {
  it("accepts and normalises a complete valid payload", () => {
    expect(parseEnquiry(completePayload())).toEqual({
      ok: true,
      value: {
        businessName: "Island Studio",
        name: "Ava Smith",
        email: "ava@example.com",
        industry: "Hospitality",
        website: "https://example.com/work",
        packageInterest: "starter",
        timeline: "1-2-months",
        message: "We need a clearer booking journey.",
        turnstileToken: "verified-token",
      } satisfies EnquiryInput,
    });
  });

  it("accepts the minimal valid payload and omits blank optional fields", () => {
    expect(parseEnquiry({
      businessName: "Island Studio",
      email: "hello@example.com",
      message: "Please contact us.",
      name: " ",
      industry: "",
      website: "  ",
      honeypot: "",
      turnstileToken: "token",
    })).toEqual({
      ok: true,
      value: {
        businessName: "Island Studio",
        email: "hello@example.com",
        message: "Please contact us.",
        turnstileToken: "token",
      },
    });
  });

  it("rejects non-object, array, and unknown-key payloads", () => {
    expect(parseEnquiry(null)).toEqual({ ok: false });
    expect(parseEnquiry([])).toEqual({ ok: false });
    expectInvalid({ ...completePayload(), admin: true });
  });

  it.each(["businessName", "email", "message", "turnstileToken"] as const)(
    "rejects a missing or blank required %s",
    (field) => {
      const missing = completePayload();
      delete missing[field];
      expectInvalid(missing);
      expectInvalid({ ...completePayload(), [field]: "   " });
    },
  );

  it.each(["businessName", "name", "industry", "message", "turnstileToken"] as const)(
    "accepts %s at its limit and rejects one character over",
    (field) => {
      const limit = ENQUIRY_FIELD_LIMITS[field];
      const atLimit = { ...completePayload(), [field]: "x".repeat(limit) };
      if (field === "turnstileToken") atLimit.email = "ava@example.com";
      expect(parseEnquiry(atLimit).ok).toBe(true);
      expectInvalid({ ...atLimit, [field]: "x".repeat(limit + 1) });
    },
  );

  it("accepts email at 254 characters and rejects malformed or oversized email", () => {
    const atLimit = `${"a".repeat(64)}@${"b".repeat(63)}.${"c".repeat(63)}.${"d".repeat(61)}`;
    expect(atLimit).toHaveLength(254);
    expect(parseEnquiry({ ...completePayload(), email: atLimit }).ok).toBe(true);
    for (const email of [
      "not-an-email",
      "a@b",
      "a b@example.com",
      ".a@example.com",
      "a..b@example.com",
      "a@example-.com",
      `${atLimit}x`,
    ]) {
      expectInvalid({ ...completePayload(), email });
    }
  });

  it("accepts an http(s) website at its limit and rejects malformed, unsafe, or oversized URLs", () => {
    const atLimit = `https://example.com/${"a".repeat(ENQUIRY_FIELD_LIMITS.website - 20)}`;
    expect(atLimit).toHaveLength(ENQUIRY_FIELD_LIMITS.website);
    expect(parseEnquiry({ ...completePayload(), website: atLimit }).ok).toBe(true);
    for (const website of ["example.com", "javascript:alert(1)", "ftp://example.com", `${atLimit}x`]) {
      expectInvalid({ ...completePayload(), website });
    }
  });

  it.each(["packageInterest", "timeline"] as const)("rejects an invalid or non-string %s", (field) => {
    expectInvalid({ ...completePayload(), [field]: "other" });
    expectInvalid({ ...completePayload(), [field]: 1 });
  });

  it("accepts every current package and timeline enum", () => {
    for (const packageInterest of ["foundation", "starter", "growth", "custom", "not-sure"]) {
      expect(parseEnquiry({ ...completePayload(), packageInterest }).ok).toBe(true);
    }
    for (const timeline of ["asap", "2-4-weeks", "1-2-months", "2-3-months", "not-sure"]) {
      expect(parseEnquiry({ ...completePayload(), timeline }).ok).toBe(true);
    }
  });

  it("rejects nonblank honeypots and wrong field types", () => {
    expectInvalid({ ...completePayload(), honeypot: "bot" });
    expectInvalid({ ...completePayload(), businessName: 42 });
    expectInvalid({ ...completePayload(), name: false });
  });

  it("rejects control characters in single-line fields", () => {
    expectInvalid({ ...completePayload(), businessName: "Island\r\nBcc: victim@example.com" });
    expectInvalid({ ...completePayload(), email: "ava@example.com\n" });
  });
});
