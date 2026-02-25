import Seo from "../components/Seo";
import Card from "../components/Card";
import Button from "../components/Button";
import { FullScreenScrollFX } from "../components/ui/full-screen-scroll-fx";
import { Timeline } from "../components/ui/timeline";
import drakeMain from "../assets/work/drake-seaside/drake-seaside.png";
import drakeAltOne from "../assets/work/drake-seaside/drake-seaside 2.png";
import drakeMainWebp from "../assets/work/drake-seaside/drake-seaside.webp";
import drakeAltOneWebp from "../assets/work/drake-seaside/drake-seaside 2.webp";
import seykelzMain from "../assets/work/seykelz/seykelz.png";
import seykelzAltOne from "../assets/work/seykelz/seykelz 2.png";
import seykelzMainWebp from "../assets/work/seykelz/seykelz.webp";
import seykelzAltOneWebp from "../assets/work/seykelz/seykelz 2.webp";
import demoCafe from "../assets/work/demos/cafe.jpg";
import demoConsulting from "../assets/work/demos/consulting.jpg";
import demoCafeWebp from "../assets/work/demos/cafe.webp";
import demoConsultingWebp from "../assets/work/demos/consulting.webp";

export default function Work() {
  const sections = [
    {
      id: "drake-seaside",
      leftLabel: "Drake Seaside",
      title: "Drake Seaside",
      rightLabel: "Starter Tier",
      background: drakeMain,
      backgroundWebp: drakeMainWebp,
      bgFit: "contain" as const,
      bgPosition: "top" as const,
    },
    {
      id: "seykelz",
      leftLabel: "SeyKelz",
      title: "SeyKelz",
      rightLabel: "Foundation tier",
      background: seykelzMain,
      backgroundWebp: seykelzMainWebp,
      bgFit: "contain" as const,
      bgPosition: "top" as const,
    },
    {
      id: "demo",
      leftLabel: "ConceptDemo",
      title: "Demo",
      rightLabel: "Growth Tier",
      background: demoCafe,
      backgroundWebp: demoCafeWebp,
      bgFit: "contain" as const,
    },
  ];

  return (
    <div>
      <h1 className="sr-only">Our Work</h1>
      <Seo
        title="Web Design Portfolio in Seychelles"
        description="Selected work and concept demos for Seychelles businesses."
        path="/work"
        keywords="portfolio web design Seychelles"
      />
      <div className="hidden lg:block">
        <FullScreenScrollFX
          sections={sections}
          topOffset={4}
          showProgress
          durations={{ change: 0.7, snap: 800 }}
          bgTransition="fade"
          colors={{ overlay: "rgba(2,8,10,0.12)", text: "rgba(230,240,240,0.76)", pageBg: "#05090a", stageBg: "#05090a" }}
        />
        <section className="bg-bg">
          <div className="mx-auto w-full max-w-7xl px-8 py-20">
            <div className="mb-10">
              <p className="text-xs uppercase tracking-[0.4em] text-accent">Our Work</p>
              <h2 className="mt-3 text-3xl font-semibold text-text md:text-4xl">Selected highlights</h2>
              <p className="mt-4 max-w-2xl text-sm text-text-muted">
                A focused snapshot of real builds and concept demos, with the tier and outcome for each.
              </p>
              <div className="mt-6 horizon-line" />
            </div>
            <div className="grid gap-10 md:grid-cols-3">
              <Card>
                <p className="text-xs uppercase tracking-[0.3em] text-accent">Starter Tier</p>
                <h3 className="mt-3 text-lg font-semibold text-text">Drake Seaside</h3>
                <p className="mt-4 text-sm text-text-muted">
                  Redesign with new pages, updated content, faster load times, and higher click-through conversions.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button
                    label="View live site"
                    href="https://thedrake-seaside.com/"
                    target="_blank"
                    rel="noreferrer"
                    size="sm"
                    variant="outline"
                  />
                  <Button label="Request similar site" to="/contact" size="sm" />
                </div>
              </Card>
              <Card>
                <p className="text-xs uppercase tracking-[0.3em] text-accent">Foundation Tier</p>
                <h3 className="mt-3 text-lg font-semibold text-text">SeyKelz</h3>
                <p className="mt-4 text-sm text-text-muted">
                  Foundation-tier website for a Seychelles toner cartridge store selling genuine and compatible supplies.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button
                    label="View live site"
                    href="https://sey-kelz.horizondigitalsey.com/"
                    target="_blank"
                    rel="noreferrer"
                    size="sm"
                    variant="outline"
                  />
                  <Button label="Request similar site" to="/contact" size="sm" />
                </div>
              </Card>
              <Card>
                <p className="text-xs uppercase tracking-[0.3em] text-accent">Growth Tier</p>
                <h3 className="mt-3 text-lg font-semibold text-text">ConceptDemo</h3>
                <p className="mt-4 text-sm text-text-muted">
                  Layout previews showing structure, hierarchy, and conversion flow for new builds.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button label="Request a demo" to="/contact" size="sm" variant="outline" />
                </div>
              </Card>
            </div>
          </div>
        </section>
      </div>
      <div className="lg:hidden">
        <section className="bg-bg pt-12">
          <div className="mx-auto w-full max-w-7xl px-6">
            <p className="text-xs uppercase tracking-[0.4em] text-accent">Our Work</p>
            <h2 className="mt-3 text-3xl font-semibold text-text">Selected highlights</h2>
            <div className="mt-6 horizon-line" />
          </div>
        </section>
        <Timeline
          showHeader={false}
          data={sections.map((section) => ({
            title: <span className="text-accent">{section.title}</span>,
            content: (
              <div>
                <p className="text-sm text-accent-2">
                  {section.title}  {section.rightLabel}
                </p>
                <p className="mt-3 text-sm text-text-muted">
                  {section.id === "drake-seaside"
                    ? "Redesign with new pages, updated content, faster load times, and higher click-through conversions."
                    : section.id === "seykelz"
                      ? "Foundation-tier website for a Seychelles toner cartridge store selling genuine and compatible supplies."
                      : "Layout previews showing structure, hierarchy, and conversion flow for new builds."}
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {(section.id === "drake-seaside"
                    ? [
                        { src: drakeMain, webp: drakeMainWebp },
                        { src: drakeAltOne, webp: drakeAltOneWebp },
                      ]
                    : section.id === "seykelz"
                      ? [
                          { src: seykelzMain, webp: seykelzMainWebp },
                          { src: seykelzAltOne, webp: seykelzAltOneWebp },
                        ]
                      : [
                          { src: demoCafe, webp: demoCafeWebp },
                          { src: demoConsulting, webp: demoConsultingWebp },
                        ]
                  ).map((image, index) => (
                    <picture key={`${section.id}-${index}`}>
                      <source srcSet={image.webp} type="image/webp" />
                      <img
                        src={image.src}
                        alt={`${section.title} preview`}
                        width={800}
                        height={520}
                        loading="lazy"
                        decoding="async"
                        className="h-40 w-full rounded-2xl border border-border bg-bg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08)]"
                      />
                    </picture>
                  ))}
                </div>
                {section.id === "demo" && (
                  <div className="mt-6">
                    <Button label="Request a demo" to="/contact" size="sm" />
                  </div>
                )}
              </div>
            ),
          }))}
        />
      </div>
    </div>
  );
}
