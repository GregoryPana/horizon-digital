import { describe, expect, it } from "vitest";
import { navLinks } from "../../data/site";
import { mobileNavLinks } from "./menu-hover-effects";

describe("mobileNavLinks", () => {
  it("adds an explicit Home item only to the compact/mobile menu", () => {
    expect(mobileNavLinks[0]).toEqual({ label: "Home", path: "/" });
    expect(mobileNavLinks.slice(1)).toEqual(navLinks);
  });

  it("leaves the desktop nav links untouched", () => {
    expect(navLinks.some((item) => item.label === "Home")).toBe(false);
  });
});
