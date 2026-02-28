import Seo from "../components/Seo";
import Button from "../components/Button";
import { Timeline } from "../components/ui/timeline";
import drakeMain from "../assets/work/drake-seaside/drake-seaside.png";
import drakeAltOne from "../assets/work/drake-seaside/drake-seaside 2.png";
import drakeMainWebp from "../assets/work/drake-seaside/drake-seaside.webp";
import drakeAltOneWebp from "../assets/work/drake-seaside/drake-seaside 2.webp";
import seykelzMain from "../assets/work/seykelz/seykelz.png";
import seykelzAltOne from "../assets/work/seykelz/seykelz 2.png";
import seykelzMainWebp from "../assets/work/seykelz/seykelz.webp";
import seykelzAltOneWebp from "../assets/work/seykelz/seykelz 2.webp";

export default function Work() {
  const timelineData = [
    {
      title: <span className="text-accent">Drake Seaside</span>,
      content: (
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-2">
            Growth Tier
          </p>
          <p className="mt-4 text-sm text-text-muted">
            Redesign with new pages, updated content, faster load times, and higher click-through
            conversions.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { src: drakeMain, webp: drakeMainWebp, label: "Drake Seaside main" },
              { src: drakeAltOne, webp: drakeAltOneWebp, label: "Drake Seaside detail" },
            ].map((image) => (
              <picture key={image.label}>
                <source srcSet={image.webp} type="image/webp" />
                <img
                  src={image.src}
                  alt={image.label}
                  width={800}
                  height={520}
                  loading="lazy"
                  decoding="async"
                  className="h-48 w-full rounded-2xl border border-border bg-bg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08)]"
                />
              </picture>
            ))}
          </div>
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
        </div>
      ),
    },
    {
      title: <span className="text-accent">SeyKelz</span>,
      content: (
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-2">
            Foundation Tier
          </p>
          <p className="mt-4 text-sm text-text-muted">
            Foundation-tier website for a Seychelles toner cartridge store selling genuine and
            compatible supplies.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { src: seykelzMain, webp: seykelzMainWebp, label: "SeyKelz main" },
              { src: seykelzAltOne, webp: seykelzAltOneWebp, label: "SeyKelz detail" },
            ].map((image) => (
              <picture key={image.label}>
                <source srcSet={image.webp} type="image/webp" />
                <img
                  src={image.src}
                  alt={image.label}
                  width={800}
                  height={520}
                  loading="lazy"
                  decoding="async"
                  className="h-48 w-full rounded-2xl border border-border bg-bg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08)]"
                />
              </picture>
            ))}
          </div>
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
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1 className="sr-only">Our Work</h1>
      <Seo
        title="Web Design Portfolio in Seychelles"
        description="Selected web design work for Seychelles businesses."
        path="/work"
        keywords="portfolio web design Seychelles"
      />
      <Timeline
        eyebrow="Our Work"
        title="Selected highlights"
        description="A focused snapshot of real builds, with the tier and outcome for each."
        data={timelineData}
      />
    </div>
  );
}
