import { Word } from "./types";

// Course: TOEIC 600+ — frequent business English that decomposes into
// transferable Latin parts. Block labels spell each word exactly.
export const toeicWords: Word[] = [
    {
        id: "transport",
        word: "Transport",
        meaning: { en: "To carry goods or people from place to place.", ja: "輸送する。" },
        history: {
            en: "'trans' (across) + 'port' (carry). From transportare, 'to carry across'.",
            ja: "'trans'（横切って）+ 'port'（運ぶ）。transportare より。文字通り「横切って運ぶ」。",
        },
        blocks: [
            { id: "trans", label: "Trans", meaning: { en: "Across", ja: "横切って" }, type: "prefix" },
            { id: "port", label: "Port", meaning: { en: "Carry", ja: "運ぶ" }, type: "root" },
        ],
        icon: "Truck",
        tip: {
            en: "PORT (carry) is one of the highest-leverage roots: import, export, portable, porter, report, support, portfolio.",
            ja: "PORT（運ぶ）は屈指の高効率語根です。import、export、portable、porter、report、support、portfolio。",
        },
    },
    {
        id: "export",
        word: "Export",
        meaning: { en: "To send goods to another country.", ja: "輸出する。" },
        history: {
            en: "'ex' (out) + 'port' (carry). From exportare — to carry goods out of the country.",
            ja: "'ex'（外へ）+ 'port'（運ぶ）。exportare より。品物を国の外へ運ぶこと。",
        },
        blocks: [
            { id: "ex", label: "Ex", meaning: { en: "Out", ja: "外へ" }, type: "prefix" },
            { id: "port", label: "Port", meaning: { en: "Carry", ja: "運ぶ" }, type: "root" },
        ],
        icon: "PackageOpen",
        tip: {
            en: "EX- (out) exits everywhere: exit, exclude, extract, expand, exhale — the opposite of import's IN.",
            ja: "EX-（外へ）はあちこちから出ます。exit、exclude、extract、expand、exhale。import の IN の反対。",
        },
    },
    {
        id: "import",
        word: "Import",
        meaning: { en: "To bring goods in from another country.", ja: "輸入する。" },
        history: {
            en: "'im-' (into) + 'port' (carry). From importare — to carry goods into the country.",
            ja: "'im-'（中へ）+ 'port'（運ぶ）。importare より。品物を国の中へ運ぶこと。",
        },
        blocks: [
            { id: "im", label: "Im", meaning: { en: "Into (from in-)", ja: "中へ" }, type: "prefix" },
            { id: "port", label: "Port", meaning: { en: "Carry", ja: "運ぶ" }, type: "root" },
        ],
        icon: "PackagePlus",
        tip: {
            en: "IM- is just IN- reshaped before p/b/m: import, impose, immigrate, embrace. Same idea, smoother sound.",
            ja: "IM- は p/b/m の前で形を変えた IN-。import、impose、immigrate。意味は同じ、発音が滑らかに。",
        },
    },
    {
        id: "provide",
        word: "Provide",
        meaning: { en: "To supply what is needed.", ja: "供給する、提供する。" },
        history: {
            en: "'pro' (ahead) + 'vide' (see). From providere 'to look ahead' — to provide is to foresee a need and prepare for it.",
            ja: "'pro'（前もって）+ 'vide'（見る）。providere「先を見る」より。備えるために必要を見越すこと。",
        },
        blocks: [
            { id: "pro", label: "Pro", meaning: { en: "Ahead, before", ja: "前もって" }, type: "prefix" },
            { id: "vide", label: "Vide", meaning: { en: "See", ja: "見る" }, type: "root" },
        ],
        icon: "HandHeart",
        tip: {
            en: "VIDE / VIS (see) is the same root as video, vision, evident, and provident — and 'provide' is 'foresight' in action.",
            ja: "VIDE / VIS（見る）は video、vision、evident、provident と同じ語根。provide は「先見」を行動にしたものです。",
        },
    },
    {
        id: "propose",
        word: "Propose",
        meaning: { en: "To put forward a plan or idea.", ja: "提案する。" },
        history: {
            en: "'pro' (forth) + 'pose' (put). To place an idea forward for others to consider.",
            ja: "'pro'（前へ）+ 'pose'（置く）。考えを前に置き、検討してもらうこと。",
        },
        blocks: [
            { id: "pro", label: "Pro", meaning: { en: "Forth, before", ja: "前へ" }, type: "prefix" },
            { id: "pose", label: "Pose", meaning: { en: "Put, place", ja: "置く" }, type: "root" },
        ],
        icon: "Lightbulb",
        tip: {
            en: "You met POSE in compose — it also places propose, oppose, expose, deposit, and position.",
            ja: "POSE は compose で出会いましたね。propose、oppose、expose、deposit、position も配置します。",
        },
    },
    {
        id: "distribute",
        word: "Distribute",
        meaning: { en: "To hand out or share among people.", ja: "分配する。" },
        history: {
            en: "'dis-' (individually) + 'tribute' (allot). From distribuere — to deal something out to each person.",
            ja: "'dis-'（個別に）+ 'tribute'（割り当てる）。distribuere より。めいめいに分け与えること。",
        },
        blocks: [
            { id: "dis", label: "Dis", meaning: { en: "Individually, apart", ja: "個別に" }, type: "prefix" },
            { id: "tribute", label: "Tribute", meaning: { en: "Allot, pay", ja: "割り当てる" }, type: "root" },
        ],
        icon: "Share2",
        tip: {
            en: "The TRIBUTE (allot, pay) root also gives contribute, attribute, and tribute itself — all about assigning shares.",
            ja: "TRIBUTE（割り当てる・支払う）の語根は contribute、attribute、tribute にも。すべて「分け前を割り当てる」こと。",
        },
    },
    {
        id: "deduct",
        word: "Deduct",
        meaning: { en: "To subtract an amount from a total.", ja: "差し引く。" },
        history: {
            en: "'de-' (away) + 'duct' (lead). From deducere — to lead an amount away from the whole.",
            ja: "'de-'（離して）+ 'duct'（導く）。deducere より。ある額を全体から導き離すこと。",
        },
        blocks: [
            { id: "de", label: "De", meaning: { en: "Down, away", ja: "下へ・離して" }, type: "prefix" },
            { id: "duct", label: "Duct", meaning: { en: "Lead", ja: "導く" }, type: "root" },
        ],
        icon: "Minus",
        tip: {
            en: "DUCT (lead) is the same root you met in conduct — leading through conduct, produce, introduce, educate, and the air duct.",
            ja: "DUCT（導く）は conduct で出会った語根。conduct、produce、introduce、educate、そして air duct を導きます。",
        },
    },
    {
        id: "refund",
        word: "Refund",
        meaning: { en: "To pay money back.", ja: "払い戻す。" },
        history: {
            en: "'re-' (back) + 'fund' (pour). From refundere, 'to pour the money back'.",
            ja: "'re-'（戻して）+ 'fund'（注ぐ）。refundere より。文字通り「お金を注ぎ戻す」。",
        },
        blocks: [
            { id: "re", label: "Re", meaning: { en: "Back", ja: "戻して" }, type: "prefix" },
            { id: "fund", label: "Fund", meaning: { en: "Pour", ja: "注ぐ" }, type: "root" },
        ],
        icon: "RotateCcw",
        tip: {
            en: "The FUND / FUS (pour) root flows into refund, confuse ('pour together'), infuse, and profuse.",
            ja: "FUND / FUS（注ぐ）の語根は refund、confuse（共に注ぐ＝混乱させる）、infuse、profuse に流れ込みます。",
        },
    },
    {
        id: "predict",
        word: "Predict",
        meaning: { en: "To say what will happen in the future.", ja: "予測する。" },
        history: {
            en: "'pre-' (before) + 'dict' (say). From praedicere — to say a thing before it happens.",
            ja: "'pre-'（前もって）+ 'dict'（言う）。praedicere より。起こる前に言うこと。",
        },
        blocks: [
            { id: "pre", label: "Pre", meaning: { en: "Before", ja: "前もって" }, type: "prefix" },
            { id: "dict", label: "Dict", meaning: { en: "Say", ja: "言う" }, type: "root" },
        ],
        icon: "TrendingUp",
        tip: {
            en: "DICT (say) speaks through dictionary, dictate, contradict, verdict, and predict — over a dozen everyday words.",
            ja: "DICT（言う）は dictionary、dictate、contradict、verdict、predict に語ります。日常語だけで十数語。",
        },
    },
    {
        id: "contract",
        word: "Contract",
        meaning: { en: "A binding written agreement.", ja: "契約。" },
        history: {
            en: "'con' (together) + 'tract' (draw). From contrahere — to draw two parties together into agreement.",
            ja: "'con'（共に）+ 'tract'（引く）。contrahere より。二者を合意へと引き寄せること。",
        },
        blocks: [
            { id: "con", label: "Con", meaning: { en: "Together", ja: "共に" }, type: "prefix" },
            { id: "tract", label: "Tract", meaning: { en: "Draw, pull", ja: "引く" }, type: "root" },
        ],
        icon: "FileSignature",
        tip: {
            en: "TRACT (draw, pull) pulls its weight in attract, extract, subtract, tractor, and distract.",
            ja: "TRACT（引く）は attract、extract、subtract、tractor、distract で力を発揮します。",
        },
    },
];
