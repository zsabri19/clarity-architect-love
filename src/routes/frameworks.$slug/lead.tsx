import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteLayout, Eyebrow } from "@/components/site/SiteLayout";
import { FRAMEWORKS, canonicalUrl } from "@/lib/site-data";
import { LeadGate } from "@/components/site/LeadGate";

export const Route = createFileRoute("/frameworks/$slug/lead")({
  loader: ({ params }) => {
    const framework = FRAMEWORKS.find((f) => f.slug === params.slug);
    if (!framework) throw notFound();
    return { framework };
  },
  head: ({ loaderData }) => {
    const f = loaderData?.framework;
    const leadMagnet = f?.leadMagnet ?? "Lead Magnet";
    const title = f ? `Download ${leadMagnet} — ${f.title}` : "ClarityOS Framework";
    const slug = f?.slug ?? "";
    return {
      meta: [
        { title },
        { name: "description", content: leadMagnet },
        { property: "og:title", content: title },
        { property: "og:description", content: leadMagnet },
        { property: "og:url", content: canonicalUrl(`/frameworks/${slug}/lead`) },
      ],
      links: [{ rel: "canonical", href: canonicalUrl(`/frameworks/${slug}/lead`) }],
    };
  },
  component: LeadDownloadPage,
});

function LeadDownloadPage() {
  const { framework: f } = Route.useLoaderData();

  return (
    <SiteLayout>
      <section className="mx-auto max-w-4xl px-6 pt-20 pb-16 lg:px-8">
        <nav className="mb-6 text-[11px] font-medium uppercase tracking-widest text-navy/50">
          <a href={`/frameworks/${f.slug}`} className="hover:text-gold">
            {f.title}
          </a>
          <span className="mx-2">/</span>
          <span>Download</span>
        </nav>
        <Eyebrow>Lead Magnet</Eyebrow>
        <h1 className="font-serif text-3xl leading-tight text-navy md:text-4xl">
          Download the {f.leadMagnet}
        </h1>
        <p className="mt-4 text-navy/60">
          Enter your email to receive the {f.leadMagnet.toLowerCase()} directly.
        </p>
        <div className="mt-10">
          <LeadGate frameworkTitle={f.title} leadMagnet={f.leadMagnet} />
        </div>
      </section>
    </SiteLayout>
  );
}
