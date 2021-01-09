import React, { ErrorInfo, ReactElement } from 'react';

import './styles.scss';

type Props = {
  fallback?: ReactElement;
};

type State = {
  error: Error | null;
  errorInfo: ErrorInfo | null;
};

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Catch errors in any spinners below and re-render with error message
    this.setState({
      error,
      errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    const { error, errorInfo } = this.state || {};
    const { children, fallback } = this.props || {};

    if (errorInfo) {
      // Error path
      if (!fallback) {
        return (
            <div className="error-boundary">
              <h2>Что-то пошло не так.</h2>
              <details className="error-boundary__details">
                {error && error.toString()}
                <br />
                {errorInfo.componentStack}
              </details>
            </div>
        );
      } else {
        return fallback;
      }
    }
    // Normally, just render children
    return children;
  }
}
