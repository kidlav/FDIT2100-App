import { Component, type ErrorInfo, type ReactNode } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { ERROR_NOTICE } from "@/lib/constants";

interface Props {
    children?: ReactNode;
    message?: string;

}

interface State {
    hasError: boolean;
}



export default class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(): State {
        return { hasError:true}
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (<div className="flex text-red-500">
                <ExclamationTriangleIcon className="size-6 mr-4"/> {`${ERROR_NOTICE} ${this.props.message}`}
            </div>);
        }
        return this.props.children;

    }
}

