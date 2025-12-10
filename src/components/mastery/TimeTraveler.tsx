"use client";

import { useState } from "react";
import { TimelineEvent } from "@/data/types";
import { motion, AnimatePresence } from "framer-motion";
import { History, ChevronDown } from "lucide-react";

interface Props {
    timeline: TimelineEvent[];
}

export function TimeTraveler({ timeline }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    if (!timeline || timeline.length === 0) return null;

    // Get the earliest and latest year for summary
    const startYearStr = timeline[0]?.year || "0";
    const startYear = parseInt(startYearStr);
    const endYear = timeline[timeline.length - 1]?.year;

    return (
        <section className="bg-amber-50 rounded-3xl overflow-hidden border border-amber-100 shadow-sm">
            {/* Header / Summary View */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="p-6 sm:p-8 cursor-pointer hover:bg-amber-100/50 transition-colors flex items-center justify-between"
            >
                <div>
                    <div className="flex items-center gap-2 text-amber-800 font-bold mb-1 uppercase tracking-widest text-xs">
                        <History size={14} />
                        Time Machine
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-amber-900">
                        {Math.abs(startYear)} BC — {endYear}
                    </h3>
                    <p className="text-amber-700/80 text-sm font-medium mt-1">
                        {isOpen ? "Tap to close history" : "Tap to explore the journey"}
                    </p>
                </div>

                <div className={`p-3 rounded-full bg-amber-200 text-amber-800 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                    <ChevronDown size={24} />
                </div>
            </div>

            {/* Accordion Body */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-amber-200/50"
                    >
                        <div className="p-6 sm:p-8 space-y-8 relative">
                            {/* Vertical Line */}
                            <div className="absolute left-9 top-8 bottom-8 w-0.5 bg-amber-200" />

                            {timeline.map((event, index) => {
                                const yearNum = parseInt(event.year);
                                return (
                                    <div key={index} className="relative pl-10">
                                        {/* Dot */}
                                        <div className="absolute left-[-5px] top-1.5 w-4 h-4 rounded-full bg-amber-400 border-4 border-amber-50 shadow-sm z-10" />

                                        <div className="flex items-baseline gap-2 mb-1">
                                            <span className="font-black text-amber-900 text-lg">
                                                {yearNum < 0 ? `${Math.abs(yearNum)} BC` : event.year}
                                            </span>
                                            <span className="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">{event.language}</span>
                                        </div>
                                        <div className="text-lg font-bold text-amber-800 italic mb-1">"{event.word}"</div>
                                        <p className="text-amber-900/80 leading-relaxed text-sm">
                                            {typeof event.description === 'string' ? event.description : event.description?.en || "No definition available."}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Decoration */}
            <div className="absolute top-0 right-0 p-32 bg-amber-50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        </section>
    );
}
