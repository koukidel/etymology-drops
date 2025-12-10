"use client";

import { StoryReader } from "@/components/story-stream/StoryReader";
import Link from "next/link";
import { ArrowLeft, Sparkles, RefreshCw, Settings2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useGameStore } from "@/store/useGameStore";
import { wordBank } from "@/data/wordBank";

interface ModelInfo {
    name: string;
    description: string;
}

export default function StoryPage() {
    const { masteredWords } = useGameStore();
    const [story, setStory] = useState<{ title: string; content: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [models, setModels] = useState<ModelInfo[]>([]);
    const [selectedModel, setSelectedModel] = useState<string>("gemini-1.5-flash");

    useEffect(() => {
        // Fetch available models on load
        const fetchModels = async () => {
            try {
                const res = await fetch('/api/check-models');
                const data = await res.json();
                if (data.models) {
                    setModels(data.models);
                }
            } catch (e) {
                console.error("Failed to load models", e);
            }
        };
        fetchModels();
    }, []);

    const generateStory = async () => {
        setLoading(true);
        try {
            // Use mastered words or fallback to some defaults if none mastered
            const wordsToUse = masteredWords.length > 0
                ? masteredWords
                : ["transport", "inspect", "project"]; // Fallback

            const response = await fetch("/api/generate-story", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    words: wordsToUse,
                    model: selectedModel
                }),
            });

            const data = await response.json();
            if (data.error) {
                const debugMsg = data.debugKey ? ` (Key: ${data.debugKey})` : '';
                throw new Error(data.error + debugMsg);
            }
            setStory(data);
        } catch (error: any) {
            console.error("Failed to generate story:", error);
            alert(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Auto-generate on first load if not present, but only after models are loaded or defaulted
    useEffect(() => {
        // Optional: Trigger generation immediately or wait for user
    }, []);

    return (
        <main className="min-h-screen bg-slate-50 p-6 flex flex-col">
            <header className="mb-8 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="p-2 bg-white rounded-xl shadow-sm hover:bg-slate-100 transition-colors">
                            <ArrowLeft size={24} className="text-slate-600" />
                        </Link>
                        <h1 className="text-2xl font-bold text-slate-900">Story Stream</h1>
                    </div>
                    <button
                        onClick={generateStory}
                        disabled={loading}
                        className="p-2 bg-indigo-100 text-indigo-600 rounded-xl hover:bg-indigo-200 transition-colors disabled:opacity-50"
                    >
                        {loading ? <RefreshCw size={24} className="animate-spin" /> : <Sparkles size={24} />}
                    </button>
                </div>

                {/* Model Selector */}
                <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex items-center gap-3">
                    <Settings2 size={18} className="text-slate-400" />
                    <select
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className="flex-1 bg-transparent text-sm text-slate-700 outline-none"
                    >
                        {models.length > 0 ? (
                            models.map((m) => {
                                const shortName = m.name.replace("models/", "");
                                return (
                                    <option key={m.name} value={shortName}>
                                        {shortName}
                                    </option>
                                );
                            })
                        ) : (
                            <>
                                <option value="gemini-1.5-flash">gemini-1.5-flash (Default)</option>
                                <option value="gemini-pro">gemini-pro</option>
                            </>
                        )}
                    </select>
                </div>
            </header>

            <div className="flex-1 flex items-center justify-center">
                {loading ? (
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                        <p className="text-slate-500 animate-pulse">Weaving a story from your words...</p>
                    </div>
                ) : story ? (
                    <StoryReader title={story.title} content={story.content} words={wordBank} />
                ) : (
                    <div className="text-center text-slate-500">
                        <p>Ready to generate a story?</p>
                        <button onClick={generateStory} className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-full font-bold">
                            Generate
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}
