"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, TreeDeciduous, Hammer, Gavel, Zap, Book, Store, Target } from "lucide-react";

import { useTranslation } from "@/hooks/useTranslation";

export function BottomNav() {
    const pathname = usePathname();
    const { t } = useTranslation();

    // Immersive Mode: Hide nav on Lesson, Master, Speedrun, Verdict, Forge
    if (pathname.startsWith("/lesson") || pathname.startsWith("/master") || pathname.startsWith("/speedrun") || pathname.startsWith("/verdict") || pathname.startsWith("/forge")) {
        return null;
    }

    const navItems = [
        { href: "/", label: t('nav.path'), icon: Home },
        { href: "/drill", label: "Drill", icon: Target },
        { href: "/shop", label: "Shop", icon: Store },
        { href: "/crafting", label: "Craft", icon: Hammer },
        { href: "/dictionary", label: "Codex", icon: Book },
        { href: "/verdict", label: t('nav.law'), icon: Gavel },
        { href: "/speedrun", label: t('nav.run'), icon: Zap },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-4 z-50 flex justify-between items-center shadow-[0_-4px_20px_rgba(0,0,0,0.05)] safe-area-pb">
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex flex-col items-center gap-1 transition-colors ${isActive ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"}`}
                    >
                        <div className={`p-1.5 rounded-xl ${isActive ? "bg-indigo-50" : "bg-transparent"}`}>
                            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wide">{item.label}</span>
                    </Link>
                );
            })}
        </div>
    );
}
