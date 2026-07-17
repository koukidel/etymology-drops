"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "@/hooks/useTranslation";
import { useMounted } from "@/hooks/useMounted";
import { useGameStore, currentStreak } from "@/store/useGameStore";

export function Header() {
    const { t } = useTranslation();
    const pathname = usePathname();
    const { streak, lastActiveDate } = useGameStore();
    const mounted = useMounted();

    const activeStreak = mounted ? currentStreak(streak, lastActiveDate) : 0;

    // Funnel order: learn → apply → look up → reflect.
    const links = [
        { href: "/", label: t('nav.path') },
        { href: "/practice", label: t('nav.practice') },
        { href: "/dictionary", label: t('nav.dictionary') },
        { href: "/profile", label: t('nav.progress') },
    ];

    return (
        <header className="border-b border-border bg-background sticky top-0 z-40">
            <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="font-serif text-xl text-foreground">
                    {t('app.title')}
                </Link>

                <div className="flex items-center gap-6">
                    <nav className="flex items-center gap-5">
                        {links.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm transition-colors ${
                                    pathname === link.href
                                        ? "text-foreground"
                                        : "text-muted-foreground hover:text-foreground"
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {activeStreak > 0 && (
                        <span className="text-sm text-muted-foreground whitespace-nowrap" title={t('streak.label')}>
                            {`Day ${activeStreak}`}
                        </span>
                    )}

                    <LanguageSwitcher />
                </div>
            </div>
        </header>
    );
}
