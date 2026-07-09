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
            en: "'Break' + 'fast' (a period without food). Sleep is the longest fast of your day, and the morning meal breaks it.",
            ja: "'break'（破る）+ 'fast'（断食）。睡眠は一日で最も長い断食であり、朝食はその断食を破る食事です。",
        },
        blocks: [
            { id: "break", label: "Break", meaning: { en: "To end, to shatter", ja: "破る" }, type: "root" },
            { id: "fast", label: "Fast", meaning: { en: "A time without food", ja: "断食" }, type: "root" },
        ],
        icon: "Sunrise",
        tip: {
            en: "Scholar James Brown found that just 14 'master words' contain the 20 most useful prefixes and 14 most important roots — parts he estimated appear in over 100,000 dictionary words (Programmed Vocabulary, 1971). You will meet all 14 on this path.",
            ja: "学者ジェームズ・ブラウンは、わずか14個の「マスターワード」に最も有用な接頭辞20個と最重要語根14個が含まれ、それらの部品は10万語以上の辞書見出し語に現れると推定しました（Programmed Vocabulary, 1971）。この道の途中で、その14語すべてに出会います。",
        },
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
        tip: {
            en: "A 1942 study of the 20,000 most common English words found that just 15 prefixes account for 82% of all prefix use (Stauffer, Journal of Educational Research). A small toolkit goes a very long way.",
            ja: "最頻出英単語2万語を調べた1942年の研究では、わずか15個の接頭辞が接頭辞使用全体の82%を占めていました（Stauffer, Journal of Educational Research）。小さな道具箱が、とても遠くまで連れて行ってくれます。",
        },
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
        tip: {
            en: "An estimated 60% of English words have Greek or Latin roots — and in science and technology vocabulary the figure rises past 90% (Green, The Greek & Latin Roots of English).",
            ja: "英単語の推定60%はギリシャ語・ラテン語由来で、科学技術の語彙では90%を超えます（Green, The Greek & Latin Roots of English）。",
        },
    },
    {
        id: "companion",
        word: "Companion",
        meaning: {
            en: "A person you spend time with; a friend on the way.",
            ja: "共に時間を過ごす人、道連れ。",
        },
        history: {
            en: "'Com-' (with) + 'panis' (bread): someone you share your bread with.",
            ja: "'com-'（共に）+ 'panis'（パン）。「パンを分かち合う人」を意味します。",
        },
        blocks: [
            { id: "com", label: "Com", meaning: { en: "With, together", ja: "共に" }, type: "prefix" },
            { id: "pan", label: "Pan", meaning: { en: "Bread", ja: "パン" }, type: "root" },
            { id: "ion", label: "Ion", meaning: { en: "Person or thing", ja: "〜する人・もの" }, type: "suffix" },
        ],
        icon: "Users",
        tip: {
            en: "Reading researchers estimate that a single Latin or Greek root or affix can aid the understanding of 20 or more English words (Rasinski, Padak, Newton & Newton, 2011).",
            ja: "研究によれば、ラテン語・ギリシャ語の語根や接辞ひとつが、20語以上の英単語の理解を助けてくれます（Rasinski, Padak, Newton & Newton, 2011）。",
        },
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
        tip: {
            en: "From third grade on, about 60% of the new words a reader meets are built from parts whose meanings can be worked out (Nagy & Anderson, 1984). Most 'new' words are old parts in new clothes.",
            ja: "小学3年生以降に出会う新出単語の約60%は、意味を推測できる部品からできています（Nagy & Anderson, 1984）。「新しい」単語のほとんどは、古い部品の新しい組み合わせなのです。",
        },
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
        tip: {
            en: "Greek made the same joke: mys meant both 'mouse' and 'muscle' — which is why doctors still say myo- for muscle, as in myocarditis.",
            ja: "ギリシャ語にも似た冗談があります。mys は「ネズミ」と「筋肉」の両方を意味し、だから医師は今でも筋肉を myo- と呼びます（myocarditis 心筋炎など）。",
        },
    },
    {
        id: "salary",
        word: "Salary",
        meaning: {
            en: "Money received regularly for work.",
            ja: "労働の対価として定期的に受け取るお金、給料。",
        },
        history: {
            en: "From Latin 'salarium', related to 'sal' (salt) — in Rome it named a soldier's allowance. The tale that soldiers were paid in salt is a legend, but the salty root is real: to be 'worth your salt' keeps it alive.",
            ja: "ラテン語の 'salarium' から。'sal'（塩）に関係し、ローマ兵の手当を指しました。「兵士が塩で給料を受け取った」という話は諸説ありますが、塩の語根は本物。'worth your salt'（給料に値する）という表現に今も生きています。",
        },
        blocks: [
            { id: "sal", label: "Sal", meaning: { en: "Salt", ja: "塩" }, type: "root" },
            { id: "ary", label: "Ary", meaning: { en: "Connected with", ja: "〜に関する" }, type: "suffix" },
        ],
        icon: "Coins",
        tip: {
            en: "Not every good story is true — historians have shown the 'paid in salt' anecdote rests on a misquoted line of Pliny. The etymology stands; the payroll doesn't. Real word history means checking.",
            ja: "良い物語がすべて真実とは限りません。「塩で給料」の逸話は、プリニウスの一節の誤訳に基づくことが歴史家によって示されています。語源は本物、給与明細は伝説。本当の語源学習には確認が必要です。",
        },
    },
];
