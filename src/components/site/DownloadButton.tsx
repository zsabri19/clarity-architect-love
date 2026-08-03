import type { MouseEvent } from "react";
import { Download } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export type DownloadButtonProps = {
  href: string;
  filename: string;
  label: string;
  eventName?: string;
  eventCategory?: string;
  eventParams?: Record<string, unknown>;
  className?: string;
};

export function DownloadButton({
  href,
  filename,
  label,
  eventName = "download",
  eventCategory = "engagement",
  eventParams,
  className = "",
}: DownloadButtonProps) {
  async function handleDownload(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    try {
      const response = await fetch(href, { mode: "cors" });
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(objectUrl);

      trackEvent(eventName, {
        event_category: eventCategory,
        file_name: filename,
        file_extension: blob.type || "application/octet-stream",
        ...eventParams,
      });
    } catch {
      const a = document.createElement("a");
      a.href = href;
      a.download = filename;
      a.rel = "noreferrer";
      document.body.appendChild(a);
      a.click();
      a.remove();

      trackEvent(eventName, {
        event_category: eventCategory,
        file_name: filename,
        ...eventParams,
      });
    }
  }

  return (
    <button type="button" onClick={handleDownload} className={className} aria-label={label}>
      {label}
      <Download aria-hidden="true" />
    </button>
  );
}
