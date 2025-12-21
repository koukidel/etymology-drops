"use client";

import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider, db } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { LogIn, LogOut, User } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { useEffect } from "react";

export const LoginButton = () => {
    const [user, loading] = useAuthState(auth as any);
    const { xp, streak, gems, masteredWords, setFromFirestore } = useGameStore();

    // Sync user data on login
    useEffect(() => {
        const syncUser = async () => {
            if (user && db) {
                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    // Load data from Firestore
                    const data = userSnap.data();
                    setFromFirestore({
                        xp: data.xp,
                        streak: data.streak,
                        gems: data.gems,
                        masteredWords: data.masteredWords || [],
                    });
                } else {
                    // Create new user doc with local data (or initial state)
                    await setDoc(userRef, {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        xp: xp,
                        streak: streak,
                        gems: gems,
                        masteredWords: masteredWords,
                        lastPlayed: new Date().toDateString(),
                    });
                }
            }
        };

        syncUser();
    }, [user]); // Run when user auth state changes

    const handleLogin = async () => {
        if (!auth || !googleProvider) {
            console.error("Firebase auth not initialized");
            return;
        }
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const handleLogout = async () => {
        if (!auth) return;
        await signOut(auth);
        window.location.reload(); // Simple reload to clear state for now
    };

    if (loading) return <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />;

    if (user) {
        return (
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-100">
                    {user.photoURL ? (
                        <img src={user.photoURL} alt={user.displayName || "User"} className="w-6 h-6 rounded-full" />
                    ) : (
                        <User size={16} className="text-slate-400" />
                    )}
                    <span className="text-sm font-bold text-slate-700 hidden sm:inline">{user.displayName?.split(" ")[0]}</span>
                </div>
                <button
                    onClick={handleLogout}
                    className="p-2 bg-slate-100 text-slate-600 rounded-full hover:bg-slate-200 transition-colors"
                    title="Sign Out"
                >
                    <LogOut size={18} />
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={handleLogin}
            className="flex items-center gap-2 px-4 py-2 bg-white text-slate-900 rounded-full font-bold shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors"
        >
            <LogIn size={18} className="text-indigo-600" />
            <span>Sign In</span>
        </button>
    );
};
