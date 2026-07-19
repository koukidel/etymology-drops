import { Word } from "./types";

// Chapter 3: everyday inventions named with Greek and Latin parts.
// Block labels must spell the word when concatenated (the Slicer cuts by letter count).
export const inventionWords: Word[] = [
    {
        id: "telephone",
        example: { en: "The telephone rang twice and stopped.", ja: "電話が2回鳴って止まりました。" },
        word: "Telephone",
        meaning: {
            en: "A device for talking to someone far away.",
            ja: "遠くの人と話すための装置、電話。",
        },
        history: {
            en: "Greek 'tele' (far) + 'phone' (sound): a far-away sound. When the machine was invented, its name was assembled from ancient Greek parts.",
            ja: "ギリシャ語の 'tele'（遠い）+ 'phone'（音）。「遠くの音」。この機械が発明されたとき、名前は古代ギリシャ語の部品から組み立てられました。",
        },
        blocks: [
            { id: "tele", label: "Tele", meaning: { en: "Far", ja: "遠い" }, type: "prefix" },
            { id: "phone", label: "Phone", meaning: { en: "Sound", ja: "音" }, type: "root" },
        ],
        icon: "Phone",
        tip: {
            en: "TELE builds a whole family: telescope (far-seeing), telepathy (far-feeling), teleport (far-carrying). One Greek part, four inventions.",
            ja: "TELE はひとつの家族を作ります。telescope（遠くを見る）、telepathy（遠くの感情）、teleport（遠くへ運ぶ）。ギリシャ語の部品ひとつで発明が4つ。",
        },
    },
    {
        id: "photograph",
        example: { en: "This photograph was taken in 1950.", ja: "この写真は1950年に撮られました。" },
        word: "Photograph",
        meaning: {
            en: "A picture made with a camera.",
            ja: "カメラで撮った写真。",
        },
        history: {
            en: "Greek 'photo' (light) + 'graph' (drawing): a drawing made by light itself. The word was coined in 1839, the year photography was announced to the world.",
            ja: "ギリシャ語の 'photo'（光）+ 'graph'（描く）。「光そのものが描いた絵」。この言葉は写真術が世界に発表された1839年に作られました。",
        },
        blocks: [
            { id: "photo", label: "Photo", meaning: { en: "Light", ja: "光" }, type: "root" },
            { id: "graph", label: "Graph", meaning: { en: "To draw, write", ja: "描く、書く" }, type: "root" },
        ],
        icon: "Camera",
        tip: {
            en: "PHOTO (light) also powers photosynthesis — plants 'putting together with light' — and photon, a particle of light itself.",
            ja: "PHOTO（光）は photosynthesis（光合成＝植物が光で作り上げること）や、光の粒子そのものである photon にも使われています。",
        },
    },
    {
        id: "television",
        example: { en: "We watched the news on television.", ja: "私たちはテレビでニュースを見ました。" },
        word: "Television",
        meaning: {
            en: "A device that shows moving pictures from far away.",
            ja: "遠くの映像を映す装置、テレビ。",
        },
        history: {
            en: "Greek 'tele' (far) + Latin 'vision' (seeing): far-seeing. Purists complained the word mixed Greek and Latin — but it stuck.",
            ja: "ギリシャ語の 'tele'（遠い）+ ラテン語の 'vision'（見ること）。「遠くを見る」。ギリシャ語とラテン語の混合だと批判されましたが、定着しました。",
        },
        blocks: [
            { id: "tele", label: "Tele", meaning: { en: "Far", ja: "遠い" }, type: "prefix" },
            { id: "vision", label: "Vision", meaning: { en: "Seeing", ja: "見ること" }, type: "root" },
        ],
        icon: "Tv",
        tip: {
            en: "VISION comes from Latin videre, 'to see' — the same root as video, visible, visit ('to go see'), and even evident.",
            ja: "VISION はラテン語 videre（見る）から。video、visible、visit（会いに行く）、evident まで同じ語根です。",
        },
    },
    {
        id: "microscope",
        example: { en: "You can see the cells under a microscope.", ja: "顕微鏡で細胞が見えます。" },
        word: "Microscope",
        meaning: {
            en: "An instrument for seeing very small things.",
            ja: "とても小さなものを見るための器具、顕微鏡。",
        },
        history: {
            en: "Greek 'micro' (small) + 'scope' (to look): a small-looker. Its twin, the telescope, is a far-looker — same SCOPE, different direction.",
            ja: "ギリシャ語の 'micro'（小さい）+ 'scope'（見る）。「小さいものを見るもの」。双子の telescope は「遠くを見るもの」。同じ SCOPE、違う方向。",
        },
        blocks: [
            { id: "micro", label: "Micro", meaning: { en: "Small", ja: "小さい" }, type: "prefix" },
            { id: "scope", label: "Scope", meaning: { en: "To look", ja: "見る" }, type: "root" },
        ],
        icon: "Microscope",
        tip: {
            en: "About 95% of English medical terms are built from Latin and Greek parts (Lysanets & Bieliaieva, 2018) — microscope-words all the way down.",
            ja: "英語の医学用語の約95%はラテン語・ギリシャ語の部品でできています（Lysanets & Bieliaieva, 2018）。microscope のような言葉ばかりなのです。",
        },
    },
    {
        id: "bicycle",
        example: { en: "I go to school by bicycle.", ja: "私は自転車で通学しています。" },
        word: "Bicycle",
        meaning: {
            en: "A vehicle with two wheels.",
            ja: "二つの車輪を持つ乗り物、自転車。",
        },
        history: {
            en: "Latin 'bi' (two) + Greek 'cycle' (wheel, circle): two wheels. Coined in the 1860s when the machine itself was new.",
            ja: "ラテン語の 'bi'（2つ）+ ギリシャ語の 'cycle'（輪）。「二つの車輪」。この乗り物が新発明だった1860年代に作られた言葉です。",
        },
        blocks: [
            { id: "bi", label: "Bi", meaning: { en: "Two", ja: "2つ" }, type: "prefix" },
            { id: "cycle", label: "Cycle", meaning: { en: "Wheel, circle", ja: "輪、円" }, type: "root" },
        ],
        icon: "Bike",
        tip: {
            en: "BI (two) rides everywhere: bilingual (two languages), binoculars (two eyes), bimonthly (every two months). And a unicycle? One wheel.",
            ja: "BI（2つ）はあちこちに現れます。bilingual（2言語）、binoculars（双眼鏡）、bimonthly（隔月）。では unicycle は？ 車輪1つの一輪車です。",
        },
    },
    {
        id: "subway",
        example: { en: "Take the subway to the museum.", ja: "美術館へは地下鉄で行ってください。" },
        word: "Subway",
        meaning: {
            en: "An underground railway.",
            ja: "地下鉄。",
        },
        history: {
            en: "Latin 'sub' (under) + English 'way': the road under the road. Half Latin, half plain English — words get built from whatever parts are at hand.",
            ja: "ラテン語の 'sub'（下）+ 英語の 'way'（道）。「道の下の道」。半分ラテン語、半分英語。言葉は手近な部品から組み立てられるのです。",
        },
        blocks: [
            { id: "sub", label: "Sub", meaning: { en: "Under", ja: "下" }, type: "prefix" },
            { id: "way", label: "Way", meaning: { en: "Road, path", ja: "道" }, type: "root" },
        ],
        icon: "TrainFront",
        tip: {
            en: "SUB (under) surfaces in submarine (under the sea), subtitle (under the picture), and submit, 'to send under'.",
            ja: "SUB（下）は submarine（海の下）、subtitle（映像の下の字幕）、そして submit（「下に送る」）に顔を出します。",
        },
    },
];
