import { describe, expect, it } from "vitest";
import {
  resolveHomeFaqCategoryKey,
  getNextHomeFaqItemOpenState,
} from "./homeFaqState";

describe("resolveHomeFaqCategoryKey", () => {
  it("preserves the selected category identity when categories reorder", () => {
    expect(resolveHomeFaqCategoryKey("services", ["process", "services", "pricing"])).toBe(
      "services",
    );
  });

  it("preserves the selected category identity when a category is prepended", () => {
    expect(resolveHomeFaqCategoryKey("services", ["general", "services", "pricing"])).toBe(
      "services",
    );
  });

  it("falls back to the first available category when the selection is removed", () => {
    expect(resolveHomeFaqCategoryKey("services", ["process", "pricing"])).toBe("process");
  });

  it("returns no selection when no categories are available", () => {
    expect(resolveHomeFaqCategoryKey("services", [])).toBe("");
  });
});

describe("getNextHomeFaqItemOpenState", () => {
  it("opens a closed accordion item", () => {
    expect(getNextHomeFaqItemOpenState(false)).toBe(true);
  });

  it("closes an open accordion item", () => {
    expect(getNextHomeFaqItemOpenState(true)).toBe(false);
  });
});
