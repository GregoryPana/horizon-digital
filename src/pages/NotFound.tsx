import { Link } from "react-router-dom";
import Seo from "../components/Seo";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70svh] w-full max-w-7xl flex-col items-center justify-center px-6 text-center">
      <Seo
        title="Page Not Found"
        description="The page you requested could not be found."
        path="/404"
        robots="noindex,follow"
      />
      <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">404</p>
      <h1 className="font-display text-4xl font-semibold text-white md:text-5xl">Page not found</h1>
      <p className="mt-4 max-w-xl text-sm text-text-muted md:text-base">
        The link may be outdated or the page may have moved.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link to="/" className="rounded-lg border border-cyan/40 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-cyan transition hover:bg-cyan/10">
          Back to home
        </Link>
        <Link to="/contact" className="rounded-lg border border-white/20 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:border-cyan/40 hover:text-cyan">
          Contact us
        </Link>
      </div>
    </div>
  );
}
