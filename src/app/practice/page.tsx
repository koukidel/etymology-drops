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
                                className="group flex items-center gap-4 rounded-xl px-5 py-5 transition-transform hover:-translate-y-0.5"
                                style={{ backgroundColor: "#3c4a34", boxShadow: "inset 0 0 0 1px #cba24c33" }}
                            >
                                <span className="shrink-0 grid place-items-center w-11 h-11 rounded-full" style={{ color: "#d4a94a", boxShadow: "inset 0 0 0 1px #d4a94a66" }}>
                                    <Icon size={20} />
                                </span>
                                <span className="min-w-0">
                                    <span className="block font-serif text-xl" style={{ color: "#e8e0cc" }}>{m.title}</span>
                                    <span className="block text-sm truncate" style={{ color: "#b9b59a" }}>{m.desc}</span>
                                </span>
                                <span className="ml-auto" style={{ color: "#d4a94a" }}>→</span>
                            </Link>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
