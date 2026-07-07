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
            { id: "disaster", label: "BAD · STAR", title: { en: "An ill-starred day", ja: "不吉な星回り" } },
            { id: "nightmare", label: "NIGHT · DEMON", title: { en: "The night demon", ja: "夜の悪霊" } },
            { id: "quarantine", label: "FORTY · DAYS", title: { en: "Forty days", ja: "40日間" } },
            { id: "candidate", label: "WHITE · ROBED", title: { en: "Dressed in white", ja: "白い衣の人" } },
            { id: "sarcasm", label: "FLESH · TEAR", title: { en: "Tearing the flesh", ja: "肉を剥ぐ" } },
            { id: "tragedy", label: "GOAT · SONG", title: { en: "The goat song", ja: "ヤギの歌" } },
            { id: "curfew", label: "COVER · FIRE", title: { en: "Cover the fire", ja: "火を覆え" } },
            { id: "malaria", label: "BAD · AIR", title: { en: "Bad air", ja: "悪い空気" } },
            { id: "rival", label: "SAME · STREAM", title: { en: "Sharing a stream", ja: "同じ川の者" } },
            { id: "decide", label: "CUT · OFF", title: { en: "Cutting it off", ja: "切り落とす" } },
            { id: "denim", label: "FROM · NÎMES", title: { en: "Cloth of Nîmes", ja: "ニームの布" } },
            { id: "hippopotamus", label: "RIVER · HORSE", title: { en: "The river horse", ja: "川の馬" } },
            { id: "villain", label: "FARM · HAND", title: { en: "Just a farmhand", ja: "ただの農夫" } },
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
    {
        id: "toeic-600",
        title: { en: "Everyday Business English", ja: "ビジネス英語の基礎" },
        description: {
            en: "Frequent workplace words, each built from a reusable Latin part.",
            ja: "職場で頻出する単語を、繰り返し使えるラテン語の部品から。",
        },
        level: "intermediate",
        exam: { en: "TOEIC 600+", ja: "TOEIC 600+" },
        lessons: [
            { id: "transport", label: "TRANS · PORT", title: { en: "Carry across", ja: "横切って運ぶ" } },
            { id: "export", label: "EX · PORT", title: { en: "Carry out", ja: "外へ運ぶ" } },
            { id: "import", label: "IM · PORT", title: { en: "Carry in", ja: "中へ運ぶ" } },
            { id: "provide", label: "PRO · VIDE", title: { en: "See ahead", ja: "先を見る" } },
            { id: "propose", label: "PRO · POSE", title: { en: "Put forward", ja: "前に置く" } },
            { id: "distribute", label: "DIS · TRIBUTE", title: { en: "Deal out to each", ja: "個別に配る" } },
            { id: "deduct", label: "DE · DUCT", title: { en: "Lead away", ja: "引き離す" } },
            { id: "refund", label: "RE · FUND", title: { en: "Pour back", ja: "注ぎ戻す" } },
            { id: "predict", label: "PRE · DICT", title: { en: "Say beforehand", ja: "前もって言う" } },
            { id: "contract", label: "CON · TRACT", title: { en: "Draw together", ja: "共に引く" } },
        ],
    },
    {
        id: "eiken-1",
        title: { en: "Taking Long Words Apart", ja: "長い単語の分解" },
        description: {
            en: "Advanced multi-part words become simple once you see the seams.",
            ja: "難しい多接辞の単語も、境目が見えれば単純になります。",
        },
        level: "advanced",
        exam: { en: "英検1級", ja: "英検1級" },
        lessons: [
            { id: "indispensable", label: "IN · DIS · PENS · ABLE", title: { en: "Cannot be weighed out", ja: "欠かせない" } },
            { id: "incomprehensible", label: "IN · COM · PREHENS · IBLE", title: { en: "Cannot be grasped", ja: "把握できない" } },
            { id: "unprecedented", label: "UN · PRE · CED", title: { en: "No prior example", ja: "前例がない" } },
            { id: "circumnavigate", label: "CIRCUM · NAVIG", title: { en: "Sail all around", ja: "周りを航海する" } },
            { id: "incorruptible", label: "IN · COR · RUPT · IBLE", title: { en: "Cannot be broken", ja: "堕落しない" } },
            { id: "retrospective", label: "RETRO · SPECT", title: { en: "Looking back", ja: "振り返って見る" } },
            { id: "irreversible", label: "IR · RE · VERS", title: { en: "Cannot be turned back", ja: "戻せない" } },
            { id: "interdependence", label: "INTER · DE · PEND", title: { en: "Hanging on each other", ja: "相互に依存する" } },
            { id: "inconceivable", label: "IN · CON · CEIV", title: { en: "Cannot be taken in", ja: "想像できない" } },
            { id: "benevolent", label: "BENE · VOL", title: { en: "Wishing well", ja: "善を願う" } },
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
