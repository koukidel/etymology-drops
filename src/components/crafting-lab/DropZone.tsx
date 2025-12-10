"use client";

import { clsx } from "clsx";
import { ReactNode, forwardRef } from "react";

interface DropZoneProps {
    label: string;
    isFilled?: boolean;
    children?: ReactNode;
    className?: string;
}

export const DropZone = forwardRef<HTMLDivElement, DropZoneProps>(
    ({ label, isFilled, children, className }, ref) => {
        return (
            <div
                ref={ref}
                className={clsx(
                    "relative flex items-center justify-center w-28 h-28 rounded-2xl border-2 border-dashed transition-colors",
                    isFilled ? "border-transparent bg-slate-100" : "border-slate-300 bg-slate-50",
                    className
                )}
            >
                {!isFilled && (
                    <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                        {label}
                    </span>
                )}
                {children}
            </div>
        );
    }
);

DropZone.displayName = "DropZone";
