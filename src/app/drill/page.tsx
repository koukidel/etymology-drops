"use client";

import { useState, useEffect } from "react";
import { QuizEngine } from "@/components/lesson/QuizEngine";
import { generateLesson, Question } from "@/lib/lessonGenerator";
import { useTranslation } from "@/hooks/useTranslation";
import { Hammer, Loader2 } from "lucide-react";
import { BottomNav } from "@/components/layout/BottomNav";

export default function DrillPage() {
    const { t } = useTranslation();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Function to generate a new batch of questions
    const loadQuestions = () => {
        setIsLoading(true);
        // Generate a random set of questions from all available words
        // We can pass 'random' or specific IDs if we want targeted practice later
        // For now, let's generate a generic lesson
        const newLesson = generateLesson("random");
        setQuestions(newLesson);
        setIsLoading(false);
    };

    useEffect(() => {
        loadQuestions();
    }, []);

    const handlePracticeNext = () => {
        // In infinite mode, we can just regenerate questions when we run out?
        // Or QuizEngine handles the loop.
        // But QuizEngine's loop is just index based.
        // Let's reload questions if we hit the end, or just let QuizEngine loop the current set.
        // Better: Let QuizEngine loop, but maybe we want fresh questions eventually.
        // For MVP, let's just let QuizEngine loop the 5-10 questions we gave it.
        // Actually, QuizEngine's handleNext with isPracticeMode does: setCurrentIndex(prev => (prev + 1) % questions.length);
        // So it loops forever on the same set.
        // To make it truly infinite/random, we might want to fetch a NEW question every time?
        // That would require QuizEngine to support dynamic questions or a callback that updates the question list.
        // Let's keep it simple: Loop the set of 10. User can refresh to get new ones.
        // OR: We can add a "Refresh" button in the UI.
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-24">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                        <Hammer size={20} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">{t('drill.title')}</h1>
                        <p className="text-xs text-slate-500 font-medium">{t('drill.subtitle')}</p>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="flex-1 h-[calc(100vh-160px)] p-6">
                {isLoading ? (
                    <div className="h-full flex items-center justify-center">
                        <Loader2 className="animate-spin text-indigo-600" size={32} />
                    </div>
                ) : (
                    <QuizEngine
                        questions={questions}
                        isPracticeMode={true}
                        onPracticeNext={handlePracticeNext} // Optional, default loops
                    />
                )}
            </main>

            <BottomNav />
        </div>
    );
}
