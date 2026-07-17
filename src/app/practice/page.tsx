"use client";

import Link from "next/link";
import { Zap, BookOpenText, Blocks } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { useMounted } from "@/hooks/useMounted";
import { useTranslation } from "@/hooks/useTranslation";

export default function PracticePage() {
    const { t } = useTranslation();
    const mounted = useMounted();
    if (!mounted) return null;

    const modes = [
        { href: "/speedrun", icon: Zap, title: t("practice.timeattack.title"), desc: t("practice.timeattack.desc") },
        { href: "/practice/study", icon: BookOpenText, title: t("practice.study.title"), desc: t("practice.study.desc") },
        { href: "/practice/build", icon: Blocks, title: t("practice.build.title"), desc: t("practice.build.desc") },
    ];

    return (
        <div className="min-h-screen">
            <Header />
            <main className="max-w-3xl mx-auto px-6 py-12">
                <h1 className="font-serif text-3xl text-foreground mb-2">{t("practice.title")}</h1>
                <p className="text-sm text-muted-foreground mb-10">{t("practice.subtitle")}</p>

                <div className="space-y-3">
                    {modes.map(m => {
                        const Icon = m.icon;
                        return (
                            <Link
                                key={m.href}
                                href={m.href}
                                className="group flex items-center gap-4 rounded-xl px-5 py-5 transition-transform duration-150 hover:-translate-y-0.5 active:scale-[0.98]"
                                style={{ background: "var(--plate)", boxShadow: "var(--plate-ring)" }}
                            >
                                <span className="shrink-0 grid place-items-center w-11 h-11 rounded-full" style={{ color: "var(--plate-gold)", boxShadow: "var(--plate-gold-ring)" }}>
                                    <Icon size={20} />
                                </span>
                                <span className="min-w-0">
                                    <span className="block font-serif text-xl" style={{ color: "var(--plate-fg)" }}>{m.title}</span>
                                    <span className="block text-sm truncate" style={{ color: "var(--plate-body)" }}>{m.desc}</span>
                                </span>
                                <span className="ml-auto" style={{ color: "var(--plate-gold)" }}>→</span>
                            </Link>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
