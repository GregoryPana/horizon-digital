// @vitest-environment jsdom

import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import Contact from "./Contact";
import Footer from "../components/Footer";
import { ENQUIRY_PACKAGES, ENQUIRY_TIMELINES } from "../lib/enquiryContract";
import { siteConfig } from "../data/site";

vi.mock("../lib/analytics", () => ({
  trackContactIntent: vi.fn(),
  trackEvent: vi.fn(),
}));

type TurnstileOptions = {
  sitekey: string;
  callback: (token: string) => void;
  "expired-callback": () => void;
  "error-callback": () => void;
};

let turnstileOptions: TurnstileOptions;
let widgetElement: HTMLElement;
const turnstile = {
  render: vi.fn((element: HTMLElement, options: TurnstileOptions) => {
    widgetElement = element;
    turnstileOptions = options;
    return "widget-id";
  }),
  reset: vi.fn(),
  remove: vi.fn(),
};

const renderContact = (route = "/contact") =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[route]}>
        <Contact />
      </MemoryRouter>
    </HelmetProvider>,
  );

const loadTurnstile = async () => {
  const script = document.querySelector<HTMLScriptElement>(
    'script[src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"]',
  );
  expect(script).not.toBeNull();
  fireEvent.load(script!);
  await waitFor(() => expect(turnstile.render).toHaveBeenCalledOnce());
  act(() => turnstileOptions.callback("verified-token"));
  await waitFor(() => expect((screen.getByRole("button", { name: "Send message" }) as HTMLButtonElement).disabled).toBe(false));
};

const fillValidForm = () => {
  fireEvent.change(screen.getByLabelText(/^Business name/), { target: { value: "Island Studio" } });
  fireEvent.change(screen.getByLabelText(/^Your name/), { target: { value: "Ava" } });
  fireEvent.change(screen.getByLabelText(/^Email/), { target: { value: "ava@example.com" } });
  fireEvent.change(screen.getByLabelText(/^Industry/), { target: { value: "Hospitality" } });
  fireEvent.change(screen.getByLabelText(/^Current website/), { target: { value: "https://example.com" } });
  fireEvent.change(screen.getByLabelText(/^Which package interests you/), { target: { value: ENQUIRY_PACKAGES[1] } });
  fireEvent.change(screen.getByLabelText(/^Estimated timeline/), { target: { value: ENQUIRY_TIMELINES[2] } });
  fireEvent.change(screen.getByLabelText(/^Message/), { target: { value: "Please help with our website." } });
};

const response = (status: number, body: unknown) =>
  ({ status, json: vi.fn().mockResolvedValue(body) }) as unknown as Response;

const decodedFallback = (alert: HTMLElement) => {
  const link = alert.querySelector<HTMLAnchorElement>(`a[href^="mailto:${siteConfig.email}"]`);
  expect(link).not.toBeNull();
  const url = new URL(link!.href);
  return {
    href: link!.getAttribute("href") ?? "",
    recipient: url.pathname,
    subject: url.searchParams.get("subject") ?? "",
    body: url.searchParams.get("body") ?? "",
  };
};

beforeEach(() => {
  vi.stubGlobal("IntersectionObserver", class {
    observe() {}
    unobserve() {}
    disconnect() {}
  });
  vi.stubEnv("VITE_TURNSTILE_SITE_KEY", "public-test-site-key");
  Object.assign(window, { turnstile });
  turnstile.render.mockClear();
  turnstile.reset.mockClear();
  turnstile.remove.mockClear();
  vi.stubGlobal("fetch", vi.fn());
});

afterEach(() => {
  vi.useRealTimers();
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  delete (window as Window & { turnstile?: unknown }).turnstile;
  document.querySelectorAll('script[src*="challenges.cloudflare.com/turnstile"]').forEach((node) => node.remove());
});

describe("Contact enquiry form", () => {
  it("prefills only an approved bounded request token", () => {
    renderContact("/contact?request=restaurant-concept");
    expect((screen.getByLabelText("Message") as HTMLTextAreaElement).value).toBe(
      "I'm interested in a website similar to the Restaurant Website Concept. Please let me know how we can get started.",
    );
  });

  it.each([
    "/contact?request=unknown-campaign",
    `/contact?request=${"x".repeat(5000)}`,
  ])("ignores an unknown or oversized request prefill (%s)", (route) => {
    renderContact(route);
    expect((screen.getByLabelText("Message") as HTMLTextAreaElement).value).toBe("");
  });

  it("posts a JSON enquiry to the same-origin endpoint without redirecting the primary action", async () => {
    vi.mocked(fetch).mockResolvedValue(response(201, { ok: true }));
    renderContact();
    await loadTurnstile();
    fillValidForm();

    fireEvent.submit(screen.getByRole("form", { name: "Project enquiry" }));

    await waitFor(() => expect(fetch).toHaveBeenCalledOnce());
    const [url, init] = vi.mocked(fetch).mock.calls[0];
    expect(url).toBe("/api/enquiry");
    expect(init).toMatchObject({ method: "POST", headers: { "Content-Type": "application/json" } });
    expect(JSON.parse(String(init?.body))).toEqual({
      businessName: "Island Studio",
      name: "Ava",
      email: "ava@example.com",
      industry: "Hospitality",
      website: "https://example.com",
      packageInterest: ENQUIRY_PACKAGES[1],
      timeline: ENQUIRY_TIMELINES[2],
      message: "Please help with our website.",
      honeypot: "",
      turnstileToken: "verified-token",
    });
  });

  it("disables duplicate submissions, announces Sending…, and enables exact success only for 201 {ok:true}", async () => {
    let resolveFetch!: (value: Response) => void;
    vi.mocked(fetch).mockReturnValue(new Promise((resolve) => { resolveFetch = resolve; }));
    renderContact();
    await loadTurnstile();
    fillValidForm();
    const form = screen.getByRole("form", { name: "Project enquiry" });

    fireEvent.submit(form);
    expect((screen.getByRole("button", { name: "Sending…" }) as HTMLButtonElement).disabled).toBe(true);
    expect(screen.getByRole("status").textContent).toContain("Sending your enquiry");
    fireEvent.submit(form);
    expect(fetch).toHaveBeenCalledOnce();

    resolveFetch(response(201, { ok: true }));
    const confirmation = await screen.findByRole("status", { name: "Enquiry sent" });
    expect(confirmation.textContent).toContain("Your enquiry has been received");
    expect(document.activeElement).toBe(confirmation);
    expect((screen.getByLabelText(/^Business name/) as HTMLInputElement).value).toBe("");
    expect((screen.getByLabelText(/^Email/) as HTMLInputElement).value).toBe("");
    expect((screen.getByLabelText(/^Message/) as HTMLTextAreaElement).value).toBe("");
    expect(turnstile.reset).toHaveBeenCalledWith("widget-id");
  });

  it.each([
    [403, "verification-error", /verification expired or could not be confirmed/i],
    [502, "delivery-error", /delivery could not be confirmed/i],
    [503, "configuration-error", /form is temporarily unavailable/i],
    [418, "delivery-error", /delivery could not be confirmed/i],
  ] as const)("maps HTTP %i safely to %s and retains values", async (status, state, message) => {
    vi.mocked(fetch).mockResolvedValue(response(status, { ok: false, error: "provider exploded: private detail" }));
    renderContact();
    await loadTurnstile();
    fillValidForm();
    fireEvent.submit(screen.getByRole("form", { name: "Project enquiry" }));

    const alert = await screen.findByRole("alert");
    expect(alert.getAttribute("data-enquiry-state")).toBe(state);
    expect(alert.textContent).toMatch(message);
    expect(alert.textContent).not.toMatch(/provider exploded|private detail/i);
    expect((screen.getByLabelText(/^Business name/) as HTMLInputElement).value).toBe("Island Studio");
    expect((screen.getByLabelText(/^Message/) as HTMLTextAreaElement).value).toBe("Please help with our website.");
    expect(turnstile.reset).toHaveBeenCalledWith("widget-id");
  });

  it("treats endpoint 400 without field detail as a focused form-level response without false highlights", async () => {
    vi.mocked(fetch).mockResolvedValue(response(400, { ok: false }));
    renderContact();
    await loadTurnstile();
    fillValidForm();
    fireEvent.submit(screen.getByRole("form", { name: "Project enquiry" }));

    const alert = await screen.findByRole("alert");
    expect(alert.getAttribute("data-enquiry-state")).toBe("server-validation-error");
    expect(alert.textContent).toMatch(/could not accept the enquiry details/i);
    expect(alert.textContent).not.toMatch(/highlighted/i);
    expect(document.activeElement).toBe(alert);
    for (const label of [/^Business name/, /^Email/, /^Current website/, /^Message/]) {
      expect(screen.getByLabelText(label).getAttribute("aria-invalid")).not.toBe("true");
    }
    expect((screen.getByLabelText(/^Business name/) as HTMLInputElement).value).toBe("Island Studio");
    expect((screen.getByLabelText(/^Message/) as HTMLTextAreaElement).value).toBe("Please help with our website.");
  });

  it.each([400, 403, 502, 503] as const)("populates the HTTP %i email fallback from retained current values", async (status) => {
    vi.mocked(fetch).mockResolvedValue(response(status, { ok: false }));
    renderContact();
    await loadTurnstile();
    fillValidForm();
    fireEvent.submit(screen.getByRole("form", { name: "Project enquiry" }));

    const fallback = decodedFallback(await screen.findByRole("alert"));
    expect(fallback.recipient).toBe(siteConfig.email);
    expect(`${fallback.subject}\n${fallback.body}`).toContain("Island Studio");
    expect(fallback.body).toContain("ava@example.com");
    expect(fallback.body).toContain("Please help with our website.");
    expect(fallback.body).toContain("Ava");
    expect(fallback.body).toContain("https://example.com");
    expect(fallback.body).toContain(ENQUIRY_PACKAGES[1]);
    expect(fallback.body).toContain(ENQUIRY_TIMELINES[2]);
    expect(fallback.href).not.toContain("\r");
    expect((screen.getByLabelText(/^Email/) as HTMLInputElement).value).toBe("ava@example.com");
  });

  it("maps a network failure to unconfirmed delivery without raw errors and retains values", async () => {
    vi.mocked(fetch).mockRejectedValue(new Error("socket leaked-provider-detail"));
    renderContact();
    await loadTurnstile();
    fillValidForm();
    fireEvent.submit(screen.getByRole("form", { name: "Project enquiry" }));

    const alert = await screen.findByRole("alert");
    expect(alert.getAttribute("data-enquiry-state")).toBe("delivery-error");
    expect(alert.textContent).toMatch(/delivery could not be confirmed/i);
    expect(alert.textContent).not.toMatch(/socket|provider/i);
    expect((screen.getByLabelText(/^Email/) as HTMLInputElement).value).toBe("ava@example.com");
    expect(decodedFallback(alert).body).toContain("Please help with our website.");
    expect(turnstile.reset).toHaveBeenCalledWith("widget-id");
  });

  it("associates field errors, focuses the first invalid field, and validates optional website format", async () => {
    renderContact();
    await loadTurnstile();
    const businessName = screen.getByLabelText(/^Business name/);
    fireEvent.change(screen.getByLabelText(/^Email/), { target: { value: "not-an-email" } });
    fireEvent.change(screen.getByLabelText(/^Current website/), { target: { value: "ftp://example.com" } });
    fireEvent.submit(screen.getByRole("form", { name: "Project enquiry" }));

    expect(document.activeElement).toBe(businessName);
    expect(businessName.getAttribute("aria-invalid")).toBe("true");
    expect(businessName.getAttribute("aria-describedby")).toBe("businessName-error");
    expect(screen.getByLabelText(/^Email/).getAttribute("aria-invalid")).toBe("true");
    expect(screen.getByLabelText(/^Current website/).getAttribute("aria-invalid")).toBe("true");
    expect(screen.getByRole("alert").getAttribute("data-enquiry-state")).toBe("validation-error");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("fails closed with visible alternatives when the site key is absent", () => {
    vi.stubEnv("VITE_TURNSTILE_SITE_KEY", "");
    renderContact();
    expect(screen.getByRole("alert").getAttribute("data-enquiry-state")).toBe("configuration-error");
    expect((screen.getByRole("button", { name: "Send message" }) as HTMLButtonElement).disabled).toBe(true);
    expect(document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]')).toBeNull();
    expect(screen.getByRole("link", { name: siteConfig.email }).getAttribute("href")).toMatch(/^mailto:/);
    expect(screen.getAllByRole("link", { name: /WhatsApp/i }).length).toBeGreaterThan(0);
  });

  it("handles widget expiry/error, resets before retry, and removes the widget and owned script on cleanup", async () => {
    const view = renderContact();
    await loadTurnstile();
    expect(widgetElement.getAttribute("aria-label")).toBe("Security verification");

    turnstileOptions["expired-callback"]();
    expect((await screen.findByRole("alert")).getAttribute("data-enquiry-state")).toBe("verification-error");
    expect(turnstile.reset).toHaveBeenCalledWith("widget-id");
    turnstileOptions["error-callback"]();
    expect((screen.getByRole("button", { name: "Send message" }) as HTMLButtonElement).disabled).toBe(true);

    view.unmount();
    expect(turnstile.remove).toHaveBeenCalledWith("widget-id");
    expect(document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]')).toBeNull();
  });

  it("attaches script error handling before append so a synchronous failure fails closed", async () => {
    delete (window as Window & { turnstile?: unknown }).turnstile;
    const appendChild = document.head.appendChild.bind(document.head);
    vi.spyOn(document.head, "appendChild").mockImplementation(((node: Node) => {
      const result = appendChild(node);
      node.dispatchEvent(new Event("error"));
      return result;
    }) as typeof document.head.appendChild);

    renderContact();

    const alert = await screen.findByRole("alert");
    expect(alert.getAttribute("data-enquiry-state")).toBe("configuration-error");
    expect(screen.getByText(/verification could not be loaded/i)).not.toBeNull();
    expect((screen.getByRole("button", { name: "Send message" }) as HTMLButtonElement).disabled).toBe(true);
  });

  it("fails closed after a bounded script load timeout", () => {
    vi.useFakeTimers();
    delete (window as Window & { turnstile?: unknown }).turnstile;
    renderContact();

    expect(screen.queryByRole("alert")).toBeNull();
    act(() => vi.advanceTimersByTime(10_000));

    expect(screen.getByRole("alert").getAttribute("data-enquiry-state")).toBe("configuration-error");
    expect(screen.getByText(/verification timed out/i)).not.toBeNull();
    vi.useRealTimers();
  });

  it("fails closed when widget rendering throws", async () => {
    turnstile.render.mockImplementationOnce(() => { throw new Error("render failed"); });
    renderContact();
    const script = document.querySelector<HTMLScriptElement>('script[src*="challenges.cloudflare.com/turnstile"]');
    fireEvent.load(script!);
    const alert = await screen.findByRole("alert");
    expect(alert.getAttribute("data-enquiry-state")).toBe("configuration-error");
    expect(screen.getByText(/verification could not be started/i)).not.toBeNull();
  });

  it("ignores every late widget callback after unmount", async () => {
    const view = renderContact();
    await loadTurnstile();
    view.unmount();
    turnstile.reset.mockClear();

    act(() => {
      turnstileOptions.callback("late-token");
      turnstileOptions["expired-callback"]();
      turnstileOptions["error-callback"]();
    });

    expect(turnstile.reset).not.toHaveBeenCalled();
    expect(turnstile.remove).toHaveBeenCalledWith("widget-id");
  });

  it("keeps a 503 locked against a late token until deliberate retry and a new token", async () => {
    vi.mocked(fetch).mockResolvedValue(response(503, { ok: false }));
    renderContact();
    await loadTurnstile();
    fillValidForm();
    fireEvent.submit(screen.getByRole("form", { name: "Project enquiry" }));
    expect((await screen.findByRole("alert")).getAttribute("data-enquiry-state")).toBe("configuration-error");

    act(() => turnstileOptions.callback("late-token"));
    expect((screen.getByRole("button", { name: "Send message" }) as HTMLButtonElement).disabled).toBe(true);
    expect(screen.getByRole("alert").getAttribute("data-enquiry-state")).toBe("configuration-error");

    turnstile.reset.mockImplementationOnce(() => turnstileOptions.callback("stale-during-reset"));
    fireEvent.click(screen.getByRole("button", { name: "Retry verification" }));
    expect((screen.getByRole("button", { name: "Send message" }) as HTMLButtonElement).disabled).toBe(true);
    act(() => turnstileOptions.callback("new-token"));
    await waitFor(() => expect((screen.getByRole("button", { name: "Send message" }) as HTMLButtonElement).disabled).toBe(false));
  });

  it("preserves direct contact/social/consultation alternatives and exposes privacy", () => {
    renderContact();
    expect(screen.getByRole("link", { name: siteConfig.email }).getAttribute("href")).toMatch(/^mailto:/);
    expect(screen.getByRole("link", { name: siteConfig.phone }).getAttribute("href")).toMatch(/^tel:/);
    expect(screen.getByRole("link", { name: "Instagram" })).not.toBeNull();
    expect(screen.getByRole("link", { name: "Facebook" })).not.toBeNull();
    expect(screen.getByRole("button", { name: siteConfig.primaryCtaLabel })).not.toBeNull();
    expect(screen.getByRole("link", { name: /privacy/i }).getAttribute("href")).toBe("/privacy");
  });

  it("exposes privacy and existing contact alternatives from the footer", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    expect(screen.getByRole("link", { name: "Privacy" }).getAttribute("href")).toBe("/privacy");
    expect(screen.getByRole("button", { name: "Analytics choices" })).not.toBeNull();
    expect(screen.getByRole("link", { name: /Chat on WhatsApp/i }).getAttribute("href")).toBe(siteConfig.whatsappUrl);
    expect(screen.getByRole("link", { name: siteConfig.email }).getAttribute("href")).toMatch(/^mailto:/);
    expect(screen.getByRole("link", { name: siteConfig.phone }).getAttribute("href")).toMatch(/^tel:/);
  });

  it("keeps security and analytics boundaries explicit in source", () => {
    const source = readFileSync(resolve(process.cwd(), "src/pages/Contact.tsx"), "utf8");
    expect(source).toContain("VITE_TURNSTILE_SITE_KEY");
    expect(source).toContain("ENQUIRY_PACKAGES");
    expect(source).toContain("ENQUIRY_TIMELINES");
    expect(source).not.toMatch(/TURNSTILE_SECRET|0x[A-Za-z0-9_-]{20,}/);
    expect(source).not.toMatch(/form_start|form_error/);
    expect(source).toMatch(/trackEvent\("generate_lead",\s*{\s*lead_source:\s*"contact_page_form"/);
    expect(source.indexOf('response.status === 201')).toBeLessThan(
      source.indexOf('trackEvent("generate_lead"'),
    );
    expect(source).not.toMatch(/localStorage|sessionStorage/);
    expect(source).not.toMatch(/console\.(?:log|error).*businessName|console\.(?:log|error).*email/);
  });
});
