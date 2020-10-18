import React, {ErrorInfo} from "react";

import {R500Page} from "./500";

export class ErrorBoundary extends React.Component {
    public state = {hasError: false};

    static getDerivedStateFromError() {
        return {hasError: true};
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error(error);
        console.error(errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (<R500Page />);
        }
        return this.props.children;
    }
}
