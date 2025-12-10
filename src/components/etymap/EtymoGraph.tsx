"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraphNode, GraphLink } from "@/hooks/useGraphData";

interface EtymoGraphProps {
    nodes: GraphNode[];
    links: GraphLink[];
}

export const EtymoGraph = ({ nodes, links }: EtymoGraphProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [positions, setPositions] = useState<Record<string, { x: number, y: number }>>({});
    const [selectedNode, setSelectedNode] = useState<string | null>(null);

    // Simple Force Simulation Initiation
    useEffect(() => {
        if (!containerRef.current) return;
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        const center = { x: width / 2, y: height / 2 };

        // Initialize positions: Spiral or Grid to avoid overlap
        const newPos: Record<string, { x: number, y: number }> = {};
        const angleStep = (Math.PI * 2) / nodes.length;

        nodes.forEach((node, i) => {
            const isRoot = node.type === 'root';
            // Roots in inner circle, others further out
            const radius = isRoot ? 50 + (i * 5) : 200 + (Math.random() * 100);
            const angle = i * angleStep;

            newPos[node.id] = {
                x: center.x + Math.cos(angle) * (isRoot ? 100 : 250),
                y: center.y + Math.sin(angle) * (isRoot ? 100 : 250)
            };
        });

        // Simulation Loop
        for (let i = 0; i < 150; i++) {
            nodes.forEach(node => {
                let fx = 0, fy = 0;

                // Repulsion
                nodes.forEach(other => {
                    if (node.id === other.id) return;
                    const dx = newPos[node.id].x - newPos[other.id].x;
                    const dy = newPos[node.id].y - newPos[other.id].y;
                    const distSq = dx * dx + dy * dy || 1;
                    const force = 10000 / distSq; // Stronger Repulsion
                    fx += (dx / Math.sqrt(distSq)) * force;
                    fy += (dy / Math.sqrt(distSq)) * force;
                });

                // Attraction to Center (Gravity)
                const dx = newPos[node.id].x - center.x;
                const dy = newPos[node.id].y - center.y;
                fx -= dx * 0.02; // Gentle gravity
                fy -= dy * 0.02;

                newPos[node.id].x += fx;
                newPos[node.id].y += fy;
            });
        }
        setPositions(newPos);
    }, [nodes, links]);

    return (
        <div ref={containerRef} className="w-full h-screen bg-slate-900 overflow-hidden relative touch-none">
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {links.map((link, i) => {
                    const src = positions[link.source];
                    const tgt = positions[link.target];
                    if (!src || !tgt) return null;
                    return (
                        <motion.line
                            key={i}
                            x1={src.x} y1={src.y}
                            x2={tgt.x} y2={tgt.y}
                            stroke="rgba(99, 102, 241, 0.2)"
                            strokeWidth="1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        />
                    );
                })}
            </svg>

            <AnimatePresence>
                {nodes.map((node) => {
                    const pos = positions[node.id];
                    if (!pos) return null;

                    const isRoot = node.type === 'root';
                    const isSelected = selectedNode === node.id;

                    return (
                        <motion.div
                            key={node.id}
                            className={`absolute flex items-center justify-center rounded-full shadow-2xl cursor-pointer border-2 transition-colors ${isRoot
                                ? "bg-indigo-500 border-indigo-300 text-white z-20"
                                : "bg-slate-800 border-slate-600 text-slate-300 z-10"
                                }`}
                            style={{
                                x: pos.x,
                                y: pos.y,
                                width: isRoot ? 60 : 40,
                                height: isRoot ? 60 : 40,
                                marginLeft: isRoot ? -30 : -20,
                                marginTop: isRoot ? -30 : -20
                            }}
                            whileHover={{ scale: 1.2, zIndex: 50 }}
                            onClick={() => setSelectedNode(node.id)}
                            layout
                        >
                            <span className="text-xs font-bold pointer-events-none select-none">
                                {isRoot ? node.label : ""}
                            </span>

                            {/* Hover/Select Label for Words */}
                            {!isRoot && (
                                <div className="absolute top-full mt-2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 whitespace-nowrap pointer-events-none">
                                    {node.label}
                                </div>
                            )}

                        </motion.div>
                    );
                })}
            </AnimatePresence>

            {/* DETAIL CARD OVERLAY */}
            <AnimatePresence>
                {selectedNode && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl z-50 text-slate-900 border border-indigo-100"
                    >
                        <h3 className="text-xl font-bold mb-2">
                            {nodes.find(n => n.id === selectedNode)?.label}
                        </h3>
                        <p className="text-slate-600">
                            {nodes.find(n => n.id === selectedNode)?.data?.meaning || "Root word."}
                        </p>
                        <button
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-800"
                            onClick={() => setSelectedNode(null)}
                        >
                            ✕
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
