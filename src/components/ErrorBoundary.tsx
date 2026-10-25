import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
export class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Celestial Dive could not render', error, info.componentStack);
  }
  render() {
    return this.state.failed ? (
      <main className="error-page">
        <p className="eyebrow">CELESTIAL DIVE 5.0</p>
        <h1>
          A small detour
          <br />
          among the stars.
        </h1>
        <p>Something interrupted the page. Please refresh to try again.</p>
        <button className="button button-light" onClick={() => location.reload()}>
          Reload the page
        </button>
        <a href="mailto:astronomy@vit.ac.in">Contact VIT Stellar</a>
      </main>
    ) : (
      this.props.children
    );
  }
}
