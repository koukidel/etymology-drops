import { Word } from "./types";

// More 身近な言葉 — everyday words with surprising, verified etymologies.
// Extends the "familiar" course. Block labels concatenate (hyphens stripped)
// to spell each word exactly. (Words already in familiarWords.ts are not repeated.)
export const familiarWordsExtra: Word[] = [
    {
        id: "disaster",
        word: "Disaster",
        meaning: { en: "A sudden great misfortune.", ja: "突然の大きな災難、災害。" },
        history: {
            en: "'dis-' (bad) + 'aster' (star), meaning 'ill-starred': a calamity once blamed on an unlucky position of the planets.",
            ja: "'dis-'（悪い）+ 'aster'（星）。文字通り「不吉な星回り」。災難は惑星の悪い配置のせいとされました。",
        },
        blocks: [
            { id: "dis", label: "Dis", meaning: { en: "Bad, apart", ja: "悪い・離れて" }, type: "prefix" },
            { id: "aster", label: "Aster", meaning: { en: "Star", ja: "星" }, type: "root" },
        ],
        icon: "CloudLightning",
        tip: {
            en: "ASTER / ASTRO (star) also shines in astronaut ('star sailor'), asterisk ('little star'), and astronomy.",
            ja: "ASTER / ASTRO（星）は astronaut（星の航海者）、asterisk（小さな星＝アスタリスク）、astronomy にも輝いています。",
        },
    },
    {
        id: "sarcasm",
        word: "Sarcasm",
        meaning: { en: "Mocking or bitterly ironic language.", ja: "皮肉、あてこすり。" },
        history: {
            en: "From Greek 'sarc' (flesh) — sarkazein meant 'to strip off the flesh, like dogs'. A sarcastic remark bites to the bone.",
            ja: "ギリシャ語 'sarc'（肉）から。sarkazein は「犬のように肉を剥ぎ取る」。皮肉は骨まで噛みつくのです。",
        },
        blocks: [
            { id: "sarc", label: "Sarc", meaning: { en: "Flesh", ja: "肉" }, type: "root" },
            { id: "asm", label: "Asm", meaning: { en: "Act of (noun)", ja: "〜すること" }, type: "suffix" },
        ],
        icon: "MessageSquareOff",
        tip: {
            en: "The root SARC (flesh) also appears in sarcophagus, a 'flesh-eating' stone coffin.",
            ja: "語根 SARC（肉）は sarcophagus（石棺）にも。文字通り「肉を食べる」石の棺です。",
        },
    },
    {
        id: "quarantine",
        word: "Quarantine",
        meaning: { en: "Isolation to stop a disease from spreading.", ja: "隔離、検疫。" },
        history: {
            en: "From Italian 'quaranta giorni', 'forty days'. From 1377, plague-suspect ships had to wait forty days offshore before landing.",
            ja: "イタリア語 'quaranta giorni'（40日間）から。1377年以降、疫病の疑いのある船は上陸前に40日間沖で待たされました。",
        },
        blocks: [
            { id: "quar", label: "Quar", meaning: { en: "Four / forty", ja: "四・四十" }, type: "root" },
            { id: "antine", label: "Antine", meaning: { en: "From 'giorni' (days)", ja: "「日間 (giorni)」に由来" }, type: "suffix" },
        ],
        icon: "ShieldAlert",
        tip: {
            en: "The number four hides in many words: quarter, quartet, quadruple, square — and quarantine's forty days.",
            ja: "「4」は多くの言葉に隠れています。quarter、quartet、quadruple、square、そして quarantine の40日間。",
        },
    },
    {
        id: "candidate",
        word: "Candidate",
        meaning: { en: "A person who applies for a job or election.", ja: "候補者。" },
        history: {
            en: "From Latin 'candidatus', 'white-robed'. Roman office-seekers wore a bright white toga to signal a pure character.",
            ja: "ラテン語 'candidatus'（白い衣を着た）から。ローマの立候補者は清廉さを示すため真っ白なトーガを着ました。",
        },
        blocks: [
            { id: "candid", label: "Candid", meaning: { en: "White, shining", ja: "白い・輝く" }, type: "root" },
            { id: "ate", label: "Ate", meaning: { en: "Person / made", ja: "〜な人" }, type: "suffix" },
        ],
        icon: "Vote",
        tip: {
            en: "Same shining root gives candid ('frank, pure') and candle — CANDID is 'to shine white'.",
            ja: "同じ「輝く」語根から candid（率直な・純粋な）や candle（ろうそく）が生まれます。CANDID は「白く輝く」。",
        },
    },
    {
        id: "tragedy",
        word: "Tragedy",
        meaning: { en: "A very sad event; a serious drama.", ja: "悲劇。" },
        history: {
            en: "From Greek 'tragodia', apparently 'goat song' — 'trag' (goat) + 'oide' (song). The exact reason is lost, but the goat is there.",
            ja: "ギリシャ語 'tragodia'、どうやら「ヤギの歌」。'trag'（ヤギ）+ 'oide'（歌）。理由は諸説ありますが、ヤギは確かにそこにいます。",
        },
        blocks: [
            { id: "trag", label: "Trag", meaning: { en: "Goat", ja: "ヤギ" }, type: "root" },
            { id: "edy", label: "Edy", meaning: { en: "Song (from 'oide')", ja: "歌" }, type: "suffix" },
        ],
        icon: "VenetianMask",
        tip: {
            en: "Its twin, comedy, is the 'revel song' (komos) — the two masks of Greek theatre, hidden in two words.",
            ja: "双子の comedy は「宴の歌」(komos)。ギリシャ演劇の二つの仮面が、二つの言葉に隠れています。",
        },
    },
    {
        id: "curfew",
        word: "Curfew",
        meaning: { en: "A rule to stay indoors after a set time.", ja: "門限、外出禁止令。" },
        history: {
            en: "From Old French 'cuevrefeu', 'cover fire'. A medieval bell told townsfolk to put out their hearth fires at night.",
            ja: "古仏語 'cuevrefeu'（火を覆え）から。中世、鐘が鳴ると夜に炉の火を消しました。",
        },
        blocks: [
            { id: "cur", label: "Cur", meaning: { en: "Cover", ja: "覆う" }, type: "root" },
            { id: "few", label: "Few", meaning: { en: "Fire", ja: "火" }, type: "root" },
        ],
        icon: "Moon",
        tip: {
            en: "The 'cover' root also covers kerchief ('cover the head') and, distantly, the everyday word cover itself.",
            ja: "「覆う」の語根は kerchief（頭を覆う布）や、遠くは cover そのものにも通じます。",
        },
    },
    {
        id: "malaria",
        word: "Malaria",
        meaning: { en: "A disease spread by mosquitoes.", ja: "マラリア。" },
        history: {
            en: "From Italian 'mala aria', 'bad air'. Before mosquitoes were understood, the illness was blamed on foul air from the marshes.",
            ja: "イタリア語 'mala aria'（悪い空気）から。蚊が原因と分かる前、沼地の悪い空気のせいとされました。",
        },
        blocks: [
            { id: "mal", label: "Mal", meaning: { en: "Bad", ja: "悪い" }, type: "prefix" },
            { id: "aria", label: "Aria", meaning: { en: "Air", ja: "空気" }, type: "root" },
        ],
        icon: "Bug",
        tip: {
            en: "MAL- (bad) turns up everywhere: malfunction, malware, malnutrition, malice — and even 'maladie', French for illness.",
            ja: "MAL-（悪い）はあちこちに現れます。malfunction、malware、malnutrition、malice、そして仏語 maladie（病気）。",
        },
    },
    {
        id: "nightmare",
        word: "Nightmare",
        meaning: { en: "A frightening dream.", ja: "悪夢。" },
        history: {
            en: "'night' + 'mare' — but this 'mare' is no horse. It was an Old English demon (a 'mare') thought to sit on sleepers and suffocate them.",
            ja: "'night'（夜）+ 'mare'。この mare は馬ではありません。古英語で、眠る人の上に乗って窒息させると信じられた悪霊です。",
        },
        blocks: [
            { id: "night", label: "Night", meaning: { en: "Night", ja: "夜" }, type: "root" },
            { id: "mare", label: "Mare", meaning: { en: "Evil spirit, goblin", ja: "悪霊・夢魔" }, type: "root" },
        ],
        icon: "Ghost",
        tip: {
            en: "The demon 'mare' survives only inside this one word — a fossil of old folklore in everyday English.",
            ja: "悪霊 mare はこの一語の中だけに生き残っています。日常英語に埋もれた古い民間伝承の化石です。",
        },
    },
    {
        id: "rival",
        word: "Rival",
        meaning: { en: "A competitor.", ja: "競争相手、ライバル。" },
        history: {
            en: "From Latin 'rivalis' — 'one who uses the same stream (rivus)' as another. Neighbours on one river became competitors for its water.",
            ja: "ラテン語 'rivalis'（同じ小川 rivus を使う者）から。同じ川の隣人が、水をめぐる競争相手になりました。",
        },
        blocks: [
            { id: "riv", label: "Riv", meaning: { en: "Stream, brook", ja: "小川" }, type: "root" },
            { id: "al", label: "Al", meaning: { en: "Relating to (person)", ja: "〜に関する（人）" }, type: "suffix" },
        ],
        icon: "Swords",
        tip: {
            en: "The same RIV (stream) flows through river, riverbank, and derive — 'to draw off from a stream'.",
            ja: "同じ RIV（小川）は river、riverbank、そして derive（川から水を引く＝派生する）に流れています。",
        },
    },
    {
        id: "decide",
        word: "Decide",
        meaning: { en: "To make a choice.", ja: "決める。" },
        history: {
            en: "'de-' (off) + 'cide' (cut). From decidere 'to cut off' — to decide is to cut away every option but one.",
            ja: "'de-'（切り離して）+ 'cide'（切る）。decidere「切り落とす」から。決めるとは、ひとつを残して選択肢を切り捨てること。",
        },
        blocks: [
            { id: "de", label: "De", meaning: { en: "Off, away", ja: "切り離して" }, type: "prefix" },
            { id: "cide", label: "Cide", meaning: { en: "Cut", ja: "切る" }, type: "root" },
        ],
        icon: "GitFork",
        tip: {
            en: "The CIDE / CISE (cut) root is sharp everywhere: scissors, precise, concise, incision — and the darker 'homicide'.",
            ja: "CIDE / CISE（切る）の語根はどこでも鋭い。scissors、precise、concise、incision、そして homicide。",
        },
    },
    {
        id: "denim",
        word: "Denim",
        meaning: { en: "A strong cotton cloth used for jeans.", ja: "デニム生地。" },
        history: {
            en: "From French 'serge de Nîmes', 'serge from Nîmes' — a sturdy cloth first woven in the southern French city of Nîmes.",
            ja: "フランス語 'serge de Nîmes'（ニーム産のサージ生地）から。南仏の都市ニームで初めて織られた丈夫な布。",
        },
        blocks: [
            { id: "de", label: "De", meaning: { en: "From, of", ja: "〜産の" }, type: "prefix" },
            { id: "nim", label: "Nim", meaning: { en: "Nîmes (French city)", ja: "ニーム（仏の都市）" }, type: "root" },
        ],
        icon: "Shirt",
        tip: {
            en: "Its partner 'jeans' comes from Genoa, Italy — two fabrics named after the two cities that made them.",
            ja: "相棒の jeans はイタリアの都市ジェノヴァ (Genoa) から。二つの生地が、それぞれを作った二つの都市から名づけられました。",
        },
    },
    {
        id: "hippopotamus",
        word: "Hippopotamus",
        meaning: { en: "A large African river animal.", ja: "カバ。" },
        history: {
            en: "From Greek 'hippo' (horse) + 'potamus' (river) — a 'river horse'. The Greeks named the beast for where it lived and how it looked.",
            ja: "ギリシャ語 'hippo'（馬）+ 'potamus'（川）。「川の馬」。ギリシャ人はその住処と見た目からこの獣を名づけました。",
        },
        blocks: [
            { id: "hippo", label: "Hippo", meaning: { en: "Horse", ja: "馬" }, type: "root" },
            { id: "potamus", label: "Potamus", meaning: { en: "River", ja: "川" }, type: "root" },
        ],
        icon: "PawPrint",
        tip: {
            en: "HIPPO (horse) also gallops through 'Philip' (lover of horses) and 'hippodrome' (a horse-racing track).",
            ja: "HIPPO（馬）は Philip（馬を愛する者）や hippodrome（競馬場）にも駆けています。",
        },
    },
    {
        id: "villain",
        word: "Villain",
        meaning: { en: "A wicked character.", ja: "悪役、悪党。" },
        history: {
            en: "From Latin 'villa' (farm) — a 'villanus' was a farmhand. Class prejudice slowly twisted 'peasant' into 'scoundrel'.",
            ja: "ラテン語 'villa'（農場）から。'villanus' はただの農夫でした。身分への偏見が「農民」を少しずつ「悪党」に変えました。",
        },
        blocks: [
            { id: "vill", label: "Vill", meaning: { en: "Farm, country house", ja: "農場" }, type: "root" },
            { id: "ain", label: "Ain", meaning: { en: "Person", ja: "〜の人" }, type: "suffix" },
        ],
        icon: "VenetianMask",
        tip: {
            en: "The same VILL (country estate) root gives us village and villa — the villain was just the villager.",
            ja: "同じ VILL（田舎の地所）の語根から village や villa が生まれます。villain は元々ただの村人 (villager) でした。",
        },
    },
];
