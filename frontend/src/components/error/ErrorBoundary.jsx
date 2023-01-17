import { Component } from 'react';
import { GlobalErrorWrapper } from '../styled';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    if (this.state.error) {
      return (
        <GlobalErrorWrapper>
          <h1>Oops, something went wrong!</h1>
          <p>Error: {this.state.error.message}</p>
          <pre>{this.state.error.stack}</pre>
          <button onClick={() => this.setState({ error: null })}>
            Try Again
          </button>
        </GlobalErrorWrapper>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
