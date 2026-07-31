import { onCLS, onINP, onLCP, onTTFB, type Metric } from "web-vitals";

declare global {
  interface Window {
    gtag: (command: "event", eventName: string, params: Record<string, unknown>) => void;
  }
}

function sendToGA4(metric: Metric) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;

  const { name, id, delta } = metric;

  window.gtag("event", name, {
    event_category: "Web Vitals",
    event_label: id,
    value: Math.round(delta),
    non_interaction: true,
  });
}

export function reportWebVitals() {
  if (typeof window === "undefined") return;

  onLCP(sendToGA4);
  onINP(sendToGA4);
  onCLS(sendToGA4);
  onTTFB(sendToGA4);
}
