import {
  BarChart3,
  Check,
  ClipboardCheck,
  Compass,
  FileSearch,
  Fingerprint,
  LayoutTemplate,
  MessageCircle,
  MonitorSmartphone,
  MousePointer2,
  Route,
  SearchCheck,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { getServiceStoryDelay } from "./serviceVisualStories";

type StoryFrameProps = {
  children: ReactNode;
  className: string;
  decorative?: boolean;
};

function StoryFrame({ children, className, decorative = true }: StoryFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setActive(Boolean(entry?.isIntersecting)),
      { rootMargin: "120px 0px", threshold: 0.16 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`service-story ${className}`}
      data-story-active={active}
      aria-hidden={decorative ? true : undefined}
    >
      {children}
    </div>
  );
}

const delay = (kind: "atelier" | "seo" | "analytics", stage: string) =>
  ({ "--story-delay": `${getServiceStoryDelay(kind, stage)}s` }) as CSSProperties;

export function WebsiteBuildAtelier({ compact = false }: { compact?: boolean }) {
  return (
    <StoryFrame className={`atelier-story${compact ? " is-compact" : ""}`}>
      <div className="atelier-blueprint">
        <span />
        <span />
        <span />
      </div>
      <div className="atelier-browser">
        <div className="atelier-browser-bar">
          <i />
          <i />
          <i />
          <span />
        </div>
        <div className="atelier-canvas">
          <div className="atelier-nav story-stage" style={delay("atelier", "structure")} />
          <div className="atelier-copy story-stage" style={delay("atelier", "structure")}>
            <i />
            <i />
            <i />
            <b />
          </div>
          <div className="atelier-image story-stage" style={delay("atelier", "design")}>
            <svg viewBox="0 0 160 112" fill="none">
              <path d="M0 91c28-43 50-21 73-50 24-31 45-12 87-37v108H0Z" fill="currentColor" opacity=".22" />
              <path d="M0 99c38-22 66-9 91-34 24-23 43-16 69-29" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <div className="atelier-card-row story-stage" style={delay("atelier", "design")}>
            <i />
            <i />
            <i />
          </div>
          <div className="atelier-cursor story-stage" style={delay("atelier", "brief")}>
            <MousePointer2 size={18} strokeWidth={1.7} />
          </div>
        </div>
      </div>
      <div className="atelier-phone story-stage" style={delay("atelier", "responsive")}>
        <i />
        <i />
        <b />
      </div>
      <div className="atelier-ready story-stage" style={delay("atelier", "ready")}>
        <Check size={13} strokeWidth={2.4} />
        <span>Ready for review</span>
      </div>
      <div className="atelier-tool atelier-tool-grid"><LayoutTemplate size={15} /></div>
      <div className="atelier-tool atelier-tool-route"><Route size={15} /></div>
    </StoryFrame>
  );
}

export function SeoReviewStory({ compact = false }: { compact?: boolean }) {
  return (
    <StoryFrame className={`seo-review-story${compact ? " is-compact" : ""}`}>
      <svg className="story-connector" viewBox="0 0 560 250" preserveAspectRatio="none">
        <path d="M70 62H180c30 0 34 54 66 54h80c34 0 34-48 68-48h94" pathLength="1" />
        <path d="M326 116c38 0 42 72 80 72h82" pathLength="1" />
      </svg>
      <div className="seo-crawl story-node story-stage" style={delay("seo", "crawl")}>
        <Compass size={22} />
        <span>Crawl</span>
      </div>
      <div className="seo-pages story-stage" style={delay("seo", "checks")}>
        <div><SearchCheck size={18} /><i /><i /></div>
        <div><FileSearch size={18} /><i /><i /></div>
        <div><SlidersHorizontal size={18} /><i /><i /></div>
      </div>
      <div className="seo-priorities story-stage" style={delay("seo", "priorities")}>
        <span>Priorities</span>
        <i /><i /><i />
      </div>
      <div className="seo-boundary story-stage" style={delay("seo", "boundary")}>
        <div><ClipboardCheck size={17} /><span>Review</span></div>
        <b>or</b>
        <div><Sparkles size={17} /><span>Scoped implementation</span></div>
      </div>
    </StoryFrame>
  );
}

export function AnalyticsMeasurementStory({ compact = false }: { compact?: boolean }) {
  return (
    <StoryFrame className={`analytics-story${compact ? " is-compact" : ""}`}>
      <svg className="story-connector" viewBox="0 0 620 270" preserveAspectRatio="none">
        <path d="M58 74H520" pathLength="1" />
        <path d="M414 74c0 76 52 76 96 76" pathLength="1" />
      </svg>
      <div className="analytics-pipeline">
        <div className="story-node story-stage" style={delay("analytics", "interaction")}><MousePointer2 size={19} /><span>Interaction</span></div>
        <div className="story-node story-stage" style={delay("analytics", "consent")}><ShieldCheck size={19} /><span>Consent</span></div>
        <div className="story-node story-stage" style={delay("analytics", "measurement")}><BarChart3 size={19} /><span>Measurement</span></div>
        <div className="story-node story-stage" style={delay("analytics", "verification")}><SearchCheck size={19} /><span>Verify</span></div>
      </div>
      <div className="analytics-activity story-stage" style={delay("analytics", "activity")}>
        <span>Simple activity</span>
        <div><i /><i /><i /><i /><i /></div>
      </div>
      <div className="profile-owner story-stage" style={delay("analytics", "verification")}>
        <Fingerprint size={21} />
        <div><strong>Business profile</strong><span>Client-owned account</span></div>
        <Check size={15} />
      </div>
    </StoryFrame>
  );
}

export function ServiceFamilyVisual({ kind }: { kind: string }) {
  if (kind === "website") return <WebsiteBuildAtelier />;
  if (kind === "seo") return <SeoReviewStory compact />;
  return <AnalyticsMeasurementStory compact />;
}

export function WebsiteComparisonGraphic({ state }: { state: "starting-point" | "horizon-outcome" }) {
  return (
    <div className="website-comparison-art" data-comparison-state={state} aria-hidden="true">
      <div className="comparison-browser">
        <div className="comparison-chrome"><i /><i /><i /><span /></div>
        <div className="comparison-layout">
          <div className="comparison-nav"><i /><i /><i /><b /></div>
          <div className="comparison-copy"><span /><strong /><i /><i /><button tabIndex={-1} /></div>
          <div className="comparison-media"><Route size={34} /><i /></div>
          <div className="comparison-cards"><i /><i /><i /></div>
        </div>
      </div>
      <div className="comparison-mobile"><i /><i /><b /></div>
      <div className="comparison-marker comparison-marker-search"><SearchCheck size={15} /><span>Search</span></div>
      <div className="comparison-marker comparison-marker-contact"><MessageCircle size={15} /><span>Contact</span></div>
      <div className="comparison-marker comparison-marker-measure"><BarChart3 size={15} /><span>Measure</span></div>
      <div className="comparison-status"><span>{state === "starting-point" ? "Disconnected modules" : "Aligned website system"}</span></div>
    </div>
  );
}

type JourneyStep = { title: string; body?: string; description?: string };
type JourneyVariant = "website" | "review" | "measurement";

const journeyIcons: Record<JourneyVariant, LucideIcon[]> = {
  website: [Compass, LayoutTemplate, MessageCircle, SearchCheck, SlidersHorizontal, MonitorSmartphone],
  review: [FileSearch, SearchCheck, SlidersHorizontal, ClipboardCheck],
  measurement: [FileSearch, Fingerprint, SlidersHorizontal, ClipboardCheck],
};

export function ServiceJourney({
  steps,
  label,
  variant = "review",
  className = "",
}: {
  steps: readonly JourneyStep[];
  label?: string;
  variant?: JourneyVariant;
  className?: string;
}) {
  const icons = journeyIcons[variant];
  const frameRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(-1);
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start 0.82", "end 0.6"],
  });
  const traceProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (shouldReduceMotion) return;
    const nextIndex = Math.min(
      steps.length - 1,
      Math.max(-1, Math.floor(latest * steps.length)),
    );
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  const visibleActiveIndex = shouldReduceMotion ? steps.length - 1 : activeIndex;

  return (
    <div
      ref={frameRef}
      className={`service-journey-frame ${className}`}
      data-story-active="true"
    >
      <div className="service-journey-rail" aria-hidden="true">
        <motion.i
          style={{ "--journey-progress": shouldReduceMotion ? 1 : traceProgress } as CSSProperties}
        />
      </div>
      <ol className="service-flow service-journey" aria-label={label}>
        {steps.map((step, index) => {
          const Icon = icons[index] ?? Check;
          const state = index <= visibleActiveIndex ? "active" : "upcoming";
          return (
            <li
              key={step.title}
              data-state={state}
              style={{ "--journey-index": index } as CSSProperties}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div className="service-journey-icon" aria-hidden="true"><Icon size={20} strokeWidth={1.7} /></div>
              <h3>{step.title}</h3>
              {(step.body ?? step.description) && <p>{step.body ?? step.description}</p>}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
