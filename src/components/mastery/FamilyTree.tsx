import { expandedWords } from "@/data/expandedWords";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Props {
    rootId: string;
    currentWordId: string;
}

export function FamilyTree({ rootId, currentWordId }: Props) {
    // 1. Find all relatives
    const familyMembers = useMemo(() => {
        return expandedWords.filter(w =>
            w.blocks.some(b => b.type === 'root' && (b.id === rootId || b.label.toLowerCase().includes(rootId)))
        );
    }, [rootId]);

    // 2. Identify Root Block Data
    const rootBlock = familyMembers[0]?.blocks.find(b => b.type === 'root' && (b.id === rootId || b.label.toLowerCase().includes(rootId)));

    if (familyMembers.length === 0 || !rootBlock) return null;

    const getBreakdown = (word: typeof expandedWords[0]) => {
        return word.blocks.map(b => ({
            label: b.label,
            meaning: b.meaning,
            type: b.type
        }));
    };

    // Helper to calculate curve direction
    const totalItems = familyMembers.length;
    const centerIndex = (totalItems - 1) / 2;

    // Prevent Hydration Mismatch by running only on client
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => { setIsMounted(true); }, []);

    if (!isMounted) return <div className="py-10 min-h-[500px]" />; // Placeholder

    return (
        <div className="flex flex-col items-center w-full relative py-10">

            {/* === 1. PARENT ROOT NODE === */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-20 mb-16" // Added large margin-bottom for the lines
            >
                {/* Glowing Connector Node */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4 h-4 bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,1)] z-0" />

                <div className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xl shadow-2xl shadow-indigo-500/30 border-2 border-indigo-400/50 flex flex-col items-center relative z-10">
                    <span className="text-xs font-bold text-indigo-400 tracking-[0.2em] uppercase mb-1">Source Root</span>
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">{rootBlock.label.toUpperCase()}</span>
                        <span className="w-px h-6 bg-white/20 mx-2" />
                        <span className="text-sm font-medium opacity-80 italic">
                            "{typeof rootBlock.meaning === 'string' ? rootBlock.meaning : rootBlock.meaning.en}"
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* === 2. CHILDREN CONTAINER (Flex instead of Grid for better centering) === */}
            <div className="flex flex-wrap justify-center items-start gap-8 w-full max-w-6xl px-4 relative z-10">
                {familyMembers.map((member, index) => {
                    const isCurrent = member.id === currentWordId;
                    const breakdown = getBreakdown(member);

                    // Curve Logic:
                    // Calculate how far this item is from the center (e.g., -2, -1, 0, 1, 2)
                    const offsetFromCenter = index - centerIndex;

                    // If offset is negative (left), curve right. If positive (right), curve left.
                    // We use an SVG path that starts at the child and curves to the "Parent Source" (imagined at top center relative to child)
                    // The "bend" amount increases the further out we are.
                    const bendX = offsetFromCenter * -40; // Pull the top of the line towards center

                    return (
                        <div key={member.id} className="relative group flex flex-col items-center">

                            {/* === NEURAL CONNECTION LINE === */}
                            <svg className="absolute bottom-full left-1/2 -translate-x-1/2 w-[200px] h-[80px] overflow-visible pointer-events-none z-0">
                                <motion.path
                                    // M 100 80 = Start at bottom center of SVG (Top of Child Card)
                                    // C = Cubic Bezier
                                    // Control Point 1: 100 40 (Go straight up a bit)
                                    // Control Point 2: (100 + bendX) 40 (Curve towards parent horizontally)
                                    // End Point: (100 + bendX) 0 (Reach the parent level)
                                    d={`M 100 80 C 100 40, ${100 + bendX} 20, ${100 + bendX} 0`}
                                    fill="none"
                                    stroke={isCurrent ? "#6366f1" : "#cbd5e1"} // Indigo if active, Slate if inactive
                                    strokeWidth={isCurrent ? "3" : "2"}
                                    strokeOpacity={isCurrent ? "1" : "0.4"}
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                                />
                                {/* Little particle moving along the line */}
                                {isCurrent && (
                                    <motion.circle
                                        r="3"
                                        fill="#6366f1"
                                        animate={{ offsetDistance: "0%" }} // Move from child to parent (or vice versa)
                                        style={{
                                            offsetDistance: "100%", // Set initial value in style
                                            offsetPath: `path("M 100 80 C 100 40, ${100 + bendX} 20, ${100 + bendX} 0")`
                                        }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    />
                                )}
                            </svg>

                            {/* === THE CARD === */}
                            <Link
                                href={`/master/${member.id}`}
                                className={`relative transition-all duration-300 ${isCurrent ? "scale-105 z-20" : "hover:scale-105 opacity-80 hover:opacity-100 z-10"}`}
                            >
                                {isCurrent ? (
                                    // ACTIVE "EQUATION" CARD
                                    <motion.div
                                        layoutId="activeCard"
                                        className="bg-white w-64 rounded-xl overflow-hidden shadow-2xl shadow-indigo-500/20 border-2 border-indigo-500 relative"
                                    >
                                        {/* Glowing Header */}
                                        <div className="bg-indigo-50 px-4 py-3 border-b border-indigo-100 flex justify-center gap-1">
                                            {breakdown.map((b, i) => (
                                                <div key={i} className="flex items-center">
                                                    {i > 0 && <span className="text-indigo-300 mx-1 font-bold">+</span>}
                                                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${b.type === 'root' ? "bg-amber-100 text-amber-700" : "bg-white border border-indigo-200 text-indigo-600"}`}>
                                                        {b.label}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="p-5 text-center">
                                            <h3 className="text-2xl font-black text-slate-900 mb-2">{member.word}</h3>
                                            <div className="h-px w-8 bg-indigo-200 mx-auto mb-2" />
                                            <p className="text-sm font-medium text-slate-600 leading-snug">
                                                {typeof member.meaning === 'string' ? member.meaning : member.meaning.en}
                                            </p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    // PASSIVE CARD
                                    <div className="bg-white w-48 p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all text-center">
                                        <div className="text-xs font-semibold text-slate-400 uppercase mb-2">
                                            {breakdown.find(b => b.type === 'prefix')?.label || "?"} + Root
                                        </div>
                                        <div className="text-lg font-bold text-slate-700">
                                            {member.word}
                                        </div>
                                    </div>
                                )}
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
