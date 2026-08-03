import { Component, type ErrorInfo, type ReactNode } from "react";

type RouteLoadErrorBoundaryProps = {
  children: ReactNode;
  resetKey: string;
  reload?: () => void;
};

type RouteLoadErrorBoundaryState = {
  hasError: boolean;
};

export default class RouteLoadErrorBoundary extends Component<
  RouteLoadErrorBoundaryProps,
  RouteLoadErrorBoundaryState
> {
  state: RouteLoadErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): RouteLoadErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo): void {
    // React reports the original error. Recovery stays user-controlled to avoid reload loops.
  }

  componentDidUpdate(previousProps: RouteLoadErrorBoundaryProps): void {
    if (this.state.hasError && previousProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false });
    }
  }

  private reload = (): void => {
    if (this.props.reload) {
      this.props.reload();
      return;
    }
    window.location.reload();
  };

  render(): ReactNode {
    if (!this.state.hasError) return this.props.children;

    return (
      <section
        className="mx-auto flex min-h-[60dvh] w-full max-w-3xl flex-col items-start justify-center gap-5 px-6 py-24 text-text md:px-10"
        role="alert"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Connection interrupted
        </p>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Page could not load.</h1>
        <p className="max-w-xl text-base leading-7 text-muted">
          Check your connection, then try loading this page again.
        </p>
        <button
          className="focus-ring min-h-11 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg"
          onClick={this.reload}
          type="button"
        >
          Try again
        </button>
      </section>
    );
  }
}
