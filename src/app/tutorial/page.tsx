"use client";

import { TutorialTour } from "@/components/onboarding/TutorialTour";
import { useMounted } from "@/hooks/useMounted";

export default function TutorialPage() {
    const mounted = useMounted();
    if (!mounted) return null;
    return <TutorialTour />;
}
