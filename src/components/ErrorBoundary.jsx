import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ErrorBoundary = ({ children, fallback }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const errorHandler = (event) => {
      setHasError(true);
      setError(event.error || new Error(event.message));
      console.error("Uncaught error:", event.error);
    };

    window.addEventListener("error", errorHandler);
    return () => window.removeEventListener("error", errorHandler);
  }, []);

  if (hasError) {
    return (
      fallback || (
        <div className="error-fallback">
          <h2>Something went wrong</h2>
          <p>{error?.message}</p>
          <button
            onClick={() => {
              setHasError(false);
              setError(null);
            }}
          >
            Try Again
          </button>
        </div>
      )
    );
  }

  return children;
};

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
};

export default ErrorBoundary;
