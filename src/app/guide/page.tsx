"use client";

import { useRouter } from "next/navigation";
import { GuidedOnboarding } from "@/components/onboarding/GuidedOnboarding";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";

export default function GuidePage() {
    const router = useRouter();
    const { completeOnboarding, hasSeenOnboarding } = useGameStore();
    const mounted = useMounted();
    if (!mounted) return null;

    return (
        <GuidedOnboarding
            firstRun={!hasSeenOnboarding}
            onComplete={() => {
                // The ✓ on the home's Lesson 0 band tracks real completion,
                // separately from the funnel flag (Lesson 0 is optional now).
                localStorage.setItem("minamoto_guide_done", "1");
                completeOnboarding();
                router.push("/");
            }}
            onExit={() => router.push("/")}
        />
    );
}
