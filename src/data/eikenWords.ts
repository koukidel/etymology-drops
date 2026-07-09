import { Word } from "./types";

// Course: 英検1級の分解 — advanced multi-affix words. Every block label,
// concatenated with hyphens stripped, spells the word exactly.
export const eikenWords: Word[] = [
    {
        id: "indispensable",
        word: "Indispensable",
        meaning: { en: "Absolutely necessary; cannot be done without.", ja: "絶対に必要な、欠かせない。" },
        history: {
            en: "'in-' (not) + 'dis-' (out) + 'pens' (weigh, pay) + '-able'. From dispensare 'to distribute by weight'; first 'not subject to dispensation', then 'absolutely necessary' by the 1690s.",
            ja: "'in-'（〜でない）+ 'dis-'（外へ）+ 'pens'（量る・支払う）+ '-able'。dispensare「重さで分配する」に由来。元は「免除できない」、1690年代に「不可欠な」の意味へ。",
        },
        blocks: [
            { id: "in", label: "In", meaning: { en: "Not", ja: "〜でない" }, type: "prefix" },
            { id: "dis", label: "Dis", meaning: { en: "Out, apart", ja: "外へ・離れて" }, type: "prefix" },
            { id: "pens", label: "Pens", meaning: { en: "Weigh, pay, hang", ja: "量る・支払う" }, type: "root" },
            { id: "able", label: "Able", meaning: { en: "Capable of", ja: "〜できる" }, type: "suffix" },
        ],
        icon: "Anchor",
        tip: {
            en: "The root PENS / PEND (weigh, pay, hang) unlocks pension, suspend, dispense, compensate, expensive, pendulum, ponder — one root, a whole shelf of words.",
            ja: "語根 PENS / PEND（量る・支払う・吊るす）は pension、suspend、dispense、compensate、expensive、pendulum を解き明かします。ひとつの語根で棚ひとつ分の単語。",
        },
    },
    {
        id: "incomprehensible",
        word: "Incomprehensible",
        meaning: { en: "Impossible to understand.", ja: "理解できない。" },
        history: {
            en: "'in-' (not) + 'com-' (completely) + 'prehens' (seize, grasp) + '-ible'. From comprehendere 'to lay hold of' — so 'unable to be grasped by the mind'.",
            ja: "'in-'（〜でない）+ 'com-'（完全に）+ 'prehens'（つかむ）+ '-ible'。comprehendere「把握する」に由来。「頭で掴めない」の意。",
        },
        blocks: [
            { id: "in", label: "In", meaning: { en: "Not", ja: "〜でない" }, type: "prefix" },
            { id: "com", label: "Com", meaning: { en: "Completely", ja: "完全に" }, type: "prefix" },
            { id: "prehens", label: "Prehens", meaning: { en: "Seize, grasp", ja: "つかむ" }, type: "root" },
            { id: "ible", label: "Ible", meaning: { en: "Able to be", ja: "〜できる" }, type: "suffix" },
        ],
        icon: "BrainCircuit",
        tip: {
            en: "The root PREHENS (seize) also grips apprehend, comprehend, prehensile ('able to grasp'), apprentice, and enterprise.",
            ja: "語根 PREHENS（つかむ）は apprehend、comprehend、prehensile（物をつかめる）、enterprise にも握られています。",
        },
    },
    {
        id: "unprecedented",
        word: "Unprecedented",
        meaning: { en: "Never done or known before.", ja: "前例のない。" },
        history: {
            en: "'un-' (not) + 'pre-' (before) + 'ced' (go, yield) + '-ented'. From praecedere 'to go before' — so 'with no prior example'.",
            ja: "'un-'（〜でない）+ 'pre-'（前に）+ 'ced'（行く・譲る）+ '-ented'。praecedere「先立つ」に由来。「前例のない」の意。",
        },
        blocks: [
            { id: "un", label: "Un", meaning: { en: "Not", ja: "〜でない" }, type: "prefix" },
            { id: "pre", label: "Pre", meaning: { en: "Before", ja: "前に" }, type: "prefix" },
            { id: "ced", label: "Ced", meaning: { en: "Go, yield", ja: "行く・譲る" }, type: "root" },
            { id: "ented", label: "Ented", meaning: { en: "Having gone", ja: "〜された状態" }, type: "suffix" },
        ],
        icon: "Flag",
        tip: {
            en: "The root CED / CESS (go, yield) unlocks precede, recede, secede, concede, proceed, recession, access, exceed.",
            ja: "語根 CED / CESS（行く・譲る）は precede、recede、secede、concede、proceed、recession、access を解き明かします。",
        },
    },
    {
        id: "circumnavigate",
        word: "Circumnavigate",
        meaning: { en: "To sail all the way around.", ja: "一周航行する。" },
        history: {
            en: "'circum' (around) + 'navig' (sail) + '-ate'. From circumnavigare (1630s); navigare is navis 'ship' + agere 'to drive'.",
            ja: "'circum'（周りに）+ 'navig'（航海する）+ '-ate'。circumnavigare（1630年代）より。navigare は navis「船」+ agere「駆る」。",
        },
        blocks: [
            { id: "circum", label: "Circum", meaning: { en: "Around", ja: "周りに" }, type: "prefix" },
            { id: "navig", label: "Navig", meaning: { en: "Sail", ja: "航海する" }, type: "root" },
            { id: "ate", label: "Ate", meaning: { en: "To do", ja: "〜する" }, type: "suffix" },
        ],
        icon: "Ship",
        tip: {
            en: "CIRCUM- (around) circles through circumference, circumstance, circumspect, circumvent; NAVIG / NAV sails into navigate, navy, naval.",
            ja: "CIRCUM-（周りに）は circumference、circumspect、circumvent を巡り、NAV は navigate、navy、naval へ航海します。",
        },
    },
    {
        id: "incorruptible",
        word: "Incorruptible",
        meaning: { en: "That cannot be corrupted or bribed.", ja: "堕落しない、買収できない。" },
        history: {
            en: "'in-' (not) + 'cor-' (intensive) + 'rupt' (break) + '-ible'. From corrumpere 'to destroy, spoil' — so 'that cannot be broken down'.",
            ja: "'in-'（〜でない）+ 'cor-'（強意）+ 'rupt'（壊す）+ '-ible'。corrumpere「破壊する・堕落させる」に由来。「壊れない」の意。",
        },
        blocks: [
            { id: "in", label: "In", meaning: { en: "Not", ja: "〜でない" }, type: "prefix" },
            { id: "cor", label: "Cor", meaning: { en: "Completely (from com-)", ja: "完全に" }, type: "prefix" },
            { id: "rupt", label: "Rupt", meaning: { en: "Break", ja: "壊す" }, type: "root" },
            { id: "ible", label: "Ible", meaning: { en: "Able to be", ja: "〜できる" }, type: "suffix" },
        ],
        icon: "ShieldCheck",
        tip: {
            en: "The root RUPT (break) shatters into rupture, disrupt, interrupt, abrupt, bankrupt, erupt.",
            ja: "語根 RUPT（壊す）は rupture、disrupt、interrupt、abrupt、bankrupt、erupt に砕けます。",
        },
    },
    {
        id: "retrospective",
        word: "Retrospective",
        meaning: { en: "Looking back on the past.", ja: "回顧的な、過去を振り返る。" },
        history: {
            en: "'retro' (back) + 'spect' (look) + '-ive'. 'Looking back', from retro- + specere 'to look'.",
            ja: "'retro'（後ろへ）+ 'spect'（見る）+ '-ive'。文字通り「振り返って見る」。retro- + specere「見る」。",
        },
        blocks: [
            { id: "retro", label: "Retro", meaning: { en: "Back, behind", ja: "後ろへ" }, type: "prefix" },
            { id: "spect", label: "Spect", meaning: { en: "Look", ja: "見る" }, type: "root" },
            { id: "ive", label: "Ive", meaning: { en: "Having the quality of", ja: "〜的な" }, type: "suffix" },
        ],
        icon: "History",
        tip: {
            en: "You met SPECT in the Latin Roots course — it also looks through inspect, prospect, spectator, circumspect, conspicuous, perspective, suspect.",
            ja: "SPECT はラテン語の語根コースで出会いましたね。inspect、prospect、spectator、circumspect、perspective、suspect も見通します。",
        },
    },
    {
        id: "irreversible",
        word: "Irreversible",
        meaning: { en: "Impossible to turn back or undo.", ja: "元に戻せない。" },
        history: {
            en: "'ir-' (not) + 're-' (back) + 'vers' (turn) + '-ible'. From revertere 'to turn back' — so 'cannot be turned back'.",
            ja: "'ir-'（〜でない）+ 're-'（元へ）+ 'vers'（回す）+ '-ible'。revertere「元へ回す」に由来。「戻せない」の意。",
        },
        blocks: [
            { id: "ir", label: "Ir", meaning: { en: "Not (in- before r)", ja: "〜でない" }, type: "prefix" },
            { id: "re", label: "Re", meaning: { en: "Back", ja: "元へ" }, type: "prefix" },
            { id: "vers", label: "Vers", meaning: { en: "Turn", ja: "回す" }, type: "root" },
            { id: "ible", label: "Ible", meaning: { en: "Able to be", ja: "〜できる" }, type: "suffix" },
        ],
        icon: "Undo2",
        tip: {
            en: "The root VERS / VERT (turn) turns up in reverse, versatile, convert, divert, invert, versus, anniversary, adverse.",
            ja: "語根 VERS / VERT（回す）は reverse、versatile、convert、divert、invert、anniversary に現れます。",
        },
    },
    {
        id: "interdependence",
        word: "Interdependence",
        meaning: { en: "Mutual dependence between things.", ja: "相互依存。" },
        history: {
            en: "'inter' (between) + 'de-' (down/from) + 'pend' (hang) + '-ence'. Coined 1816; dependere is 'to hang from' — so 'mutual hanging-upon'.",
            ja: "'inter'（間に）+ 'de-'（下へ）+ 'pend'（吊るす）+ '-ence'。1816年の造語。dependere は「〜から垂れ下がる」。「相互依存」の意。",
        },
        blocks: [
            { id: "inter", label: "Inter", meaning: { en: "Between", ja: "間に" }, type: "prefix" },
            { id: "de", label: "De", meaning: { en: "Down, from", ja: "下へ" }, type: "prefix" },
            { id: "pend", label: "Pend", meaning: { en: "Hang", ja: "吊るす" }, type: "root" },
            { id: "ence", label: "Ence", meaning: { en: "State of", ja: "〜な状態" }, type: "suffix" },
        ],
        icon: "Link",
        tip: {
            en: "Same PEND / PENS root as indispensable — hanging through pendant, suspend, append, impending, pending, depend, pendulum.",
            ja: "indispensable と同じ PEND / PENS の語根。pendant、suspend、append、pending、pendulum に吊り下がっています。",
        },
    },
    {
        id: "inconceivable",
        word: "Inconceivable",
        meaning: { en: "Impossible to imagine or believe.", ja: "想像もできない。" },
        history: {
            en: "'in-' (not) + 'con-' (together) + 'ceiv' (take) + '-able'. From concipere 'to take in and hold' — the mind cannot 'take it in'.",
            ja: "'in-'（〜でない）+ 'con-'（共に）+ 'ceiv'（取る）+ '-able'。concipere「取り込んで保つ」に由来。頭が「取り込めない」。",
        },
        blocks: [
            { id: "in", label: "In", meaning: { en: "Not", ja: "〜でない" }, type: "prefix" },
            { id: "con", label: "Con", meaning: { en: "Together", ja: "共に" }, type: "prefix" },
            { id: "ceiv", label: "Ceiv", meaning: { en: "Take", ja: "取る" }, type: "root" },
            { id: "able", label: "Able", meaning: { en: "Able to be", ja: "〜できる" }, type: "suffix" },
        ],
        icon: "Sparkle",
        tip: {
            en: "CEIV / CEPT / CIP is the 'take' root you met in accept — it also takes receive, perceive, deceive, capture, intercept, recipient.",
            ja: "CEIV / CEPT / CIP は accept で出会った「取る」の語根。receive、perceive、deceive、capture、intercept も取り込みます。",
        },
    },
    {
        id: "benevolent",
        word: "Benevolent",
        meaning: { en: "Kind and well-meaning.", ja: "慈悲深い、善意の。" },
        history: {
            en: "'bene' (well) + 'vol' (wish) + '-ent'. From benevolentem, 'wishing well' or 'wishing good'.",
            ja: "'bene'（よく）+ 'vol'（願う）+ '-ent'。benevolentem「よく願う・親切な」に由来。文字通り「善を願う」。",
        },
        blocks: [
            { id: "bene", label: "Bene", meaning: { en: "Well, good", ja: "よく" }, type: "prefix" },
            { id: "vol", label: "Vol", meaning: { en: "Wish, will", ja: "願う・意志" }, type: "root" },
            { id: "ent", label: "Ent", meaning: { en: "Having the quality of", ja: "〜する性質の" }, type: "suffix" },
        ],
        icon: "HeartHandshake",
        tip: {
            en: "BENE (well) also blesses benefit, benefactor, benediction; the VOL (wish, will) root drives malevolent, volition, voluntary, volunteer.",
            ja: "BENE（よく）は benefit、benefactor、benediction を、VOL（願う・意志）は malevolent、volition、voluntary を動かします。",
        },
    },
];
