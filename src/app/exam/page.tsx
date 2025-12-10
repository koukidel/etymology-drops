"use client";

import { useState } from "react";
import { generateExam, Question } from "@/lib/examEngine";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, CheckCircle, XCircle, Award, Timer } from "lucide-react";
import confetti from "canvas-confetti";

export default function ExamPage() {
    const [status, setStatus] = useState<'lobby' | 'active' | 'finished'>('lobby');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [selectedLogic, setSelectedLogic] = useState<string | null>(null);
    const [step, setStep] = useState<'answer' | 'logic'>('answer');
    const [isEvaluated, setIsEvaluated] = useState(false);

    const startExam = () => {
        setQuestions(generateExam(14));
        setScore(0);
        setCurrentIndex(0);
        setStatus('active');
        setSelectedAnswer(null);
        setSelectedLogic(null);
        setStep('answer');
        setIsEvaluated(false);
    };

    const handleAnswer = (answer: string) => {
        if (isEvaluated || step === 'logic') return;
        setSelectedAnswer(answer);
        setStep('logic'); // Proceed to Step 2
    };

    const handleLogic = (logicId: string) => {
        if (isEvaluated) return;
        setSelectedLogic(logicId);
        setIsEvaluated(true); // Finalize

        const currentQ = questions[currentIndex];

        // Double-Lock Validation
        const isAnswerCorrect = selectedAnswer === currentQ.correctAnswer;
        const isLogicCorrect = currentQ.logicCheck.options.find(o => o.id === logicId)?.isCorrect;

        if (isAnswerCorrect && isLogicCorrect) {
            setScore(s => s + 1);
            confetti({
                particleCount: 30,
                spread: 50,
                origin: { y: 0.7 }
            });
        }
    };

    const nextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(i => i + 1);
            setSelectedAnswer(null);
            setSelectedLogic(null);
            setStep('answer');
            setIsEvaluated(false);
        } else {
            setStatus('finished');
            if (score >= 12) { // 12/14 to pass as Grand Master
                confetti({
                    particleCount: 150,
                    spread: 100,
                    origin: { y: 0.6 }
                });
            }
        }
    };

    const currentQ = questions[currentIndex];
    const progress = ((currentIndex + 1) / questions.length) * 100;

    return (
        <main className="min-h-screen bg-slate-100 flex flex-col">
            {/* Header */}
            <header className="px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between">
                <Link href="/" className="p-2 hover:bg-slate-100 rounded-full">
                    <ArrowLeft size={24} className="text-slate-500" />
                </Link>
                <div className="font-bold text-slate-900 flex items-center gap-2">
                    <Award className="text-indigo-600" />
                    Root Master Certification
                </div>
                <div className="w-8" />
            </header>

            <div className="flex-1 flex items-center justify-center p-6">

                {/* LOBBY */}
                {status === 'lobby' && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl text-center">
                        <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Award size={40} />
                        </div>
                        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">The Grand Master Exam</h1>
                        <p className="text-slate-600 mb-8 leading-relaxed">
                            Prove your mastery of the 14 Roots.
                            <br />
                            <strong>14 Questions. Double-Lock Verification.</strong>
                            <br />
                            Select the answer, then trace the logic.
                        </p>
                        <button
                            onClick={startExam}
                            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all text-lg"
                        >
                            Begin Evaluation
                        </button>
                    </motion.div>
                )}

                {/* ACTIVE QUIZ */}
                {status === 'active' && currentQ && (
                    <div className="max-w-2xl w-full space-y-6">
                        {/* Progress */}
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-indigo-600"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                            />
                        </div>

                        <div className="flex justify-between text-sm font-bold text-slate-400 uppercase tracking-widest">
                            <span>Question {currentIndex + 1}/10</span>
                            <span>Score: {score}</span>
                        </div>

                        {/* Question Card */}
                        <motion.div
                            key={currentQ.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200"
                        >
                            <h2 className="text-2xl font-bold text-slate-900 mb-8 leading-snug">
                                {currentQ.text}
                            </h2>

                            {/* STEP 1: ANSWER SELECTION */}
                            <div className="space-y-3">
                                {currentQ.options.map((option, i) => {
                                    const isSelected = selectedAnswer === option;
                                    const isCorrect = option === currentQ.correctAnswer;

                                    // Visual states interact with step 2
                                    let style = "border-slate-200 hover:border-indigo-400 hover:bg-slate-50";

                                    if (step === 'answer') {
                                        style = "border-slate-200 hover:border-indigo-400 hover:bg-slate-50";
                                    } else if (step === 'logic' && !isEvaluated) {
                                        // Answer selected, waiting for logic
                                        if (isSelected) style = "border-indigo-600 bg-indigo-50 ring-2 ring-indigo-200";
                                        else style = "opacity-40 pointer-events-none";
                                    } else if (isEvaluated) {
                                        // Final Reveal
                                        if (isCorrect) style = "bg-emerald-100 border-emerald-500 text-emerald-800";
                                        else if (isSelected && !isCorrect) style = "bg-red-100 border-red-500 text-red-800";
                                        else style = "opacity-40 border-slate-100";
                                    }

                                    return (
                                        <button
                                            key={i}
                                            onClick={() => handleAnswer(option)}
                                            disabled={step !== 'answer'}
                                            className={`w-full p-5 rounded-xl border-2 text-left font-bold transition-all flex justify-between items-center ${style}`}
                                        >
                                            <span>{option}</span>
                                            {isEvaluated && isCorrect && <CheckCircle size={20} className="text-emerald-600" />}
                                            {isEvaluated && isSelected && !isCorrect && <XCircle size={20} className="text-red-600" />}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* STEP 2: LOGIC CHECK */}
                            <AnimatePresence>
                                {(step === 'logic' || isEvaluated) && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                        animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
                                        className="border-t-2 border-dashed border-slate-200 pt-8"
                                    >
                                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">
                                            Phase 2: Verify Logic
                                        </h3>
                                        <p className="font-bold text-slate-800 mb-4">{currentQ.logicCheck.question}</p>

                                        <div className="space-y-3">
                                            {currentQ.logicCheck.options.map((option) => {
                                                const isLogicSelected = selectedLogic === option.id;
                                                const isLogicCorrect = option.isCorrect;

                                                let logicStyle = "bg-slate-50 border-slate-200 hover:border-indigo-300";

                                                if (isEvaluated) {
                                                    if (isLogicCorrect) logicStyle = "bg-emerald-50 border-emerald-500 text-emerald-800";
                                                    else if (isLogicSelected && !isLogicCorrect) logicStyle = "bg-red-50 border-red-500 text-red-800";
                                                    else logicStyle = "opacity-50";
                                                } else if (isLogicSelected) {
                                                    logicStyle = "border-indigo-500 bg-indigo-50";
                                                }

                                                return (
                                                    <button
                                                        key={option.id}
                                                        onClick={() => handleLogic(option.id)}
                                                        disabled={isEvaluated} // Lock after selection
                                                        className={`w-full p-4 rounded-lg border text-sm font-medium text-left transition-all ${logicStyle}`}
                                                    >
                                                        {option.text}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* NEXT BUTTON */}
                            {isEvaluated && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mt-8 flex justify-end"
                                >
                                    <button
                                        onClick={nextQuestion}
                                        className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-black transition-colors flex items-center gap-2"
                                    >
                                        Next Question <ArrowLeft className="rotate-180" size={20} />
                                    </button>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                )}

                {/* RESULTS */}
                {status === 'finished' && (
                    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl text-center border-4 border-indigo-100">
                        <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-300">
                            <span className="text-4xl font-extrabold">{score * 10}%</span>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">
                            {score >= 8 ? "Certified Root Master" : score >= 5 ? "Apprentice Etymologist" : "Novice Student"}
                        </h2>
                        <p className="text-slate-500 mb-8">
                            {score >= 8
                                ? "You have demonstrated exceptional mastery of the 14 Roots. You are ready."
                                : "Keep studying using the Time Machine and Tree logic. You're getting there!"}
                        </p>

                        <div className="space-y-3">
                            <button onClick={startExam} className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl">
                                Retake Exam
                            </button>
                            <Link href="/" className="block w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl">
                                Return to Dashboard
                            </Link>
                        </div>
                    </motion.div>
                )}

            </div>
        </main>
    );
}
