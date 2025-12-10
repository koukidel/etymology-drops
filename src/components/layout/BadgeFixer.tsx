"use client";

import { useEffect } from "react";

/**
 * Next.js 13+ Dev Indicator Fixer
 * 
 * This component runs a MutationObserver to watch for the injection of the 
 * Next.js development badge (often likely inside a Shadow Root or Portal).
 * It then forcibly applies CSS styles to move it out of the way.
 */
export function BadgeFixer() {
    useEffect(() => {
        // Function to find and move the badge
        const fixBadge = () => {
            // Common selectors for Next.js indicators
            const selectors = [
                "nextjs-portal",
                "#nextjs-dev-tools-overlay",
                "next-route-announcer",
                ".nextjs-static-indicator-toast-wrapper",
                "[data-nextjs-toast-wrapper]"
            ];

            // 1. Light DOM Search
            const elements = document.querySelectorAll(selectors.join(", "));
            elements.forEach(el => applyStyles(el as HTMLElement));

            // 2. Specialized Shadow DOM Search (Common in Turbopack)
            // Next.js often appends a custom element like <nextjs-portal>
            const portals = document.querySelectorAll("nextjs-portal, [class*='nextjs-portal']");
            portals.forEach(portal => {
                applyStyles(portal as HTMLElement);
                if (portal.shadowRoot) {
                    const shadowElements = portal.shadowRoot.querySelectorAll("div, span, [class*='indicator']");
                    shadowElements.forEach(el => {
                        // Apply to container inside shadow
                        applyStyles(el as HTMLElement, true);
                    });
                }
            });
        };

        const applyStyles = (el: HTMLElement, isShadow = false) => {
            if (!el) return;

            // Hide the badge entirely - it's now in FloatingNav
            el.style.setProperty("display", "none", "important");
        };

        // Run initially
        fixBadge();

        // Run on mutations
        const observer = new MutationObserver((mutations) => {
            fixBadge();
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => observer.disconnect();
    }, []);

    return null; // Render nothing
}
