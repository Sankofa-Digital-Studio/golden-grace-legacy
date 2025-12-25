import React from 'react';
import { Hexagon } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] text-white p-4 text-center">
            <Hexagon className="text-amber-500 w-16 h-16 mb-4 animate-pulse" />
            <h1 className="text-2xl font-serif mb-2">Something went wrong.</h1>
            <p className="text-gray-400 mb-6">Our bees are working on fixing this issue.</p>
            <button 
                onClick={() => window.location.reload()} 
                className="px-6 py-2 bg-amber-500 text-black font-bold uppercase tracking-widest hover:bg-white transition-colors"
            >
                Refresh Page
            </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;