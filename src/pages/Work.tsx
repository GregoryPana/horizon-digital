import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Modal from "../components/Modal";
import Section from "../components/Section";
import { workItems } from "../data/site";

export default function Work() {
  const [activeWork, setActiveWork] = useState<null | (typeof workItems)[0]>(null);

  return (
    <div>
      <Section
        eyebrow="Work"
        title="Concept demos to show structure"
        description="Examples that show layout direction without claiming real clients."
      >
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
          {workItems.map((item) => (
            <Card key={item.label} className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" />
              <div className="relative">
                <div className="preview-frame mb-6 h-32 w-full rounded-2xl border border-border bg-gradient-to-br from-accent/20 via-transparent to-accent-2/20">
                  <div className="absolute inset-0 preview-shimmer" />
                  <div className="absolute left-4 top-4 h-12 w-20 rounded-lg bg-bg-elev/70 blur-[1px]" />
                  <div className="absolute right-5 top-6 h-6 w-16 rounded-md bg-bg-elev/60 blur-[1px]" />
                  <div className="absolute left-6 bottom-4 h-5 w-24 rounded-md bg-bg-elev/60 blur-[1px]" />
                </div>
                <p className="text-xs uppercase tracking-[0.3em] text-accent">{item.label}</p>
                <h3 className="mt-2 text-lg font-semibold text-text">{item.title}</h3>
                <p className="mt-4 text-sm text-text-muted">{item.outcome}</p>
                <div className="mt-10 flex flex-wrap gap-5">
                  <Button
                    label="View preview"
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveWork(item)}
                  />
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
        <p>
          This is a concept demo showing layout direction, button placement, and section order. We
          build each site around your content and goals.
        </p>
        <div className="mt-6">
          <Button label="Request similar site" to="/contact" size="sm" />
        </div>
      </Modal>
    </div>
  );
}
