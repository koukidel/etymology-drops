"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { SlicerModule } from "@/components/lesson/SlicerModule";
import { allWords } from "@/data/words";

interface Props {
    onComplete: () => void;
    onExit?: () => void;
}

// Narration strings carry **…** markers → rendered as warm serif emphasis.
function renderEm(text: string): React.ReactNode[] {
    return text.split(/(\*\*[^*]+\*\*)/g).map((seg, i) =>
        seg.startsWith("**") && seg.endsWith("**")
            ? <em key={i} className="not-italic font-serif font-semibold text-accent">{seg.slice(2, -2)}</em>
            : <span key={i}>{seg}</span>
    );
}

type Step =
    | 'ask'          // how would you approach 鳴?
    | 'split-idea'   // let's take it apart instead
    | 'split'        // 鳴 → 口 + 鳥
    | 'quiz'         // 4 choices for the meaning
    | 'bridge'       // now, what about... breakfast
    | 'slice'        // interactive slicer
    | 'assoc1'       // break + fast → breaking the fast
    | 'assoc2'       // from 朝食 back to breakfast
    | 'moral'        // what this unlocks
    | 'final';       // into the world of etymology

const ORDER: Step[] = ['ask', 'split-idea', 'split', 'quiz', 'bridge', 'slice', 'assoc1', 'assoc2', 'moral', 'final'];

// Paragraphs reveal one by one so short lines land like beats, not a wall.
function Narration({ text, cta, onNext }: { text: string; cta: string; onNext: () => void }) {
    const reduce = useReducedMotion();
    const paras = text.split("\n\n");
    return (
        <div className="max-w-lg mx-auto text-center">
            <div className="space-y-6 mb-12">
                {paras.map((para, i) => (
                    <motion.p
                        key={i}
                        initial={reduce ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + i * 0.35, duration: 0.45 }}
                        className="text-lg text-foreground leading-relaxed"
                    >
                        {renderEm(para)}
                    </motion.p>
                ))}
            </div>
            <motion.button
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + paras.length * 0.35 }}
                onClick={onNext}
                className="px-10 py-3 bg-foreground text-background rounded-full hover:opacity-90 transition-opacity active:scale-[0.98]"
            >
                {cta}
            </motion.button>
        </div>
    );
}

export function GuidedOnboarding({ onComplete, onExit }: Props) {
    const { t, language } = useTranslation();
    const [step, setStep] = useState<Step>('ask');
    const [guessed, setGuessed] = useState(false);
    const [quizPick, setQuizPick] = useState<number | null>(null);
    const [quizSolved, setQuizSolved] = useState(false);

    const breakfast = allWords.find(w => w.id === 'breakfast')!;
    const next = () => setStep(ORDER[ORDER.indexOf(step) + 1]);

    const quizOptions = [
        t('guide.quiz.opt1'),
        t('guide.quiz.opt2'), // correct
        t('guide.quiz.opt3'),
        t('guide.quiz.opt4'),
    ];
    const CORRECT = 1;

    const handleQuizPick = (i: number) => {
        setQuizPick(i);
        if (i === CORRECT) setQuizSolved(true);
        else setTimeout(() => setQuizPick(null), 600);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative">
            {onExit && (
                <button
                    onClick={onExit}
                    aria-label="Close"
                    className="absolute top-6 left-6 p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <X size={20} />
                </button>
            )}
            <div className="absolute top-6 right-6">
                <LanguageSwitcher />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={step + language}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                    className="w-full max-w-2xl"
                >
                    {step === 'ask' && (
                        <div className="max-w-lg mx-auto text-center">
                            <p className="font-serif text-7xl text-foreground mb-10">鳴</p>
                            <p className="text-lg text-foreground leading-relaxed mb-10 whitespace-pre-line">{renderEm(t('guide.ask'))}</p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <button
                                    onClick={() => { setGuessed(true); next(); }}
                                    className="px-8 py-3 border border-border rounded-full text-foreground hover:border-muted-foreground transition-colors"
                                >
                                    {t('guide.ask.guess')}
                                </button>
                                <button
                                    onClick={() => { setGuessed(false); next(); }}
                                    className="px-8 py-3 border border-border rounded-full text-foreground hover:border-muted-foreground transition-colors"
                                >
                                    {t('guide.ask.other')}
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 'split-idea' && (
                        <Narration
                            text={(guessed ? t('guide.split_idea.guess_prefix') + '\n\n' : '') + t('guide.split_idea')}
                            cta={t('guide.continue')}
                            onNext={next}
                        />
                    )}

                    {step === 'split' && (
                        <div className="max-w-lg mx-auto text-center">
                            <div className="flex items-baseline justify-center gap-4 mb-12">
                                <motion.span
                                    initial={{ x: 40, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    className="font-serif text-6xl text-foreground"
                                >口</motion.span>
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                    className="text-border text-3xl"
                                >＋</motion.span>
                                <motion.span
                                    initial={{ x: -40, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    className="font-serif text-6xl text-foreground"
                                >鳥</motion.span>
                            </div>
                            <p className="text-lg text-foreground leading-relaxed whitespace-pre-line mb-12">{renderEm(t('guide.split'))}</p>
                            <button onClick={next} className="px-10 py-3 bg-foreground text-background rounded-full hover:opacity-90 transition-opacity">
                                {t('guide.continue')}
                            </button>
                        </div>
                    )}

                    {step === 'quiz' && (
                        <div className="max-w-lg mx-auto text-center">
                            <p className="font-serif text-5xl text-foreground mb-4">口 ＋ 鳥</p>
                            <p className="text-muted-foreground mb-8">{t('guide.quiz.prompt')}</p>
                            <div className="grid grid-cols-2 gap-3 mb-8">
                                {quizOptions.map((opt, i) => {
                                    let style = "border-border bg-card text-foreground hover:border-muted-foreground";
                                    if (quizPick === i) {
                                        style = i === CORRECT
                                            ? "border-foreground bg-foreground text-background"
                                            : "border-accent text-accent";
                                    }
                                    return (
                                        <motion.button
                                            key={i}
                                            animate={quizPick === i && i !== CORRECT ? { x: [0, -6, 6, -4, 4, 0] } : {}}
                                            transition={{ duration: 0.4 }}
                                            onClick={() => handleQuizPick(i)}
                                            disabled={quizSolved}
                                            className={`px-5 py-4 rounded-lg border transition-colors ${style}`}
                                        >
                                            {opt}
                                        </motion.button>
                                    );
                                })}
                            </div>
                            {quizSolved && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <p className="text-lg text-foreground leading-relaxed whitespace-pre-line mb-8">{renderEm(t('guide.quiz.reveal'))}</p>
                                    <button onClick={next} className="px-10 py-3 bg-foreground text-background rounded-full hover:opacity-90 transition-opacity">
                                        {t('guide.continue')}
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    )}

                    {step === 'bridge' && (
                        <div className="max-w-lg mx-auto text-center">
                            <p className="text-muted-foreground mb-6">{t('guide.bridge.lead')}</p>
                            <p className="font-serif text-6xl text-foreground mb-10">breakfast</p>
                            <p className="text-lg text-foreground leading-relaxed whitespace-pre-line text-left sm:text-center mb-12">{renderEm(t('guide.bridge'))}</p>
                            <button onClick={next} className="px-10 py-3 bg-foreground text-background rounded-full hover:opacity-90 transition-opacity">
                                {t('guide.bridge.cta')}
                            </button>
                        </div>
                    )}

                    {step === 'slice' && (
                        <div>
                            <p className="text-center text-sm text-muted-foreground mb-2">{t('guide.slice.hint')}</p>
                            <SlicerModule
                                word={breakfast}
                                autoHintMs={7000}
                                completeLabel={t('guide.continue')}
                                onComplete={next}
                            />
                        </div>
                    )}

                    {step === 'assoc1' && (
                        <Narration text={t('guide.assoc1')} cta={t('guide.continue')} onNext={next} />
                    )}

                    {step === 'assoc2' && (
                        <Narration text={t('guide.assoc2')} cta={t('guide.continue')} onNext={next} />
                    )}

                    {step === 'moral' && (
                        <Narration text={t('guide.moral')} cta={t('guide.continue')} onNext={next} />
                    )}

                    {step === 'final' && (
                        <div className="max-w-lg mx-auto text-center">
                            <p className="font-serif text-3xl text-foreground mb-12">{t('guide.final')}</p>
                            <button onClick={onComplete} className="px-10 py-3 bg-foreground text-background rounded-full hover:opacity-90 transition-opacity">
                                {t('guide.begin')}
                            </button>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
