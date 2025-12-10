// import { Level } from "./types";

export interface Level {
    id: string;
    title: string;
    description: string;
    type: 'root' | 'prefix' | 'suffix' | 'mixed' | 'challenge';
    topics: string[]; // IDs of roots/affixes to quiz
    requiredXp: number;
    icon: string; // Lucide icon name
    color: string; // Tailwind color class key (e.g. 'indigo', 'emerald')
    storyId?: string; // Optional: ID of the story unlocked by this level
}

export const levels: Level[] = [
    // 1. CEPT (Take)
    {
        id: "lvl_1",
        title: "The Taking",
        description: "Root: Cept (取)",
        type: "root",
        topics: ["cept"],
        requiredXp: 0,
        icon: "Grab",
        color: "indigo",
        storyId: "story_lvl_1"
    },
    // 2. TAIN (Hold)
    {
        id: "lvl_2",
        title: "The Holding",
        description: "Root: Tain (保)",
        type: "root",
        topics: ["tain"],
        requiredXp: 100,
        icon: "Box",
        color: "blue",
        storyId: "story_lvl_2"
    },
    // 3. MIT (Send)
    {
        id: "lvl_3",
        title: "The Sending",
        description: "Root: Mit (送)",
        type: "root",
        topics: ["mit"],
        requiredXp: 200,
        icon: "Send",
        color: "sky",
        storyId: "story_lvl_3"
    },
    // 4. FER (Carry)
    {
        id: "lvl_4",
        title: "The Carrying",
        description: "Root: Fer (運)",
        type: "root",
        topics: ["fer"],
        requiredXp: 300,
        icon: "Container",
        color: "teal",
        storyId: "story_lvl_4"
    },
    // 5. SIST (Stand)
    {
        id: "lvl_5",
        title: "The Standing",
        description: "Root: Sist (立)",
        type: "root",
        topics: ["sist"],
        requiredXp: 400,
        icon: "Flag",
        color: "green",
        storyId: "story_lvl_5"
    },
    // 6. GRAPH (Write)
    {
        id: "lvl_6",
        title: "The Writing",
        description: "Root: Graph (書)",
        type: "root",
        topics: ["graph"],
        requiredXp: 500,
        icon: "PenTool",
        color: "lime"
    },
    // 7. LOG (Word/Study)
    {
        id: "lvl_7",
        title: "The Logic",
        description: "Root: Log (言)",
        type: "root",
        topics: ["log", "logy"],
        requiredXp: 600,
        icon: "Book",
        color: "yellow"
    },
    // 8. SPECT (Look)
    {
        id: "lvl_8",
        title: "The Looking",
        description: "Root: Spect (見)",
        type: "root",
        topics: ["spect"],
        requiredXp: 700,
        icon: "Eye",
        color: "orange"
    },
    // 9. PLY (Fold)
    {
        id: "lvl_9",
        title: "The Folding",
        description: "Root: Ply (折)",
        type: "root",
        topics: ["ply"],
        requiredXp: 800,
        icon: "Layers",
        color: "red"
    },
    // 10. TEND (Stretch)
    {
        id: "lvl_10",
        title: "The Stretching",
        description: "Root: Tend (伸)",
        type: "root",
        topics: ["tend"],
        requiredXp: 900,
        icon: "MoveDiagonal",
        color: "rose"
    },
    // 11. DUCT (Lead)
    {
        id: "lvl_11",
        title: "The Leading",
        description: "Root: Duct (導)",
        type: "root",
        topics: ["duct", "duce"],
        requiredXp: 1000,
        icon: "Compass",
        color: "pink"
    },
    // 12. POSE (Put)
    {
        id: "lvl_12",
        title: "The Placing",
        description: "Root: Pose (置)",
        type: "root",
        topics: ["pose"],
        requiredXp: 1100,
        icon: "MapPin",
        color: "fuchsia"
    },
    // 13. FIC (Make)
    {
        id: "lvl_13",
        title: "The Making",
        description: "Root: Fic (作)",
        type: "root",
        topics: ["fic", "fict"],
        requiredXp: 1200,
        icon: "Hammer",
        color: "purple"
    },
    // 14. SCRIBE (Write)
    {
        id: "lvl_14",
        title: "The Scribing",
        description: "Root: Scribe (書)",
        type: "root",
        topics: ["scribe", "script"],
        requiredXp: 1300,
        icon: "Feather",
        color: "violet"
    }
];
