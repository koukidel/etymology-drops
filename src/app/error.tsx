"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-4">
            <p className="font-serif text-5xl text-foreground">源</p>
            <h2 className="font-serif text-3xl text-foreground">問題が発生しました</h2>
            <p className="text-muted-foreground max-w-md">
                ページの表示中にエラーが起きました。学習の進捗は保存されています。
            </p>
            <div className="flex items-center gap-6 pt-2">
                <button
                    onClick={reset}
                    className="px-8 py-3 bg-foreground text-background rounded-full hover:opacity-90 transition-opacity"
                >
                    もう一度読み込む
                </button>
                <Link href="/" className="text-sm text-muted-foreground hover:text-accent underline underline-offset-4">
                    ホームへ
                </Link>
            </div>
        </div>
    );
}
