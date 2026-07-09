"use client";

import { Header } from "@/components/layout/Header";
import { DecomposeStudy } from "@/components/practice/DecomposeStudy";
import { useMounted } from "@/hooks/useMounted";

export default function StudyPage() {
    const mounted = useMounted();
    if (!mounted) return null;

    return (
        <div className="min-h-screen">
            <Header />
            <main>
                <DecomposeStudy />
            </main>
        </div>
    );
}
