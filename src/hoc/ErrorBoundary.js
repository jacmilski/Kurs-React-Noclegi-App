//ErrorBoundary może być tylko klasowy
import React, { Component } from 'react';

class ErrorBoundary extends Component {
    state = {
        hasError: false,
    }

    /* componentDidCatch(error, errrInfo) {
        console.log('Error Boundary');
        console.log(error);
        console.log('--------------');
        console.log(errrInfo);
    } */
    //... lub
    static getDerivedStateFromError() {
        return { hasError: true};
    }

    render() {
        if (this.state.hasError) {
            return <h1>Wystąpił jakiś błąd!</h1>
        }
        return this.props.children;
    };
};

export default ErrorBoundary;