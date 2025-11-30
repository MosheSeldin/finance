import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div dir="rtl" className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-2xl">
            <h1 className="text-2xl font-bold text-red-400 mb-4">⚠️ שגיאה בטעינת האפליקציה</h1>
            <p className="text-white mb-4">משהו השתבש. פרטי השגיאה:</p>
            <pre className="bg-black/30 p-4 rounded text-sm text-white overflow-auto" dir="ltr">
              {this.state.error && this.state.error.toString()}
              {'\n\n'}
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg"
            >
              טען מחדש
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
