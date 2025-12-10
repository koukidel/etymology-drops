"use client";

import { HistoricalQuote } from "@/data/historicalQuotes";
import { motion } from "framer-motion";
import { Scroll } from "lucide-react";

interface Props {
    data: HistoricalQuote;
}

export function HistoricalCard({ data }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-[#f4e4bc] text-amber-900 p-8 rounded-sm shadow-xl relative font-serif"
            style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/aged-paper.png')" }}
        >
            <div className="flex justify-between items-center mb-6 border-b border-amber-900/20 pb-2">
                <span className="text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                    <Scroll size={14} /> Historical Precedent
                </span>
                <span className="font-bold">{data.year}</span>
            </div>

            <blockquote className="text-xl italic leading-relaxed mb-6">
                "{data.quote}"
            </blockquote>

            <div className="text-right text-sm font-bold mb-8">
                — {data.source}
            </div>

            <div className="bg-amber-900/10 p-4 rounded text-sm">
                <p><strong>Connection:</strong> {data.connection}</p>
            </div>
        </motion.div>
    );
}
