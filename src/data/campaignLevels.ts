import { LocalizedString } from "./types";

export interface CampaignLevel {
    id: string;
    label: string;
    title: LocalizedString;
    chapter: LocalizedString;
}

const FAMILIAR_CHAPTER: LocalizedString = { en: "Words You Already Know", ja: "身近な言葉" };
const BUILDER_CHAPTER: LocalizedString = { en: "Build Your Own", ja: "言葉を組み立てる" };
const INVENTION_CHAPTER: LocalizedString = { en: "Everyday Inventions", ja: "身近な発明品" };
const LATIN_CHAPTER: LocalizedString = { en: "Latin Roots", ja: "ラテン語の語根" };

export const CAMPAIGN_LEVELS: CampaignLevel[] = [
    // Chapter 1 — familiar words with hidden stories
    { id: "breakfast", label: "BREAK · FAST", title: { en: "Breaking the night's fast", ja: "夜の断食を破る" }, chapter: FAMILIAR_CHAPTER },
    { id: "goodbye", label: "GOD · BE · WITH · YE", title: { en: "A blessing in disguise", ja: "祈りが隠れた言葉" }, chapter: FAMILIAR_CHAPTER },
    { id: "alphabet", label: "ALPHA · BETA", title: { en: "The first two letters", ja: "最初の二文字" }, chapter: FAMILIAR_CHAPTER },
    { id: "companion", label: "COM · PANIS", title: { en: "One who shares bread", ja: "パンを分かち合う人" }, chapter: FAMILIAR_CHAPTER },
    { id: "window", label: "WIND · EYE", title: { en: "The wind's eye", ja: "風の目" }, chapter: FAMILIAR_CHAPTER },
    { id: "muscle", label: "LITTLE · MOUSE", title: { en: "A little mouse", ja: "小さなネズミ" }, chapter: FAMILIAR_CHAPTER },
    { id: "salary", label: "SALT · MONEY", title: { en: "Paid in salt", ja: "塩の給料" }, chapter: FAMILIAR_CHAPTER },

    // Chapter 2 — build words yourself from common affixes
    { id: "unhappy", label: "UN + HAPPY", title: { en: "The opposite switch", ja: "意味を反転させるスイッチ" }, chapter: BUILDER_CHAPTER },
    { id: "drinkable", label: "DRINK + ABLE", title: { en: "Anything can be -able", ja: "何でも〜できる形に" }, chapter: BUILDER_CHAPTER },
    { id: "playful", label: "PLAY + FUL", title: { en: "Full of it", ja: "〜に満ちた" }, chapter: BUILDER_CHAPTER },
    { id: "player", label: "PLAY + ER", title: { en: "The one who does it", ja: "〜する人" }, chapter: BUILDER_CHAPTER },

    // Chapter 3 — inventions named from Greek and Latin parts
    { id: "telephone", label: "TELE · PHONE", title: { en: "A far-away sound", ja: "遠くの音" }, chapter: INVENTION_CHAPTER },
    { id: "photograph", label: "PHOTO · GRAPH", title: { en: "Drawn by light", ja: "光が描いた絵" }, chapter: INVENTION_CHAPTER },
    { id: "television", label: "TELE · VISION", title: { en: "Far-seeing", ja: "遠くを見る" }, chapter: INVENTION_CHAPTER },
    { id: "microscope", label: "MICRO · SCOPE", title: { en: "The small-looker", ja: "小さいものを見る" }, chapter: INVENTION_CHAPTER },
    { id: "bicycle", label: "BI · CYCLE", title: { en: "Two wheels", ja: "二つの車輪" }, chapter: INVENTION_CHAPTER },
    { id: "subway", label: "SUB · WAY", title: { en: "The road below", ja: "道の下の道" }, chapter: INVENTION_CHAPTER },

    // Chapter 4 — Latin root families, most familiar word first
    { id: "accept", label: "CEPT", title: { en: "To take to oneself", ja: "受け取る" }, chapter: LATIN_CHAPTER },
    { id: "contain", label: "TAIN", title: { en: "Holding Fast", ja: "しっかり掴む" }, chapter: LATIN_CHAPTER },
    { id: "submit", label: "MIT", title: { en: "Sending Signals", ja: "信号を送る" }, chapter: LATIN_CHAPTER },
    { id: "offer", label: "FER", title: { en: "Bearing Gifts", ja: "贈り物" }, chapter: LATIN_CHAPTER },
    { id: "assist", label: "SIST", title: { en: "Standing Firm", ja: "断固として立つ" }, chapter: LATIN_CHAPTER },
    { id: "autograph", label: "GRAPH", title: { en: "Written by hand", ja: "自らの手で書く" }, chapter: LATIN_CHAPTER },
    { id: "logic", label: "LOG", title: { en: "The way of words", ja: "言葉の道筋" }, chapter: LATIN_CHAPTER },
    { id: "inspect", label: "SPECT", title: { en: "A New View", ja: "新しい視点" }, chapter: LATIN_CHAPTER },
    { id: "reply", label: "PLY", title: { en: "Unfolding", ja: "展開" }, chapter: LATIN_CHAPTER },
    { id: "extend", label: "TEND", title: { en: "Reaching Out", ja: "手を伸ばす" }, chapter: LATIN_CHAPTER },
    { id: "conduct", label: "DUCT", title: { en: "Leading the Way", ja: "道を切り開く" }, chapter: LATIN_CHAPTER },
    { id: "compose", label: "POSE", title: { en: "Placing Together", ja: "共に置く" }, chapter: LATIN_CHAPTER },
    { id: "fiction", label: "FIC", title: { en: "Making Magic", ja: "魔法を作る" }, chapter: LATIN_CHAPTER },
    { id: "subscribe", label: "SCRIBE", title: { en: "The Scribe", ja: "書記" }, chapter: LATIN_CHAPTER },
];
