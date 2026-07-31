import { useState } from "react";
import { SITE } from "@/lib/site-data";

interface LeadGateProps {
  frameworkTitle: string;
  leadMagnet: string;
}

export function LeadGate({ frameworkTitle, leadMagnet }: LeadGateProps) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mx-auto max-w-lg">
      {submitted ? (
        <div className="border border-gold bg-paper-soft p-8 text-center">
          <h3 className="font-serif text-2xl text-navy">Download the {leadMagnet}</h3>
          <p className="mt-3 text-navy/70">
            Check your inbox for the download link. We will also send you occasional updates about
            ClarityOS engagements.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={SITE.bookSessionUrl}
              className="inline-block bg-navy px-6 py-3 text-xs font-bold uppercase tracking-widest text-paper hover:bg-gold hover:text-navy"
            >
              Book a $79 Session
            </a>
            <a
              href="/connect"
              className="inline-block border border-navy/20 px-6 py-3 text-xs font-bold uppercase tracking-widest text-navy hover:border-navy"
            >
              Enterprise Enquiry
            </a>
            <a
              href="/newsletter"
              className="inline-block bg-gold px-6 py-3 text-xs font-bold uppercase tracking-widest text-navy hover:bg-paper"
            >
              Join the Dispatch
            </a>
          </div>
        </div>
      ) : (
        <div className="border border-navy/10 bg-paper-soft p-6">
          <h3 className="font-serif text-xl text-navy">Get the {leadMagnet}</h3>
          <p className="mt-2 text-sm text-navy/60">
            Enter your email and we will send it to you directly.
          </p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const formData = new FormData(form);
              const data = Object.fromEntries(formData);

              try {
                const response = await fetch("https://formspree.io/f/leadmagnet", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  },
                  body: JSON.stringify({
                    ...data,
                    framework: frameworkTitle,
                  }),
                });

                if (response.ok) {
                  setSubmitted(true);
                } else {
                  console.error("Form submission failed");
                  alert("Submission failed. Please try again.");
                }
              } catch (error) {
                console.error("Error submitting form:", error);
                alert("Error submitting form. Please try again.");
              }
            }}
            className="mt-4 flex flex-col gap-3"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="Your email address"
              className="flex-1 border border-navy/20 bg-white px-4 py-3 text-sm outline-none focus:border-gold"
            />
            <button className="bg-navy px-6 py-3 text-xs font-bold uppercase tracking-widest text-paper hover:bg-gold hover:text-navy">
              Download
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
