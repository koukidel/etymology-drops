"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Blocks, BookOpen, Sprout } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

// Mobile bottom tab bar: the four destinations live where the thumb lives.
// Hidden on ≥sm (the header nav takes over) and absent on immersive pages
// (lessons render no Header, hence no TabBar).
export function TabBar() {
    const pathname = usePathname();
    const { t } = useTranslation();

    const tabs = [
        { href: "/", icon: House, label: t("nav.path"), active: pathname === "/" || pathname === "/today" },
        { href: "/practice", icon: Blocks, label: t("nav.practice"), active: pathname.startsWith("/practice") || pathname.startsWith("/speedrun") },
        { href: "/dictionary", icon: BookOpen, label: t("nav.dictionary"), active: pathname.startsWith("/dictionary") },
        { href: "/profile", icon: Sprout, label: t("nav.progress"), active: pathname.startsWith("/profile") },
    ];

    return (
        <nav
            data-tabbar
            className="sm:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-background/95 backdrop-blur-sm"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
            <div className="grid grid-cols-4">
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    return (
                        <Link
                            key={tab.href}
                            href={tab.href}
                            className={`flex flex-col items-center gap-1 py-2.5 text-[10px] transition-colors ${
                                tab.active ? "text-accent" : "text-muted-foreground"}`}
                        >
                            <Icon size={20} strokeWidth={tab.active ? 2.2 : 1.8} />
                            {tab.label}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
