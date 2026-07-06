"use client";

import React, { createContext, useContext, useSyncExternalStore, useCallback } from 'react';

export type Language = 'en' | 'ja';

const STORAGE_KEY = 'etymology_language';

// Module-level store so the persisted language is read without
// setState-in-effect hydration hacks.
const listeners = new Set<() => void>();

const readLanguage = (): Language => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'ja' ? 'ja' : 'en';
};

const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
};

const writeLanguage = (lang: Language) => {
    localStorage.setItem(STORAGE_KEY, lang);
    listeners.forEach(l => l());
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const language = useSyncExternalStore(subscribe, readLanguage, () => 'en' as Language);
    const setLanguage = useCallback((lang: Language) => writeLanguage(lang), []);

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
