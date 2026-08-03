export type GtagEventParams = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (command: "event", eventName: string, params?: GtagEventParams) => void;
  }
}

export function trackEvent(eventName: string, params: GtagEventParams = {}) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}
