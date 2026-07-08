"use client";

import { useRouter } from "next/navigation";
import { GuidedOnboarding } from "@/components/onboarding/GuidedOnboarding";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";

export default function GuidePage() {
    const router = useRouter();
    const { completeOnboarding } = useGameStore();
    const mounted = useMounted();
    if (!mounted) return null;

    return (
        <GuidedOnboarding
            onComplete={() => { completeOnboarding(); router.push("/"); }}
            onExit={() => router.push("/")}
        />
    );
}
