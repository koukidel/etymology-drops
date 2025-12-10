"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { Block as BlockType } from "@/data/types";
import { Block } from "@/components/crafting-lab/Block";
import { DropZone } from "@/components/crafting-lab/DropZone"; // Assuming this export exists or we fix paths
import { constructWord, generateDefinition } from "./forgeLogic";
import { Sparkles, Save } from "lucide-react";

// Mock Data for the Sandbox Pool
const PREFIX_POOL: BlockType[] = [
    { id: "p1", label: "Mal-", meaning: "Bad", type: "prefix" },
    { id: "p2", label: "Bene-", meaning: "Good", type: "prefix" },
    { id: "p3", label: "Re-", meaning: "Again", type: "prefix" },
];
const ROOT_POOL: BlockType[] = [
    { id: "r1", label: "Dic", meaning: "Speak", type: "root" },
    { id: "r2", label: "Spect", meaning: "Look", type: "root" },
    { id: "r3", label: "Fact", meaning: "Make", type: "root" },
];
const SUFFIX_POOL: BlockType[] = [
    { id: "s1", label: "-tion", meaning: "State", type: "suffix" },
    { id: "s2", label: "-or", meaning: "Doer", type: "suffix" },
];

export function ForgeTable() {
    const [slots, setSlots] = useState<{ prefix: BlockType | null, root: BlockType | null, suffix: BlockType | null }>({
        prefix: null,
        root: null,
        suffix: null
    });

    const { addCustomWord } = useGameStore();
    const [minted, setMinted] = useState(false);

    const generatedWord = constructWord(slots.prefix, slots.root, slots.suffix);
    const generatedDef = generateDefinition(slots.prefix, slots.root, slots.suffix);

    const handleSelect = (block: BlockType) => {
        setMinted(false);
        setSlots(prev => ({
            ...prev,
            [block.type]: block
        }));
    };

    const handleMint = () => {
        if (!slots.root) return;
        addCustomWord(generatedWord, generatedDef, [slots.prefix?.label || "", slots.root.label, slots.suffix?.label || ""]);
        setMinted(true);
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-4 flex flex-col items-center">
            {/* The Anvil / Preview */}
            <div className="bg-slate-900 text-white w-full p-8 rounded-3xl mb-8 text-center min-h-[200px] flex flex-col justify-center shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-4xl font-black mb-2 tracking-tight">
                        {generatedWord || "???"}
                    </h2>
                    <p className="text-indigo-300 font-mono text-sm max-w-sm mx-auto">
                        {slots.root ? generatedDef : "Select a Root to begin forging..."}
                    </p>
                </div>

                {/* Mint Button */}
                {slots.root && !minted && (
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        onClick={handleMint}
                        className="mx-auto mt-6 bg-amber-500 text-black font-bold py-2 px-6 rounded-full flex items-center gap-2 hover:bg-amber-400"
                    >
                        <Sparkles size={18} /> Mint to Grimoire
                    </motion.button>
                )}
                {minted && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mx-auto mt-6 text-green-400 font-bold flex items-center gap-2"
                    >
                        <CheckCircleIcon /> Saved!
                    </motion.div>
                )}
            </div>

            {/* Slots (Click to select, simplified for speed vs drag) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-12">
                <PoolColumn title="Prefix" items={PREFIX_POOL} onSelect={handleSelect} selectedId={slots.prefix?.id} />
                <PoolColumn title="Root" items={ROOT_POOL} onSelect={handleSelect} selectedId={slots.root?.id} />
                <PoolColumn title="Suffix" items={SUFFIX_POOL} onSelect={handleSelect} selectedId={slots.suffix?.id} />
            </div>
        </div>
    );
}

function PoolColumn({ title, items, onSelect, selectedId }: any) {
    return (
        <div className="bg-white p-4 rounded-2xl border border-slate-200">
            <h3 className="text-xs font-bold text-slate-400 uppercase mb-4 text-center">{title} Source</h3>
            <div className="flex flex-col gap-3">
                {items.map((item: BlockType) => (
                    <button
                        key={item.id}
                        onClick={() => onSelect(item)}
                        className={`p-3 rounded-xl border-2 text-left transition-all ${selectedId === item.id
                                ? "border-indigo-600 bg-indigo-50 shadow-md"
                                : "border-slate-100 hover:border-indigo-200"
                            }`}
                    >
                        <span className="font-bold text-slate-800">{item.label}</span>
                        <span className="block text-xs text-slate-500">{item.meaning}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

function CheckCircleIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
    )
}
