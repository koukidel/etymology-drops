"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 text-center space-y-4">
            <div className="p-4 bg-red-100 text-red-600 rounded-full">
                <AlertTriangle size={48} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Something went wrong!</h2>
            <p className="text-slate-500 max-w-md">
                We encountered an unexpected error. Please try again.
            </p>
            <button
                onClick={reset}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
            >
                Try again
            </button>
        </div>
    );
}
