import { Word } from "./types";
import { expandedWords } from "./expandedWords";

export const wordBank: Word[] = [
    ...expandedWords,
    // Root: Port (Carry)
    {
        id: "transport",
        word: "Transport",
        meaning: { en: "To carry across", ja: "輸送する" },
        history: { en: "From Latin 'trans' (across) + 'portare' (to carry). To move goods or people from one place to another.", ja: "ラテン語の 'trans' (横切って) + 'portare' (運ぶ) に由来。人や物をある場所から別の場所へ移動させること。" },
        blocks: [
            { id: "trans", label: "Trans-", meaning: { en: "Across", ja: "横切って" }, type: "prefix" },
            { id: "port", label: "Port", meaning: { en: "Carry", ja: "運ぶ" }, type: "root" }
        ],
        icon: "Truck"
    },
    {
        id: "export",
        word: "Export",
        meaning: { en: "To carry out", ja: "輸出する" },
        history: { en: "From Latin 'ex' (out) + 'portare' (to carry). To send goods out of a country.", ja: "ラテン語の 'ex' (外へ) + 'portare' (運ぶ) に由来。商品を国外へ送り出すこと。" },
        blocks: [
            { id: "ex", label: "Ex-", meaning: { en: "Out", ja: "外へ" }, type: "prefix" },
            { id: "port", label: "Port", meaning: { en: "Carry", ja: "運ぶ" }, type: "root" }
        ],
        icon: "Ship"
    },
    {
        id: "import",
        word: "Import",
        meaning: { en: "To carry in", ja: "輸入する" },
        history: { en: "From Latin 'in' (into) + 'portare' (to carry). To bring goods into a country.", ja: "ラテン語の 'in' (中へ) + 'portare' (運ぶ) に由来。商品を国内へ持ち込むこと。" },
        blocks: [
            { id: "im", label: "Im-", meaning: { en: "In", ja: "中へ" }, type: "prefix" },
            { id: "port", label: "Port", meaning: { en: "Carry", ja: "運ぶ" }, type: "root" }
        ],
        icon: "Package"
    },

    // Root: Spect (Look)
    {
        id: "inspect",
        word: "Inspect",
        meaning: { en: "To look into", ja: "検査する" },
        history: { en: "From Latin 'in' (into) + 'specere' (to look). To look closely at something to assess its condition.", ja: "ラテン語の 'in' (中へ) + 'specere' (見る) に由来。状態を評価するために詳しく見ること。" },
        blocks: [
            { id: "in", label: "In-", meaning: { en: "Into", ja: "中へ" }, type: "prefix" },
            { id: "spect", label: "Spect", meaning: { en: "Look", ja: "見る" }, type: "root" }
        ],
        icon: "Search"
    },
    {
        id: "respect",
        word: "Respect",
        meaning: { en: "To look back at (regard)", ja: "尊敬する" },
        history: { en: "From Latin 're-' (back) + 'specere' (to look). To look back at someone with consideration or esteem.", ja: "ラテン語の 're-' (後ろへ) + 'specere' (見る) に由来。配慮や敬意を持って振り返り見ること。" },
        blocks: [
            { id: "re", label: "Re-", meaning: { en: "Back", ja: "後ろへ" }, type: "prefix" },
            { id: "spect", label: "Spect", meaning: { en: "Look", ja: "見る" }, type: "root" }
        ],
        icon: "HeartHandshake"
    },

    // Root: Mit/Miss (Send)
    {
        id: "transmit",
        word: "Transmit",
        meaning: { en: "To send across", ja: "送信する" },
        history: { en: "From Latin 'trans' (across) + 'mittere' (to send). To send a signal or message across a distance.", ja: "ラテン語の 'trans' (横切って) + 'mittere' (送る) に由来。信号やメッセージを遠くへ送ること。" },
        blocks: [
            { id: "trans", label: "Trans-", meaning: { en: "Across", ja: "横切って" }, type: "prefix" },
            { id: "mit", label: "Mit", meaning: { en: "Send", ja: "送る" }, type: "root" }
        ],
        icon: "RadioTower"
    },
    {
        id: "submit",
        word: "Submit",
        meaning: { en: "To send under (yield)", ja: "提出する" },
        history: { en: "From Latin 'sub' (under) + 'mittere' (to send). To put oneself under the authority of another (surrender/present).", ja: "ラテン語の 'sub' (下へ) + 'mittere' (送る) に由来。他者の権威の下に身を置くこと（降伏/提示）。" },
        blocks: [
            { id: "sub", label: "Sub-", meaning: { en: "Under", ja: "下へ" }, type: "prefix" },
            { id: "mit", label: "Mit", meaning: { en: "Send", ja: "送る" }, type: "root" }
        ],
        icon: "FileUp"
    },

    // Root: Struct (Build)
    {
        id: "construct",
        word: "Construct",
        meaning: { en: "To build together", ja: "建設する" },
        history: { en: "From Latin 'con-' (together) + 'struere' (to pile, build). To build something by putting parts together.", ja: "ラテン語の 'con-' (共に) + 'struere' (積み上げる、建てる) に由来。部品を組み合わせて何かを作ること。" },
        blocks: [
            { id: "con", label: "Con-", meaning: { en: "Together", ja: "共に" }, type: "prefix" },
            { id: "struct", label: "Struct", meaning: { en: "Build", ja: "建てる" }, type: "root" }
        ],
        icon: "Hammer"
    },
    {
        id: "destruct",
        word: "Destruct",
        meaning: { en: "To build down (destroy)", ja: "破壊する" },
        history: { en: "From Latin 'de-' (down/reverse) + 'struere' (to build). To un-build or take down.", ja: "ラテン語の 'de-' (下へ/逆) + 'struere' (建てる) に由来。解体する、または取り壊すこと。" },
        blocks: [
            { id: "de", label: "De-", meaning: { en: "Down", ja: "下へ" }, type: "prefix" },
            { id: "struct", label: "Struct", meaning: { en: "Build", ja: "建てる" }, type: "root" }
        ],
        icon: "Bomb"
    },

    // Root: Dict (Say)
    {
        id: "predict",
        word: "Predict",
        meaning: { en: "To say before", ja: "予測する" },
        history: { en: "From Latin 'prae' (before) + 'dicere' (to say). To say something will happen before it occurs.", ja: "ラテン語の 'prae' (前に) + 'dicere' (言う) に由来。何かが起こる前にそれが起こると言うこと。" },
        blocks: [
            { id: "pre", label: "Pre-", meaning: { en: "Before", ja: "前に" }, type: "prefix" },
            { id: "dict", label: "Dict", meaning: { en: "Say", ja: "言う" }, type: "root" }
        ],
        icon: "CrystalBall"
    }
];
