import { Word } from "./types";

// Chapter 1: everyday words the learner already knows, each hiding a story.
// Block labels must spell the word when concatenated (the Slicer cuts by letter count).
export const familiarWords: Word[] = [
    {
        id: "breakfast",
        word: "Breakfast",
        meaning: {
            en: "The first meal of the day.",
            ja: "一日の最初の食事。",
        },
        history: {
            en: "'Break' + 'fast' (a period without food). Sleep is the longest fast of your day — the morning meal literally breaks it.",
            ja: "'break'（破る）+ 'fast'（断食）。睡眠は一日で最も長い断食であり、朝食は文字通りその断食を破る食事です。",
        },
        blocks: [
            { id: "break", label: "Break", meaning: { en: "To end, to shatter", ja: "破る" }, type: "root" },
            { id: "fast", label: "Fast", meaning: { en: "A time without food", ja: "断食" }, type: "root" },
        ],
        icon: "Sunrise",
        timeline: [
            {
                year: "900 AD",
                language: "Old English",
                word: "Fæstan",
                meaning: { en: "To fast", ja: "断食する" },
                description: {
                    en: "To 'fast' meant to hold firm — to go without food, often for religious reasons.",
                    ja: "「fast」は固く守ること、つまり宗教的な理由などで食事を断つことを意味しました。",
                },
            },
            {
                year: "1400s",
                language: "Middle English",
                word: "Breken fast",
                meaning: { en: "To end the fast", ja: "断食を終える" },
                description: {
                    en: "Sleep is the longest fast of the day. The first meal 'broke' it.",
                    ja: "睡眠は一日で最も長い断食。最初の食事がそれを「破り」ました。",
                },
            },
            {
                year: "1500s",
                language: "English",
                word: "Breakfast",
                meaning: { en: "The morning meal", ja: "朝の食事" },
                description: {
                    en: "The two words fused into one and became the name of the meal itself.",
                    ja: "二つの単語が一つに融合し、食事そのものの名前になりました。",
                },
            },
            {
                year: "Modern",
                language: "English",
                word: "Breakfast",
                meaning: { en: "First meal of the day", ja: "一日の最初の食事" },
                description: {
                    en: "The story hides in plain sight: every morning, you break a fast.",
                    ja: "物語は目の前に隠れています。毎朝、あなたは断食を破っているのです。",
                },
            },
        ],
    },
    {
        id: "goodbye",
        word: "Goodbye",
        meaning: {
            en: "A phrase said when parting.",
            ja: "別れのときに言う言葉。",
        },
        history: {
            en: "A worn-down form of 'God be with ye'. Centuries of use compressed the blessing, and 'God' softened into 'good' by analogy with 'good day'.",
            ja: "'God be with ye'（神があなたと共にありますように）が数世紀の間に縮まった形。'good day' との類推で 'God' が 'good' に変化しました。",
        },
        blocks: [
            { id: "good", label: "Good", meaning: { en: "Originally 'God'", ja: "もとは「神 (God)」" }, type: "root" },
            { id: "bye", label: "Bye", meaning: { en: "'Be with ye'", ja: "「あなたと共にあれ」の短縮" }, type: "root" },
        ],
        icon: "Hand",
    },
    {
        id: "alphabet",
        word: "Alphabet",
        meaning: {
            en: "The set of letters used to write a language.",
            ja: "言語を書き表すための文字の集まり。",
        },
        history: {
            en: "From 'alpha' and 'beta', the first two letters of the Greek alphabet — the ancient way of saying 'the ABCs'.",
            ja: "ギリシャ文字の最初の二文字「アルファ」と「ベータ」から。「ABC」と言うのと同じ発想の古代版です。",
        },
        blocks: [
            { id: "alpha", label: "Alpha", meaning: { en: "Α — the first Greek letter", ja: "ギリシャ文字の1番目 (Α)" }, type: "root" },
            { id: "bet", label: "Bet", meaning: { en: "Beta (Β) — the second letter", ja: "2番目の文字ベータ (Β)" }, type: "root" },
        ],
        icon: "Type",
    },
    {
        id: "companion",
        word: "Companion",
        meaning: {
            en: "A person you spend time with; a friend on the way.",
            ja: "共に時間を過ごす人、道連れ。",
        },
        history: {
            en: "'Com-' (with) + 'panis' (bread): literally, someone you share your bread with.",
            ja: "'com-'（共に）+ 'panis'（パン）。文字通り「パンを分かち合う人」を意味します。",
        },
        blocks: [
            { id: "com", label: "Com", meaning: { en: "With, together", ja: "共に" }, type: "prefix" },
            { id: "pan", label: "Pan", meaning: { en: "Bread", ja: "パン" }, type: "root" },
            { id: "ion", label: "Ion", meaning: { en: "Person or thing", ja: "〜する人・もの" }, type: "suffix" },
        ],
        icon: "Users",
    },
    {
        id: "window",
        word: "Window",
        meaning: {
            en: "An opening in a wall that lets in light and air.",
            ja: "光と空気を取り入れる壁の開口部。",
        },
        history: {
            en: "From Old Norse 'vindauga': 'wind' + 'eye'. A window is the wind's eye in the wall of a house.",
            ja: "古ノルド語の 'vindauga'（vindr「風」+ auga「目」）から。窓は家の壁にある「風の目」なのです。",
        },
        blocks: [
            { id: "wind", label: "Wind", meaning: { en: "Wind", ja: "風" }, type: "root" },
            { id: "ow", label: "Ow", meaning: { en: "From 'auga' — eye", ja: "「目」(古ノルド語 auga) から" }, type: "suffix" },
        ],
        icon: "Wind",
    },
    {
        id: "muscle",
        word: "Muscle",
        meaning: {
            en: "Body tissue that produces movement.",
            ja: "体を動かすための組織、筋肉。",
        },
        history: {
            en: "From Latin 'musculus', 'little mouse' — to the Romans, a flexing muscle looked like a mouse moving under the skin.",
            ja: "ラテン語の 'musculus'（小さなネズミ）から。ローマ人には、動く筋肉が皮膚の下を走るネズミのように見えたのです。",
        },
        blocks: [
            { id: "mus", label: "Mus", meaning: { en: "Mouse", ja: "ネズミ" }, type: "root" },
            { id: "cle", label: "Cle", meaning: { en: "Little (diminutive)", ja: "小さい（指小辞）" }, type: "suffix" },
        ],
        icon: "Mouse",
    },
    {
        id: "salary",
        word: "Salary",
        meaning: {
            en: "Money received regularly for work.",
            ja: "労働の対価として定期的に受け取るお金、給料。",
        },
        history: {
            en: "From Latin 'salarium', related to 'sal' (salt) — in Rome it named a soldier's allowance, traditionally linked to buying precious salt. To be 'worth your salt' is the same idea.",
            ja: "ラテン語の 'salarium' から。'sal'（塩）に関係し、ローマ兵の手当を指しました。貴重だった塩を買うためのお金と伝えられています。",
        },
        blocks: [
            { id: "sal", label: "Sal", meaning: { en: "Salt", ja: "塩" }, type: "root" },
            { id: "ary", label: "Ary", meaning: { en: "Connected with", ja: "〜に関する" }, type: "suffix" },
        ],
        icon: "Coins",
    },
];
