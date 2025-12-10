"use client";

import { motion } from "framer-motion";
import { Block as BlockType } from "@/data/types";
import { clsx } from "clsx";

interface BlockProps {
    block: BlockType;
    onDragEnd?: (info: any) => void;
    isPlaced?: boolean;
}

export const Block = ({ block, onDragEnd, isPlaced = false }: BlockProps) => {
    const isPrefix = block.type === 'prefix';
    const isRoot = block.type === 'root';

    return (
        <motion.div
            drag={!isPlaced}
            dragSnapToOrigin={!isPlaced} // We'll handle successful drops manually
            dragElastic={0.1}
            dragMomentum={false}
            whileHover={{ scale: 1.05, cursor: isPlaced ? "default" : "grab" }}
            whileDrag={{ scale: 1.1, cursor: "grabbing", zIndex: 50 }}
            onDragEnd={(_, info) => !isPlaced && onDragEnd && onDragEnd(info)}
            className={clsx(
                "relative flex flex-col items-center justify-center w-24 h-24 rounded-xl shadow-md select-none border-b-4 transition-colors",
                isPrefix && "bg-indigo-500 border-indigo-700 text-white",
                isRoot && "bg-pink-500 border-pink-700 text-white",
                !isPrefix && !isRoot && "bg-amber-500 border-amber-700 text-white", // Suffix or other
                isPlaced && "cursor-default"
            )}
        >
            <span className="text-lg font-bold">{block.label}</span>
            <span className="text-xs opacity-80">
                {typeof block.meaning === 'string' ? block.meaning : block.meaning.en}
            </span>
        </motion.div>
    );
};
