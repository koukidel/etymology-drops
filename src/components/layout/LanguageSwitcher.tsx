"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <button
            onClick={() => setLanguage(language === 'en' ? 'ja' : 'en')}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            aria-label={language === 'en' ? 'Switch to Japanese' : 'Switch to English'}
        >
            {language === 'en' ? 'EN' : 'JA'}
        </button>
    );
}
