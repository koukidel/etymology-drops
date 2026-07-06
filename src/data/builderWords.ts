import { Word } from "./types";

// Chapter 2: words the learner can build themselves from common affixes.
// Block labels must spell the word when concatenated (the Slicer cuts by letter count).
export const builderWords: Word[] = [
    {
        id: "unhappy",
        word: "Unhappy",
        meaning: {
            en: "Not happy; sad.",
            ja: "幸せでない、悲しい。",
        },
        history: {
            en: "'un-' (not) + 'happy'. Flip one switch and a word means its opposite. The same switch builds unfair, unknown, unusual, untidy — you can make these yourself.",
            ja: "'un-'（〜でない）+ 'happy'（幸せ）。スイッチひとつで言葉の意味が反転します。同じスイッチで unfair、unknown、unusual、untidy も作れます。",
        },
        blocks: [
            { id: "un", label: "Un", meaning: { en: "Not", ja: "〜でない" }, type: "prefix" },
            { id: "happy", label: "Happy", meaning: { en: "Happy", ja: "幸せ" }, type: "root" },
        ],
        icon: "CloudRain",
        tip: {
            en: "In a classic analysis of school English, un- alone made up 26% of all prefix use — and just 20 prefixes covered 97% of every prefixed word (White, Sowell & Yanagihara, 1989).",
            ja: "学校英語の古典的な分析では、un- だけで接頭辞使用の26%を占め、わずか20個の接頭辞であらゆる接頭辞付き単語の97%をカバーしていました（White, Sowell & Yanagihara, 1989）。",
        },
    },
    {
        id: "drinkable",
        word: "Drinkable",
        meaning: {
            en: "Safe or pleasant to drink.",
            ja: "飲むことができる、飲用に適した。",
        },
        history: {
            en: "'drink' + '-able' (can be done). Any verb slots in: readable, washable, playable. Once you know the pattern, you can build words you have never seen.",
            ja: "'drink'（飲む）+ '-able'（〜できる）。動詞なら何でも入ります：readable、washable、playable。パターンを知れば、見たことのない単語も自分で作れます。",
        },
        blocks: [
            { id: "drink", label: "Drink", meaning: { en: "To drink", ja: "飲む" }, type: "root" },
            { id: "able", label: "Able", meaning: { en: "Can be done", ja: "〜できる" }, type: "suffix" },
        ],
        icon: "GlassWater",
        tip: {
            en: "This is the moment the game reverses: you are no longer just reading words apart — you can put parts together and invent words that English already recognises.",
            ja: "ここでゲームが逆転します。単語を分解して読むだけでなく、部品を組み合わせて、英語がすでに認識してくれる単語を自分で発明できるのです。",
        },
    },
    {
        id: "playful",
        word: "Playful",
        meaning: {
            en: "Full of fun and light-heartedness.",
            ja: "遊び心にあふれた。",
        },
        history: {
            en: "'play' + '-ful' (full of). Hopeful, careful, colorful — the suffix pours a quality into a word until it is full of it.",
            ja: "'play'（遊ぶ）+ '-ful'（〜に満ちた）。hopeful、careful、colorful ——この接尾辞は、言葉に性質を注ぎ込み、満たしてくれます。",
        },
        blocks: [
            { id: "play", label: "Play", meaning: { en: "To play", ja: "遊ぶ" }, type: "root" },
            { id: "ful", label: "Ful", meaning: { en: "Full of", ja: "〜に満ちた" }, type: "suffix" },
        ],
        icon: "Sparkles",
        tip: {
            en: "Attaching an image or story to a word is a proven memory trick: in a classic Stanford experiment, learners using vivid associations recalled 88% of new words, versus 28% for rote memorisers (Raugh & Atkinson, 1975).",
            ja: "言葉にイメージや物語を結びつけるのは実証済みの記憶術です。スタンフォード大学の古典的な実験では、鮮明な連想を使った学習者は新出単語の88%を思い出せたのに対し、丸暗記では28%でした（Raugh & Atkinson, 1975）。",
        },
    },
    {
        id: "player",
        word: "Player",
        meaning: {
            en: "A person who plays.",
            ja: "遊ぶ人、競技者。",
        },
        history: {
            en: "'play' + '-er' (a person who). Teacher, singer, runner, baker — English names people by what they do, with one small suffix.",
            ja: "'play'（遊ぶ）+ '-er'（〜する人）。teacher、singer、runner、baker ——英語は小さな接尾辞ひとつで、行動から人を名づけます。",
        },
        blocks: [
            { id: "play", label: "Play", meaning: { en: "To play", ja: "遊ぶ" }, type: "root" },
            { id: "er", label: "Er", meaning: { en: "A person who", ja: "〜する人" }, type: "suffix" },
        ],
        icon: "User",
        tip: {
            en: "Meta-analyses of dozens of classroom studies find that learning word parts measurably improves vocabulary, spelling, and decoding (Goodwin & Ahn, 2010; 2013).",
            ja: "数十の教室実験を統合したメタ分析によれば、語の部品を学ぶことで語彙・スペリング・読解の力が測定可能なほど向上します（Goodwin & Ahn, 2010; 2013）。",
        },
    },
];
