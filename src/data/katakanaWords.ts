import { Word } from "./types";

// Course: 身近なカタカナ語 — English words Japanese speakers already say every
// day, never having seen the parts inside them. The hook: 「毎日使っているのに、
// 分解したことはない」. Part ids reuse the existing morpheme ids where the
// root is the same (inter, re, micro, phone, cycle, view, mote). passport's
// "port" is Latin porta (gate/harbor), a sibling of portare (carry), so it
// gets its own id "porta" with the label Port.

export const katakanaWords: Word[] = [
    {
        id: "internet",
        word: "Internet",
        meaning: { en: "The global network connecting computers.", ja: "世界中のコンピュータをつなぐ網。インターネット。" },
        history: {
            en: "'inter-' (between) + 'net' (a net). Literally a net stretched BETWEEN networks. You say it every day in katakana; the word itself is just two small parts.",
            ja: "'inter-'（間に）+ 'net'（網）。ネットワークとネットワークの「間」に張られた網、それがインターネット。毎日カタカナで言っている言葉の中身は、たった2つの部品です。",
        },
        tip: {
            en: "The same INTER- appears in international (between nations) and interview (seeing each other).",
            ja: "同じ INTER- は international（国の間）、interview（互いに見る）にも現れます。",
        },
        example: { en: "I found this recipe on the internet.", ja: "このレシピはインターネットで見つけました。" },
        blocks: [
            { id: "inter", label: "Inter", meaning: { en: "Between", ja: "間に" }, type: "prefix" },
            { id: "net", label: "Net", meaning: { en: "Net, mesh", ja: "網" }, type: "root" },
        ],
    },
    {
        id: "network",
        word: "Network",
        meaning: { en: "A web of connected things or people.", ja: "網の目のようにつながったもの。ネットワーク。" },
        history: {
            en: "'net' (a net) + 'work' (something made). Originally netting — fabric worked into a net. Railways, then radio, then computers borrowed the picture of knotted threads.",
            ja: "'net'（網）+ 'work'（作られたもの）。もとは「編まれた網」そのもの。鉄道、ラジオ、コンピュータが順にこの「結び目のある糸」のイメージを借りていきました。",
        },
        example: { en: "The station is part of a huge rail network.", ja: "その駅は巨大な鉄道ネットワークの一部です。" },
        blocks: [
            { id: "net", label: "Net", meaning: { en: "Net, mesh", ja: "網" }, type: "root" },
            { id: "work", label: "Work", meaning: { en: "Work, something made", ja: "仕事・作られたもの" }, type: "root" },
        ],
    },
    {
        id: "supermarket",
        word: "Supermarket",
        meaning: { en: "A large self-service food store.", ja: "大型のセルフサービス食料品店。スーパー。" },
        history: {
            en: "'super-' (above, beyond) + 'market'. A market that went BEYOND the ordinary market — bigger, self-service, everything under one roof. Japanese kept only the 'super' half.",
            ja: "'super-'（超えて）+ 'market'（市場）。普通の市場を「超えた」市場だから supermarket。日本語は前半だけ残して「スーパー」と呼びます。",
        },
        tip: {
            en: "SUPER- also builds superman, superior, supernatural — always 'above'.",
            ja: "SUPER- は superman、superior、supernatural も作ります。いつも「上・超」。",
        },
        example: { en: "She buys vegetables at the supermarket every Sunday.", ja: "彼女は毎週日曜にスーパーマーケットで野菜を買います。" },
        blocks: [
            { id: "super", label: "Super", meaning: { en: "Above, beyond", ja: "上に・超えて" }, type: "prefix" },
            { id: "market", label: "Market", meaning: { en: "Market", ja: "市場" }, type: "root" },
        ],
    },
    {
        id: "recycle",
        word: "Recycle",
        meaning: { en: "To process used things so they can be used again.", ja: "使ったものを再び使えるようにする。リサイクル。" },
        history: {
            en: "'re-' (again) + 'cycle' (wheel, circle). To send something around the circle AGAIN. The bicycle in your garage carries the same wheel.",
            ja: "'re-'（再び）+ 'cycle'（輪）。ものをもう一度「輪」に乗せて回すこと。bicycle（二つの輪）と同じ cycle が入っています。",
        },
        example: { en: "Please recycle these bottles.", ja: "このボトルはリサイクルしてください。" },
        blocks: [
            { id: "re", label: "Re", meaning: { en: "Again", ja: "再び" }, type: "prefix" },
            { id: "cycle", label: "Cycle", meaning: { en: "Wheel, circle", ja: "輪、円" }, type: "root" },
        ],
    },
    {
        id: "microphone",
        word: "Microphone",
        meaning: { en: "A device that picks up small sounds.", ja: "小さな音を拾う装置。マイク。" },
        history: {
            en: "'micro-' (small) + 'phone' (sound). A tool for SMALL SOUNDS — it catches a whisper and makes it big. Japanese shortened it to マイク, hiding both parts.",
            ja: "'micro-'（小さい）+ 'phone'（音）。「小さな音」を拾って大きくする道具。日本語では「マイク」と縮めたせいで、2つの部品が見えなくなりました。",
        },
        tip: {
            en: "PHONE (sound) also rings in telephone, smartphone, headphone.",
            ja: "PHONE（音）は telephone、smartphone、headphone でも鳴っています。",
        },
        example: { en: "Speak into the microphone, please.", ja: "マイクに向かって話してください。" },
        blocks: [
            { id: "micro", label: "Micro", meaning: { en: "Small", ja: "小さい" }, type: "prefix" },
            { id: "phone", label: "Phone", meaning: { en: "Sound", ja: "音" }, type: "root" },
        ],
    },
    {
        id: "remote",
        word: "Remote",
        meaning: { en: "Far away; operated from a distance.", ja: "遠く離れた。遠隔の。リモート。" },
        history: {
            en: "'re-' (back) + 'mote' (moved, from Latin movere). Something MOVED BACK, away from you. リモート勤務 is literally 'moved-away work'.",
            ja: "'re-'（後ろへ）+ 'mote'（動かされた。ラテン語 movere「動く」から）。あなたから「遠くへ動かされた」もの。リモート勤務は文字どおり「離れたところに動かされた仕事」です。",
        },
        example: { en: "He works remotely from a small island.", ja: "彼は小さな島からリモートで働いています。" },
        blocks: [
            { id: "re", label: "Re", meaning: { en: "Back, again", ja: "後ろへ・再び" }, type: "prefix" },
            { id: "mote", label: "Mote", meaning: { en: "Moved (Latin movere)", ja: "動かされた" }, type: "root" },
        ],
    },
    {
        id: "passport",
        word: "Passport",
        meaning: { en: "The document that lets you cross borders.", ja: "国境を越えるための証明書。パスポート。" },
        history: {
            en: "'pass' (to pass) + 'port' (gate, harbor — Latin porta). Permission to PASS through the PORT. Every stamp in yours repeats a 16th-century harbor formality.",
            ja: "'pass'（通る）+ 'port'（門・港。ラテン語 porta）。「港を通る」許可証がパスポート。あなたのパスポートの入国スタンプは、16世紀の港の手続きの名残です。",
        },
        example: { en: "Don't forget your passport at the airport.", ja: "空港でパスポートを忘れないでください。" },
        blocks: [
            { id: "pass", label: "Pass", meaning: { en: "To pass", ja: "通る" }, type: "root" },
            { id: "porta", label: "Port", meaning: { en: "Gate, harbor", ja: "門・港" }, type: "root" },
        ],
    },
    {
        id: "interview",
        word: "Interview",
        meaning: { en: "A formal meeting where people see each other and talk.", ja: "面接。インタビュー。" },
        history: {
            en: "'inter-' (between) + 'view' (to see). A SEEING BETWEEN two people. The word admits what a 面接 really is: you look at them, they look at you.",
            ja: "'inter-'（間に）+ 'view'（見る）。二人の「間で見る」こと。面接の本質はお互いを見ることだと、言葉自身が白状しています。",
        },
        example: { en: "She has a job interview tomorrow morning.", ja: "彼女は明日の朝、仕事の面接があります。" },
        blocks: [
            { id: "inter", label: "Inter", meaning: { en: "Between", ja: "間に" }, type: "prefix" },
            { id: "view", label: "View", meaning: { en: "To see", ja: "見る" }, type: "root" },
        ],
    },
];
