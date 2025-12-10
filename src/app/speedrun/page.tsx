"use client";

import { useState, useEffect, useRef } from "react";
import { Timer, Trophy, Share2, Play, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { expandedWords } from "@/data/expandedWords";

// 1. Prepare Data: Extract Roots and Meanings
const allRoots = expandedWords
    .flatMap(w => w.blocks.filter(b => b.type === 'root'))
    .filter((v, i, a) => a.findIndex(t => t.label === v.label) === i); // Unique roots

// Helper to get string meaning
const getMeaning = (m: any) => typeof m === 'string' ? m : m.en;

const allMeanings = allRoots.map(r => getMeaning(r.meaning));

const TOTAL_QUESTIONS = 14;

export default function SpeedrunPage() {
    const [gameState, setGameState] = useState<'IDLE' | 'RUNNING' | 'FINISHED'>('IDLE');
    const [timeMs, setTimeMs] = useState(0);
    const [penaltyMs, setPenaltyMs] = useState(0); // Penalty for wrong answers
    const [currentIndex, setCurrentIndex] = useState(0);
    const [quizData, setQuizData] = useState<{ root: string; correct: string; options: string[] }[]>([]);

    // Timer Refs
    const requestRef = useRef<number>(0);
    const startTimeRef = useRef<number>(0);
    const runningRef = useRef(false);

    // Prepare a new run
    const generateRun = () => {
        // Shuffle roots
        const shuffledRoots = [...allRoots].sort(() => Math.random() - 0.5).slice(0, TOTAL_QUESTIONS);

        const quiz = shuffledRoots.map(root => {
            const rootMeaning = getMeaning(root.meaning);
            // Get 3 random distractors
            const distractors = allMeanings
                .filter(m => m !== rootMeaning)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3);

            return {
                root: root.label,
                correct: rootMeaning,
                options: [...distractors, rootMeaning].sort(() => Math.random() - 0.5) // Shuffle options
            };
        });

        setQuizData(quiz);
    };

    useEffect(() => {
        generateRun();
    }, []);

    const animate = () => {
        if (!runningRef.current) return;
        // Total time = (Current - Start) + Penalty
        setTimeMs((Date.now() - startTimeRef.current));
        requestRef.current = requestAnimationFrame(animate);
    };

    const startRun = () => {
        generateRun();
        setGameState('RUNNING');
        runningRef.current = true;
        setTimeMs(0);
        setPenaltyMs(0);
        setCurrentIndex(0);
        startTimeRef.current = Date.now();
        requestRef.current = requestAnimationFrame(animate);
    };

    const stopRun = () => {
        setGameState('FINISHED');
        runningRef.current = false;
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };

    const handleAnswer = (answer: string) => {
        const currentQ = quizData[currentIndex];

        if (answer === currentQ.correct) {
            // Correct
            if (currentIndex < quizData.length - 1) {
                setCurrentIndex(prev => prev + 1);
            } else {
                stopRun();
            }
        } else {
            // Wrong (+5s penalty)
            setPenaltyMs(prev => prev + 5000);
            startTimeRef.current -= 5000; // Artificially push start time back to add seconds immediately
        }
    };

    // Cleanup
    useEffect(() => {
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    const formatTime = (ms: number) => {
        return (ms / 1000).toFixed(2);
    };

    return (
        <main className="min-h-screen bg-slate-950 text-white p-6 flex flex-col items-center justify-center font-mono select-none">
            {/* Background Details */}
            <div className="fixed inset-0 pointer-events-none opacity-20"
                style={{ backgroundImage: "radial-gradient(#4f46e5 1px, transparent 1px)", backgroundSize: "40px 40px" }}
            />

            {/* IDLE SCREEN */}
            {gameState === 'IDLE' && (
                <div className="text-center space-y-8 z-10">
                    <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                        14-KEY RUN
                    </h1>
                    <p className="text-slate-400 text-xl font-medium">Match Roots to Meanings. <span className="text-red-400">+5s penalty</span> for errors.</p>
                    <button
                        onClick={startRun}
                        className="group relative px-10 py-5 bg-white text-black font-black text-2xl hover:scale-105 active:scale-95 transition-all uppercase flex items-center gap-3 mx-auto shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                    >
                        <Play fill="currentColor" size={28} /> Start Timer
                        <div className="absolute inset-0 border-2 border-white scale-105 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                    </button>
                    <Link href="/" className="block text-slate-600 hover:text-white transition-colors underline decoration-slate-800 underline-offset-4">
                        Return to Base
                    </Link>
                </div>
            )}

            {/* RUNNING SCREEN */}
            {gameState === 'RUNNING' && quizData[currentIndex] && (
                <div className="w-full max-w-2xl space-y-8 z-10 flex flex-col items-center">
                    {/* Timer Display */}
                    <div className="flex flex-col items-center">
                        <div className="text-9xl font-black tabular-nums tracking-tighter text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                            {formatTime(timeMs)}<span className="text-4xl text-cyan-800 ml-2">s</span>
                        </div>
                        {penaltyMs > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-500 font-bold flex items-center gap-1"
                            >
                                <AlertCircle size={16} /> +{(penaltyMs / 1000)}s Penalty Applied
                            </motion.div>
                        )}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-cyan-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentIndex) / TOTAL_QUESTIONS) * 100}%` }}
                            transition={{ type: "spring", stiffness: 100 }}
                        />
                    </div>

                    {/* QUESTION CARD */}
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="w-full"
                    >
                        <div className="text-center mb-8">
                            <h2 className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-2">Identify the Root</h2>
                            <div className="text-6xl font-black text-white">{quizData[currentIndex].root}</div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {quizData[currentIndex].options.map((option, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(option)}
                                    className="p-6 bg-slate-900 border-2 border-slate-800 hover:border-cyan-500 hover:bg-slate-800 text-xl font-bold rounded-xl transition-all active:scale-95 text-slate-300 hover:text-white shadow-lg"
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            )}

            {/* FINISHED SCREEN */}
            {gameState === 'FINISHED' && (
                <div className="text-center space-y-8 z-10 w-full max-w-lg">
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="text-yellow-400 mb-4 flex justify-center"
                    >
                        <Trophy size={80} className="drop-shadow-[0_0_20px_rgba(250,204,21,0.5)]" />
                    </motion.div>

                    <div>
                        <h2 className="text-2xl font-bold text-slate-400 uppercase tracking-widest">Final Time</h2>
                        <div className="text-8xl font-black text-green-400 tabular-nums drop-shadow-[0_0_20px_rgba(74,222,128,0.4)]">
                            {formatTime(timeMs)}<span className="text-4xl text-green-800">s</span>
                        </div>
                        {penaltyMs > 0 && <div className="text-red-400 text-sm mt-2">Includes +{(penaltyMs / 1000)}s penalty</div>}
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-8">
                        <button onClick={startRun} className="col-span-2 py-4 bg-white text-black font-black text-xl hover:bg-cyan-300 transition-colors uppercase rounded shadow-lg">
                            Run Again
                        </button>
                        <button className="py-4 bg-[#1da1f2]/20 text-[#1da1f2] border-2 border-[#1da1f2]/50 font-bold rounded hover:bg-[#1da1f2] hover:text-white transition-all flex items-center justify-center gap-2">
                            <Share2 size={20} /> Share
                        </button>
                        <Link href="/" className="py-4 bg-slate-800 text-slate-400 font-bold rounded hover:bg-slate-700 hover:text-white transition-colors flex items-center justify-center">
                            Exit
                        </Link>
                    </div>
                </div>
            )}
        </main>
    );
}
