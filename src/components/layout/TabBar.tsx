"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Blocks, BookOpen, Sprout } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";

// Mobile bottom tab bar: the four destinations live where the thumb lives.
// Hidden on ≥sm (the header nav takes over) and absent on immersive pages
// (lessons render no Header, hence no TabBar).
//
// Staged reveal: on day one only Path exists — three extra tabs are three
// extra questions for someone who hasn't done anything yet. The rest appear
// once Lesson 0 opens the app, each wearing a small "new" dot until visited.
export function TabBar() {
    const pathname = usePathname();
    const { t } = useTranslation();
    const { hasSeenOnboarding } = useGameStore();
    const mounted = useMounted();
    const unlocked = mounted && hasSeenOnboarding;

    const all = [
        { href: "/", icon: House, label: t("nav.path"), active: pathname === "/" || pathname === "/today" },
        { href: "/practice", icon: Blocks, label: t("nav.practice"), active: pathname.startsWith("/practice") || pathname.startsWith("/speedrun") },
        { href: "/dictionary", icon: BookOpen, label: t("nav.dictionary"), active: pathname.startsWith("/dictionary") },
        { href: "/profile", icon: Sprout, label: t("nav.progress"), active: pathname.startsWith("/profile") },
    ];
    const tabs = unlocked ? all : all.slice(0, 1);

    // A visited tab sheds its "new" dot.
    useEffect(() => {
        if (!unlocked) return;
        const current = all.find(tab => tab.active && tab.href !== "/");
        if (current) localStorage.setItem(`minamoto_tab_seen_${current.href}`, "1");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, unlocked]);

    return (
        <nav
            data-tabbar
            className="sm:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-background/95 backdrop-blur-sm"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
            <div className="grid" style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}>
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    const fresh = unlocked && tab.href !== "/" && !tab.active
                        && !localStorage.getItem(`minamoto_tab_seen_${tab.href}`);
                    return (
                        <Link
                            key={tab.href}
                            href={tab.href}
                            className={`relative flex flex-col items-center gap-1 py-2.5 text-[10px] transition-colors ${
                                tab.active ? "text-accent" : "text-muted-foreground"}`}
                        >
                            <span className="relative">
                                <Icon size={20} strokeWidth={tab.active ? 2.2 : 1.8} />
                                {fresh && (
                                    <span className="absolute -top-0.5 -right-1 w-1.5 h-1.5 rounded-full bg-accent" aria-hidden />
                                )}
                            </span>
                            {tab.label}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
