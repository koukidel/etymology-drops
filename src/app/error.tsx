"use client";

import { useEffect } from "react";

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
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-4">
            <h2 className="font-serif text-3xl text-foreground">Something went wrong</h2>
            <p className="text-muted-foreground max-w-md">
                We encountered an unexpected error. Please try again.
            </p>
            <button
                onClick={reset}
                className="px-8 py-3 bg-foreground text-background rounded-full hover:opacity-90 transition-opacity"
            >
                Try again
            </button>
        </div>
    );
}
