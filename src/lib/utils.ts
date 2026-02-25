export function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

export function buildMailtoLink(email: string, subject: string, body: string) {
  const normalizedBody = body.replace(/\n/g, "\r\n");
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(normalizedBody);
  return `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
}

export function scrollToTopSmooth() {
  if (typeof window === "undefined") return;
  window.requestAnimationFrame(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  });
  window.setTimeout(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, 250);
}
