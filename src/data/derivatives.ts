import { LocalizedString } from "./types";

export interface Derivative {
    word: string;
    gloss: LocalizedString;
}

/**
 * Extra real-world words built from a block, shown after a lesson under
 * "words built from the same parts". These are not lessons themselves —
 * they widen the world a learned part unlocks. First pass; grows with content.
 */
export const DERIVATIVES: Record<string, Derivative[]> = {
    // Familiar words
    break: [
        { word: "breakthrough", gloss: { en: "breaking through — a sudden advance", ja: "突き破ること→大躍進" } },
        { word: "breakdown", gloss: { en: "breaking down — a failure, or an analysis", ja: "壊れること→故障、また「分解・分析」" } },
    ],
    fast: [
        { word: "fasting", gloss: { en: "going without food — as in intermittent fasting", ja: "断食。intermittent fasting（間欠的断食）として近年流行" } },
        { word: "steadfast", gloss: { en: "holding firm — fast's older sense, 'fixed'", ja: "確固とした。fast の古い意味「固定された」が残る言葉" } },
    ],
    alpha: [
        { word: "alphabetical", gloss: { en: "in ABC order", ja: "アルファベット順の" } },
    ],
    com: [
        { word: "company", gloss: { en: "com + panis again — those you share bread with", ja: "これも com + panis ——パンを共にする仲間たち" } },
        { word: "combine", gloss: { en: "to join together", ja: "共に結ぶ→結合する" } },
    ],
    pan: [
        { word: "pantry", gloss: { en: "the bread room — now any food cupboard", ja: "パンの部屋→食料庫" } },
    ],
    wind: [
        { word: "windmill", gloss: { en: "a mill driven by wind", ja: "風で回る粉ひき→風車" } },
    ],
    sal: [
        { word: "salad", gloss: { en: "originally 'salted' vegetables", ja: "もとは「塩をした」野菜→サラダ" } },
    ],
    // Builders
    un: [
        { word: "unknown", gloss: { en: "not known", ja: "知られていない→未知の" } },
        { word: "unfair", gloss: { en: "not fair", ja: "公平でない→不公平な" } },
        { word: "unusual", gloss: { en: "not usual", ja: "普通でない→珍しい" } },
    ],
    able: [
        { word: "readable", gloss: { en: "can be read", ja: "読むことができる" } },
        { word: "washable", gloss: { en: "can be washed", ja: "洗うことができる" } },
    ],
    ful: [
        { word: "hopeful", gloss: { en: "full of hope", ja: "希望に満ちた" } },
        { word: "colorful", gloss: { en: "full of color", ja: "色彩豊かな" } },
    ],
    er: [
        { word: "teacher", gloss: { en: "one who teaches", ja: "教える人" } },
        { word: "runner", gloss: { en: "one who runs", ja: "走る人" } },
    ],
    play: [
        { word: "replay", gloss: { en: "to play again", ja: "再び遊ぶ・再生する" } },
    ],
    happy: [
        { word: "happiness", gloss: { en: "the state of being happy", ja: "幸せであること" } },
    ],
    // Inventions
    tele: [
        { word: "telescope", gloss: { en: "far + look — the far-looker", ja: "遠く＋見る→望遠鏡" } },
        { word: "telepathy", gloss: { en: "far + feeling", ja: "遠く＋感情→テレパシー" } },
        { word: "teleport", gloss: { en: "far + carry", ja: "遠く＋運ぶ→テレポート" } },
    ],
    phone: [
        { word: "microphone", gloss: { en: "small + sound", ja: "小さい＋音→マイク" } },
        { word: "symphony", gloss: { en: "sounding together", ja: "共に響く→交響曲" } },
    ],
    photo: [
        { word: "photosynthesis", gloss: { en: "putting together with light", ja: "光で作り上げる→光合成" } },
        { word: "photon", gloss: { en: "a particle of light", ja: "光の粒子" } },
    ],
    graph: [
        { word: "paragraph", gloss: { en: "written beside — a section of writing", ja: "傍らに書かれたもの→段落" } },
        { word: "biography", gloss: { en: "life-writing", ja: "人生を書いたもの→伝記" } },
    ],
    vision: [
        { word: "visible", gloss: { en: "can be seen", ja: "見ることができる" } },
        { word: "video", gloss: { en: "Latin 'I see'", ja: "ラテン語で「私は見る」" } },
    ],
    micro: [
        { word: "microwave", gloss: { en: "small wave", ja: "小さい波→電子レンジ" } },
    ],
    scope: [
        { word: "periscope", gloss: { en: "look around", ja: "周りを見る→潜望鏡" } },
    ],
    bi: [
        { word: "bilingual", gloss: { en: "two languages", ja: "二つの言語→バイリンガル" } },
        { word: "binoculars", gloss: { en: "two eyes", ja: "二つの目→双眼鏡" } },
    ],
    cycle: [
        { word: "recycle", gloss: { en: "to circle back again", ja: "再び循環させる→リサイクル" } },
    ],
    sub: [
        { word: "submarine", gloss: { en: "under the sea", ja: "海の下→潜水艦" } },
        { word: "subtitle", gloss: { en: "written under", ja: "下に書かれたもの→字幕" } },
    ],
    way: [
        { word: "railway", gloss: { en: "a road of rails", ja: "レールの道→鉄道" } },
    ],
    // Latin roots
    cept: [
        { word: "capture", gloss: { en: "to take hold of", ja: "捕らえる" } },
        { word: "reception", gloss: { en: "a taking-back — receiving", ja: "受け取ること→受付・歓迎会" } },
    ],
    tain: [
        { word: "obtain", gloss: { en: "to get hold of", ja: "手に入れる" } },
        { word: "sustain", gloss: { en: "to hold up from below", ja: "下から支え続ける→持続する" } },
    ],
    mit: [
        { word: "permit", gloss: { en: "to send through — allow", ja: "通して送る→許可する" } },
        { word: "mission", gloss: { en: "a sending", ja: "送られること→任務" } },
    ],
    fer: [
        { word: "prefer", gloss: { en: "to carry in front", ja: "前に運ぶ→好む" } },
        { word: "ferry", gloss: { en: "a carrier across water", ja: "運ぶ船→フェリー" } },
    ],
    sist: [
        { word: "resist", gloss: { en: "to stand against", ja: "against 立ち向かう→抵抗する" } },
        { word: "exist", gloss: { en: "to stand forth", ja: "外に立ち現れる→存在する" } },
    ],
    log: [
        { word: "biology", gloss: { en: "the study of life", ja: "生命の学問→生物学" } },
        { word: "apology", gloss: { en: "words in defence", ja: "弁明の言葉→謝罪" } },
    ],
    spect: [
        { word: "respect", gloss: { en: "to look back at — regard", ja: "振り返って見る→尊敬" } },
        { word: "expect", gloss: { en: "to look out for", ja: "外を見て待つ→予期する" } },
    ],
    ply: [
        { word: "apply", gloss: { en: "to fold onto", ja: "折り重ねて当てる→応用する" } },
        { word: "complicate", gloss: { en: "to fold together", ja: "共に折り込む→複雑にする" } },
    ],
    tend: [
        { word: "tension", gloss: { en: "a stretching", ja: "張りつめること→緊張" } },
        { word: "tent", gloss: { en: "a stretched shelter", ja: "張られた住まい→テント" } },
    ],
    duct: [
        { word: "produce", gloss: { en: "to lead forward", ja: "前に導き出す→生産する" } },
        { word: "educate", gloss: { en: "to lead out what is within", ja: "内にあるものを導き出す→教育する" } },
    ],
    pose: [
        { word: "position", gloss: { en: "a placing", ja: "置かれた場所→位置" } },
        { word: "propose", gloss: { en: "to put forward", ja: "前に置く→提案する" } },
    ],
    fict: [
        { word: "factory", gloss: { en: "a making-place", ja: "作る場所→工場" } },
        { word: "sufficient", gloss: { en: "made enough", ja: "十分に作られた→十分な" } },
    ],
    scribe: [
        { word: "describe", gloss: { en: "to write down", ja: "書き記す→描写する" } },
        { word: "script", gloss: { en: "a written thing", ja: "書かれたもの→台本" } },
    ],
};
