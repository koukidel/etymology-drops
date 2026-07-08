"use client";

import { useRouter } from "next/navigation";
import { Intake } from "@/components/onboarding/Intake";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";

// Re-runnable intake (e.g. to update your level). First-run intake is gated
// inline on the home page; this route lets an existing user redo it.
export default function IntakePage() {
    const router = useRouter();
    const { completeIntake } = useGameStore();
    const mounted = useMounted();
    if (!mounted) return null;

    return (
        <Intake
            onComplete={(p) => { completeIntake(p); router.push("/"); }}
            onExit={() => router.push("/")}
        />
    );
}
