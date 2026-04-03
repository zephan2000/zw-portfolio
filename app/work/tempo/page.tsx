import SideNav from "./components/SideNav";
import VideoPlayer from "./components/VideoPlayer";
import BeforeAfter from "./components/BeforeAfter";
import JourneyMap from "./components/JourneyMap";
import CalloutBlock from "./components/CalloutBlock";
import ZoneLabel from "./components/ZoneLabel";
import PivotCard from "./components/PivotCard";
import MetricCards from "./components/MetricCards";
import {
  HERO,
  PROBLEM_PROSE,
  PROBLEM_CALLOUT,
  DIAGNOSIS_1_PROSE,
  DIAGNOSIS_1_CALLOUT,
  DIAGNOSIS_2A_PROSE,
  DIAGNOSIS_2A_CALLOUT,
  DIAGNOSIS_2B_PROSE,
  BUILD_INTRO_PROSE,
  BUILD_SUBSECTIONS,
  PIVOTS,
  IMPACT_PROSE,
  IMPACT_CALLOUT,
  GAPS,
  GAPS_HEADING,
  GAPS_SUBTEXT,
  REFLECTION_PROSE,
} from "./data";

function Section({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-8 md:py-12 scroll-mt-24">
      {children}
    </section>
  );
}

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="flex flex-col gap-4">
      {paragraphs.map((p, i) => (
        <p key={i} className="text-lg text-text-secondary leading-[1.8]">
          {p}
        </p>
      ))}
    </div>
  );
}

export default function TempoPage() {
  return (
    <>
      <SideNav />
      <main className="max-w-[720px] mx-auto px-6 pt-24">
        {/* ── Zone 1 — Hero ──────────────────────────── */}
        <Section id="hero">
          <p className="text-[11px] font-medium tracking-widest uppercase text-text-tertiary mb-3">
            Client Project
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-3">
            {HERO.title}
          </h1>
          <p className="font-serif text-xl md:text-2xl text-text-secondary leading-relaxed mb-10">
            {HERO.subheading}
          </p>

          {/* Metadata row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {HERO.metadata.map((item) => (
              <div key={item.label}>
                <p className="text-[11px] uppercase tracking-[0.15em] text-text-tertiary mb-1">
                  {item.label}
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Stack pills */}
          <div className="flex flex-wrap gap-2">
            {HERO.stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs rounded-full border border-border text-text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>
        </Section>

        {/* ── Zone 2 — Video ─────────────────────────── */}
        <Section id="video">
          <VideoPlayer />
        </Section>


        {/* ── Zone 3 — Problem ───────────────────────── */}
        <Section id="problem">
          <ZoneLabel text="The world before" />
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
            What was broken
          </h2>
          <Prose paragraphs={PROBLEM_PROSE} />
          <div className="mt-8">
            <BeforeAfter />
          </div>
          <CalloutBlock {...PROBLEM_CALLOUT} />
        </Section>

        <hr className="border-border" />

        {/* ── Zone 4 — Diagnosis 1 ───────────────────── */}
        <Section id="diagnosis-1">
          <ZoneLabel text="What I ruled out and why" />
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
            Why obvious fixes failed
          </h2>
          <Prose paragraphs={DIAGNOSIS_1_PROSE} />
          <CalloutBlock {...DIAGNOSIS_1_CALLOUT} />
        </Section>

        <hr className="border-border" />

        {/* ── Zone 5 — Technical + Operational diagnosis ── */}
        <Section id="diagnosis-2a">
          <ZoneLabel text="The diagnosis — technical" />
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
            Notion couldn&apos;t push
          </h2>
          <Prose paragraphs={DIAGNOSIS_2A_PROSE} />
          <CalloutBlock {...DIAGNOSIS_2A_CALLOUT} />

          <div id="diagnosis-2b" className="mt-10 scroll-mt-24">
            <ZoneLabel text="The diagnosis — operational" />
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
              You can&apos;t automate what&apos;s still in someone&apos;s head
            </h2>
            <Prose paragraphs={DIAGNOSIS_2B_PROSE} />
          </div>
        </Section>

        <hr className="border-border" />

        {/* ── Zone 6 — Build ─────────────────────────── */}
        <Section id="build">
          <ZoneLabel text="What I built" />
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
            Three components, each with a reason
          </h2>
          <p className="text-lg text-text-secondary leading-[1.75] mb-2">
            {BUILD_INTRO_PROSE}
          </p>
          <JourneyMap />
          <div className="mt-10 flex flex-col gap-10">
            {BUILD_SUBSECTIONS.map((sub) => (
              <div key={sub.heading}>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {sub.heading}
                </h3>
                <Prose paragraphs={sub.paragraphs} />
              </div>
            ))}
          </div>
        </Section>
        <hr className="border-border" />

        {/* ── Zone 7 — Pivots ────────────────────────── */}
        <Section id="pivots">
          <ZoneLabel text="The pivots" />
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
            Two moments where the obvious approach was wrong
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PIVOTS.map((pivot, i) => (
              <PivotCard key={i} {...pivot} />
            ))}
          </div>
        </Section>

        <hr className="border-border" />

        {/* ── Zone 8 — Impact ────────────────────────── */}
        <Section id="impact">
          <ZoneLabel text="Impact" />
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
            The structural outcome first
          </h2>
          <MetricCards />
          <Prose paragraphs={IMPACT_PROSE} />
          <CalloutBlock {...IMPACT_CALLOUT} />
        </Section>
        <hr className="border-border" />

        {/* ── Zone 9 — Gaps ──────────────────────────── */}
        <Section id="gaps">
          <ZoneLabel text="What it doesn't do yet" />
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
            {GAPS_HEADING}
          </h2>
          <p className="text-lg text-text-secondary leading-[1.8] mb-8">
            {GAPS_SUBTEXT}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {GAPS.map((gap, i) => (
              <div
                key={i}
                className="bg-surface border border-border rounded-lg p-6"
              >
                <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider bg-surface rounded-full mb-4">
                  Gap {i + 1}
                </span>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {gap.title}
                </h3>
                <p className="text-base text-text-secondary leading-[1.7]">
                  {gap.description}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Zone 10 — Reflection ───────────────────── */}
        <Section id="reflection">
          <ZoneLabel text="What I'd do differently" />
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
            Discovery is the work
          </h2>
          <Prose paragraphs={REFLECTION_PROSE} />
        </Section>

        {/* ── Footer ───────────────────────────────────
        <footer className="py-16 border-t border-border text-center">
          <p className="text-sm text-text-secondary mb-4">
            Technical documentation, system architecture, call recordings, and
            n8n workflow exports available on request.
          </p>
          <a
            href="#hero"
            className="text-sm text-accent hover:underline"
          >
            Back to top
          </a>
        </footer> */}
      </main>
    </>
  );
}
