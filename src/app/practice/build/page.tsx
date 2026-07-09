"use client";

import { Header } from "@/components/layout/Header";
import { BuildGround } from "@/components/practice/BuildGround";
import { useMounted } from "@/hooks/useMounted";

export default function BuildPage() {
    const mounted = useMounted();
    if (!mounted) return null;

    return (
        <div className="min-h-screen">
            <Header />
            <main>
                <BuildGround />
            </main>
        </div>
    );
}
