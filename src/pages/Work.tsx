import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Modal from "../components/Modal";
import Section from "../components/Section";
import Seo from "../components/Seo";
import { workItems } from "../data/site";

export default function Work() {
  const [activeWork, setActiveWork] = useState<null | (typeof workItems)[0]>(null);

  return (
    <div>
      <h1 className="sr-only">Our Work</h1>
      <Seo
        title="Web Design Portfolio"
        description="Selected work and concept demos for Seychelles businesses."
        path="/work"
        keywords="portfolio web design Seychelles"
      />
      <Section
        eyebrow="Our Work"
        title="Selected work and layout previews"
        description="A mix of real projects and concept demos to show the direction."
      >
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
          {workItems.map((item) => (
            <Card key={item.label} className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" />
              <div className="relative">
                <div className="preview-frame mb-6 h-32 w-full overflow-hidden rounded-2xl border border-border">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={`${item.label} concept preview`}
                      className="h-full w-full bg-bg object-contain scale-[1.08] md:scale-[1.12]"
                    />
                  ) : (
                    <div className="absolute inset-0 preview-shimmer" />
                  )}
                </div>
                <p className="text-xs uppercase tracking-[0.3em] text-accent">{item.label}</p>
                <h3 className="mt-2 text-lg font-semibold text-text">{item.title}</h3>
                <p className="mt-4 text-sm text-text-muted">{item.outcome}</p>
                <div className="mt-10 flex flex-wrap gap-5">
                  {item.url ? (
                    <Button
                      label="View live site"
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      variant="outline"
                      size="sm"
                    />
                  ) : (
                    <Button
                      label="View preview"
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveWork(item)}
                    />
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Modal
        open={Boolean(activeWork)}
        title={activeWork ? `${activeWork.title} - ${activeWork.label}` : ""}
        onClose={() => setActiveWork(null)}
      >
        {activeWork?.url ? (
          <>
            <p>This is a live website built for a real client.</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button
                label="View live site"
                href={activeWork.url}
                target="_blank"
                rel="noreferrer"
                size="sm"
              />
              <Button label="Request similar site" to="/contact" size="sm" variant="outline" />
            </div>
          </>
        ) : (
          <>
            <p>
              This is a concept demo showing layout direction, button placement, and section
              order. We build each site around your content and goals.
            </p>
            <div className="mt-6">
              <Button label="Request similar site" to="/contact" size="sm" />
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}
