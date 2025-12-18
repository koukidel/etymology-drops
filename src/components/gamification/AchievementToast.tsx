"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useGameStore } from "@/store/useGameStore";
import { X } from "lucide-react";

export function AchievementToast() {
    const { notifications, removeNotification } = useGameStore();

    // Auto-dismiss logic
    useEffect(() => {
        if (notifications.length > 0) {
            const timer = setTimeout(() => {
                removeNotification(notifications[0].id);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [notifications, removeNotification]);

    return (
        <div className="fixed top-4 right-4 z-[200] flex flex-col gap-2 pointer-events-none">
            <AnimatePresence>
                {notifications.map((notification) => (
                    <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 50, scale: 0.9 }}
                        layout
                        className="pointer-events-auto bg-white rounded-2xl shadow-xl border border-slate-100 p-4 w-80 flex items-start gap-4 overflow-hidden relative"
                    >
                        {/* Type Indicator Bar */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${notification.type === 'achievement' ? 'bg-amber-400' :
                                notification.type === 'reward' ? 'bg-indigo-500' : 'bg-slate-400'
                            }`} />

                        <div className="text-3xl shrink-0 pt-1">
                            {notification.icon || (notification.type === 'achievement' ? '🏆' : 'ℹ️')}
                        </div>

                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-slate-800 text-sm leading-tight mb-1">
                                {notification.title}
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                {notification.message}
                            </p>
                        </div>

                        <button
                            onClick={() => removeNotification(notification.id)}
                            className="text-slate-300 hover:text-slate-500 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
