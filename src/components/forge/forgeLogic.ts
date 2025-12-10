import { Block } from "@/data/types";

export function generateDefinition(prefix: Block | null, root: Block | null, suffix: Block | null): string {
    if (!root) return "Incomplete word structure.";

    const rootMeaning = root.meaning.toLowerCase();
    const prefixMeaning = prefix ? prefix.meaning.toLowerCase() : "";
    const suffixMeaning = suffix ? suffix.meaning.toLowerCase() : "";

    // Simple Template Logic
    if (prefix && suffix) {
        return `The state of ${rootMeaning} ${prefixMeaning}.`;
    } else if (prefix) {
        return `To ${rootMeaning} ${prefixMeaning}.`;
    } else if (suffix) {
        return `Someone who ${rootMeaning}s.`;
    }

    return `Relating to ${rootMeaning}.`;
}

export function constructWord(prefix: Block | null, root: Block | null, suffix: Block | null): string {
    return [prefix?.label, root?.label, suffix?.label]
        .filter(Boolean)
        .join("")
        .replace("-", "") // Remove hyphens from parts like "Re-"
        .replace("-", ""); // Remove hyphens from suffixes like "-tion"
}
