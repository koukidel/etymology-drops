import { LocalizedString } from "./types";

export interface CampaignLevel {
    id: string;
    label: string;
    title: LocalizedString;
    chapter: LocalizedString;
}

const FAMILIAR_CHAPTER: LocalizedString = { en: "Words You Already Know", ja: "実は知っている言葉" };
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

    // Chapter 2 — Latin root families
    { id: "precept", label: "CEPT", title: { en: "The First Rule", ja: "最初のルール" }, chapter: LATIN_CHAPTER },
    { id: "detain", label: "TAIN", title: { en: "Holding Fast", ja: "しっかり掴む" }, chapter: LATIN_CHAPTER },
    { id: "intermittent", label: "MIT", title: { en: "Sending Signals", ja: "信号を送る" }, chapter: LATIN_CHAPTER },
    { id: "offer", label: "FER", title: { en: "Bearing Gifts", ja: "贈り物" }, chapter: LATIN_CHAPTER },
    { id: "insist", label: "SIST", title: { en: "Standing Firm", ja: "断固として立つ" }, chapter: LATIN_CHAPTER },
    { id: "monograph", label: "GRAPH", title: { en: "Written in Stone", ja: "石に書かれた" }, chapter: LATIN_CHAPTER },
    { id: "epilogue", label: "LOG", title: { en: "Final Words", ja: "最後の言葉" }, chapter: LATIN_CHAPTER },
    { id: "aspect", label: "SPECT", title: { en: "A New View", ja: "新しい視点" }, chapter: LATIN_CHAPTER },
    { id: "uncomplicated", label: "PLY", title: { en: "Unfolding", ja: "展開" }, chapter: LATIN_CHAPTER },
    { id: "nonextended", label: "TEND", title: { en: "Reaching Out", ja: "手を伸ばす" }, chapter: LATIN_CHAPTER },
    { id: "reproduction", label: "DUCT", title: { en: "Leading the Way", ja: "道を切り開く" }, chapter: LATIN_CHAPTER },
    { id: "indisposed", label: "POSE", title: { en: "Placing Trust", ja: "信頼を置く" }, chapter: LATIN_CHAPTER },
    { id: "oversufficient", label: "FIC", title: { en: "Making Magic", ja: "魔法を作る" }, chapter: LATIN_CHAPTER },
    { id: "mistranscribe", label: "SCRIBE", title: { en: "The Scribe", ja: "書記" }, chapter: LATIN_CHAPTER },
];
