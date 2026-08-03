// @vitest-environment jsdom

import { act, fireEvent, render, cleanup } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { useState } from "react";
import NavMenu from "./menu-hover-effects";

beforeAll(() => {
  window.requestAnimationFrame = (callback: FrameRequestCallback) =>
    window.setTimeout(() => callback(performance.now()), 0);
});

afterEach(() => {
  cleanup();
  document.body.style.overflow = "";
  document.body.className = "";
  vi.useRealTimers();
});

function Harness({ initialOpen = false }: { initialOpen?: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(initialOpen);
  return (
    <MemoryRouter
      initialEntries={["/services"]}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <NavMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </MemoryRouter>
  );
}

const desktopToggle = (container: HTMLElement) =>
  container.querySelector<HTMLButtonElement>(
    'button[aria-controls="desktop-services-menu"]',
  )!;
const desktopPanel = (container: HTMLElement) =>
  container.querySelector<HTMLElement>("#desktop-services-menu")!;
const mobileToggle = () =>
  document.body.querySelector<HTMLButtonElement>(
    'button[aria-controls="mobile-services-submenu"]',
  )!;
const mobileDialog = () =>
  document.body.querySelector<HTMLElement>("#mobile-site-menu")!;
const mobileMenuTrigger = (container: HTMLElement) =>
  container.querySelector<HTMLButtonElement>(
    'button[aria-controls="mobile-site-menu"]',
  )!;

describe("NavMenu desktop Services behavior", () => {
  it("opens by disclosure, exposes links, and closes after same-route selection", () => {
    const { container } = render(<Harness />);
    const toggle = desktopToggle(container);
    const panel = desktopPanel(container);

    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(panel.getAttribute("aria-hidden")).toBe("true");
    expect(
      [...panel.querySelectorAll("a")].every((link) => link.tabIndex === -1),
    ).toBe(true);

    fireEvent.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    expect(panel.getAttribute("aria-hidden")).toBe("false");
    expect(
      [...panel.querySelectorAll("a")].every((link) => link.tabIndex === 0),
    ).toBe(true);

    fireEvent.click(
      panel.querySelector<HTMLAnchorElement>('a[href="/services"]')!,
    );
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(panel.getAttribute("aria-hidden")).toBe("true");
  });

  it("opens on focus and Escape closes it and restores focus to Services", () => {
    const { container } = render(<Harness />);
    const servicesLink = container.querySelector<HTMLAnchorElement>(
      'nav[aria-label="Primary navigation"] a[href="/services"]',
    )!;

    act(() => servicesLink.focus());
    expect(desktopToggle(container).getAttribute("aria-expanded")).toBe("true");

    fireEvent.keyDown(document, { key: "Escape" });
    expect(desktopToggle(container).getAttribute("aria-expanded")).toBe(
      "false",
    );
    expect(document.activeElement).toBe(servicesLink);
  });

  it("closes on outside pointer input", () => {
    const { container } = render(<Harness />);
    fireEvent.click(desktopToggle(container));
    fireEvent.pointerDown(document.body);
    expect(desktopToggle(container).getAttribute("aria-expanded")).toBe(
      "false",
    );
  });

  it("protects pointer movement with a bounded close delay", () => {
    vi.useFakeTimers();
    const { container } = render(<Harness />);
    const servicesItem = desktopToggle(container).closest("li")!;

    fireEvent.pointerEnter(servicesItem);
    expect(desktopToggle(container).getAttribute("aria-expanded")).toBe("true");
    fireEvent.pointerLeave(servicesItem);

    act(() => vi.advanceTimersByTime(149));
    expect(desktopToggle(container).getAttribute("aria-expanded")).toBe("true");
    act(() => vi.advanceTimersByTime(1));
    expect(desktopToggle(container).getAttribute("aria-expanded")).toBe(
      "false",
    );
  });
});

describe("NavMenu mobile Services behavior", () => {
  it("uses one persistent trigger that morphs in place and provides no portal close button", () => {
    const { container } = render(<Harness />);
    const trigger = mobileMenuTrigger(container);
    const initialParent = trigger.parentElement;
    const initialRect = trigger.getBoundingClientRect();

    expect(
      document.querySelectorAll('button[aria-controls="mobile-site-menu"]'),
    ).toHaveLength(1);
    expect(trigger.getAttribute("aria-label")).toBe("Open menu");

    fireEvent.click(trigger);

    expect(mobileMenuTrigger(container)).toBe(trigger);
    expect(trigger.parentElement).toBe(initialParent);
    expect(trigger.getBoundingClientRect()).toEqual(initialRect);
    expect(trigger.getAttribute("aria-label")).toBe("Close menu");
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(
      mobileDialog().querySelector('button[aria-label="Close menu"]'),
    ).toBeNull();

    fireEvent.click(trigger);
    expect(mobileMenuTrigger(container)).toBe(trigger);
    expect(trigger.getAttribute("aria-label")).toBe("Open menu");
  });

  it("locks the body, expands the submenu in tab order, and closes after route selection", () => {
    const { container } = render(<Harness />);
    fireEvent.click(mobileMenuTrigger(container));
    const dialog = mobileDialog();
    const submenu = dialog.querySelector<HTMLElement>(
      "#mobile-services-submenu",
    )!;

    expect(document.body.style.overflow).toBe("hidden");
    expect(dialog.getAttribute("aria-hidden")).toBe("false");
    expect(
      [...submenu.querySelectorAll("a")].every((link) => link.tabIndex === -1),
    ).toBe(true);

    fireEvent.click(mobileToggle());
    expect(submenu.getAttribute("aria-hidden")).toBe("false");
    expect(
      [...submenu.querySelectorAll("a")].every((link) => link.tabIndex === 0),
    ).toBe(true);

    fireEvent.click(
      submenu.querySelector<HTMLAnchorElement>(
        'a[href="/seo-services-seychelles"]',
      )!,
    );
    expect(dialog.getAttribute("aria-hidden")).toBe("true");
    expect(document.body.style.overflow).toBe("");
  });

  it("includes the persistent trigger in the focus trap and Escape returns focus", () => {
    vi.useFakeTimers();
    const { container } = render(<Harness />);
    const trigger = mobileMenuTrigger(container);
    fireEvent.click(trigger);
    const dialog = mobileDialog();

    act(() => vi.advanceTimersByTime(50));
    expect(document.activeElement).toBe(trigger);

    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    const lastLink =
      dialog.querySelector<HTMLAnchorElement>('a[href="/contact"]')!;
    expect(document.activeElement).toBe(lastLink);

    fireEvent.keyDown(document, { key: "Tab" });
    expect(document.activeElement).toBe(trigger);

    fireEvent.keyDown(document, { key: "Tab" });
    const firstLink = dialog.querySelector<HTMLAnchorElement>('a[href="/"]')!;
    expect(document.activeElement).toBe(firstLink);

    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(trigger);

    fireEvent.keyDown(document, { key: "Escape" });
    act(() => vi.advanceTimersByTime(50));
    expect(dialog.getAttribute("aria-hidden")).toBe("true");
    expect(document.activeElement).toBe(trigger);
  });
});
