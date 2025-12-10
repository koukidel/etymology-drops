"use client";

import { motion } from "framer-motion";
import { Trophy, ArrowUp, ArrowDown, Minus, User } from "lucide-react";
import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface LeaderboardUser {
    uid: string;
    displayName: string;
    xp: number;
    change?: 'up' | 'down' | 'same';
}

export const Leaderboard = ({ userXp }: { userXp: number }) => {
    const [users, setUsers] = useState<LeaderboardUser[]>([]);
    const [currentUser] = useAuthState(auth);

    useEffect(() => {
        const q = query(collection(db, "users"), orderBy("xp", "desc"), limit(50));
        const unsubscribe = onSnapshot(q,
            (snapshot) => {
                const fetchedUsers: LeaderboardUser[] = [];
                snapshot.forEach((doc) => {
                    fetchedUsers.push({ uid: doc.id, ...doc.data() } as LeaderboardUser);
                });
                setUsers(fetchedUsers);
            },
            (error) => {
                console.error("Leaderboard error:", error);
                // Gracefully fail instead of crashing
            }
        );

        return () => unsubscribe();
    }, []);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 w-full max-w-md">
            <div className="flex items-center gap-2 mb-4">
                <Trophy className="text-amber-500" />
                <h3 className="text-xl font-bold text-slate-900">Weekly League</h3>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                {users.length === 0 ? (
                    <div className="text-center text-slate-400 py-8">No players yet. Be the first!</div>
                ) : (
                    users.map((user, i) => {
                        const isMe = user.uid === currentUser?.uid;
                        return (
                            <motion.div
                                key={user.uid}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={clsx(
                                    "flex items-center justify-between p-3 rounded-xl transition-colors",
                                    isMe ? "bg-indigo-50 border border-indigo-100" : "hover:bg-slate-50"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <span className={clsx(
                                        "font-bold w-6 text-center",
                                        i < 3 ? "text-amber-500" : "text-slate-400"
                                    )}>{i + 1}</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
                                            <User size={16} className="text-slate-400" />
                                        </div>
                                        <span className={clsx(
                                            "font-medium truncate max-w-[120px]",
                                            isMe ? "text-indigo-700" : "text-slate-700"
                                        )}>{user.displayName || "Anonymous"} {isMe && "(You)"}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span className="font-bold text-slate-900">{user.xp} XP</span>
                                </div>
                            </motion.div>
                        );
                    })
                )}
            </div>
        </div>
    );
};
