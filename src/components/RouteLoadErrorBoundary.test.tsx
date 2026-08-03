// @vitest-environment jsdom

import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import RouteLoadErrorBoundary from "./RouteLoadErrorBoundary";

function BrokenRoute(): never {
  throw new Error("route chunk unavailable");
}

describe("RouteLoadErrorBoundary", () => {
  const preventExpectedError = (event: ErrorEvent) => event.preventDefault();

  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    window.addEventListener("error", preventExpectedError);
  });

  afterEach(() => {
    window.removeEventListener("error", preventExpectedError);
    vi.restoreAllMocks();
  });

  it("offers a user-controlled reload after a route chunk fails", () => {
    const reload = vi.fn();
    render(
      <RouteLoadErrorBoundary resetKey="/services" reload={reload}>
        <BrokenRoute />
      </RouteLoadErrorBoundary>,
    );

    expect(screen.getByRole("heading", { name: /page could not load/i })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /try again/i }));
    expect(reload).toHaveBeenCalledOnce();
  });

  it("resets when navigation moves to another route", () => {
    const view = render(
      <RouteLoadErrorBoundary resetKey="/services" reload={vi.fn()}>
        <BrokenRoute />
      </RouteLoadErrorBoundary>,
    );

    view.rerender(
      <RouteLoadErrorBoundary resetKey="/contact" reload={vi.fn()}>
        <p>Contact route loaded</p>
      </RouteLoadErrorBoundary>,
    );

    expect(screen.getByText("Contact route loaded")).toBeTruthy();
  });
});
