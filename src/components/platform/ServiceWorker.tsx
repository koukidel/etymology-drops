"use client";

import { useEffect } from "react";

// Registers the offline service worker (production only — the SW would fight
// dev HMR). Failures are silent: offline support is progressive enhancement.
export function ServiceWorker() {
    useEffect(() => {
        if (process.env.NODE_ENV !== "production") return;
        if (!("serviceWorker" in navigator)) return;
        navigator.serviceWorker.register("/sw.js").catch(() => {});
    }, []);
    return null;
}
