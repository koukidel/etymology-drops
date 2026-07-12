"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, BookOpen, Zap, Blocks, Sprout, ExternalLink } from "lucide-react";
import { SlicerModule } from "@/components/lesson/SlicerModule";
import { allWords } from "@/data/words";
import { useGameStore } from "@/store/useGameStore";
import { useTranslation } from "@/hooks/useTranslation";

const DEMO = allWords.find(w => w.id === "telephone")!;
const STEP_COUNT = 6;

export function TutorialTour() {
    const { t } = useTranslation();
    const router = useRouter();
    const { completeTutorial } = useGameStore();
    const [step, setStep] = useState(0);

    const next = () => setStep(s => Math.min(STEP_COUNT - 1, s + 1));
    const back = () => setStep(s => Math.max(0, s - 1));
    const finish = () => { completeTutorial(); router.push("/"); };

    const isLast = step === STEP_COUNT - 1;

    return (
        <div className="min-h-[100dvh] flex flex-col max-w-xl mx-auto px-6 py-8">
            {/* progress dots */}
            <div className="flex items-center justify-center gap-2 mb-8">
                {Array.from({ length: STEP_COUNT }, (_, i) => (
                    <span
                        key={i}
                        className={`h-1.5 rounded-full transition-all ${i === step ? "w-6 bg-accent" : "w-1.5 bg-border"}`}
                    />
                ))}
            </div>

            <div className="flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16 }}
                        className="text-center"
                    >
                        {step === 0 && (
                            <Panel icon={<Sprout size={26} />}>
                                <H>{t("tutorial.intro.title")}</H>
                                <P>{t("tutorial.intro.body")}</P>
                            </Panel>
                        )}

                        {step === 1 && (
                            <Panel icon={<BookOpen size={26} />}>
                                <H>{t("tutorial.dict.title")}</H>
                                <P>{t("tutorial.dict.body")}</P>
                                <TryLink href="/dictionary">{t("tutorial.dict.cta")}</TryLink>
                            </Panel>
                        )}

                        {step === 2 && (
                            <div>
                                <div className="flex items-center justify-center gap-2 text-accent mb-3">
                                    <Zap size={22} />
                                </div>
                                <H>{t("tutorial.decompose.title")}</H>
                                <P>{t("tutorial.decompose.body")}</P>
                                <div className="mt-4">
                                    <SlicerModule
                                        key={step}
                                        word={DEMO}
                                        autoHintMs={5000}
                                        completeLabel={t("tutorial.next")}
                                        onComplete={next}
                                    />
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <Panel icon={<Blocks size={26} />}>
                                <H>{t("tutorial.build.title")}</H>
                                <P>{t("tutorial.build.body")}</P>
                                <TryLink href="/practice/build">{t("tutorial.build.cta")}</TryLink>
                            </Panel>
                        )}

                        {step === 4 && (
                            <Panel icon={<Blocks size={26} />}>
                                <H>{t("tutorial.mechanism.title")}</H>
                                <P>{t("tutorial.mechanism.body")}</P>
                            </Panel>
                        )}

                        {step === 5 && (
                            <Panel icon={<Sprout size={26} />}>
                                <H>{t("tutorial.outcome.title")}</H>
                                <P>{t("tutorial.outcome.body")}</P>
                            </Panel>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* footer nav — the decompose step advances via the slicer's own button */}
            <div className="flex items-center justify-between pt-8">
                <button
                    onClick={back}
                    disabled={step === 0}
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-0"
                >
                    <ArrowLeft size={14} /> {t("tutorial.back")}
                </button>
                {step !== 2 && (
                    isLast ? (
                        <button onClick={finish} className="px-8 py-2.5 bg-foreground text-background rounded-full hover:opacity-90 transition-opacity">
                            {t("tutorial.finish")}
                        </button>
                    ) : (
                        <button onClick={next} className="px-8 py-2.5 bg-foreground text-background rounded-full hover:opacity-90 transition-opacity">
                            {t("tutorial.next")}
                        </button>
                    )
                )}
            </div>
        </div>
    );
}

function Panel({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
    return (
        <div className="flex flex-col items-center">
            <div className="mb-5 grid place-items-center w-14 h-14 rounded-full border border-border text-accent">
                {icon}
            </div>
            {children}
        </div>
    );
}

const H = ({ children }: { children: React.ReactNode }) => (
    <h2 className="font-serif text-2xl text-foreground mb-3">{children}</h2>
);
const P = ({ children }: { children: React.ReactNode }) => (
    <p className="text-muted-foreground leading-relaxed max-w-md mx-auto whitespace-pre-line">{children}</p>
);
const TryLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link
        href={href}
        target="_blank"
        className="inline-flex items-center gap-1.5 mt-5 text-sm text-accent hover:opacity-80 underline underline-offset-4"
    >
        {children} <ExternalLink size={13} />
    </Link>
);
