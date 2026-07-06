import { LocalizedString } from "./types";

export interface CourseLesson {
    id: string;
    label: string;
    title: LocalizedString;
}

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Course {
    id: string;
    title: LocalizedString;
    description: LocalizedString;
    level: CourseLevel;
    /** Optional exam target shown alongside the level, e.g. "TOEIC 600+". */
    exam?: LocalizedString;
    lessons: CourseLesson[];
}

export const COURSE_LEVEL_LABEL: Record<CourseLevel, LocalizedString> = {
    beginner: { en: "Beginner", ja: "初級" },
    intermediate: { en: "Intermediate", ja: "中級" },
    advanced: { en: "Advanced", ja: "上級" },
};

export const COURSES: Course[] = [
    {
        id: "familiar",
        title: { en: "Words You Already Know", ja: "身近な言葉" },
        description: {
            en: "Everyday words hiding surprising stories — start here.",
            ja: "毎日使う言葉に隠れた、意外な物語から始めましょう。",
        },
        level: "beginner",
        lessons: [
            { id: "breakfast", label: "BREAK · FAST", title: { en: "Breaking the night's fast", ja: "夜の断食を破る" } },
            { id: "goodbye", label: "GOD · BE · WITH · YE", title: { en: "A blessing in disguise", ja: "祈りが隠れた言葉" } },
            { id: "alphabet", label: "ALPHA · BETA", title: { en: "The first two letters", ja: "最初の二文字" } },
            { id: "companion", label: "COM · PANIS", title: { en: "One who shares bread", ja: "パンを分かち合う人" } },
            { id: "window", label: "WIND · EYE", title: { en: "The wind's eye", ja: "風の目" } },
            { id: "muscle", label: "LITTLE · MOUSE", title: { en: "A little mouse", ja: "小さなネズミ" } },
            { id: "salary", label: "SALT · MONEY", title: { en: "Paid in salt", ja: "塩の給料" } },
        ],
    },
    {
        id: "builder",
        title: { en: "Build Your Own", ja: "言葉を組み立てる" },
        description: {
            en: "Learn four small parts and start inventing words yourself.",
            ja: "小さな部品を4つ覚えて、自分で言葉を作ってみましょう。",
        },
        level: "beginner",
        lessons: [
            { id: "unhappy", label: "UN + HAPPY", title: { en: "The opposite switch", ja: "意味を反転させるスイッチ" } },
            { id: "drinkable", label: "DRINK + ABLE", title: { en: "Anything can be -able", ja: "何でも〜できる形に" } },
            { id: "playful", label: "PLAY + FUL", title: { en: "Full of it", ja: "〜に満ちた" } },
            { id: "player", label: "PLAY + ER", title: { en: "The one who does it", ja: "〜する人" } },
        ],
    },
    {
        id: "inventions",
        title: { en: "Everyday Inventions", ja: "身近な発明品" },
        description: {
            en: "Telephones, photographs, bicycles — machines named from ancient parts.",
            ja: "電話、写真、自転車。発明品の名前は古代の部品でできています。",
        },
        level: "beginner",
        lessons: [
            { id: "telephone", label: "TELE · PHONE", title: { en: "A far-away sound", ja: "遠くの音" } },
            { id: "photograph", label: "PHOTO · GRAPH", title: { en: "Drawn by light", ja: "光が描いた絵" } },
            { id: "television", label: "TELE · VISION", title: { en: "Far-seeing", ja: "遠くを見る" } },
            { id: "microscope", label: "MICRO · SCOPE", title: { en: "The small-looker", ja: "小さいものを見る" } },
            { id: "bicycle", label: "BI · CYCLE", title: { en: "Two wheels", ja: "二つの車輪" } },
            { id: "subway", label: "SUB · WAY", title: { en: "The road below", ja: "道の下の道" } },
        ],
    },
    {
        id: "latin-roots",
        title: { en: "Latin Roots", ja: "ラテン語の語根" },
        description: {
            en: "Fourteen root families that unlock thousands of harder words.",
            ja: "何千もの難単語を解く鍵になる、14の語根ファミリー。",
        },
        level: "intermediate",
        lessons: [
            { id: "accept", label: "CEPT", title: { en: "To take to oneself", ja: "受け取る" } },
            { id: "contain", label: "TAIN", title: { en: "Holding Fast", ja: "しっかり掴む" } },
            { id: "submit", label: "MIT", title: { en: "Sending Signals", ja: "信号を送る" } },
            { id: "offer", label: "FER", title: { en: "Bearing Gifts", ja: "贈り物" } },
            { id: "assist", label: "SIST", title: { en: "Standing Firm", ja: "断固として立つ" } },
            { id: "autograph", label: "GRAPH", title: { en: "Written by hand", ja: "自らの手で書く" } },
            { id: "logic", label: "LOG", title: { en: "The way of words", ja: "言葉の道筋" } },
            { id: "inspect", label: "SPECT", title: { en: "A New View", ja: "新しい視点" } },
            { id: "reply", label: "PLY", title: { en: "Unfolding", ja: "展開" } },
            { id: "extend", label: "TEND", title: { en: "Reaching Out", ja: "手を伸ばす" } },
            { id: "conduct", label: "DUCT", title: { en: "Leading the Way", ja: "道を切り開く" } },
            { id: "compose", label: "POSE", title: { en: "Placing Together", ja: "共に置く" } },
            { id: "fiction", label: "FIC", title: { en: "Making Magic", ja: "魔法を作る" } },
            { id: "subscribe", label: "SCRIBE", title: { en: "The Scribe", ja: "書記" } },
        ],
    },
];

/** The course containing a given lesson id, if any. */
export const findCourseByLesson = (lessonId: string): Course | undefined =>
    COURSES.find(c => c.lessons.some(l => l.id === lessonId));

/**
 * A lesson is open when it is the first of its course or the previous
 * lesson has been mastered. Courses themselves are freely enterable.
 */
export const isLessonOpen = (course: Course, index: number, masteredWords: string[]): boolean =>
    index === 0 || masteredWords.includes(course.lessons[index - 1].id);
