import { onCLS, onINP, onLCP, onTTFB, type Metric } from "web-vitals";
import { trackEvent } from "./analytics";

function sendToGA4(metric: Metric) {
  if (typeof window === "undefined") return;

  const { name, id, delta } = metric;

  trackEvent(name, {
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
