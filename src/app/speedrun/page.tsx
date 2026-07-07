"use client";

import { Header } from "@/components/layout/Header";
import { SpeedrunRunner } from "@/components/speedrun/SpeedrunRunner";
import { useMounted } from "@/hooks/useMounted";

export default function SpeedrunPage() {
    const mounted = useMounted();
    if (!mounted) return null;

    return (
        <div className="min-h-screen">
            <Header />
            <main>
                <SpeedrunRunner />
            </main>
        </div>
    );
}
