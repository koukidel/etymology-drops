"use client";

import { motion } from "framer-motion";
import { TimelineEvent } from "@/data/types";
import { useState } from "react";

interface EtymologyTimelineProps {
    timeline: TimelineEvent[];
}

export function EtymologyTimeline({ timeline }: EtymologyTimelineProps) {
    const [selectedNode, setSelectedNode] = useState<number | null>(null);

    return (
        <div className="py-8">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 text-center">
                Evolutionary Journey
            </h3>

            <div className="relative">
                {/* Connecting Line */}
                <div className="absolute top-6 left-0 right-0 h-0.5 bg-slate-200" />

                <div className="flex justify-between relative z-10 px-4">
                    {timeline.map((event, index) => {
                        const isSelected = selectedNode === index;

                        return (
                            <div key={index} className="flex flex-col items-center group">
                                {/* Node */}
                                <motion.button
                                    onClick={() => setSelectedNode(index)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`
                                        w-12 h-12 rounded-full border-4 flex items-center justify-center bg-white transition-colors mb-4 relative
                                        ${isSelected
                                            ? 'border-indigo-500 shadow-lg shadow-indigo-200 z-20'
                                            : 'border-slate-300 hover:border-indigo-300'
                                        }
                                    `}
                                >
                                    <span className="text-[10px] font-bold text-slate-600">
                                        {event.year}
                                    </span>
                                </motion.button>

                                {/* Label */}
                                <div className="text-center">
                                    <div className="font-bold text-slate-800 text-sm">{event.language}</div>
                                    <div className="text-xs text-slate-500 italic">{event.word}</div>
                                </div>

                                {/* Details Popover (Mobile-friendly placement logic omitted for brevity, centered for now) */}
                                {isSelected && (
                                    <motion.div
                                        layoutId="timeline-details"
                                        className="absolute top-24 left-4 right-4 bg-white p-4 rounded-xl shadow-xl border border-slate-100 z-30"
                                    >
                                        <div className="text-xs font-bold text-indigo-500 uppercase mb-1">
                                            {event.language} • {event.year}
                                        </div>
                                        <div className="text-lg font-black text-slate-800 mb-2">
                                            {event.word}
                                        </div>
                                        <div className="text-sm text-slate-600">
                                            {typeof event.description === 'string' ? event.description : event.description.en}
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Spacer for the popover */}
                <div className="h-40" />
            </div>
        </div>
    );
}
