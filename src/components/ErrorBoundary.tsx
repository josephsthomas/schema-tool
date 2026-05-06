import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  message?: string;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: unknown): State {
    return {
      hasError: true,
      message: error instanceof Error ? error.message : String(error),
    };
  }

  componentDidCatch(error: unknown) {
    console.error('ErrorBoundary caught', error);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    if (this.props.fallback) return this.props.fallback;
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <p className="text-sm font-medium text-red-700 dark:text-red-400">Error</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Something went wrong rendering this view.</h1>
        {this.state.message && (
          <p className="mt-3 font-mono text-xs text-zinc-600 dark:text-zinc-400">
            {this.state.message}
          </p>
        )}
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-6 rounded-md border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
        >
          Reload
        </button>
      </div>
    );
  }
}
