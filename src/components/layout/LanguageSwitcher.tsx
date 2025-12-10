"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <button
            onClick={() => setLanguage(language === 'en' ? 'ja' : 'en')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
        >
            <span>{language === 'en' ? '🇺🇸 EN' : '🇯🇵 JA'}</span>
        </button>
    );
}
