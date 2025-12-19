"use client";

import { VerdictConsole } from "@/components/verdict/VerdictConsole";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function VerdictPage() {
    const { t } = useTranslation();
    return (
        <main className="min-h-screen bg-slate-50 p-6 flex flex-col">
            <header className="mb-8 flex items-center gap-4">
                <Link href="/" className="p-2 bg-white rounded-xl shadow-sm hover:bg-slate-100 transition-colors">
                    <ArrowLeft size={24} className="text-slate-600" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">{t('verdict.title')}</h1>
                    <p className="text-sm text-slate-500">{t('verdict.subtitle')}</p>
                </div>
            </header>

            <VerdictConsole />
        </main>
    );
}
