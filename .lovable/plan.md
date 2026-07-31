## Goal

Act on the three Semrush recommendations (organizational development, executive advisory/coaching, personal development frameworks) and put your Practical People Skills Development Guide to work as the proprietary asset behind them.

## What gets built

### 1. `/organizational-development` — pillar page
Targets "organizational development" (~74k/mo, difficulty 48) and its question layer.
- H1: "Organizational Development: The Human Layer Beneath Every Transformation"
- Sections: what OD is · why most OD fails · the ClarityOS view (8C Mirror, Phoenix Compass, Pyramid) · what an OD consultant actually does · GCC/enterprise context
- FAQ block answering the real search questions: "what is organizational development", "…in HR", "what is an OD consultant", "organizational development vs change management"
- FAQPage + Article JSON-LD, internal links out to `/frameworks`, `/clarityos`, `/services`, and into `/book-a-session`

### 2. `/executive-coaching` — pillar page
Targets "executive coaching" (12k/mo, difficulty 47), with "executive advisory" (260/mo, difficulty 12 — easy win), "ceo advisory", "executive mentorship", "business advisory" used as H2s/secondary terms.
- H1: "Executive Coaching & Advisory for Leaders Who Carry the Decision"
- Sections: coaching vs advisory vs mentorship (the query people actually type) · who this is for · how a ClarityOS engagement runs · proof (Huawei, Motorola, CBO, NCM, Sanad logos) · pricing signal
- FAQ block, FAQPage + Service JSON-LD, primary CTA to `/book-a-session`

### 3. `/personal-development-framework` — pillar page, anchored on your guide
Targets "personal development framework" (30/mo, difficulty 0 — ownable outright) plus the bigger "personal development plan" question cluster ("how to create a personal development plan" 140/mo, "what is a personal development plan" 90/mo).
- H1: "The Practical People Skills Development Framework"
- Publishes the substance of your PDF as the page's core: the six core concepts (Observation & Awareness, Effective Communication, Adapting to Personalities, Building Relationships, Leadership Without Authority, Emotional Intelligence) and the **6-month practical application track** (Month 1 Observation & Relationship Mapping → Month 6 Reflection & Planning) rendered as a visual timeline
- FAQ block answering the plan questions, positioning Phoenix Compass and 8C Mirror as the frameworks behind the plan
- Lead magnet: the full PDF offered via the existing email form pattern (form is presentational until Cloud is wired — same as the framework field guides today)

### 4. Guide wired into the data layer
- Add the People Development Guide as a framework entry in `src/lib/site-data.ts` with a matching enrichment in `src/lib/v4-content.ts` (definition, use cases, six-step process, FAQs), so it appears in `/frameworks`, gets its own `/frameworks/...` detail page, and is exposed through the existing MCP `list_frameworks` / `get_framework` tools
- Upload the PDF as a CDN asset pointer so it can be linked/downloaded

### 5. Plumbing
- Add all three pillars to `src/routes/sitemap[.]xml.ts`
- Add "Organizational Development", "Executive Coaching" links in the footer (nav header stays as-is to avoid crowding)
- Cross-link from `/services`, `/clarityos`, and `/frameworks` into the relevant pillar

## Technical notes
- New route files: `src/routes/organizational-development.tsx`, `src/routes/executive-coaching.tsx`, `src/routes/personal-development-framework.tsx`, each with per-route `head()` (title <60 chars, description <160), self-referencing canonical + og:url, and JSON-LD in `scripts`
- Content lives in a new `src/lib/pillar-content.ts` so the routes stay presentational
- Existing `SiteLayout`, `Eyebrow`, `SectionTitle`, `LogoMarquee` components reused — no new design system work
- Single H1 per page, h2/h3 hierarchy kept clean to avoid re-triggering the heading-skip SEO finding

## Out of scope for this pass
Payments, email capture backend, and gating the PDF behind a real form — those need Lovable Cloud and are a separate step.
